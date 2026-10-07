import { Cabinet, StorageRow, Wine, getRackSlots, getStorageRowTypeLabels } from "../models";
import { tGroup } from "../i18n";

// Shared "where does a bottle physically sit" helpers.
//
// The occupancy math used to live twice over: private methods on the cabinet
// grid for rendering, and a second, subtly different copy in the add dialog
// for capacity checks. Anything that needs to know what a container holds,
// how full it is, or where the next bottle would land goes through here.

// A container is one addressable place that holds bottles: a bulk bin or wine
// box (a storage row), the cabinet's bottom zone, or a single grid slot with
// its depth. Note the granularity: a grid *slot* is a container holding
// `cabinet.depth` bottles, not one bottle.
export type ContainerKind = "zone" | "bottom" | "slot";

export interface Container {
  cabinetId: string;
  kind: ContainerKind;
  zone: string; // "storage-N" | "bottom" | "" for a grid slot
  row: number | null;
  col: number | null;
}

export interface ContainerUsage {
  used: number;
  capacity: number; // 0 means unlimited (the bottom zone has no configured size)
  nextDepth: number; // first free depth, reusing gaps left by removed bottles
  free: number; // Infinity when unlimited
  full: boolean;
}

// A bin's real capacity: for a box row the sum of its boxes, for a shelf row
// the sum of every level's front+back lanes, otherwise the row's own capacity.
export function zoneCapacity(sr: StorageRow): number {
  if (sr.type === "box") {
    return (sr.boxes || []).reduce((sum, b) => sum + b, 0) || sr.capacity || 0;
  }
  if (sr.type === "shelf") {
    return (sr.shelf_levels || []).reduce((sum, lvl) => sum + lvl.front + lvl.back, 0) || sr.capacity || 0;
  }
  if (sr.type === "stepped") {
    return (sr.stepped_levels || []).reduce((sum, n) => sum + n, 0) || sr.capacity || 0;
  }
  return sr.capacity || 0;
}

export function storageRowFor(cabinet: Cabinet | undefined, zone: string): StorageRow | undefined {
  if (!cabinet || !zone || zone === "bottom") return undefined;
  return (cabinet.storage_rows || []).find((sr) => `storage-${sr.row}` === zone);
}

export function containerKey(c: Container): string {
  return `${c.cabinetId}|${c.zone}|${c.row ?? ""}|${c.col ?? ""}`;
}

export function sameContainer(a: Container, b: Container): boolean {
  return containerKey(a) === containerKey(b);
}

// The container a bottle currently sits in, or null when it is unassigned.
export function containerOf(wine: Wine): Container | null {
  if (!wine.cabinet_id) return null;
  if (wine.zone === "bottom") {
    return { cabinetId: wine.cabinet_id, kind: "bottom", zone: "bottom", row: null, col: null };
  }
  if (wine.zone) {
    return { cabinetId: wine.cabinet_id, kind: "zone", zone: wine.zone, row: null, col: null };
  }
  if (wine.row !== null && wine.col !== null) {
    return { cabinetId: wine.cabinet_id, kind: "slot", zone: "", row: wine.row, col: wine.col };
  }
  return null;
}

export function winesInContainer(c: Container, wines: Wine[]): Wine[] {
  return wines.filter((w) => {
    const wc = containerOf(w);
    return wc !== null && sameContainer(wc, c);
  });
}

export function containerCapacity(c: Container, cabinet: Cabinet | undefined): number {
  if (!cabinet) return 0;
  if (c.kind === "bottom") return 0; // unlimited
  if (c.kind === "zone") {
    const sr = storageRowFor(cabinet, c.zone);
    return sr ? zoneCapacity(sr) : 0;
  }
  return cabinet.depth || 1;
}

