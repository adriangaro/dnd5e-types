/**
 * Spell school config domain (Seam A). `CONFIG.DND5E.spellSchools`.
 */

declare global {
  namespace dnd5e.types {
    namespace SpellSchool {
      /** Schools to which a spell can belong. */
      interface DefaultTypes {
        abj: true;
        con: true;
        div: true;
        enc: true;
        evo: true;
        ill: true;
        nec: true;
        trs: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.spellSchools[key]` entry. */
      interface Config {
        /** Localized label. */
        label: string;
        /** Spell school icon. */
        icon: string;
        /** Fully written key used as alternate for enrichers. */
        fullKey: string;
        /** UUID of a rule reference describing this school. */
        reference?: string;
      }
    }

    interface DND5EConfig {
      spellSchools: { [K in dnd5e.types.SpellSchool.TypeKey]: dnd5e.types.SpellSchool.Config };
    }
  }
}

export {};
