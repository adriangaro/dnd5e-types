declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      /**
       * ASCII Artwork
       */
      ASCII: string
      /**
       * Classification types for item action types.
       */
      itemActionTypes: {
        mwak: string,
        rwak: string,
        msak: string,
        rsak: string,
        abil: string,
        save: string,
        ench: string,
        summ: string,
        heal: string,
        util: string,
        other: string
      }
      /**
       * Different ways in which item capacity can be limited.
       */
      itemCapacityTypes: {
        items: string,
        weight: string
      }

      /**
       * Configuration data for crafting costs.
       */
      crafting: DND5EConfig.CraftingConfiguration

      /**
       * Standard dice spread available for things like damage.
       */
      dieSteps: number[]

      /**
       * Display aggregated damage in chat cards.
       */
      aggregateDamageDisplay: boolean
      /**
       * Default units used for imperial & metric settings.
       */
      defaultUnits: {
        length: DND5EConfig.DefaultUnit,
        volume: DND5EConfig.DefaultUnit,
        weight: DND5EConfig.DefaultUnit
      }
      /**
       * Configure aspects of encumbrance calculation so that it could be configured by modules.
       */
      encumbrance: DND5EConfig.EncumbranceConfiguration

      /**
       * Denominations of hit dice which can apply to classes.
       */
      hitDieTypes: string[]
      /**
       * Types of rests.
       */
      restTypes: {
        short: DND5EConfig.RestConfiguration
        long: DND5EConfig.RestConfiguration
      }
      /**
       * Compendium packs used for localized items.
       */
      sourcePacks: Record<'BACKGROUNDS' | 'CLASSES' | 'ITEMS' | 'RACES', string> & Record<string, string>

      /**
       * Settings to configure how actors are merged when polymorphing is applied.
       * @deprecated { since: "DnD5e 4.4", until: "DnD5e 5.2", once: true }
       */
      polymorphSettings: Record<string, string>

      /**
       * Settings to configure how actors are effects are merged when polymorphing is applied.
       * @deprecated { since: "DnD5e 4.4", until: "DnD5e 5.2", once: true }
       */
      polymorphEffectSettings: Record<string, string>

      /**
       * Settings to configure how actors are merged when preset polymorphing is applied.
       * @deprecated { since: "DnD5e 4.4", until: "DnD5e 5.2", once: true }
       */
      transformationPresets: object

      /**
       * The amount of cover provided by an object. In cases where multiple pieces
       * of cover are in play, we take the highest value.
       */
      cover: Record<0 | 0.5 | 0.75 | 1, string>

      /**
       * A selection of actor attributes that can be tracked on token resource bars.
       * @deprecated since v10
       */
      trackableAttributes: string[]

      /**
       * A selection of actor and item attributes that are valid targets for item resource consumption.
       */
      consumableResources: string[]
      /**
       * Maximum allowed character level.
       */
      maxLevel: number

      /**
       * Maximum ability score value allowed by default.
       */
      maxAbilityScore: number

      /**
       * XP required to achieve each character level.
       */
      CHARACTER_EXP_LEVELS: number[]
      /**
       * XP granted for each challenge rating.
       */
      CR_EXP_LEVELS: number[]
      /**
       * Intervals above the maximum XP that result in an epic boon.
       */
      epicBoonInterval: number

      /**
       * Types of rules that can be used in rule pages and the &Reference enricher
       */
      ruleTypes: Record<
        'rule' | 'ability' | 'areaOfEffect' | 'condition' | 'creatureType' | 'damage' | 'skill' | 'spellComponent' | 'spellSchool' | 'spellTag' | 'weaponMastery',
        DND5EConfig.RuleTypeConfiguration
      >
      /**
       * List of rules that can be referenced from enrichers.
       */
      rules: Record<string, string>

      tokenRings: DND5EConfig.TokenRingsConfiguration
      /**
       * List of books available as sources.
       */
      sourceBooks: Record<string, string>

      /**
       * Themes that can be set for the system or on sheets.
       */
      themes: Record<string, string>

      readonly enrichmentLookup: {
        abilities: DND5EConfig['abilities'] & {
          [k: string]: dnd5e.types.Ability.AbilityTypeConfig<keyof DND5EConfig['abilities']> & {
            key: keyof DND5EConfig['abilities']
          }
        }
        skills: DND5EConfig['skills'] & {
          [k: string]: dnd5e.types.Skill.SkillTypeConfig & {
            key: keyof DND5EConfig['skills']
          }
        }
        spellSchools: DND5EConfig['spellSchools'] & {
          [k: string]: dnd5e.types.Spellcasting.School.SpellSchoolConfig & {
            key: keyof DND5EConfig['spellSchools']
          }
        }
        tools: DND5EConfig['tools']
      }
    }

    namespace DND5EConfig {
      interface DefaultUnit {
        imperial: string
        metric: string
      }
      interface UnitConfiguration {
        label: string;
        abbreviation: string;
        conversion: number;
        counted?: string;
        formattingUnit?: string;
        type: "imperial" | "metric";
      }

      interface CraftingConfiguration {
        consumable: CraftingCostsMultiplier;
        exceptions: Record<string, CraftingCosts>;
        magic: Record<string, CraftingCosts>;
        mundane: CraftingCostsMultiplier;
        scrolls: Record<number, CraftingCosts>;
      }

      interface CraftingCostsMultiplier {
        days: number;
        gold: number;
      }

      interface CraftingCosts {
        days: number;
        gold: number;
      }
      /**
       * Encumbrance configuration data.
       */
      interface EncumbranceConfiguration {
        currencyPerWeight: Record<string, number>;
        effects: Record<string, {
          name: string
          img: string
        }>;
        threshold: {
          encumbered: Record<string, number>;
          heavilyEncumbered: Record<string, number>;
          maximum: Record<string, number>;
        };
        speedReduction: Record<string, { ft: number; m: number; }>;
        baseUnits: Record<string, Record<string, string>>;
      }
      /**
       * Configuration data for rest types.
       */
      interface RestConfiguration {
        duration: Record<string, number>;
        label: string;
        activationPeriods?: dnd5e.types.ActivityActivation.TypeKey[];
        recoverHitDice?: boolean;
        recoverHitPoints?: boolean;
        recoverPeriods?: dnd5e.types.RecoveryPeriod.TypeKey[];
        recoverSpellSlotTypes?: Set<dnd5e.types.Spellcasting.TypeKey>;
      }

      /* -------------------------------------------- */
      /**
       * Configuration data for system status effects.
       */
      interface StatusEffectConfig5e extends CONFIG.StatusEffect {
        /**
         * Order status to the start of the token HUD, rather than alphabetically.
         */
        order?: number;
        /**
         * UUID of a journal entry with details on this condition.
         */
        reference?: string;
        /**
         * Set this condition as a special status effect under this name.
         */
        special?: string;
        /**
         *  Additional conditions, by id, to apply as part of this condition.
         */
        riders?: string[];
        /**
         * Any status effects with the same group will not be able to be applied at the
         * same time through the token HUD (multiple statuses applied through other
         * effects can still coexist).
         */
        exclusiveGroup?: string;
        /**
         * A bonus this condition provides to AC and dexterity saving throws.
         */
        coverBonus?: number;
      }
      /**
       * Configuration information for rule types.
       */
      interface RuleTypeConfiguration {
        /**
         * Localized label for the rule type.
         */
        label: string;
        /**
         * Key path for a configuration object that contains reference data.
         */
        references?: string;
      }

      /**
       * Token Rings configuration data
       */
      interface TokenRingsConfiguration {
        /**
         * Localized names of the configurable ring effects.
         */
        effects: Record<string, string>;
        /**
         * The sprite sheet json source.
         */
        spriteSheet: string;
        /**
         * The shader class definition associated with the token ring.
         */
        shaderClass: typeof BaseSamplerShader | null;
      }

    }
  }
}


// Namespace Configuration Values
declare const DND5E: dnd5e.types.DND5EConfig;

/* -------------------------------------------- */

/**
 * Patch an existing config enum to allow conversion from string values to object values without
 * breaking existing modules that are expecting strings.
 * @param key          Key within DND5E that has been replaced with an enum of objects.
 * @param fallbackKey  Key within the new config object from which to get the fallback value.
 * @param options    Additional options passed through to logCompatibilityWarning.
 */
declare function patchConfig(key: string, fallbackKey: string, options?: object) 

/* -------------------------------------------- */

export default DND5E;
