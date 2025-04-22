// --- Imports ---
// Assuming SelectChoices types from the previous exercise are available
// You might need to adjust the import path
import SelectChoices from "./select-choices.mjs"; // Adjust path as needed


/**
* Get the schema fields for this trait on the actor.
* @param actor Actor for which to get the fields.
* @param trait Trait as defined in `CONFIG.DND5E.traits`.
* @returns The schema fields object for the trait, or undefined if not found.
*/
export declare function actorFields<T extends string>(actor: Actor.Implementation, trait: T): dnd5e.types.GetTypeFromPath<Actor.Implementation, `${T}.fields`> | undefined;
export declare function actorFields(actor: Actor.Implementation, trait: string): foundry.data.fields.SchemaField<foundry.data.fields.DataSchema>['fields'] | undefined;

/**
* Get the key path to the specified trait on an actor.
* @param trait Trait as defined in `CONFIG.DND5E.traits`.
* @returns Key path to this trait's object within an actor's system data.
*/
export declare function actorKeyPath<T extends dnd5e.types.Trait.TraitKey>(trait: dnd5e.types.Trait.TraitKey): `system.traits.${T}`;

/**
* Get the current trait values for the provided actor.
* @param actor Actor from which to retrieve the values.
* @param trait Trait as defined in `CONFIG.DND5E.traits`.
* @returns Promise resolving to an object mapping chosen trait keys (potentially prefixed) to their values (1 or 2).
*/
export declare function actorValues(actor: Actor.Implementation, trait: dnd5e.types.Trait.TraitKey): Promise<Record<string, number>>;

/**
* Calculate the change key path for updating a specific trait value on an actor document.
* @param key Key for a trait to set (e.g., "skills:acr" or "acr").
* @param trait Trait as defined in `CONFIG.DND5E.traits`, only needed if key isn't prefixed.
* @returns The specific key path for the update operation (e.g., "system.skills.acr.value"), or undefined.
*/
export declare function changeKeyPath<
  Trait extends dnd5e.types.Trait.TraitKey = dnd5e.types.Trait.TraitKey,
  KeyPath extends string = ReturnType<typeof actorKeyPath<Trait>>
>(key: string, trait?: Trait): (Trait extends 'saves' ? 
    `${KeyPath}.${string}.proficient` : 
    Trait extends 'skills' | 'tool' ? 
      `${KeyPath}.${string}.value` :
      `${KeyPath}.value`
) | undefined;

/**
* Build up a trait structure containing all of the children gathered from config & base items.
* @param trait Trait as defined in `CONFIG.DND5E.traits`.
* @returns Promise resolving to an object structured like the input for SelectChoices,
* mapping category/item keys to objects with labels and potential children.
*/
export declare function categories(trait: string): Promise<Record<string, SelectChoices.SelectChoicesEntry>>;

/**
* Get a list of choices for a specific trait, formatted as a SelectChoices object.
* @param trait Trait as defined in `CONFIG.DND5E.traits`.
* @param options Options for building the choices.
* @param options.chosen Optional list/set of keys to be marked as chosen.
* @param options.prefixed Should keys be prefixed with trait type? (Default: false)
* @param options.any Should the "Any" option be added to each category? (Default: false)
* @returns Promise resolving to a SelectChoices object mapping proficiency ids to choice objects.
* The exact structure `T` is dynamic, so `any` is used as the generic parameter.
*/
export declare function choices(
  trait: string,
  options?: {
      chosen?: Set<string> | string[];
      prefixed?: boolean;
      any?: boolean;
  }
): Promise<SelectChoices.Instance<any>>; // The specific type T is determined dynamically

/**
* Prepare an object with all possible choices from a set of keys. These choices will be grouped by
* trait type if more than one type is present.
* @param keys Set of prefixed trait keys (e.g., "skills:acr", "tool:art:*").
* @returns Promise resolving to a SelectChoices object containing the specified choices,
* potentially grouped under trait labels if multiple traits are involved.
*/
export declare function mixedChoices(keys: Set<string>): Promise<SelectChoices.Instance<any>>; // The specific type T is determined dynamically

/**
* Fetch an item for the provided ID from the appropriate compendium.
* Handles caching of index data.
* @param identifier Simple ID, compendium name and ID separated by a dot, or full UUID.
* @param options Fetching options.
* @param options.indexOnly If true, only index data is returned (synchronous if cached).
* @param options.fullItem If true (and indexOnly is false), the full Item document is returned (always async).
* @returns Depending on options:
* - Full Item document (`Promise<Item5e | undefined>`).
* - Extended index data (`Promise<object | undefined>` or `object | undefined` if cached).
* - Basic index data (`object | undefined`, synchronous).
*/
export declare function getBaseItem(
  identifier: string,
  options?: { indexOnly?: boolean; fullItem?: boolean }
): Promise<Item.Implementation> | {
  _id: string;
  uuid: string
} | undefined; // Union of possible return types

