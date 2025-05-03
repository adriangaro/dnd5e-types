import CompendiumBrowser from "./applications/compendium-browser.mjs";

interface RegisteredItemData {
  name: string;
  identifier: string;
  img: string;
  sources: string[];
}

interface SpellData {
  page: string;
}

interface UnlinkedSpellConfiguration {
  source?: { uuid: string };
  [key: string]: any;
}

/* -------------------------------------------- */
/*  Enchantments                                */
/* -------------------------------------------- */

declare class EnchantmentRegisty {
  /**
   * Registration of enchanted items mapped to a specific enchantment source. The map is keyed by the UUID of
   * enchant activities while the set contains UUID of applied enchantment active effects.
   */
  static #appliedEnchantments: Map<string, Set<string>>;

  /* -------------------------------------------- */

  /**
   * Fetch the tracked enchanted items.
   * @param uuid  UUID of an activity or item.
   */
  static applied(uuid: string): ActiveEffect.OfType<'enchantment'>[];

  /* -------------------------------------------- */

  /**
   * Add a new enchantment effect to the list of tracked enchantments. Will not track enchanted items in compendiums.
   * @param source     UUID of the active effect origin for the enchantment.
   * @param enchanted  UUID of the enchantment to track.
   */
  static track(source: string, enchanted: string): void;

  /* -------------------------------------------- */

  /**
   * Stop tracking an enchantment.
   * @param source     UUID of the active effect origin for the enchantment.
   * @param enchanted  UUID of the enchantment to stop tracking.
   */
  static untrack(source: string, enchanted: string): void;
}

/* -------------------------------------------- */
/*  Item Registry                               */
/* -------------------------------------------- */

declare class ItemRegistry {
  constructor(itemsType: string);

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Items grouped by identifiers.
   */
  #items: Map<string, RegisteredItemData>;

  /* -------------------------------------------- */

  /**
   * Type of item represented by this registry.
   */
  #itemType: string;

  /* -------------------------------------------- */

  /**
   * Has initial loading been completed?
   */
  #status: number;

  /**
   * Possible preparation states for the item registry.
   */
  static #STATUS_STATES: {
    NONE: 0;
    LOADING: 1;
    READY: 2;
  };

  /* -------------------------------------------- */

  /**
   * Choices object.
   */
  get choices(): Record<string, string>;

  /* -------------------------------------------- */

  /**
   * All items formatted for a select input.
   */
  get options(): dnd5e.types.FormSelectOption[];

  /* -------------------------------------------- */
  /*  Methods                                     */
  /* -------------------------------------------- */

  /**
   * Get information on a single item based on its identifier.
   * @param identifier
   */
  get(identifier: string): RegisteredItemData | void;

  /* -------------------------------------------- */

  /**
   * Scan compendium packs to register matching items of this type.
   */
  initialize(): Promise<void>;
}

/* -------------------------------------------- */
/*  Message Rolls                               */
/* -------------------------------------------- */

declare class MessageRegistry {
  /**
   * Registration of roll chat messages that originated at a specific message. The map is keyed by the ID of
   * the originating message and contains sets of IDs for each roll type.
   */
  static #messages: Map<string, Map<string, Set<string>>>;

  /* -------------------------------------------- */

  /**
   * Fetch roll messages for an origin message, in chronological order.
   * @param origin  ID of the origin message.
   * @param [type]  Type of roll messages to fetch.
   */
  static get(origin: string, type?: string): ChatMessage.Implementation[];

  /* -------------------------------------------- */

  /**
   * Add a new roll message to the registry.
   * @param message  Message to add to the registry.
   */
  static track(message: ChatMessage.Implementation): void;

  /* -------------------------------------------- */

  /**
   * Remove a roll message to the registry.
   * @param message  Message to remove from the registry.
   */
  static untrack(message: ChatMessage.Implementation): void;
}

/* -------------------------------------------- */
/*  Spell Lists                                 */
/* -------------------------------------------- */

declare class SpellListRegistry {
  /**
   * Spell lists organized by the UUID of a spell they contain.
   */
  static #bySpell: Map<string, Set<SpellList>>;

  /* -------------------------------------------- */

  /**
   * Registration of spell lists grouped by type and identifier.
   */
  static #byType: Map<string, Map<string, SpellList>>;

  /* -------------------------------------------- */

  /**
   * UUIDs of spell lists in the process of being loaded.
   */
  static #loading: Set<string>;

