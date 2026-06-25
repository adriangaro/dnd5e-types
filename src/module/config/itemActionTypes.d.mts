/**
 * Item action type classification config domain (Seam A, label-map). `CONFIG.DND5E.itemActionTypes`.
 */

declare global {
  namespace dnd5e.types {
    namespace ItemActionType {
      /** Core item action types (attack/save/heal/util/…). */
      interface DefaultTypes {
        mwak: true;
        rwak: true;
        msak: true;
        rsak: true;
        abil: true;
        save: true;
        ench: true;
        summ: true;
        heal: true;
        util: true;
        other: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      itemActionTypes: { [K in dnd5e.types.ItemActionType.TypeKey]: string };
    }
  }
}

export {};