/**
* Construct a proper Compendium UUID for the provided base item identifier.
* @param identifier Simple ID, compendium name and ID separated by a dot, or proper UUID.
* @returns The constructed UUID string (e.g., "Compendium.dnd5e.items.Item.123abc").
*/
export declare function getBaseItemUUID<T extends `Compendium.${string}`>(identifier: T): T;
export declare function getBaseItemUUID(identifier: string): `Compendium.${string}.Item.${string}`;

/**
* List of fields on items that should be indexed for retrieving subtypes efficiently.
* Used internally by getBaseItem when building extended indices.
* @returns Array of index field key paths (e.g., ["system.type.value", "system.armor.type"]).
* @protected
*/
export declare function traitIndexFields(): string[];

/**
* Get the localized label for a specific trait type (e.g., "Skill Proficiencies").
* @param trait Trait as defined in `CONFIG.DND5E.traits`.
* @param count Count used to determine pluralization. Defaults to 'other' pluralization if undefined.
* @returns Localized label string.
*/
export declare function traitLabel(trait: string, count?: number): string;

/**
* Retrieve the proper display label for the provided trait key (e.g., "tool:art:*" -> "any Artisan's Tools").
* Handles categories, specific items, wildcards, and potential counts.
* @param key Key for which to generate the label (e.g., "skills:acr", "tool:art:*").
* @param config Configuration options.
* @param config.count Number to display, only if a wildcard is used as final part of key.
* @param config.trait Trait type if not using a prefixed key.
* @param config.final Is this the final item in a list (used for "X other Type" formatting)?
* @returns Retrieved label string.
*/
export declare function keyLabel(
  key: string,
  config?: {
      count?: number;
      trait?: string;
      final?: boolean;
  }
): string;

/**
* Create a human readable description of the provided trait choice (count + pool of keys).
* @param choice Data for a specific choice.
* @param options Formatting options.
* @param options.only Is this choice on its own, or part of a larger list?
* @param options.final If part of a list, is it in the final position?
* @returns Formatted string describing the choice (e.g., "any three skill proficiencies", "Thieves Tools or any skill").
*/
export declare function choiceLabel(
  choice: dnd5e.types.Trait.TraitChoice,
  options?: {
      only?: boolean;
      final?: boolean;
  }
): string;

/**
* Create a human readable description listing trait grants and choices together.
* @param config Object containing grants and choices.
* @param config.grants Set of guaranteed trait grants (keys).
* @param config.choices Array of trait choices (TraitChoice objects).
* @returns Formatted string listing grants and choices (e.g., "Acrobatics and Athletics", "Acrobatics and one other skill proficiency").
*/
export declare function localizedList(config: {
  grants?: Set<string>;
  choices?: dnd5e.types.Trait.TraitChoice[];
}): string;

declare namespace Trait {
  interface DefaultTraitTypes extends Record<string, dnd5e.types.DND5EConfigKey | null> {
    armor: "armorProficiencies",
    ci: 'conditionTypes',
    da: "damageTypes",
    dm: "damageTypes",
    dr: "damageTypes",
    dv: "damageTypes",
    languages: null,
    saves: 'abilities',
    skills: 'skills',
    tool: "toolProficiencies",
    weapon: "weaponProficiencies"
  }
}

declare global {
  namespace dnd5e.types {
    namespace Trait {


      export interface TraitChoice {
        count: number;
        pool: Set<string>;
      }
      
      // Define a minimal structure for the trait configuration within CONFIG.DND5E.traits
      export interface TraitConfig {
        actorKeyPath?: string;
        configKey?: keyof DND5EConfig;
        children?: Record<string, string>; // Maps category key to a CONFIG key (e.g., "art": "armorProficiencies")
        subtypes?: {
            ids: string[]; // List of CONFIG keys containing base item IDs (e.g., ["weaponIds"])
            keyPath: string; // Path within item system data (e.g., "armor.type")
        };
        labels?: {
            localization: string; // Base localization path (e.g., "DND5E.TraitArmorProficiency")
            title: string;
        };
        icon?: string;
        labelKeyPath?: string; // Default "label"
        dataType?: fvttUtils.AnyConcreteConstructor;
        sortCategories?: boolean;
        expertise?: boolean;
        mastery?: boolean;
      }

      export interface TraitConfigTypeMap {
        [k: string]: TraitConfig
      }

      export type TraitKey = keyof fvttUtils.RemoveIndexSignatures<TraitConfigTypeMap> & string;
    }

    interface DND5EConfig {
      traits: dnd5e.types.Trait.TraitConfigTypeMap;
    }
  }
}