  /* -------------------------------------------- */

  /**
   * Options for each registered spell list, grouped by type.
   */
  static get options(): dnd5e.types.FormSelectOption[];

  /* -------------------------------------------- */

  /**
   * Have spell lists finished loading?
   */
  static get ready(): boolean;

  /* -------------------------------------------- */
  /*  Methods                                     */
  /* -------------------------------------------- */

  /**
   * Retrieve a list of spell lists a spell belongs to.
   * @param uuid  UUID of a spell item.
   */
  static forSpell(uuid: string): Set<SpellList>;

  /* -------------------------------------------- */

  /**
   * Retrieve a specific spell list from the registry.
   * @param type        Type of list as defined in `CONFIG.DND5E.spellListTypes`.
   * @param identifier  Identifier of the specific spell list.
   */
  static forType(type: string, identifier: string): SpellList | null;

  /* -------------------------------------------- */

  /**
   * Register a spell list journal entry page.
   * @param uuid  UUID of a spell list journal entry page.
   */
  static register(uuid: string): Promise<void>;
}

/**
 * Type that represents a unified spell list for a specific class, subclass, species, or something else.
 */
export declare class SpellList {
  constructor(metadata: { identifier: string, name: string, type: string });

  /* -------------------------------------------- */

  /**
   * Mapping of spell list types to item registries.
   */
  static #REGISTRIES: {
    class: "classes";
  };

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Indexes for the available spells sorted by name.
   */
  get indexes(): object[];

  /* -------------------------------------------- */

  /**
   * Information on the spell list.
   */
  #metadata: { identifier: string, name: string, type: string };

  get metadata(): { identifier: string, name: string, type: string };

  /* -------------------------------------------- */

  /**
   * Display name for the spell list.
   */
  get name(): string;

  /* -------------------------------------------- */

  /**
   * Spells represented by this spell list.
   */
  #spells: Map<string, SpellData>;

  /* -------------------------------------------- */

  /**
   * Unlinked spell definitions.
   */
  #unlinked: UnlinkedSpellConfiguration[];

  /* -------------------------------------------- */

  /**
   * UUIDs of all of the spells in this list.
   */
  get uuids(): Set<string>;

  /* -------------------------------------------- */
  /*  Methods                                     */
  /* -------------------------------------------- */

  /**
   * Add a spell list page to this unified spell list.
   * @param page  Spells page to contribute.
   */
  contribute(page: JournalEntryPage): Set<string>;

  /* -------------------------------------------- */

  /**
   * All of the spells represented by this list.
   */
  getSpells(): Promise<Item.OfType<'spell'>[]>;
}

/* -------------------------------------------- */
/*  Summons                                     */
/* -------------------------------------------- */

declare class SummonRegistry {
  /**
   * Registration of summoned creatures mapped to a specific summoner. The map is keyed by the UUID of
   * summoner while the set contains UUID of actors that have been summoned.
   */
  static #creatures: Map<string, Set<string>>;

  /* -------------------------------------------- */

  /**
   * Fetch creatures summoned by an actor.
   * @param actor  Actor for which to find the summoned creatures.
   */
  static creatures(actor: Actor.Implementation): Actor.Implementation[];

  /* -------------------------------------------- */

  /**
   * Add a new summoned creature to the list of summoned creatures.
   * @param summoner  UUID of the actor who performed the summoning.
   * @param summoned  UUID of the summoned creature to track.
   */
  static track(summoner: string, summoned: string): void;

  /* -------------------------------------------- */

  /**
   * Stop tracking a summoned creature.
   * @param summoner  UUID of the actor who performed the summoning.
   * @param summoned  UUID of the summoned creature to stop tracking.
   */
  static untrack(summoner: string, summoned: string): void;
}

/* -------------------------------------------- */
/*  Ready API                                   */
/* -------------------------------------------- */

/**
 * Track the ready status of various registries.
 */
declare const RegistryStatus: Map<string, boolean> & {
  /**
   * Promise that resolves when the registry is ready.
   */
  readonly ready: Promise<void>;
};

/* -------------------------------------------- */

interface Registry {
  classes: typeof ItemRegistry;
  enchantments: typeof EnchantmentRegisty;
  messages: typeof MessageRegistry;
  ready: Promise<void>;
  spellLists: typeof SpellListRegistry;
  summons: typeof SummonRegistry;
}

declare const registry: Registry;

export default registry;
