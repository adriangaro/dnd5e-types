/**
 * Basic armor types (Seam A, UUID-map). `CONFIG.DND5E.armorIds`.
 *
 * Values are compendium item UUIDs for the default armor entries. Enables
 * specific armor proficiencies, NPC AC calculation, and starting equipment.
 */

declare global {
  namespace dnd5e.types {
    namespace ArmorId {
      /** The basic armor types. */
      interface DefaultTypes {
        breastplate: true;
        chainmail: true;
        chainshirt: true;
        halfplate: true;
        hide: true;
        leather: true;
        padded: true;
        plate: true;
        ringmail: true;
        scalemail: true;
        splint: true;
        studded: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      /** Compendium item UUIDs keyed by armor id. */
      armorIds: { [K in dnd5e.types.ArmorId.TypeKey]: string };
    }
  }
}

export {};
