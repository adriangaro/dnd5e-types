/**
 * Skill config domain (Seam A). `CONFIG.DND5E.skills`.
 *
 * Downstream modules add a skill in one line:
 *   declare global { namespace dnd5e.types.Skill { interface OverrideTypes { lor: true } } }
 */

declare global {
  namespace dnd5e.types {
    namespace Skill {
      /** The 18 core skills. */
      interface DefaultTypes {
        acr: true;
        ani: true;
        arc: true;
        ath: true;
        dec: true;
        his: true;
        ins: true;
        itm: true;
        inv: true;
        med: true;
        nat: true;
        prc: true;
        prf: true;
        per: true;
        rel: true;
        slt: true;
        ste: true;
        sur: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.skills[key]` entry. */
      interface Config {
        /** Localized label. */
        label: string;
        /** Default ability used for this skill's checks. */
        ability: dnd5e.types.Ability.TypeKey;
        /** Fully written key used as alternate for enrichers. */
        fullKey: string;
        /** UUID of a rule reference. */
        reference?: string;
        /** FontAwesome icon class. */
        icon?: string;
        /** Configuration for skills affected by travel pace. */
        pace?: {
          /** Grant advantage on this skill when traveling at the given paces. */
          advantage?: Set<dnd5e.types.TravelPace.TypeKey>;
          /** Grant disadvantage on this skill when traveling at the given paces. */
          disadvantage?: Set<dnd5e.types.TravelPace.TypeKey>;
        };
      }
    }

    interface DND5EConfig {
      skills: { [K in dnd5e.types.Skill.TypeKey]: dnd5e.types.Skill.Config };
    }
  }
}

export {};
