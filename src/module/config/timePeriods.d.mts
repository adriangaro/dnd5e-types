/**
 * Time period config domain (Seam A; label-map). `CONFIG.DND5E.timePeriods`.
 *
 * Runtime = `{ ...specialTimePeriods, ...permanentTimePeriods, ...scalarTimePeriods }`.
 * Scalar periods are a Proxy over `timeUnits` (option !== false). Keys are expandable;
 * values are i18n labels.
 */

declare global {
  namespace dnd5e.types {
    namespace TimePeriod {
      /**
       * Special (inst/spec) + permanent (disp/dstr/perm) + scalar time-unit keys
       * (turn/round/minute/hour/day/month/year — the units with `option !== false`).
       */
      interface DefaultTypes {
        inst: true;
        spec: true;
        disp: true;
        dstr: true;
        perm: true;
        turn: true;
        round: true;
        minute: true;
        hour: true;
        day: true;
        month: true;
        year: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      timePeriods: { [K in dnd5e.types.TimePeriod.TypeKey]: string };
    }
  }
}

export {};
