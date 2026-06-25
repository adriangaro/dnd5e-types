/**
 * Special character flags config domain (Seam A). `CONFIG.DND5E.characterFlags`.
 *
 * Downstream modules add a flag in one line:
 *   declare global { namespace dnd5e.types.CharacterFlag { interface OverrideTypes { myFlag: true } } }
 */

declare global {
  namespace dnd5e.types {
    namespace CharacterFlag {
      /** Core character flags. */
      interface DefaultTypes {
        diamondSoul: true;
        enhancedDualWielding: true;
        elvenAccuracy: true;
        halflingLucky: true;
        halflingNimbleness: true;
        ignoreArmorSpeedReduction: true;
        initiativeAlert: true;
        jackOfAllTrades: true;
        observantFeat: true;
        tavernBrawlerFeat: true;
        powerfulBuild: true;
        reliableTalent: true;
        remarkableAthlete: true;
        toolExpertise: true;
        weaponCriticalThreshold: true;
        spellCriticalThreshold: true;
        meleeCriticalDamageDice: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.characterFlags[key]` entry. */
      interface Config {
        /** Localized name. */
        name: string;
        /** Localized hint. */
        hint: string;
        /** Localized section heading the flag is grouped under. */
        section: string;
        /** Data type of the flag value. */
        type: typeof Boolean | typeof String | typeof Number;
        /** Placeholder text/value for the flag's input. */
        placeholder?: string | number;
        /** Abilities this flag is relevant to. */
        abilities?: dnd5e.types.Ability.TypeKey[];
        /** Skills this flag is relevant to. */
        skills?: dnd5e.types.Skill.TypeKey[];
        /** Choices for a select-style flag. */
        choices?: Record<string, string>;
        /** Hide the flag unless it already has a value. */
        deprecated?: boolean;
      }
    }

    interface DND5EConfig {
      characterFlags: { [K in dnd5e.types.CharacterFlag.TypeKey]: dnd5e.types.CharacterFlag.Config };
    }
  }
}

export {};
