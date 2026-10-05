import { Cabinet, Wine } from "../models";

// "Chambering" = bringing a bottle from its storage zone's temperature up to
// its ideal serving temperature. This module turns a zone's live sensor, a
// wine's serving_temp, and the chambering room's sensor into simple, honest
// advice. A "zone" here is a whole rack card (a Cabinet) — sensors are set
// per rack, not per shelf or bin inside it.

export function readSensorValue(hass: any, entityId: string): number | null {
  if (!entityId || !hass?.states) return null;
  const state = hass.states[entityId];
  if (!state || state.state === "unavailable" || state.state === "unknown") return null;
  const value = parseFloat(state.state);
  return Number.isFinite(value) ? value : null;
}

export interface ServingTempRange {
  low: number;
  high: number;
}

// Parses "16-18°C" / "16°C" / "16-18" / "16" — lenient on purpose since this
// is an AI-filled free-text field, not a structured one. Always returns °C:
// a value marked °F (typed by hand in a US home) is converted.
export function parseServingTemp(servingTemp: string | undefined | null): ServingTempRange | null {
  if (!servingTemp) return null;
  // No leading sign: serving temperatures are never sub-zero in practice,
  // and allowing one would make parseServingTemp("16-18°C") misread the
  // range's own hyphen as a minus sign on 18 (giving -18, not 18).
  const numbers = (servingTemp.match(/\d+(?:[.,]\d+)?/g) || []).map((n) =>
    parseFloat(n.replace(",", "."))
  );
  if (numbers.length === 0 || numbers.some((n) => !Number.isFinite(n))) return null;
  const toC = /°\s*F|\dF\b/i.test(servingTemp) ? fToC : (n: number) => n;
  const [a, b] = numbers.length === 1 ? [numbers[0], numbers[0]] : [numbers[0], numbers[1]];
  return { low: toC(Math.min(a, b)), high: toC(Math.max(a, b)) };
}

export const cToF = (c: number) => (c * 9) / 5 + 32;
export const fToC = (f: number) => ((f - 32) * 5) / 9;

// Whether temperatures should be shown in °F: Home Assistant's own unit
// system (Settings > System > General), not anything the card configures.
export function usesFahrenheit(hass: any): boolean {
  return hass?.config?.unit_system?.temperature === "°F";
}

// A serving temperature for display, in the unit Home Assistant uses.
// Stored values are °C (that's what the AI writes); text that doesn't parse
// as a temperature is shown as typed.
export function formatServingTemp(servingTemp: string | undefined | null, hass: any): string {
  const range = parseServingTemp(servingTemp);
  if (!range) return servingTemp || "";
  const f = usesFahrenheit(hass);
  const show = (c: number) => String(Math.round(f ? cToF(c) : c));
  const unit = f ? "°F" : "°C";
  const low = show(range.low);
  const high = show(range.high);
  return low === high ? `${low}${unit}` : `${low}-${high}${unit}`;
}

// A temperature sensor's reading in °C, whatever unit it reports in. A US
// Home Assistant reports °F, while serving temperatures and the warm-up
// math below are in °C.
export function readTemperatureC(hass: any, entityId: string): number | null {
  const value = readSensorValue(hass, entityId);
  if (value === null) return null;
  const unit = hass.states[entityId]?.attributes?.unit_of_measurement;
  return unit === "°F" ? fToC(value) : value;
}

export type ChamberingStatus = "ready" | "warm_up" | "chill";

export interface ChamberingAdvice {
  status: ChamberingStatus;
  minutes?: number; // only for "warm_up"
}

export function getChamberingAdvice(
  wine: Wine,
  cabinet: Cabinet | undefined,
  hass: any,
  roomSensorEntityId: string,
  timeConstantMinutes: number,
  equilibrationHours: number
): ChamberingAdvice | null {
  const range = parseServingTemp(wine.serving_temp);
  if (!range) return null;

  const cellarTemp = readTemperatureC(hass, cabinet?.temp_sensor_entity_id || "");
  if (cellarTemp === null) return null;

  if (wine.location_updated_at) {
    const movedAt = new Date(wine.location_updated_at).getTime();
    if (Number.isFinite(movedAt)) {
      const hoursInZone = (Date.now() - movedAt) / 3_600_000;
      if (hoursInZone < equilibrationHours) return null;
    }
  }

  if (cellarTemp >= range.low && cellarTemp <= range.high) {
    return { status: "ready" };
  }

  if (cellarTemp > range.high) {
    return { status: "chill" };
  }

  // cellarTemp < range.low: the bottle warms towards the room's temperature.
  // Newton's law of heating: T(t) = room - (room - cellar) * exp(-t / tau),
  // so reaching `target` takes t = tau * ln((room - cellar) / (room - target)).
  // A warmer room therefore means a shorter wait, and the bottle can never
  // pass the room temperature — a target at or above it is unreachable.
  const roomTemp = readTemperatureC(hass, roomSensorEntityId);
  if (roomTemp === null || !(timeConstantMinutes > 0)) return null;

  // Aim for the middle of the serving range; if the room is too close to (or
  // below) that, settle for the bottom of the range. The margin keeps the
  // logarithm finite when the target is barely under the room temperature.
  const margin = 0.5;
  const targetTemp = [(range.low + range.high) / 2, range.low].find((t) => t <= roomTemp - margin);
  if (targetTemp === undefined) return null;

  const minutes = timeConstantMinutes * Math.log((roomTemp - cellarTemp) / (roomTemp - targetTemp));
  return { status: "warm_up", minutes: Math.max(0, Math.round(minutes / 5) * 5) };
}

// "90 minutes" -> "1h30"
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return `${h}h${String(m).padStart(2, "0")}`;
}