export function containerUsage(
  c: Container,
  cabinet: Cabinet | undefined,
  wines: Wine[]
): ContainerUsage {
  const capacity = containerCapacity(c, cabinet);
  const occupied = new Set(winesInContainer(c, wines).map((w) => w.depth || 0));
  // First free slot rather than "one past the last": a bottle removed from the
  // middle leaves a gap that should be reused, not skipped over.
  let nextDepth = 0;
  while (occupied.has(nextDepth)) nextDepth++;
  const unlimited = capacity <= 0;
  return {
    used: occupied.size,
    capacity,
    nextDepth,
    free: unlimited ? Infinity : Math.max(0, capacity - occupied.size),
    full: !unlimited && (occupied.size >= capacity || nextDepth >= capacity),
  };
}

// Human-readable name for the container itself — no slot number, since a
// container holds several bottles.
export function containerLabel(c: Container, cabinets: Cabinet[], language?: string): string {
  const loc = tGroup("wineLocation", language);
  const cabinet = cabinets.find((cab) => cab.id === c.cabinetId);
  if (!cabinet) return loc.unassigned;
  if (c.kind === "bottom") return `${cabinet.name} · ${cabinet.bottom_zone_name || loc.storage}`;
  if (c.kind === "zone") {
    const sr = storageRowFor(cabinet, c.zone);
    const typeLabels = getStorageRowTypeLabels(language);
    return `${cabinet.name} · ${sr?.name || typeLabels[sr?.type || "bulk"]}`;
  }
  const idx = getRackSlots(cabinet).findIndex((s) => s.row === c.row && s.col === c.col);
  const slot = idx >= 0 ? `${loc.slot} ${idx + 1}` : `R${(c.row ?? 0) + 1}C${(c.col ?? 0) + 1}`;
  return `${cabinet.name} · ${slot}`;
}

// Every container in a cabinet, in the order the grid draws them: bins and
// boxes first, then the bottom zone, then the grid slots in reading order.
export function containersOf(cabinet: Cabinet): Container[] {
  const out: Container[] = [];
  for (const sr of cabinet.storage_rows || []) {
    out.push({ cabinetId: cabinet.id, kind: "zone", zone: `storage-${sr.row}`, row: null, col: null });
  }
  if (cabinet.has_bottom_zone) {
    out.push({ cabinetId: cabinet.id, kind: "bottom", zone: "bottom", row: null, col: null });
  }
  for (const s of getRackSlots(cabinet)) {
    out.push({ cabinetId: cabinet.id, kind: "slot", zone: "", row: s.row, col: s.col });
  }
  return out;
}

// The wine-shaped patch that puts a bottle into `c`, at its first free depth.
// Returns null when the container has no room left.
export function placementIn(
  c: Container,
  cabinet: Cabinet | undefined,
  wines: Wine[]
): { cabinet_id: string; zone: string; row: number | null; col: number | null; depth: number } | null {
  const usage = containerUsage(c, cabinet, wines);
  if (usage.full) return null;
  return {
    cabinet_id: c.cabinetId,
    zone: c.zone,
    row: c.row,
    col: c.col,
    depth: usage.nextDepth,
  };
}

// The grid slot a bottle should take when the user picked a rack but no
// position: the first empty slot in reading order, so it doesn't end up
// stacked behind some other wine, or failing that the first slot with depth
// left. Null when the grid is full.
export function nextOpenSlot(
  cabinet: Cabinet | undefined,
  wines: Wine[]
): { row: number; col: number } | null {
  if (!cabinet) return null;
  let partial: { row: number; col: number } | null = null;
  for (const s of getRackSlots(cabinet)) {
    const usage = containerUsage(
      { cabinetId: cabinet.id, kind: "slot", zone: "", row: s.row, col: s.col },
      cabinet,
      wines
    );
    if (usage.used === 0) return s;
    if (!usage.full && !partial) partial = s;
  }
  return partial;
}

