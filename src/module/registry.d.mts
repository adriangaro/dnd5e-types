/**
 * Registry helpers for dnd5e (`module/registry.mjs`) — tracks dependents, enchantments, item types,
 * roll messages, spell lists, and summons; exposes the `dnd5e.registry` default object.
 */

/* -------------------------------------------- */
/*  Dependents                                  */
/* -------------------------------------------- */

declare class DependentsRegistry {
  /**
   * Fetch dependent documents for an active effect.
   * @param effect - Active effect for which to get the dependent documents, or UUID for an effect in the world.
   */
  static get(effect: ActiveEffect.Implementation | string): foundry.abstract.Document.Any[];

  /**
   * Add a dependent document to the registry.
   * @param idOrUuid  - ID or UUID of active effect.
   * @param dependent - Document to track as a dependent.
   */
  static track(idOrUuid: string, dependent: foundry.abstract.Document.Any): void;

  /**
   * Remove a dependent document from the registry.
   * @param idOrUuid  - ID or UUID of active effect.
   * @param dependent - Dependent document to stop tracking.
   */
  static untrack(idOrUuid: string, dependent: foundry.abstract.Document.Any): void;
}

/* -------------------------------------------- */
/*  Enchantments                                */
/* -------------------------------------------- */

declare class EnchantmentRegisty {
  /** Fetch the tracked enchanted items. */
  static applied(uuid: string): ActiveEffect.Implementation[];

  /** Add a new enchantment effect to the list of tracked enchantments. Will not track enchanted items in compendiums. */
  static track(source: string, enchanted: string): void;

  /** Stop tracking an enchantment. */
  static untrack(source: string, enchanted: string): void;
}

/* -------------------------------------------- */
/*  Item Registry                               */
/* -------------------------------------------- */

declare class ItemRegistry {
  constructor(itemsType: string);

  /** Choices object. */
  get choices(): Record<string, string>;

  /** Label for this item type. */
  get label(): string;

  /** All items formatted for a select input. */
  get options(): foundry.applications.fields.FormSelectOption[];

  /** All items formatted for a select input with grouping. */
  get groupedOptions(): foundry.applications.fields.FormSelectOption[];

  /** Get information on a single item based on its identifier. */
  get(identifier: string): dnd5e.types.core.RegisteredItemData | void;

  /** Scan compendium packs to register matching items of this type. */
  initialize(): Promise<void>;
}

/* -------------------------------------------- */
/*  Message Rolls                               */
/* -------------------------------------------- */

declare class MessageRegistry {
  /** Fetch roll messages for an origin message, in chronological order. */
  static get(origin: string, type?: string): ChatMessage.Implementation[];

  /** Add a new roll message to the registry. */
  static track(message: ChatMessage.Implementation): void;

  /** Remove a roll message to the registry. */
  static untrack(message: ChatMessage.Implementation): void;
}

/* -------------------------------------------- */
/*  Spell Lists                                 */
/* -------------------------------------------- */

declare class SpellListRegistry {
  /** Options for each registered spell list, grouped by type. */
  static get options(): foundry.applications.fields.FormSelectOption[];

  /** Have spell lists finished loading? */
  static get ready(): boolean;

  /** Retrieve a list of spell lists a spell belongs to. */
  static forSpell(uuid: string): Set<SpellList>;

  /**
   * Retrieve a specific spell list from the registry.
   * Type can also be a combination of the type and identifier split by a colon (e.g. `class:bard`).
   */
  static forType(type: string, identifier?: string): SpellList | null;

  /** Register a spell list journal entry page. */
  static register(uuid: string): Promise<void>;
}

/**
 * Type that represents a unified spell list for a specific class, subclass, species, or something else.
 */
export declare class SpellList {
  constructor(metadata: { identifier: string; name: string; type: string });

  /** Identifiers for all the available & unlinked spells in this list. */
  get identifiers(): Set<string>;

  /** Indexes for the available spells sorted by name. */
  get indexes(): object[];

  /** Information on the spell list. */
  get metadata(): { identifier: string; name: string; type: string };

  /** Display name for the spell list. */
  get name(): string;

  /** UUIDs of all of the spells in this list. */
  get uuids(): Set<string>;

  /** Add a spell list page to this unified spell list. Returns newly added UUIDs. */
  contribute(page: JournalEntryPage.Implementation): Set<string>;

  /** Determine whether the provided spell is included in the list. */
  has(spell: globalThis.Item.Implementation | string): boolean;

  /** All of the spells represented by this list. */
  getSpells(): Promise<globalThis.Item.Implementation[]>;
}

/* -------------------------------------------- */
/*  Summons                                     */
/* -------------------------------------------- */

declare class SummonRegistry {
  /** Fetch creatures summoned by an actor. */
  static creatures(actor: globalThis.Actor.Implementation): (globalThis.Actor.Implementation | null)[];

  /** Add a new summoned creature to the list of summoned creatures. */
  static track(summoner: string, summoned: string): void;

  /** Stop tracking a summoned creature. */
  static untrack(summoner: string, summoned: string): void;
}

/* -------------------------------------------- */
/*  Ready API                                   */
/* -------------------------------------------- */

/** Track the ready status of various registries. */
declare class RegistryStatus extends Map<string, boolean> {
  /** Promise that resolves when all registries are ready. */
  get ready(): Promise<void>;

  /** @inheritDoc */
  set(key: string, value: boolean): this;
}

/* -------------------------------------------- */

/** Shape of the default `dnd5e.registry` object. */
interface Registry {
  backgrounds: ItemRegistry;
  classes: ItemRegistry;
  dependents: typeof DependentsRegistry;
  enchantments: typeof EnchantmentRegisty;
  messages: typeof MessageRegistry;
  ready: Promise<void>;
  species: ItemRegistry;
  spellLists: typeof SpellListRegistry;
  subclasses: ItemRegistry;
  summons: typeof SummonRegistry;
}

declare const _default: Registry;
export default _default;
