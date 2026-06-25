/**
 * Roll configuration types — the `dnd5e.types.Dice` family (promoted + hardened from the JSDoc in
 * `module/dice/_types.mjs`). These are the "roll options" threaded through every roll method
 * (`rollAttack`/`rollSkill`/`rollDamage`/roll-requests/…).
 *
 * EXPANDABILITY MODEL (deliberately ceremony-free):
 *   - Every level is an OPEN `interface`, and the hierarchy is plain `interface Child extends Parent`.
 *   - Consumers widen ANY level in one line; it propagates DOWN the `extends` graph automatically:
 *       declare global { namespace dnd5e.types.Dice {
 *         interface D20RollOptions { advantageSource?: string }
 *       } }
 *     → now on `D20RollOptions`, `AttackRollProcessConfiguration["rolls"][n]["options"]`, every
 *       d20-derived config, AND every dice-class method that takes one — no generics, no `MakeX`.
 *   - Widen `BasicRollOptions` and it reaches ALL rolls (d20 + damage); widen `D20RollProcessConfiguration`
 *     and it reaches the d20 family but not damage. The propagation graph IS the `extends` graph.
 *   - Compatible overrides (subtype-narrowing, e.g. `rolls: D20RollConfiguration[]`) are just redeclared
 *     in the child — `interface extends` allows them. INCOMPATIBLE overrides (child type not assignable to
 *     the parent's) are the only case needing {@link dnd5e.types.Override}; the roll family needs none.
 *
 * Locked by tests/dice-roll-config.test-d.ts (propagation + augmentation).
 */

