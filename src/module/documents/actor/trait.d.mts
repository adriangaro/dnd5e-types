/**
 * A utility module of exported functions (no class) used to read, format, and build choices for the
 * configurable traits defined in `CONFIG.DND5E.traits` (skills, tools, languages, damage
 * immunities/resistances, etc.).
 *
 * EXPANDABILITY: downstream packages tighten the loose pieces here by merging the same-name
 * `namespace Trait` (e.g. a real `TraitChoice` shape) and by augmenting the global
 * `dnd5e.types` kernel that supplies trait key/config types. Dependencies that aren't ported yet
 * (the `CONFIG.DND5E.traits` config shape, compendium index entries) are kept
 * intentionally loose (`object` / `Record<string, unknown>` / `unknown`) and narrowed as they land.
 */

import SelectChoices from "./select-choices.mjs";

/**
 * Get the schema fields for this trait on the actor.
 * @param actor  Actor for which to get the fields.
 * @param trait  Trait as defined in `CONFIG.DND5E.traits`.
 */
export declare function actorFields(
  actor: Actor.Implementation,
  trait: string,
): Record<string, foundry.data.fields.DataField.Any> | undefined;

/**
 * Get the key path to the specified trait on an actor.
 * @param trait  Trait as defined in `CONFIG.DND5E.traits`.
 * @returns      Key path to this trait's object within an actor's system data.
 */
export declare function actorKeyPath(trait: string): string;

/**
 * Get the current trait values for the provided actor.
 * @param actor  Actor from which to retrieve the values.
 * @param trait  Trait as defined in `CONFIG.DND5E.traits`.
 * @returns      Object mapping (potentially prefixed) trait keys to their numeric value.
 */
export declare function actorValues(
  actor: Actor.Implementation,
  trait: string,
): Promise<Record<string, number>>;

/**
 * Calculate the change key path for a provided trait key.
 * @param key      Key for a trait to set.
 * @param trait    Trait as defined in `CONFIG.DND5E.traits`, only needed if key isn't prefixed.
 */
export declare function changeKeyPath(key: string, trait?: string): string | undefined;

/**
 * Build up a trait structure containing all of the children gathered from config & base items.
 * @param trait  Trait as defined in `CONFIG.DND5E.traits`.
 * @returns      Object with trait categories and children.
 */
export declare function categories(trait: string): Promise<Record<string, object>>;

/**
 * Get a list of choices for a specific trait.
 * @param trait  Trait as defined in `CONFIG.DND5E.traits`.
 * @returns      Object mapping proficiency ids to choice objects (a `SelectChoices` instance).
 */
export declare function choices(
  trait: string,
  options?: {
    /** Optional list of keys to be marked as chosen. */
    chosen?: Set<string> | string[];
    /** Should keys be prefixed with trait type? */
    prefixed?: boolean;
    /** Should the "Any" option be added to each category? */
    any?: boolean;
  },
): Promise<SelectChoices>;

/**
 * Prepare an object with all possible choices from a set of keys. These choices will be grouped by
 * trait type if more than one type is present.
 * @param keys  Prefixed trait keys.
 */
export declare function mixedChoices(keys: Set<string>): Promise<SelectChoices>;

/**
 * Fetch an item for the provided ID. If the provided ID contains a compendium pack name it will be
 * fetched from that pack, otherwise it will be fetched from the compendium defined in
 * `DND5E.sourcePacks.ITEMS`.
 * @param identifier  Simple ID or compendium name and ID separated by a dot.
 * @returns           A promise for a `Document` when `indexOnly` is false & `fullItem` is true,
 *                    otherwise a simple object containing the minimal index data.
 */
export declare function getBaseItem(
  identifier: string,
  options?: {
    /** If true, only the index data will be fetched (will never return a Promise). */
    indexOnly?: boolean;
    /** If true, the full item will be returned as long as `indexOnly` is false. */
    fullItem?: boolean;
  },
): Promise<Item.Implementation | undefined> | Record<string, unknown> | undefined;

/**
 * Construct a proper UUID for the provided base item ID.
 * @param identifier  Simple ID, compendium name and ID separated by a dot, or proper UUID.
 */
export declare function getBaseItemUUID(identifier: string): string;

/**
 * List of fields on items that should be indexed for retrieving subtypes.
 * @returns  Index list to pass to `Compendium#getIndex`.
 * @protected
 */
export declare function traitIndexFields(): string[];

