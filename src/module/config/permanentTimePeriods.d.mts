/**
 * Time periods for spells that don't have a defined ending (Seam A, label map).
 * `CONFIG.DND5E.permanentTimePeriods`.
 */

declare global {
  namespace dnd5e.types {
    namespace PermanentTimePeriod {
      /** Permanent / dispellable time periods. */
      interface DefaultTypes {
        disp: true;
        dstr: true;
        perm: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      permanentTimePeriods: { [K in dnd5e.types.PermanentTimePeriod.TypeKey]: string };
    }
  }
}

export {};
