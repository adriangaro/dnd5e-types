/**
 * Shield reference config domain (Seam A). `CONFIG.DND5E.shieldIds`.
 *
 * Maps shield keys to compendium UUIDs for the basic shield item(s).
 */

declare global {
  namespace dnd5e.types {
    namespace ShieldId {
      /** The basic shield in 5e. */
      interface DefaultTypes {
        shield: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      shieldIds: { [K in dnd5e.types.ShieldId.TypeKey]: string };
    }
  }
}

export {};