/**
 * Get the localized label for a specific trait type.
 * @param trait  Trait as defined in `CONFIG.DND5E.traits`.
 * @param count  Count used to determine pluralization. Defaults to the 'other' pluralization.
 */
export declare function traitLabel(trait: string, count?: number): string;

/**
 * Retrieve the representative icon for a specific trait.
 * @param key  Key for which to generate the icon.
 */
export declare function keyIcon(
  key: string,
  config?: {
    /** Trait as defined in `CONFIG.DND5E.traits` if not using a prefixed key. */
    trait?: string;
  },
): string | null;

/**
 * Retrieve the proper display label for the provided key. Will return a promise unless a categories
 * object is provided in config.
 * @param key  Key for which to generate the label.
 *
 * @example
 * // Returns "Tool Proficiency"
 * keyLabel("tool");
 *
 * @example
 * // Returns "Artisan's Tools"
 * keyLabel("tool:art");
 *
 * @example
 * // Returns "any Artisan's Tools"
 * keyLabel("tool:art:*");
 *
 * @example
 * // Returns "any 2 Artisan's Tools"
 * keyLabel("tool:art:*", { count: 2 });
 *
 * @example
 * // Returns "2 other Artisan's Tools"
 * keyLabel("tool:art:*", { count: 2, final: true });
 *
 * @example
 * // Returns "Gaming Sets"
 * keyLabel("tool:game");
 *
 * @example
 * // Returns "Land Vehicle"
 * keyLabel("tool:vehicle:land");
 *
 * @example
 * // Returns "Shortsword"
 * keyLabel("weapon:shortsword");
 * keyLabel("weapon:simple:shortsword");
 * keyLabel("shortsword", { trait: "weapon" });
 */
export declare function keyLabel(
  key: string,
  config?: {
    /** Number to display, only if a wildcard is used as final part of key. */
    count?: number;
    /** Trait as defined in `CONFIG.DND5E.traits` if not using a prefixed key. */
    trait?: string;
    /** Is this the final in a list? */
    final?: boolean;
  },
): string;

/**
 * Create a human readable description of the provided choice.
 * @param choice  Data for a specific choice.
 *
 * @example
 * // Returns "any three skill proficiencies"
 * choiceLabel({ count: 3, pool: new Set(["skills:*"]) });
 *
 * @example
 * // Returns "three other skill proficiencies"
 * choiceLabel({ count: 3, pool: new Set(["skills:*"]) }, { final: true });
 *
 * @example
 * // Returns "any skill proficiency"
 * choiceLabel({ count: 1, pool: new Set(["skills:*"]) }, { only: true });
 *
 * @example
 * // Returns "Thieves Tools or any skill"
 * choiceLabel({ count: 1, pool: new Set(["tool:thief", "skills:*"]) }, { only: true });
 *
 * @example
 * // Returns "Thieves' Tools or any artisan tool"
 * choiceLabel({ count: 1, pool: new Set(["tool:thief", "tool:art:*"]) }, { only: true });
 *
 * @example
 * // Returns "2 from Thieves' Tools or any skill proficiency"
 * choiceLabel({ count: 2, pool: new Set(["tool:thief", "skills:*"]) });
 */
export declare function choiceLabel(
  choice: Trait.TraitChoice,
  options?: {
    /** Is this choice on its own, or part of a larger list? */
    only?: boolean;
    /** If part of a list of other grants or choices, is it in the final position? */
    final?: boolean;
  },
): string;

/**
 * Create a human readable description of trait grants & choices.
 *
 * @example
 * // Returns "Acrobatics and Athletics"
 * localizedList({ grants: new Set(["skills:acr", "skills:ath"]) });
 *
 * @example
 * // Returns "Acrobatics and one other skill proficiency"
 * localizedList({ grants: new Set(["skills:acr"]), choices: [{ count: 1, pool: new Set(["skills:*"])}] });
 *
 * @example
 * // Returns "Choose any skill proficiency"
 * localizedList({ choices: [{ count: 1, pool: new Set(["skills:*"])}] });
 */
export declare function localizedList(config: {
  /** Guaranteed trait grants. */
  grants?: Set<string>;
  /** Trait choices. */
  choices?: Trait.TraitChoice[];
}): string;

declare namespace Trait {
  /** A single trait choice: pick `count` from `pool`. Loose pending the trait config port. */
  interface TraitChoice {
    count: number;
    pool: Set<string>;
  }
}

export default Trait;
