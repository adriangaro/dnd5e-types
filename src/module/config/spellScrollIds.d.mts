/**
 * Spell scroll item IDs/UUIDs per spell level (label map). `CONFIG.DND5E.spellScrollIds`.
 *
 * Keyed by spell level (0–9); values are an item ID within `DND5E.sourcePacks` or a full UUID.
 */

declare global {
  namespace dnd5e.types {
    namespace SpellScrollId {
      /** One entry per spell level. */
      interface DefaultTypes {
        0: true;
        1: true;
        2: true;
        3: true;
        4: true;
        5: true;
        6: true;
        7: true;
        8: true;
        9: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      spellScrollIds: { [K in dnd5e.types.SpellScrollId.TypeKey]: string };
    }
  }
}

export {};
