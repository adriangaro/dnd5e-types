/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/data/actor/templates/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.data.actor.templates {
      interface AttributesCommonData {
      ac: ArmorClassData; // Armor class configuration.
      init: dnd5e.types.data.shared.RollConfigData & {
        ability: dnd5e.types.Ability.TypeKey | ""; // The ability used for initiative rolls.
        bonus: string; // The bonus provided to initiative rolls.
      };
      movement: dnd5e.types.data.shared.MovementData;
      }

      interface AttributesCreatureData {
      attunement: {
        max: number; // Maximum number of attuned items.
      };
      senses: dnd5e.types.data.shared.SensesData;
      spellcasting: dnd5e.types.Ability.TypeKey | ""; // Primary spellcasting ability.
      exhaustion: number; // Creature's exhaustion level.
      concentration: dnd5e.types.data.shared.RollConfigData & {
        ability: dnd5e.types.Ability.TypeKey | ""; // The ability used for concentration saving throws.
        bonuses: {
          save: string; // The bonus provided to concentration saving throws.
        };
        limit: number; // The amount of items this actor can concentrate on.
      };
      loyalty: {
        value: number; // The creature's loyalty score.
      };
      }

      interface ArmorClassData {
      armor: number; // AC value provided by equipped armor (not persisted).
      base: number; // Base AC value originating from the formula (not persisted).
      bonus: string; // Bonus AC provided by active effects (not persisted).
      calc: dnd5e.types.ArmorClass.TypeKey | "custom"; // Name of one of the built-in formulas being used or "custom" (not persisted).
      cover: number; // Bonus AC provided by the cover status effect (not persisted).
      flat: number; // Flat value usable by any armor class calculation.
      formula: string; // Extra formula added by legacy active effects (not persisted).
      formulas: dnd5e.types.data.actor.fields.ACFormulaData[]; // Available armor class formulas, the highest of which is used.
      min: string; // Minimum armor class value after all bonuses have been added (not persisted).
      override: number; // Unmodifiable armor class value that supersedes any entered formulas.
      selectedFormulas: Set<dnd5e.types.ArmorClass.TypeKey>; // Which of the base formulas defined by the system should be usable.
      shield: number; // AC value provided by equipped shield (not persisted).
      }

      interface HitPointsData {
      dt: number; // Damage threshold.
      max: number; // Maximum allowed HP value.
      temp: number; // Temporary HP applied on top of value.
      tempmax: number; // Temporary change to the maximum HP.
      value: number; // Current hit points.
      }

      interface CommonTemplateData {
      abilities: Record<dnd5e.types.Ability.TypeKey, AbilityData>; // Actor's abilities.
      }

      interface AbilityData {
      value: number; // Ability score.
      proficient: number; // Proficiency value for saves.
      max: number; // Maximum possible score for the ability.
      bonuses: { // Bonuses that modify ability checks and saves.
        check: string; // Numeric or dice bonus to ability checks.
        save: string; // Numeric or dice bonus to ability saving throws.
      };
      check: dnd5e.types.data.shared.RollConfigData; // Properties related to ability checks.
      save: dnd5e.types.data.shared.RollConfigData; // Properties related to saving throws.
      }

      interface CreatureTemplateData extends CommonTemplateData {
      bonuses: {
        mwak: AttackBonusesData; // Bonuses to melee weapon attacks.
        rwak: AttackBonusesData; // Bonuses to ranged weapon attacks.
        msak: AttackBonusesData; // Bonuses to melee spell attacks.
        rsak: AttackBonusesData; // Bonuses to ranged spell attacks.
        abilities: { // Bonuses to ability scores.
          check: string; // Numeric or dice bonus to ability checks.
          save: string; // Numeric or dice bonus to ability saves.
          skill: string; // Numeric or dice bonus to skill checks.
        };
        spell: { // Bonuses to spells.
          dc: string; // Numeric bonus to spellcasting DC.
        };
      };
      tools: Record<dnd5e.types.Tool.TypeKey, ToolData>; // Actor's tools.
      skills: Record<dnd5e.types.Skill.TypeKey, SkillData>; // Actor's skills.
      spells: Record<dnd5e.types.Actor.Creature.SpellLevelKey, SpellSlotData>; // Actor's spell slots (keyed by "spell1".."spell9", "pact", etc.).
      }

      interface AttackBonusesData {
      attack: string; // Numeric or dice bonus to attack rolls.
      damage: string; // Numeric or dice bonus to damage rolls.
      }

      interface SkillData extends dnd5e.types.data.shared.RollConfigData {
      value: number; // Proficiency level creature has in this skill.
      bonuses: { // Bonuses for this skill.
        check: string; // Numeric or dice bonus to skill's check.
        passive: string; // Numeric bonus to skill's passive check.
      };
      }

      interface ToolData extends dnd5e.types.data.shared.RollConfigData {
      value: number; // Proficiency level creature has in this tool.
      bonuses: { // Bonuses for this tool.
        check: string; // Numeric or dice bonus to tool's check.
      };
      }

      interface SpellSlotData {
      value: number; // Currently available spell slots.
      override: number; // Number to replace auto-calculated max slots.
      }

      interface DetailsCommonData {
      biography: { // Actor's biography data.
        value: string; // Full HTML biography information.
        public: string; // Biography that will be displayed to players with observer privileges.
      };
      }

      interface DetailsCreatureData {
      alignment: string; // Creature's alignment.
      ideal: string; // Creature's ideals.
      bond: string; // Creature's bonds.
      flaw: string; // Creature's flaws.
      race: globalThis.Item.Implementation|string; // Creature's race item or name.
      }

      interface GroupTemplateData {
      description: {
        full: string; // Description of this group.
        summary: string; // Summary description (currently unused).
      };
      }

      interface TraitsCommonData {
      size: dnd5e.types.ActorSize.TypeKey; // Actor's size.
      di: dnd5e.types.data.actor.fields.DamageTraitData; // Damage immunities.
      dr: dnd5e.types.data.actor.fields.DamageTraitData; // Damage resistances.
      dv: dnd5e.types.data.actor.fields.DamageTraitData; // Damage vulnerabilities.
      dm: DamageModificationData; // Damage modification.
      ci: dnd5e.types.data.actor.fields.SimpleTraitData; // Condition immunities.
      }

      interface TraitsCreatureData {
      languages: LanguageTraitData; // Languages known by this creature.
      }

      interface DamageModificationData {
      amount: Record<dnd5e.types.Damage.TypeKey, string>; // Damage boost or reduction by damage type.
      bypasses: Set<string>; // Keys for physical properties that cause modification to be bypassed.
      }

      interface LanguageTraitData extends dnd5e.types.data.actor.fields.SimpleTraitData {
      communication: Record<dnd5e.types.Language.CommunicationTypeKey, LanguageCommunicationData>; // Measured communication ranges (e.g. telepathy). `CommunicationData` in the JSDoc refers to `LanguageCommunicationData`.
      }

      interface LanguageCommunicationData {
      units: string; // Units used to measure range.
      value: number; // Range to which this ability can be used.
      }

  }
}

export {};
