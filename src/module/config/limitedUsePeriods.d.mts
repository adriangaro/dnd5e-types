/**
 * Limited use recovery period config domain (Seam A). `CONFIG.DND5E.limitedUsePeriods`.
 */

declare global {
  namespace dnd5e.types {
    namespace LimitedUsePeriod {
      /** Core limited-use recovery periods. */
      interface DefaultTypes {
        lr: true;
        sr: true;
        day: true;
        dawn: true;
        dusk: true;
        initiative: true;
        round: true;
        turnStart: true;
        turnEnd: true;
        turn: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.limitedUsePeriods[key]` entry. */
      interface Config {
        /** Localized label. */
        label: string;
        /** Shorthand form of the label. */
        abbreviation: string;
        /** Whether this limited use period restores charges via formula. */
        formula?: boolean;
        /** Grouping if outside the normal "time" group. */
        type?: "combat" | "special";
        /** Whether this period is deprecated (excluded from recovery options). */
        deprecated?: boolean;
      }
    }

    interface DND5EConfig {
      limitedUsePeriods: {
        [K in dnd5e.types.LimitedUsePeriod.TypeKey]: dnd5e.types.LimitedUsePeriod.Config;
      } & {
        /** Derived list of recovery options (value/label/group + the `recharge` option). */
        readonly recoveryOptions: Array<{ value: dnd5e.types.LimitedUsePeriod.TypeKey | "recharge"; label: string; group?: string }>;
      };
    }
  }
}

export {};
