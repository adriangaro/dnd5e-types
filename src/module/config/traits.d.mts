/**
 * Configurable actor traits config domain (Seam A). `CONFIG.DND5E.traits`.
 *
 * Each entry (saves, skills, languages, armor, weapon, tool, di/dr/dv/dm, ci, …) describes
 * how a trait maps onto the actor and which `CONFIG.DND5E` enum supplies its options.
 */

declare global {
  namespace dnd5e.types {
    namespace Trait {
      /** Default configurable traits. */
      interface DefaultTypes {
        saves: true;
        skills: true;
        languages: true;
        armor: true;
        weapon: true;
        tool: true;
        di: true;
        dr: true;
        dv: true;
        dm: true;
        ci: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Localization labels for a trait. */
      interface Labels {
        /** Localization key for the trait name. */
        title: string;
        /** Prefix for a localization key used to generate plural variants. */
        localization: string;
        /** Localization to use for the "all" option for this trait. If not provided, then no all option will be available. */
        all?: string;
      }

      /** Configuration for traits that take some sort of base item. */
      interface Subtypes {
        /**
         * Path to subtype value on base items, should match a category key.
         * @deprecated Deprecated in favor of the standardized `system.type.value`.
         */
        keyPath?: string;
        /** Key for base item ID objects within `CONFIG.DND5E`. */
        ids?: string[];
      }

      /** Shape of each `CONFIG.DND5E.traits[key]` entry. */
      interface Config {
        labels: Labels;
        /** Path to the icon used to represent this trait. */
        icon: string;
        /** Where this trait's data is stored on the actor, if not `traits.[key]`. */
        actorKeyPath?: string;
        /** Where the options can be found within `CONFIG.DND5E`, if not the trait name. */
        configKey?: string;
        /** Type of data represented. */
        dataType?: boolean | number;
        /** If config is an enum of objects, where the label can be found. */
        labelKeyPath?: string;
        /** Configuration for traits that take some sort of base item. */
        subtypes?: Subtypes;
        /** Mapping of category key to an object defining its children. */
        children?: Record<string, string>;
        /** Whether top-level categories should be sorted. */
        sortCategories?: boolean;
        /** Can an actor receive expertise in this trait? */
        expertise?: boolean;
        /** Can an actor receive mastery in this trait? */
        mastery?: boolean;
      }
    }

    interface DND5EConfig {
      traits: { [K in dnd5e.types.Trait.TypeKey]: dnd5e.types.Trait.Config };
    }
  }
}

export {};