declare global {
  namespace dnd5e.types.Dice {
    /* ----------------------------- basic roll ------------------------------ */

    /** Configuration data for the process of creating one or more basic rolls. */
    interface BasicRollProcessConfiguration {
      /** Configuration data for individual rolls. */
      rolls: BasicRollConfiguration[];
      /** Should the rolls be evaluated? If `false`, no chat message is created. @default true */
      evaluate?: boolean;
      /** Event that triggered the rolls. */
      event?: Event;
      /** Name suffixes for configuration hooks called. */
      hookNames?: string[];
      /** Document that initiated this roll. */
      subject?: foundry.abstract.Document.Any;
      /** Default target value for all rolls. */
      target?: number;
    }

    /** Configuration data for an individual roll. */
    interface BasicRollConfiguration {
      /** Parts used to construct the roll formula. @default [] */
      parts?: string[];
      /** Data used to resolve placeholders in the formula. @default {} */
      data?: object;
      /** Whether the situational bonus can be added to this roll in the prompt. @default true */
      situational?: boolean;
      /** Additional options passed through to the created roll. */
      options?: BasicRollOptions;
    }

    /** Options allowed on a basic roll. */
    interface BasicRollOptions {
      /** The total roll result that must be met for the roll to be considered a success. */
      target?: number;
    }

    /* ------------------------------- d20 roll ------------------------------ */

    /** Configuration data for the process of rolling d20 rolls. */
    interface D20RollProcessConfiguration extends BasicRollProcessConfiguration {
      /** Apply advantage to each roll. */
      advantage?: boolean;
      /** Apply disadvantage to each roll. */
      disadvantage?: boolean;
      /** Use three dice when rolling with advantage. */
      elvenAccuracy?: boolean;
      /** Add a re-roll once modifier to the d20 die. */
      halflingLucky?: boolean;
      /** Set the minimum for the d20 roll to 10. */
      reliableTalent?: boolean;
      /** Configuration data for individual rolls (compatible narrowing of the base). */
      rolls: D20RollConfiguration[];
    }

    /** D20 roll configuration data. */
    interface D20RollConfiguration extends BasicRollConfiguration {
      /** Parts used to construct the roll formula, not including the d20 die. */
      parts: string[];
      /** Options passed through to the roll. */
      options: D20RollOptions;
    }

    /** Options that describe a d20 roll. */
    interface D20RollOptions extends BasicRollOptions {
      /** Does this roll potentially have advantage? */
      advantage?: boolean;
      /** Does this roll potentially have disadvantage? */
      disadvantage?: boolean;
      /** Final advantage mode. */
      advantageMode?: dnd5e.types.AdvantageMode;
      /** The value of the d20 die to be considered a critical success. */
      criticalSuccess?: number;
      /** The value of the d20 die to be considered a critical failure. */
      criticalFailure?: number;
      /** Use three dice when rolling with advantage. */
      elvenAccuracy?: boolean;
      /** Add a re-roll once modifier to the d20 die. */
      halflingLucky?: boolean;
      /** Maximum number the d20 die can roll. */
      maximum?: number;
      /** Minimum number the d20 die can roll. */
      minimum?: number;
    }

    /** D20 process config carrying an ability id. */
    interface AbilityRollProcessConfiguration extends D20RollProcessConfiguration {
      /** ID of the ability to roll, from `CONFIG.DND5E.abilities`. */
      ability?: dnd5e.types.Ability.TypeKey;
    }

    /** Mode used for making an attack and rolling its damage. */
    type WeaponAttackMode = "oneHanded" | "twoHanded" | "offhand" | "thrown" | "thrown-offhand";

    /** D20 process config for an attack roll. */
    interface AttackRollProcessConfiguration extends D20RollProcessConfiguration {
      /** Specific ammunition to consume, or `false` to prevent any ammo usage. */
      ammunition?: globalThis.Item.Implementation | boolean;
      /** Mode to use for making the attack and rolling damage. */
      attackMode?: WeaponAttackMode;
      /** Weapon mastery option to use. */
      mastery?: dnd5e.types.WeaponMastery.TypeKey;
    }

    /** Options for an initiative roll. */
    interface InitiativeRollOptions extends D20RollOptions {
      /** A specific advantage mode to apply. */
      advantageMode?: dnd5e.types.AdvantageMode;
      /** Fixed initiative value to use rather than rolling. */
      fixed?: number;
      /** Special flavor text to apply to the created message. */
      flavor?: string;
    }

    /** D20 process config for a skill or tool check. */
    interface SkillToolRollProcessConfiguration extends D20RollProcessConfiguration {
      /** The ability to be rolled with the skill. */
      ability?: dnd5e.types.Ability.TypeKey;
      /** Additional bonus term added to the check. */
      bonus?: string;
      /** Tool item used for rolling. */
      item?: globalThis.Item.Implementation;
      /** The skill to roll. */
      skill?: dnd5e.types.Skill.TypeKey;
      /** The tool to roll. */
      tool?: dnd5e.types.Tool.TypeKey;
      /** Whether a travel pace is being applied to the roll. */
      pace?: dnd5e.types.data.actor.fields.TravelPace5e;
    }

    /* ----------------------------- damage roll ----------------------------- */

    /** Configuration data for the process of rolling a damage roll. */
    interface DamageRollProcessConfiguration extends BasicRollProcessConfiguration {
      /** Configuration data for individual rolls. */
      rolls: DamageRollConfiguration[];
      /** Critical configuration for all rolls. */
      critical?: CriticalDamageConfiguration;
      /** Treat each roll as a critical unless otherwise specified. */
      isCritical?: boolean;
      /** Scale increase above base damage. @default 0 */
      scaling?: number;
    }

    /** Damage roll configuration data. */
    interface DamageRollConfiguration extends BasicRollConfiguration {
      /** Options passed through to the roll. */
      options?: DamageRollOptions;
    }

    /** Options that describe a damage roll. */
    interface DamageRollOptions extends BasicRollOptions {
      /** Should critical damage be calculated for this roll? */
      isCritical?: boolean;
      /** Critical configuration for this roll. */
      critical?: CriticalDamageConfiguration;
      /** Physical properties of the source (e.g. magical, silvered). */
      properties?: string[];
      /** Type of damage represented. */
      type?: dnd5e.types.Damage.TypeKey;
      /** Damage types selectable in the configuration app; the first is used if no type is set. */
      types?: dnd5e.types.Damage.TypeKey[];
    }

    /** Critical effects configuration data. */
    interface CriticalDamageConfiguration {
      /** Should critical damage be allowed? @default true */
      allow?: boolean;
      /** Amount by which to multiply critical damage. @default 2 */
      multiplier?: number;
      /** Additional dice added to first term when calculating critical damage. @default 0 */
      bonusDice?: number;
      /** Additional, unmodified, damage formula added when calculating a critical. */
      bonusDamage?: string;
      /** Should dice result be multiplied rather than number of dice rolled increased? */
      multiplyDice?: boolean;
      /** Should numeric terms be multiplied along side dice during criticals? */
      multiplyNumeric?: boolean;
      /** Maximize result of extra dice added by critical, rather than rolling. */
      powerfulCritical?: string;
    }

    /* --------------------------- other processes --------------------------- */

    /** Configuration data for the process of rolling hit dice. */
    interface HitDieRollProcessConfiguration extends BasicRollProcessConfiguration {
      /** Denomination of hit die to roll with the leading letter (e.g. `d8`); first available if unset. */
      denomination?: string;
      /** Should the actor's spent hit dice count be updated? @default true */
      modifyHitDice?: boolean;
      /** Should the actor's hit points be updated after the roll? @default true */
      modifyHitPoints?: boolean;
    }

    /** Configuration data for the process of rolling a recharge. */
    interface RechargeRollProcessConfiguration extends BasicRollProcessConfiguration {
      /** Apply the uses updates back to the item or activity. @default true */
      apply?: boolean;
    }

    /* ------------------------------ dialogs -------------------------------- */

    /** Configuration data for the roll prompt. */
    interface BasicRollDialogConfiguration {
      /** Display a configuration dialog for the rolling process. @default true */
      configure?: boolean;
      /** Alternate configuration application to use. */
      applicationClass?: fvttUtils.AnyConstructor;
      /** Additional options passed to the dialog. */
      options?: BasicRollConfigurationDialogOptions;
      /** Sheet to render the dialog as a child of. */
      sheet?: foundry.applications.api.ApplicationV2.Any;
    }

    /** Dialog options for a roll configuration dialog. */
    interface BasicRollConfigurationDialogOptions {
      /** Roll type to use when constructing the final roll. */
      rollType: typeof import("./basic-roll.mjs").default;
      /** Default selections. */
      default?: {
        /** Default roll mode to have selected. */
        rollMode?: number;
      };
      /** Callback to handle additional build configuration. */
      buildConfig?: RollBuildConfigCallback;
      /** Render options. */
      rendering?: dnd5e.types.applications.dice.BasicRollConfigurationDialogRenderOptions;
    }

    /** Callback to handle additional build configuration. */
    type RollBuildConfigCallback = (
      process: BasicRollProcessConfiguration,
      config: BasicRollConfiguration,
      formData: foundry.applications.ux.FormDataExtended | undefined,
      index: number,
    ) => void;

    /** Dialog configuration for an attack roll. */
    interface AttackRollDialogConfiguration extends BasicRollDialogConfiguration {
      /** Configuration options. */
      options?: AttackRollConfigurationDialogOptions;
    }

    /** Dialog options for an attack roll. */
    interface AttackRollConfigurationDialogOptions extends BasicRollConfigurationDialogOptions {
      /** Ammunition that can be used with the attack. */
      ammunitionOptions: foundry.applications.fields.FormSelectOption[];
      /** Different modes of attack. */
      attackModeOptions: foundry.applications.fields.FormSelectOption[];
      /** Available masteries for the attacking weapon. */
      masteryOptions: foundry.applications.fields.FormSelectOption[];
    }

    /** Dialog configuration for a skill/tool roll. */
    interface SkillToolRollDialogConfiguration extends BasicRollDialogConfiguration {
      /** Configuration options. */
      options?: SkillToolRollConfigurationDialogOptions;
    }

    /** Dialog options for a skill/tool roll. */
    interface SkillToolRollConfigurationDialogOptions extends BasicRollConfigurationDialogOptions {
      /** Should the ability be selectable? */
      chooseAbility: boolean;
    }

    /* ------------------------------ messages ------------------------------- */

    /** Configuration data for creating a roll message. */
    interface BasicRollMessageConfiguration {
      /** Create a message when the rolling is complete. @default true */
      create?: boolean;
      /** Final created chat message document once the process is completed. */
      document?: globalThis.ChatMessage.Implementation;
      /** The roll mode to apply to this message, from `CONFIG.ChatMessage.modes`. */
      rollMode?: string;
      /** Additional data used when creating the message. @default {} */
      data?: object;
    }
  }
}

export {};
