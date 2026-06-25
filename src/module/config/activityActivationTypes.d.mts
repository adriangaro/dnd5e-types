/**
 * Activity activation-type config domain (Seam A). `CONFIG.DND5E.activityActivationTypes`.
 */

declare global {
  namespace dnd5e.types {
    namespace ActivityActivationType {
      interface DefaultTypes {
        action: true;
        bonus: true;
        reaction: true;
        minute: true;
        hour: true;
        day: true;
        longRest: true;
        shortRest: true;
        encounter: true;
        turnStart: true;
        turnEnd: true;
        legendary: true;
        mythic: true;
        lair: true;
        crew: true;
        special: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Auto-consumption configuration for an activation type. */
      interface AutoConsumptionConfig {
        /** A predicate to check if this usage qualifies for auto-consumption. */
        canConsume?: (activity: dnd5e.types.Activity.Instance) => boolean | void;
        /** The path to the property that is consumed. */
        property: string;
      }

      /** Shape of each `CONFIG.DND5E.activityActivationTypes[key]` entry. */
      interface Config {
        /** Localized label for the countable activation type. */
        counted?: string;
        /** Localized label for the activation type. */
        label: string;
        /** Localized label for the activation type header. */
        header?: string;
        /** Localized label for the presentational group. */
        group?: string;
        /** @defaultValue `false` Classify this item as a passive feature on NPC sheets. */
        passive?: boolean;
        /** @defaultValue `false` Does this activation type have a numeric value attached? */
        scalar?: boolean;
        /** Configuration for automatically consuming this resource. */
        consume?: AutoConsumptionConfig;
      }
    }

    interface DND5EConfig {
      activityActivationTypes: {
        [K in dnd5e.types.ActivityActivationType.TypeKey]: dnd5e.types.ActivityActivationType.Config;
      };
    }
  }
}

export {};
