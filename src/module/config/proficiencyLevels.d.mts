/**
 * Skill, ability, and tool proficiency levels (Seam A, label map). Each key is the
 * proficiency multiplier. `CONFIG.DND5E.proficiencyLevels`.
 */

declare global {
  namespace dnd5e.types {
    namespace ProficiencyLevel {
      /** Proficiency multipliers: 0 (none), 0.5 (half), 1 (proficient), 2 (expertise). */
      interface DefaultTypes {
        0: true;
        0.5: true;
        1: true;
        2: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      proficiencyLevels: { [K in dnd5e.types.ProficiencyLevel.TypeKey]: string };
    }
  }
}

export {};
