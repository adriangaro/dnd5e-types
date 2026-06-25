/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.core {
      /** Configuration data for abilities. */
      interface AbilityConfiguration {
      label: string; // Localized label.
      abbreviation: string; // Localized abbreviation.
      fullKey: string; // Fully written key used as alternate for enrichers.
      reference?: string; // Reference to a rule page describing this ability.
      type?: "physical"|"mental"; // Whether this is a "physical" or "mental" ability.
      defaults?: Record<string, number|string>; // Default values for this ability based on actor type. If a string is used, the system will attempt to fetch. the value of the specified ability.
      icon?: string; // An SVG icon that represents the ability.
      }

      interface ActivityActivationTypeConfiguration {
      counted?: string; // Localized label for the countable activation type.
      label: string; // Localized label for the activation type.
      header?: string; // Localized label for the activation type header.
      group?: string; // Localized label for the presentational group.
      passive?: boolean; // @default false — Classify this item as a passive feature on NPC sheets.
      scalar?: boolean; // @default false — Does this activation type have a numeric value attached?
      consume?: ActivityActivationAutoConsumptionConfiguration; // Configuration for automatically consuming this resource.
      }

      interface ActivityActivationAutoConsumptionConfiguration {
      /** A predicate to check if this usage qualifies for auto-consumption. Return explicit false to block auto-consumption. */
      canConsume?: (activity: dnd5e.types.Activity.Instance) => boolean | void;
      property: string; // The path to the property that is consumed.
      }

      interface ActivityConsumptionTargetConfiguration {
      label: string; // Localized label for the target type.
      /** Function used to consume according to this type. Bound to a `ConsumptionTargetData` instance. */
      consume: (
        this: dnd5e.types.fields.ConsumptionTargetData,
        config: dnd5e.types.documents.activity.ActivityUseConfiguration,
        updates: dnd5e.types.documents.activity.ActivityUsageUpdates
      ) => Promise<void> | void; // Throws ConsumptionError on failure.
      /** Function used to generate a hint of consumption amount. Bound to a `ConsumptionTargetData` instance. */
      consumptionLabels: (
        this: dnd5e.types.fields.ConsumptionTargetData,
        config: dnd5e.types.documents.activity.ActivityUseConfiguration,
        options?: { consumed?: boolean }
      ) => ConsumptionLabels;
      nonEmbeddedHint?: string; // Hint displayed in the target field when this type is configured on an non-embedded item.
      scalingModes?: {value: string, label: string}[]; // Additional scaling modes for this consumption type in addition to the default "amount" scaling.
      targetRequiresEmbedded?: boolean; // Use text input rather than select when not embedded.
      /** Function for creating an array of consumption targets. Bound to a `ConsumptionTargetData` instance. */
      validTargets?: (
        this: dnd5e.types.fields.ConsumptionTargetData
      ) => foundry.applications.fields.FormSelectOption[];
      }

      interface ConsumptionLabels {
      label: string; // Label displayed for the consumption checkbox.
      hint: string; // Hint text describing what should be consumed.
      notes?: { type: string, message: string }; // Additional notes relating to the consumption to be performed.
      warn?: boolean; // Display a warning icon indicating consumption will fail.
      }

      interface ActivityTypeConfiguration {
      documentClass: dnd5e.types.Activity.Types[dnd5e.types.Activity.TypeKey]; // The activity's document class.
      configurable?: boolean; // @default true — Whether the activity is editable via the UI.
      hidden?: boolean; // Should this activity type be hidden in the selection dialog?
      }

      /** Configuration data for actor sizes. */
      interface ActorSizeConfiguration {
      label: string; // Localized label.
      abbreviation: string; // Localized abbreviation.
      hitDie: number; // Default hit die denomination for NPCs of this size.
      token?: number; // @default 1 — Default token size.
      dynamicTokenScale?: number; // @default 1 — Token scale multiplier applied to dynamic token rings.
      capacityMultiplier?: number; // @default 1 — Multiplier used to calculate carrying capacities.
      numerical: number; // Numerical representation of size.
      }

      /** Configuration information for advancement types. */
      interface AdvancementTypeConfiguration {
      documentClass: dnd5e.types.Advancement.Types[dnd5e.types.Advancement.TypeKey]; // The advancement's document class.
      validItemTypes: Set<string>; // What item types this advancement can be used with.
      hidden?: boolean; // Should this advancement type be hidden in the selection dialog?
      }

      /** Information needed to represent different area of effect target types. */
      interface AreaTargetDefinition {
      label: string; // Localized label for this type.
      counted: string; // Localization path for counted plural forms.
      template: string; // Type of `MeasuredTemplate` create for this target type.
      reference?: string; // Reference to a rule page describing this area of effect.
      sizes?: string[]; // List of available sizes for this template. Options are chosen from the list: "radius", "width", "height", "length", "thickness". No more than 3 dimensions may be specified.
      standard?: boolean; // Is this a standard area of effect as defined explicitly by the rules?
      }

      interface CalendarHUDConfiguration {
      application: foundry.applications.api.ApplicationV2.AnyConstructor|null; // HUD application to display, or `null` to not display one.
      calendars: CalendarOption[]; // Different calendars that can be selected to use.
      formatters: CalendarTimeFormatter[]; // Formatters that can be used to display the date or time.
      }

      interface CalendarOption extends foundry.applications.fields.FormSelectOption {
      config: object; // Calendar configuration data.
      class?: typeof foundry.data.CalendarData; // Data model class.
      }

      interface CalendarTimeFormatter extends foundry.applications.fields.FormSelectOption {
      formatter: string|foundry.data.CalendarData.TimeFormatter; // The formatter name on the current calendar or a formatter function.
      }

      /**
       * @param time - Game time to use in the calculation.
       * @returns Progress through day period. For day progress 0 represents sunrise and 1 sunset. For night
       *          progress 0 represents sunset and 1 sunrise. Values outside that range are valid.
       */
      type CalendarProgress = (time: GameTime) => number;

      interface CharacterFlagConfiguration {
      name: string;
      hint: string;
      section: string;
      type: BooleanConstructor|NumberConstructor|StringConstructor; // Constructor for the flag's value type (e.g. `Boolean`, `Number`, `String`).
      placeholder: string;
      abilities?: string[];
      choices?: Record<string, string>;
      deprecated?: boolean; // Hide the flag unless it already has a value.
      skills?: string[];
      }

      interface CraftingConfiguration {
      consumable: CraftingCostsMultiplier; // Discounts for crafting a magical consumable.
      exceptions: Record<string, CraftingCosts>; // Crafting costs for items that are exception to the general crafting rules, by identifier.
      magic: Record<string, CraftingCosts>; // Magic item crafting costs by rarity.
      mundane: CraftingCostsMultiplier; // Multipliers for crafting mundane items.
      scrolls: Record<number, CraftingCosts>; // Crafting costs for spell scrolls by level.
      }

      interface CraftingCostsMultiplier {
      days: number; // The days multiplier.
      gold: number; // The gold multiplier.
      }

      interface CraftingCosts {
      days: number; // The number of days required to craft the item, not including its base item.
      gold: number; // The amount of gold required for the raw materials, not including the base item.
      }

      /** Configuration data for creature types. */
      interface CreatureTypeConfiguration {
      label: string; // Localized label.
      plural: string; // Localized plural form used in swarm name.
      reference?: string; // Reference to a rule page describing this type.
      detectAlignment?: boolean; // Is this type detectable by spells such as "Detect Evil and Good"?
      }

      interface CurrencyConfiguration {
      label: string; // Localized label for the currency.
      abbreviation: string; // Localized abbreviation for the currency.
      conversion: number; // Number by which this currency should be multiplied to arrive at a standard value.
      fractionalDigits?: number; // @default 0 — Number of digits to round currency values of this denomination to. Set to Infinity to prevent any rounding of the value.
      icon: string; // Icon representing the currency in the interface.
      }

      /** Configuration data for damage types. */
      interface DamageTypeConfiguration {
      label: string; // Localized label.
      icon: string; // Icon representing this type.
      isPhysical?: boolean; // Is this a type that can be bypassed by magical or silvered weapons?
      reference?: string; // Reference to a rule page describing this damage type.
      color?: foundry.utils.Color; // Visual color of the damage type.
      }

      /** Valid `dropEffect` value (see https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/dropEffect). */
      type DropEffectValue = "copy"|"move"|"link"|"none";

      /** Encumbrance configuration data. */
      interface EncumbranceConfiguration {
      currencyPerWeight: Record<string, number>; // Pieces of currency that equal a base weight (lbs or kgs).
      draftMultiplier: number; // The carry capacity multiplier to apply to draft animals pulling a vehicle.
      effects: Record<string, object>; // Data used to create encumbrance-related Active Effects.
      threshold: {
        encumbered: Record<string, number>;
        heavilyEncumbered: Record<string, number>;
        maximum: Record<string, number>;
      };
      speedReduction: Record<string, { ft: number, m: number }>; // Speed reduction caused by encumbered status.
      vehicleWeightMultiplier: Record<string, number>; // Multiplier used to determine vehicle carrying capacity.
      baseUnits: Record<string, Record<string, string>>; // Base units used to calculate carrying weight.
      }

      interface FacilityConfiguration {
      advancement: Record<string, Record<number, number>>; // The number of free facilities of a given type awarded at certain character levels.
      orders: Record<string, FacilityOrder>; // Orders that can be issued to a facility.
      sizes: Record<string, FacilitySize>; // Facility size categories.
      types: Record<string, SubtypeTypeConfiguration>; // Facility types and subtypes.
      }

      interface FacilityOrder {
      label: string; // The human-readable name of the order.
      icon: string; // The SVG icon for this order.
      basic?: boolean; // Whether this order can be issued to basic facilities.
      duration?: number; // The amount of time taken to complete the order if different to a normal bastion turn.
      hidden?: boolean; // This order is not normally available for execution.
      }

      interface FacilitySize {
      label: string; // The human-readable name of the size category.
      days: number; // The number of days to build the facility.
      squares: number; // The maximum area the facility may occupy in the bastion plan.
      value: number; // The cost in gold pieces to build the facility.
      }

      /** A filter description. */
      interface FilterDescription {
      k: string; // Key on the data object to check.
      v: any; // Value to compare.
      o?: string; // @default "_" — Operator or comparison function to use.
      }

      interface HabitatConfiguration5e {
      label: string; // The human-readable habitat name.
      subtypes?: boolean; // Whether this habitat is divided into sub-types.
      }

      interface IndividualTargetDefinition {
      label: string; // Localized label for this type.
      counted?: string; // Localization path for counted plural forms. Only necessary for scalar types.
      scalar?: boolean; // @default true — Can this target take an associated numeric value?
      }

      /** Configuration data for item properties. */
      interface ItemPropertyConfiguration {
      label: string; // Localized label.
      abbreviation?: string; // Localized abbreviation.
      icon?: string; // Icon that can be used in certain places to represent this property.
      reference?: string; // Reference to a rule page describing this property.
      isPhysical?: boolean; // Is this property one that can cause damage resistance bypasses?
      isTag?: boolean; // Is this spell property a tag, rather than a component?
      }

      /** Configuration data for limited use periods. */
      interface LimitedUsePeriodConfiguration {
      label: string; // Localized label.
      abbreviation: string; // Shorthand form of the label.
      formula?: boolean; // Whether this limited use period restores charges via formula.
      type?: "combat"|"special"; // Grouping if outside the normal "time" group.
      }

      /** Configuration data for a map marker style. Options not included will fall back to the value set in `default` style. Any additional styling options added will be passed into the custom marker class and be available for rendering. */
      interface MapLocationMarkerStyle {
      icon?: typeof PIXI.Container; // Map marker class used to render the icon.
      backgroundColor?: number; // Color of the background inside the circle.
      borderColor?: number; // Color of the border in normal state.
      borderHoverColor?: number; // Color of the border when hovering over the marker.
      fontFamily?: string; // Font used for rendering the code on the marker.
      shadowColor?: number; // Color of the shadow under the marker.
      textColor?: number; // Color of the text on the marker.
      }

      interface MovementTypeConfiguration {
      hidden?: boolean; // @default false — Whether this movement speed is displayed in the actor's sheet.
      label: string; // Localized label for the movement type.
      travel?: string; // Travel type in `CONFIG.DND5E.travelTypes` to map this movement speed to. If not provided, then `land` is assumed.
      walkFallback?: boolean; // When this special movement type runs out, can the actor fall back to using their walk speed at 2x cost?
      }

      interface RegisteredItemData {
      name: string; // Name of the item.
      identifier: string; // Item identifier.
      img: string; // Item's icon.
      sources: string[]; // UUIDs of different compendium items matching this identifier.
      }

      /** Configuration data for rest types. */
      interface RestTypeConfiguration {
      duration: Record<string, number>; // Duration of different rest variants in minutes.
      label: string; // Localized label for the rest type.
      icon: string; // Icon representing this rest type. Can be either a set of FontAwesome classes or an image path.
      dialogClass?: typeof import("./applications/actor/rest/base-rest-dialog.mjs").default; // A class for the dialog window.
      chat?: string|boolean; // @default true — A localization string for the chat text created to summarize the results of the rest, or a boolean indicating whether to create it or not.
      newDay?: boolean; // @default false — Does this rest carry over to a new day?
      advanceBastionTurn?: boolean; // @default false — Should a bastion turn be advanced for all players?
      advanceTime?: boolean; // @default false — Should the game clock be advanced by the rest duration?
      autoHD?: boolean; // @default false — Should hit dice be spent automatically during the rest?
      activationPeriods?: string[]; // Activation types that should be displayed in the chat card.
      exhaustionDelta?: number; // Delta exhaustion to apply to creatures undergoing the rest.
      recoverHitDice?: boolean; // Should hit dice be recovered during this rest?
      recoverHitPoints?: boolean; // Should hit points be recovered during this rest?
      recoverPeriods?: string[]; // What recovery periods should be applied when this rest is taken. The ordering of the periods determines which is applied if more than one recovery profile is found.
      recoverSpellSlotTypes?: Set<string>; // Types of spellcasting slots to recover during this rest.
      recoverTemp?: boolean; // Reset temp HP to zero.
      recoverTempMax?: boolean; // Reset temp max HP to zero.
      }

      /**
       * @param actor   - The actor fulfilling the request.
       * @param request - The request message.
       * @param config  - Additional request configuration.
       * @param options - Additional options provided at fulfillment time.
       * @returns Result chat message that will be associated with request.
       */
      type RequestCallback5e = (
        actor: globalThis.Actor.Implementation,
        request: globalThis.ChatMessage.Implementation,
        config: object,
        options?: RequestOptions5e
      ) => Promise<globalThis.ChatMessage.Implementation>;

      interface RequestOptions5e {
      event?: Event; // The event forwarded from the user clicking the request button.
      }

      /** Configuration information for rule types. */
      interface RuleTypeConfiguration {
      label: string; // Localized label for the rule type.
      references?: string; // Key path for a configuration object that contains reference data.
      }

      /** Configuration data for an actor sense type. */
      interface SenseConfiguration {
      label: string; // Localized label for the sense.
      detectionMode?: string; // Detection mode ID to add to the token (e.g. "blindsight", "feelTremor").
      grantsSight?: boolean; // Whether this sense grants token vision (sight.enabled & sight.range).
      visionMode?: string; // Vision mode ID to set on the token when this sense provides sight.
      }

      /** Configuration data for skills. */
      interface SkillConfiguration {
      label: string; // Localized label.
      ability: dnd5e.types.Ability.TypeKey; // Key for the default ability used by this skill.
      fullKey: string; // Fully written key used as alternate for enrichers.
      reference?: string; // Reference to a rule page describing this skill.
      pace?: {
        advantage?: Set<dnd5e.types.data.actor.fields.TravelPace5e>; // Grant advantage on this skill when traveling at the given paces.
        disadvantage?: Set<dnd5e.types.data.actor.fields.TravelPace5e>; // Grant disadvantage on this skill when traveling at the given paces.
      };
      }

      /** Configuration data for spellcasting foci. */
      interface SpellcastingFocusConfiguration {
      label: string; // Localized label for this category.
      itemIds: Record<string, string>; // Item IDs or UUIDs.
      }

      interface SpellcastingPreparationState5e {
      label: string; // The human-readable label.
      value: number; // A unique number representing this state.
      }

      /** Configuration data for spell schools. */
      interface SpellSchoolConfiguration {
      label: string; // Localized label.
      icon: string; // Spell school icon.
      fullKey: string; // Fully written key used as alternate for enrichers.
      reference?: string; // Reference to a rule page describing this school.
      }

      interface SpellScrollValues {
      bonus: number; // Attack to hit bonus.
      dc: number; // Saving throw DC.
      }

      interface _StatusEffectConfig5e {
      img: string; // Image used to represent the condition on the token.
      order?: number; // Order status to the start of the token HUD, rather than alphabetically.
      reference?: string; // UUID of a journal entry with details on this condition.
      special?: string; // Set this condition as a special status effect under this name.
      riders?: string[]; // Additional conditions, by id, to apply as part of this condition.
      exclusiveGroup?: string; // Any status effects with the same group will not be able to be applied at the same time through the token HUD (multiple statuses applied through other effects can still coexist).
      coverBonus?: number; // A bonus this condition provides to AC and dexterity saving throws.
      neverBlockMovement?: boolean; // If true, a token with this status will not block movement for other tokens.
      }

      /** Configuration data for system status effects. */
      type StatusEffectConfig5e = Omit<CONFIG.StatusEffect, "img"> & _StatusEffectConfig5e;

      interface _ConditionConfiguration {
      name: string; // Localized name for the condition.
      pseudo?: boolean; // Is this a pseudo-condition, i.e. one that does not appear in the conditions appendix but acts as a status effect?
      levels?: number; // The number of levels of exhaustion an actor can obtain.
      reduction?: { rolls: number, speed: number }; // Amount D20 Tests & Speed are reduced per exhaustion level when using the modern rules. Speed reduction is measured in the default imperial units and converted to metric if necessary.
      }

      /** Configuration data for system conditions. */
      type ConditionConfiguration = Omit<StatusEffectConfig5e, "name"> & _ConditionConfiguration;

      /** Configuration data for an items that have sub-types. */
      interface SubtypeTypeConfiguration {
      label: string; // Localized label for this type.
      subtypes?: Record<string, string>; // Enum containing localized labels for subtypes.
      }

      /** Important information on a targeted token. */
      interface TargetDescriptor5e {
      uuid: string; // The UUID of the target.
      img: string; // The target's image.
      name: string; // The target's name.
      ac: number; // The target's armor class, if applicable.
      }

      interface ToolConfiguration {
      ability: dnd5e.types.Ability.TypeKey; // Default ability used for the tool.
      id: string; // UUID of reference tool or ID within pack defined by `DND5E.sourcePacks.ITEMS`.
      }

      /** Trait configuration information. */
      interface TraitConfiguration {
      labels: {
        title: string; // Localization key for the trait name.
        localization: string; // Prefix for a localization key that can be used to generate various plural variants of the trait type.
        all?: string; // Localization to use for the "all" option for this trait. If not provided, then no all option will be available.
      };
      icon: string; // Path to the icon used to represent this trait.
      actorKeyPath?: string; // If the trait doesn't directly map to an entry as `traits.[key]`, where is this trait's data stored on the actor?
      configKey?: string; // If the list of trait options doesn't match the name of the trait, where can the options be found within `CONFIG.DND5E`?
      dataType?: boolean | number; // Type of data represented.
      labelKeyPath?: string; // If config is an enum of objects, where can the label be found?
      subtypes?: {
        keyPath?: string; // Path to subtype value on base items, should match a category key. Deprecated in favor of the standardized `system.type.value`.
        ids?: string[]; // Key for base item ID objects within `CONFIG.DND5E`.
      };
      children?: object; // Mapping of category key to an object defining its children.
      sortCategories?: boolean; // Whether top-level categories should be sorted.
      expertise?: boolean; // Can an actor receive expertise in this trait?
      mastery?: boolean; // Can an actor receive mastery in this trait?
      }

      interface TransformationConfiguration {
      effects: Record<string, TransformationFlagConfiguration>;
      keep: Record<string, TransformationFlagConfiguration>;
      merge: Record<string, TransformationFlagConfiguration>;
      others: Record<string, TransformationFlagConfiguration>;
      presets: Record<string, TransformationPresetConfiguration>;
      }

      interface TransformationFlagConfiguration {
      label: string; // Localized label for the flag.
      hint?: string; // Localized hint for the flag.
      default?: boolean; // This should be part of the default transformation settings.
      disables?: string[]; // Names of specific settings to disable, or whole categories if an `*` is used.
      }

      interface TransformationPresetConfiguration {
      icon: string; // Icon representing this preset on the button.
      label: string; // Localized label for the preset.
      settings: Partial<dnd5e.types.data.settings.TransformationSettingData>; // Options that will be set for the preset.
      }

      interface TravelPaceConfiguration {
      label: string; // The human-readable label.
      standard: number; // The standard pace value in miles per day.
      multiplier: number; // The speed up or slow down factor for this travel pace.
      round?: "up"|"down"; // Whether to round the result of applying the multiplier up or down. Omitting this option will not round the result at all.
      }

      interface TreasureConfiguration5e {
      label: string; // The human-readable treasure category name.
      }

      interface UnitConfiguration {
      label: string; // Localized label for the unit.
      abbreviation: string; // Localized abbreviation for the unit.
      conversion: number; // Multiplier used to convert between various units.
      counted?: string; // Localization path for counted plural forms in various unit display modes. Only necessary if non-supported unit or using a non-standard name for a supported unit.
      formattingUnit?: string; // Unit formatting value as supported by javascript's internationalization system: https://tc39.es/ecma402/#table-sanctioned-single-unit-identifiers. Only required if the formatting name doesn't match the unit key.
      type: "imperial"|"metric"; // Whether this is an "imperial" or "metric" unit.
      }

      interface MovementUnitConfiguration extends UnitConfiguration {
      template: string; // Localized label for a template size (e.g. 50-foot).
      travelResolution?: "day"|"round"; // Whether the distance is per-round or per-day when used in the context of overland travel.
      }

      type TimeUnitConfiguration = (Omit<UnitConfiguration, "abbreviation"|"type">) & {
      combat?: boolean; // @default false — Is this a combat-specific time unit?
      option?: boolean; // @default true — Should this be available when users can select from a list of units?
      timeComponent?: string; // Mapping of this unit to a `TimeComponent` provided by core's calendar system.
      };

      type TravelUnitConfiguration = (Omit<UnitConfiguration, "abbreviation">) & {
      abbreviationDay: string; // Abbreviated form when using days as the travel period.
      abbreviationHour: string; // Abbreviated form when using hours as the travel period.
      };

      interface UnitValue5e {
      units: string;
      value: number;
      }

      interface WeaponMasterConfiguration {
      label: string; // Localized label for the mastery
      reference?: string; // Reference to a rule page describing this mastery.
      }

  }
}

export {};