// Where each of `count` identical bottles would land, given a chosen
// destination. Returns fewer entries than asked when the destination runs out
// of room, so the caller can clamp rather than silently dropping bottles.
export function planSlots(
  target: { cabinet_id?: string; zone?: string; row?: number | null; col?: number | null; depth?: number | null },
  cabinets: Cabinet[],
  wines: Wine[],
  count: number
): { row: number | null; col: number | null; zone: string; depth: number }[] {
  const cabinet = cabinets.find((c) => c.id === target.cabinet_id);
  const unplaced = { row: null, col: null, zone: "", depth: 0 };
  // No rack chosen: the bottles go in unassigned, where nothing can clash.
  if (!cabinet) return Array.from({ length: count }, () => ({ ...unplaced }));

  const out: { row: number | null; col: number | null; zone: string; depth: number }[] = [];
  const placed: Wine[] = [];
  const known = () => [...wines, ...placed];
  const fill = (c: Container) => {
    while (out.length < count) {
      const usage = containerUsage(c, cabinet, known());
      if (usage.full) break;
      out.push({ row: c.row, col: c.col, zone: c.zone, depth: usage.nextDepth });
      // Feed each placement back in so the next bottle sees the slot as taken.
      placed.push({
        cabinet_id: c.cabinetId,
        zone: c.zone,
        row: c.row,
        col: c.col,
        depth: usage.nextDepth,
      } as Wine);
    }
  };

  if (target.zone) {
    const c: Container = {
      cabinetId: cabinet.id,
      kind: target.zone === "bottom" ? "bottom" : "zone",
      zone: target.zone,
      row: null,
      col: null,
    };
    const sr = storageRowFor(cabinet, target.zone);
    // An unlimited container would never stop filling; cap it at the request.
    if (c.kind === "zone" && !sr) return out;

    // A slot-addressable zone (shelf/quinconce) has a fixed physical
    // position per depth — the caller picking a specific empty dot must
    // land there, not wherever "first free in the zone" happens to be
    // (which is what fill() below always does, and is exactly right for a
    // bulk/box pile, where there's no such thing as "the dot you clicked").
    if (sr && (sr.type === "shelf" || sr.type === "stepped") && target.depth != null) {
      const capacity = zoneCapacity(sr);
      const taken = new Set(winesInContainer(c, known()).map((w) => w.depth || 0));
      if (target.depth < capacity && !taken.has(target.depth)) {
        out.push({ row: null, col: null, zone: c.zone, depth: target.depth });
        placed.push({ cabinet_id: c.cabinetId, zone: c.zone, row: null, col: null, depth: target.depth } as Wine);
      }
    }

    fill(c);
    return out;
  }

  // Grid: fill the chosen slot's depths first, then carry on through the
  // rack's remaining slots in reading order — a six-pack should not stop at
  // the first slot just because it only holds one bottle.
  const slots = getRackSlots(cabinet);
  const startIdx = Math.max(
    0,
    slots.findIndex((x) => x.row === target.row && x.col === target.col)
  );
  const ordered = [...slots.slice(startIdx), ...slots.slice(0, startIdx)];
  for (const slot of ordered) {
    fill({ cabinetId: cabinet.id, kind: "slot", zone: "", row: slot.row, col: slot.col });
    if (out.length >= count) break;
  }
  return out;
}

// Free space at a chosen destination; Infinity when there is no limit.
export function freeAt(
  target: { cabinet_id?: string; zone?: string },
  cabinets: Cabinet[],
  wines: Wine[]
): number {
  const cabinet = cabinets.find((c) => c.id === target.cabinet_id);
  if (!cabinet) return Infinity;
  if (target.zone) {
    const c: Container = {
      cabinetId: cabinet.id,
      kind: target.zone === "bottom" ? "bottom" : "zone",
      zone: target.zone,
      row: null,
      col: null,
    };
    if (c.kind === "zone" && !storageRowFor(cabinet, target.zone)) return 0;
    return containerUsage(c, cabinet, wines).free;
  }
  // No zone: everything still free across the cabinet's grid slots.
  const total = getRackSlots(cabinet).length * (cabinet.depth || 1);
  const used = wines.filter(
    (w) => w.cabinet_id === cabinet.id && w.row !== null && w.col !== null
  ).length;
  return Math.max(0, total - used);
}
