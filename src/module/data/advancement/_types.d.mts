/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/data/advancement/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.data.advancement {
      interface AbilityScoreImprovementAdvancementConfigurationData {
      cap: number; // Maximum number of points that can be assigned to a single score.
      fixed: Record<string, number>; // Number of points automatically assigned to a certain score.
      locked: Set<string>; // Abilities that cannot be changed by this advancement.
      max: number; // Override for the maximum ability score.
      points: number; // Number of points that can be assigned to any score.
      recommendation: string; // Epic Boon feat recommended by this class.
      }

      interface AbilityScoreImprovementAdvancementValueData {
      type: "asi" | "feat"; // When on a class, whether the player chose ASI or a Feat.
      assignments: Record<string, number>; // Points assigned to individual scores.
      feat: Record<string, string>; // Feat that was selected.
      }

      interface AdvancementData {
      _id: string; // The advancement's ID.
      type: string; // Type of advancement.
      configuration: any; // Type-specific configuration data.
      flags: Record<string, object>; // Arbitrary flag data for this advancement.
      value: any; // Type-specific value data after the advancement is applied.
      level: number; // For single-level advancement, the level at which it should apply.
      title: string; // Optional custom title.
      hint: string; // Brief description of what the advancement does or guidance for the player.
      icon: string; // Optional custom icon.
      classRestriction: "primary" | "secondary" | ""; // Should this advancement apply at all times, only when on the first class on an actor, or only on a class that is multi-classing?
      }

      interface ItemChoiceAdvancementConfigurationData {
      allowDrops: boolean; // Should players be able to drop non-listed items?
      choices: Record<number, ItemChoiceLevelConfig>; // Choices & config for specific levels.
      pool: ItemChoicePoolEntry[]; // Items that can be chosen.
      restriction: {
        level: "available"|number; // Level of spell allowed.
        list: Set<string>; // Spell lists from which a spell must be selected.
        subtype: string; // Item sub-type allowed.
        type: string; // Specific item type allowed.
      };
      sorting: "a"|"m"; // Sorting mode for the item list.
      spell: AdvancementSpellConfigurationData; // Mutations applied to spell items.
      type: string; // Type of item allowed, if it should be restricted.
      }

      interface ItemChoiceLevelConfig {
      count: number; // Number of items a player can select at this level.
      replacement: boolean; // Can a player replace previous selections at this level?
      }

      interface ItemChoicePoolEntry {
      sort: number; // Manual sorting value for the entry.
      uuid: string; // UUID of the item to present as a choice.
      }

      interface ItemChoiceAdvancementValueData {
      ability: dnd5e.types.Ability.TypeKey | ""; // Ability selected for the spells.
      added: Record<number, Record<string, string>>; // Mapping of IDs to UUIDs for items added at each level.
      replaced: Record<number, ItemChoiceReplacement>; // Information on items replaced at each level.
      }

      interface ItemChoiceReplacement {
      level: number; // Level at which the original item was chosen.
      original: string; // ID of the original item that was replaced.
      replacement?: string; // ID of the replacement item.
      }

      interface ItemGrantAdvancementConfigurationData {
      items: ItemGrantItemConfiguration[]; // Data for the items to be granted.
      optional: boolean; // Should user be able to de-select any individual option?
      sorting: "a"|"m"; // Sorting mode for the item list.
      spell: AdvancementSpellConfigurationData; // Data used to modify any granted spells.
      }

      interface ItemGrantItemConfiguration {
      optional: boolean; // Is this item optional? Has no effect if whole advancement is optional.
      sort: number; // Manual sorting value for the entry.
      uuid: string; // UUID of the item to grant.
      }

      interface ModifyItemAdvancementConfigurationData {
      changes: ModifyItemChangeConfiguration[]; // List of enchantments to apply and their valid items.
      }

      interface ModifyItemChangeConfiguration {
      _id: string; // ID of the change, matches local enchantment ID if UUID isn't specified.
      uuid?: string; // UUID of a remote effect to apply.
      identifiers: Set<string>; // One or more identifiers used to find matching items.
      }

      interface ModifyItemAdvancementValueData {
      modified: ModifyItemModifiedItemValue[]; // List of items that were modified by the advancement.
      }

      interface ModifyItemModifiedItemValue {
      change: string; // ID of the change that was applied (referencing entry in `configuration.changes`).
      effect: string; // ID of the enchantment that was created on the item.
      item: string; // ID of the item that was modified.
      }

      interface ScaleValueAdvancementConfigurationData {
      identifier: string; // Identifier used to select this scale value in roll formulas.
      type: dnd5e.types.Advancement.ScaleValue.TypeKey; // Type of data represented by this scale value.
      distance?: {
        units?: string; // If distance type is selected, the units each value uses.
      };
      scale: Record<string, object>; // Sparse scale values for each level.
      }

      interface ScaleValueDiceTypeData {
      number: number; // Number of dice.
      faces: number; // Die faces.
      modifiers: Set<string>; // Die modifiers attached to roll.
      }

      interface ScaleValueNumberTypeData {
      value: number; // Numeric value.
      }

      interface ScaleValueStringTypeData {
      value: string; // String value.
      }

      interface ScaleValueUsesTypeData {
      value: number; // Number of uses.
      period: string; // Usage refresh period.
      }

      /** Information on how a scale value of this type is configured. */
      interface ScaleValueTypeMetadata {
      label: string; // Name of this type.
      hint: string; // Hint for this type shown in the scale value configuration.
      identifier: string; // Hint for the identifier for this type.
      isNumeric: boolean; // When using the default editing interface, should numeric inputs be used?
      }

      interface SizeAdvancementConfigurationData {
      sizes: Set<dnd5e.types.ActorSize.TypeKey>; // Sizes that can be selected.
      }

      interface SizeAdvancementValueData {
      size: dnd5e.types.ActorSize.TypeKey | ""; // Selected size.
      }

      interface AdvancementSpellConfigurationData {
      ability: Set<dnd5e.types.Ability.TypeKey>; // Abilities that can be selected.
      method: dnd5e.types.Spellcasting.Method.TypeKey | ""; // Spellcasting method.
      prepared: number; // Preparation mode for the spell.
      uses: {
        max: string; // Formula for maximum uses.
        per: dnd5e.types.LimitedUsePeriod.TypeKey | ""; // Recovery period for limited uses.
        requireSlot: boolean; // Require a spell slot in addition to limited uses.
      };
      }

      interface SubclassAdvancementValueData {
      document: globalThis.Item.Implementation; // Copy of the subclass on the actor.
      uuid: string; // UUID of the remote subclass source.
      }

      interface TraitAdvancementConfigurationData {
      allowReplacements: boolean; // Whether all potential choices should be presented to the user if there are no more choices available in a more limited set.
      choices: TraitChoice[]; // Choices presented to the user.
      grants: string[]; // Keys for traits granted automatically.
      mode: dnd5e.types.TraitMode.TypeKey; // Method by which this advancement modifies the actor's traits.
      }

      interface TraitChoice {
      count: number; // Number of traits that can be selected.
      pool?: string[]; // List of trait or category keys that can be chosen. If no choices are provided, any trait of the specified type can be selected.
      }

      interface TraitAdvancementValueData {
      chosen: Set<string>; // Trait keys that have been chosen.
      }

  }
}

export {};
