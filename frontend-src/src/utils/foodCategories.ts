import { normalizeText } from "./search";

// Groups the AI's free-form, highly specific food-pairing suggestions
// ("daube de bœuf", "bœuf bourguignon", "carbonnade flamande"...) into a
// small set of generic categories for the "Pairs with" filter, so the
// dropdown doesn't balloon into dozens of near-synonyms and near-duplicates
// (plural/singular, "grillé"/"grillée"/"grillés" agreement, etc). The wine
// detail view still shows the AI's original text unchanged — categorization
// only affects this filter facet.
//
// Each category is a stable id (translated for display via the
// "foodCategory" group in i18n/{lang}.json) plus match keywords in every
// language pairings arrive in: French for AI-written pairings, English for
// Vivino's food names ("Beef", "Lamb", "Game (deer, venison)", "Mature and
// hard cheese"…). Keywords are accent-free and lowercase, matching
// normalizeText().
//
// Checked in order, most specific (named protein/ingredient) before generic
// cooking-style buckets (grilled, stews), so a dish that names its protein
// lands under that protein rather than the generic bucket.
interface FoodCategory {
  id: string;
  keywords: string[];
}

export const OTHER_FOOD_CATEGORY = "other";

const FOOD_CATEGORIES: FoodCategory[] = [
  {
    id: "aperitif",
    keywords: ["aperitif", "tapas", "gougere", "amuse-bouche", "amuse bouche", "appetizer", "snack", "finger food"],
  },
  {
    id: "charcuterie",
    keywords: ["charcuterie", "rillette", "saucisson", "jambon", "pate", "terrine", "salami", "chorizo", "cured meat", "ham", "prosciutto"],
  },
  {
    id: "cheese",
    keywords: ["fromage", "roquefort", "comte", "chevre", "brie", "camembert", "munster", "reblochon", "morbier", "parmesan", "cheese"],
  },
  {
    id: "seafood",
    keywords: ["fruits de mer", "huitre", "crevette", "homard", "crustace", "coquille", "moule", "langouste", "crabe", "sushi", "sashimi", "shellfish", "seafood", "oyster", "shrimp", "prawn", "lobster", "crab", "mussel", "scallop"],
  },
  {
    id: "fish",
    keywords: ["poisson", "saumon", "cabillaud", "sole", "brochet", "truite", "papillote", "thon", "dorade", "morue", "bar", "fish", "salmon", "tuna", "cod", "trout", "halibut"],
  },
  {
    id: "duck",
    keywords: ["canard", "magret", "foie gras", "duck"],
  },
  {
    id: "poultry",
    keywords: ["volaille", "poulet", "poularde", "dinde", "pintade", "chapon", "poultry", "chicken", "turkey"],
  },
  {
    id: "lamb",
    keywords: ["agneau", "gigot", "lamb"],
  },
  {
    id: "game",
    keywords: ["gibier", "cerf", "chevreuil", "sanglier", "biche", "faisan", "perdrix", "lievre", "game", "venison", "deer", "boar", "pheasant", "rabbit"],
  },
  {
    id: "beef",
    keywords: ["boeuf", "entrecote", "steak", "tournedos", "viande rouge", "viandes rouges", "cote de boeuf", "beef", "red meat"],
  },
  {
    id: "pork",
    keywords: ["porc", "veau", "pork", "veal"],
  },
  {
    id: "stew",
    keywords: ["daube", "bourguignon", "carbonnade", "civet", "cassoulet", "mijote", "en sauce", "ragout", "pot-au-feu", "blanquette", "estouffade", "stew", "braise"],
  },
  {
    id: "grill",
    keywords: ["grillade", "grille", "barbecue", "brochette", "grilled", "bbq"],
  },
  {
    id: "spicy",
    keywords: ["curry", "epice", "asiatique", "wok", "tex-mex", "mexicain", "indien", "thai", "szechuan", "spicy", "asian", "mexican", "indian"],
  },
  {
    id: "mediterranean",
    keywords: ["~mediterran", "~provenc", "ratatouille", "tajine", "pasta", "pizza"],
  },
  {
    id: "salad",
    keywords: ["salade", "salad"],
  },
  {
    id: "vegetarian",
    keywords: ["risotto", "legume", "~vegetarien", "asperge", "champignon", "quiche", "~vegetarian", "vegetable", "vegan", "mushroom", "asparagus"],
  },
  {
    id: "dessert",
    keywords: ["dessert", "chocolat", "tarte", "patisserie", "gateau", "glace", "sorbet", "fruit", "chocolate", "cake", "pastry", "fruity"],
  },
];

// Every id categorizeFoodPairing() can return, so a saved filter value
// from an older build (which stored the French label itself) can be
// recognised as stale and reset.
export const FOOD_CATEGORY_IDS: string[] = [...FOOD_CATEGORIES.map((c) => c.id), OTHER_FOOD_CATEGORY];

// Two matching modes per keyword:
// - default: word-boundary match allowing an optional French "e"/"s"/"es"
//   suffix (singular/plural + masc/fem agreement) without an open wildcard,
//   so short stems don't swallow unrelated words ("bar" must not match
//   "barbecue", "chevre" must not match "chevreuil", "brochet" must not
//   match "brochette").
// - "~"-prefixed: open wildcard suffix, reserved for longer stems with
//   irregular agreement (méditerranéen/-enne/-ens/-ennes) that are long
//   enough to carry no collision risk.
// - multi-word phrases (contain a space or hyphen): plain substring match,
//   already specific enough on their own.
function matchesKeyword(haystack: string, keyword: string): boolean {
  if (keyword.includes(" ") || keyword.includes("-")) {
    return haystack.includes(keyword);
  }
  if (keyword.startsWith("~")) {
    return new RegExp(`\\b${keyword.slice(1)}\\w*\\b`).test(haystack);
  }
  return new RegExp(`\\b${keyword}(?:e?s?)\\b`).test(haystack);
}

// Maps one split pairing ("daube de bœuf", "Beef") to its generic category
// id ("stew", "beef"). Falls back to a shared "other"
// bucket when nothing matches, rather than showing the raw specific text —
// keeping the filter list short is the whole point of this function.
export function categorizeFoodPairing(pairing: string): string {
  const haystack = normalizeText(pairing);
  if (!haystack) return OTHER_FOOD_CATEGORY;
  for (const category of FOOD_CATEGORIES) {
    if (category.keywords.some((kw) => matchesKeyword(haystack, kw))) {
      return category.id;
    }
  }
  return OTHER_FOOD_CATEGORY;
}
