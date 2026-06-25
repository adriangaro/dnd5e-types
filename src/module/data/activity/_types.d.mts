/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/data/activity/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.data.activity {
      interface ActivityData {
      _id: string; // Unique ID for the activity on an item.
      type: string; // Type name of the activity used to build a specific activity class.
      name: string; // Name for this activity.
      img: string; // Image that represents this activity.
      sort: number; // Sorting position of the activity on an item.
      activation: dnd5e.types.data.shared.ActivationData & { // Activation time & conditions.
        override: boolean; // Override activation values inferred from item.
      };
      consumption: {
        scaling: {
          allowed: boolean; // Can this non-spell activity be activated at higher levels?
          max: string; // Maximum number of scaling levels for this item.
        };
        spellSlot: boolean; // If this is on a spell, should it consume a spell slot?
        targets: dnd5e.types.data.activity.fields.ConsumptionTargetData[]; // Collection of consumption targets.
      };
      description: {
        chatFlavor: string; // Extra text displayed in the activation chat message.
        value: string; // Full activity description displayed in chat.
      };
      duration: dnd5e.types.data.shared.DurationData & { // Duration of the effect.
        concentration: boolean; // Does this effect require concentration?
        override: boolean; // Override duration values inferred from item.
      };
      effects: dnd5e.types.data.activity.fields.EffectApplicationData[]; // Linked effects that can be applied.
      flags: Record<string, object>; // Arbitrary flag data for this activity.
      range: dnd5e.types.data.shared.RangeData & {
        override: boolean; // Override range values inferred from item.
      };
      target: dnd5e.types.data.shared.TargetData & {
        override: boolean; // Override target values inferred from item.
        prompt: boolean; // Should the player be prompted to place the template?
      };
      uses: dnd5e.types.data.shared.UsesData; // Uses available to this activity.
      visibility: {
        identifier: string; // Class identifier that will be used to determine applicable level.
        level: {
          min: number; // Minimum level at which this activity can be used.
          max: number; // Maximum level at which this activity can be used.
        };
        requireAttunement: boolean; // Not usable if item requires attunement and isn't attuned.
        requireIdentification: boolean; // Not usable or visible if item isn't identified.
        requireMagic: boolean; // Not usable if magic isn't available.
      };
      }

      interface AttackActivityData extends ActivityData {
      attack: {
        ability: string; // Ability used to make the attack and determine damage.
        bonus: string; // Arbitrary bonus added to the attack.
        critical: {
          threshold: number; // Minimum value on the D20 needed to roll a critical hit.
        };
        flat: boolean; // Should the bonus be used in place of proficiency & ability modifier?
        type: {
          value: string; // Is this a melee or ranged attack?
          classification: string; // Is this a unarmed, weapon, or spell attack?
        };
      };
      damage: {
        critical: {
          bonus: string; // Extra damage applied when a critical is rolled. Added to the base damage or first damage part.
        };
        includeBase: boolean; // Should damage defined by the item be included with other damage parts?
        parts: dnd5e.types.data.shared.DamageData[]; // Parts of damage to inflict.
      };
      }

      type CastActivityData = (Omit<ActivityData, "effects">) & {
      spell: {
        ability: string; // Ability to override default spellcasting ability.
        challenge: {
          attack: number; // Flat to hit bonus in place of the spell's normal attack bonus.
          save: number; // Flat DC to use in place of the spell's normal save DC.
          override: boolean; // Use custom attack bonus & DC rather than creature's.
        };
        level: number; // Base level at which to cast the spell.
        properties: Set<string>; // Spell components & tags to ignore while casting.
        spellbook: boolean; // Display spell in the Spells tab of the character sheet.
        uuid: string; // UUID of the spell to cast.
      };
      };

      interface CheckActivityData extends ActivityData {
      check: {
        ability: string; // Ability used with the check.
        associated: Set<string>; // Skills or tools that can contribute to the check.
        bonus: string; // Bonus added to all checks made through this activity.
        dc: {
          calculation: string; // Method or ability used to calculate the difficulty class of the check.
          formula: string; // Custom DC formula or flat value.
        };
        visible: boolean; // Should this check be displayed to all players?
      };
      }

      interface DamageActivityData extends ActivityData {
      damage: {
        critical: {
          allow: boolean; // Can this damage be critical?
          bonus: string; // Extra damage applied to the first damage part when a critical is rolled.
        };
        parts: dnd5e.types.data.shared.DamageData[]; // Parts of damage to inflict.
      };
      }

      interface EnchantActivityData extends ActivityData {
      enchant: {
        self: string; // Automatically apply enchantment to item containing this activity when used.
      };
      restrictions: {
        allowMagical: boolean; // Allow enchantments to be applied to items that are already magical.
        categories: Set<string>; // Item categories to restrict to.
        properties: Set<string>; // Item properties to restrict to.
        type: string; // Item type to which this enchantment can be applied.
      };
      }

      interface EnchantEffectApplicationData extends dnd5e.types.data.activity.fields.EffectApplicationData {
      riders: {
        activity: Set<string>; // IDs of other activities on this item that will be added when enchanting.
        effect: Set<string>; // IDs of other effects on this item that will be added when enchanting.
        item: Set<string>; // UUIDs of items that will be added with this enchantment.
      };
      }

      type ForwardActivityData = (Omit<ActivityData, "duration"|"effects"|"range"|"target">) & {
      activity: {
        id: string; // ID of the activity to forward to.
      };
      };

      interface HealActivityData extends ActivityData {
      healing: dnd5e.types.data.shared.DamageData;
      }

      interface OrderActivityData {
      _id: string; // Unique ID for the activity on an item.
      type: string; // Type name of the activity used to build a specific activity class.
      name: string; // Name for this activity.
      img: string; // Image that represents this activity.
      order: string; // The issued order.
      }

      type SaveActivityData = Omit<ActivityData, "effects"> & {
      damage: {
        onSave: string; // How much damage is done on a successful save?
        parts: dnd5e.types.data.shared.DamageData[]; // Parts of damage to inflict.
      };
      effects: SaveEffectApplicationData[]; // Linked effects that can be applied.
      save: {
        ability: Set<string>; // Make the saving throw with one of these abilities.
        bonus: string; // Bonus added to all saves made through this activity.
        dc: {
          bonus: string; // Bonus applied to the DC (non-persisted, computed at runtime).
          calculation: string; // Method or ability used to calculate the difficulty class.
          formula: string; // Custom DC formula or flat value.
        };
        visible: boolean; // Should this save be displayed to all players?
      };
      };

      interface SaveEffectApplicationData extends dnd5e.types.data.activity.fields.EffectApplicationData {
      onSave: boolean; // Should this effect still be applied on a successful save?
      }

      interface SummonActivityData extends ActivityData {
      bonuses: {
        ac: string; // Formula for armor class bonus on summoned actor.
        hd: string; // Formula for bonus hit dice to add to each summoned NPC.
        hp: string; // Formula for bonus hit points to add to each summoned actor.
        attackDamage: string; // Formula for bonus added to damage for attacks.
        saveDamage: string; // Formula for bonus added to damage for saving throws.
        healing: string; // Formula for bonus added to healing.
      };
      creatureSizes: Set<string>; // Set of creature sizes that will be set on summoned creature.
      creatureTypes: Set<string>; // Set of creature types that will be set on summoned creature.
      match: {
        ability: string; // Ability to use for calculating match values.
        attacks: boolean; // Match the to hit values on summoned actor's attack to the summoner.
        disposition: boolean; // Match the summoner's disposition.
        proficiency: boolean; // Match proficiency on summoned actor to the summoner.
        saves: boolean; // Match the save DC on summoned actor's abilities to the summoner.
      };
      profiles: SummonsProfile[]; // Information on creatures that can be summoned.
      summon: {
        mode: ""|"cr"; // Method of determining what type of creature is summoned.
        prompt: boolean; // Should the player be prompted to place the summons?
      };
      tempHP: string; // Temporary HP granted to the summoned creature.
      }

      interface SummonsProfile {
      _id: string; // Unique ID for this profile.
      count: string; // Formula for the number of creatures to summon.
      cr: string; // Formula for the CR of summoned creatures if in CR mode.
      level: {
        min: number; // Minimum level at which this profile can be used.
        max: number; // Maximum level at which this profile can be used.
      };
      name: string; // Display name for this profile if it differs from actor's name.
      types: Set<string>; // Types of summoned creatures if in CR mode.
      uuid: string; // UUID of the actor to summon if in default mode.
      }

      interface TransformActivityData extends ActivityData {
      profiles: TransformProfile[]; // Information on transformation methods and sources.
      settings: dnd5e.types.data.settings.TransformationSettingData; // Settings data to use when summoning.
      transform: {
        customize: boolean; // Should any customized settings be respected or should the default settings for the selected profile be used instead.
        mode: ""|"cr"; // Method of determining what type of creature to transform into.
        preset: string; // Transformation preset to use.
      };
      }

      interface TransformProfile {
      _id: string; // Unique ID for this profile.
      cr: string; // Formula for the CR of creature to transform into if in CR mode.
      level: {
        min: number; // Minimum level at which this profile can be used.
        max: number; // Maximum level at which this profile can be used.
      };
      movement: Set<string>; // Movement types that aren't allowed on selected creatures.
      name: string; // Display name for this profile.
      sizes: Set<string>; // Allowed creature sizes, or blank to allow all sizes.
      types: Set<string>; // Allowed creature types, or blank to allow all types.
      uuid: string; // UUID of the actor to transform into if in direct mode.
      }

      interface UtilityActivityData extends ActivityData {
      roll: {
        formula: string; // Arbitrary formula that can be rolled.
        name: string; // Label for the rolling button.
        prompt: boolean; // Should the roll configuration dialog be displayed?
        visible: boolean; // Should the rolling button be visible to all players?
      };
      }

  }
}

export {};
