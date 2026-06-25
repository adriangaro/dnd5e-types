/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/data/item/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.data.item {
      interface ClassItemSystemData {
      hd: {
        additional: string; // Additional hit dice beyond the level of the class.
        denomination: dnd5e.types.HitDieType.TypeKey; // Denomination of hit dice available as defined in `DND5E.hitDieTypes`.
        spent: number; // Number of hit dice consumed.
      };
      levels: number; // Current number of levels in this class.
      primaryAbility: {
        value: Set<string>; // List of primary abilities used by this class.
        all: boolean; // If multiple abilities are selected, does multiclassing require all of them to be 13 or just one.
      };
      properties: Set<string>; // General properties of a class item.
      spellcasting: dnd5e.types.data.item.fields.SpellcastingFieldData; // Details on class's spellcasting ability.
      }

      interface ConsumableItemSystemData {
      damage: {
        base: dnd5e.types.data.shared.DamageData; // Damage caused by this ammunition.
        replace: string; // Should ammunition damage replace the base weapon's damage?
      };
      magicalBonus: string; // Magical bonus added to attack & damage rolls by ammunition.
      properties: Set<string>; // Ammunition properties.
      type: Omit<dnd5e.types.data.item.fields.ItemTypeData, "baseItem">; // Ammunition type and subtype.
      uses: dnd5e.types.data.shared.UsesData & {
        autoDestroy: boolean; // Should this item be destroyed when it runs out of uses.
      };
      }

      interface ContainerItemSystemData {
      capacity: { // Information on container's carrying capacity.
        count: number; // Number of items that can be stored within the container.
        volume: dnd5e.types.core.UnitValue5e; // Amount of volume that can be stored.
        weight: dnd5e.types.core.UnitValue5e; // Amount of weight that can be stored.
      };
      properties: Set<string>; // Container properties.
      }

      interface EquipmentItemSystemData {
      armor: { // Armor details and equipment type information.
        value: number; // Base armor class or shield bonus.
        magicalBonus: string; // Bonus added to AC from the armor's magical nature.
        dex: number; // Maximum dex bonus added to armor class.
      };
      proficient: 0 | 1 | null; // Does the owner have proficiency in this piece of equipment?
      properties: Set<string>; // Equipment properties.
      strength: number; // Minimum strength required to use a piece of armor.
      type: Omit<dnd5e.types.data.item.fields.ItemTypeData, "subtype">; // Equipment type & base item.
      }

      interface FacilityItemSystemData {
      building: {
        built: boolean; // Whether the facility has been fully built. Only applicable to basic facilities.
        size: dnd5e.types.Facility.Size.TypeKey; // The target size for the facility to be built at.
      };
      craft: {
        item: string; // The Item the facility is currently crafting.
        quantity: number; // The number of Items being crafted.
      };
      defenders: FacilityOccupants; // The facility's configured defenders.
      disabled: boolean; // Whether the facility is currently disabled.
      enlargeable: boolean; // Whether the facility is capable of being enlarged.
      free: boolean; // Whether the facility counts towards the character's maximum special facility cap.
      hirelings: FacilityOccupants; // The facility's configured hirelings.
      level: number; // The minimum level required to build this facility.
      order: dnd5e.types.Facility.Order.TypeKey | ""; // The order type associated with this facility.
      progress: {
        value: number; // The number of days' progress made towards completing the order.
        max: number; // The number of days required to complete the order.
        order: dnd5e.types.Facility.Order.TypeKey | ""; // The order that is currently being executed.
      };
      size: dnd5e.types.Facility.Size.TypeKey; // The size category of the facility.
      trade: {
        creatures: FacilityOccupants; // The trade facility's stocked creatures.
        pending: {
          creatures: string[]; // Creatures being bought or sold.
          operation: "buy"|"sell"; // The type of trade operation that was executed this turn.
          stocked: boolean; // The inventory will be fully stocked when the order completes.
          value: number; // The base value transacted during the trade operation this turn.
        };
        profit: number; // The trade facility's profit factor as a percentage.
        stock: {
          stocked: boolean; // Whether the facility is fully stocked.
          value: number; // The value of the currently stocked goods.
          max: number; // The maximum value of goods this facility can stock.
        };
      };
      type: Omit<dnd5e.types.data.item.fields.ItemTypeData, "baseItem">; // Facility type & subtype.
      }

      interface FacilityOccupants {
      value: string[]; // A list of Actor UUIDs assigned to the facility.
      max: number; // The facility's maximum occupant capacity.
      }

      interface FeatItemSystemData {
      cover: number; // Amount of cover this feature affords to its crew on a vehicle.
      crewed: boolean; // Is this vehicle feature currently crewed?
      enchant: {
        max: string; // Maximum number of items that can have this enchantment.
        period: string; // Frequency at which the enchantment can be swapped.
      };
      prerequisites: {
        items: Set<string>; // Items that must be taken first before this item.
        level: number; // Character or class level required to choose this feature.
        repeatable: boolean; // Can this item be selected more than once?
      };
      properties: Set<string>; // General properties of a feature item.
      requirements: string; // Actor details required to use this feature.
      type: Omit<dnd5e.types.data.item.fields.ItemTypeData, "baseItem">; // Feature type and subtype.
      }

      interface LootItemSystemData {
      properties: Set<string>; // General properties of a loot item.
      type: Omit<dnd5e.types.data.item.fields.ItemTypeData, "baseItem">; // Loot type and subtype.
      }

      interface RaceItemSystemData {
      movement: Omit<dnd5e.types.data.shared.MovementData, "special">;
      senses: dnd5e.types.data.shared.SensesData;
      type: Omit<dnd5e.types.data.shared.CreatureTypeData, "swarm">;
      }

      interface SpellItemSystemData {
      ability: dnd5e.types.Ability.TypeKey | ""; // Override of default spellcasting ability.
      activation: dnd5e.types.data.shared.ActivationData; // Casting time & conditions.
      duration: dnd5e.types.data.shared.DurationData; // Duration of the spell effect.
      level: number; // Base level of the spell.
      materials: { // Details on material components required for this spell.
        value: string; // Description of the material components required for casting.
        consumed: boolean; // Are these material components consumed during casting?
        cost: number; // GP cost for the required components.
        supply: number; // Quantity of this component available.
      };
      method: dnd5e.types.Spellcasting.Method.TypeKey | ""; // The spellcasting method this spell was gained via.
      prepared: number; // The spell availability.
      properties: Set<string>; // General components and tags for this spell.
      range: dnd5e.types.data.shared.RangeData; // Range of the spell
      school: dnd5e.types.SpellSchool.TypeKey; // Magical school to which this spell belongs.
      sourceItem: string; // Associated identifier of the spell's source item when on an actor.
      target: dnd5e.types.data.shared.TargetData; // Information on area and individual targets.
      }

      interface SubclassItemSystemData {
      classIdentifier: string; // Identifier slug for the class with which this subclass should be associated.
      spellcasting: dnd5e.types.data.item.fields.SpellcastingFieldData; // Details on subclass's spellcasting ability.
      }

      interface ToolItemSystemData {
      ability: dnd5e.types.Ability.TypeKey | ""; // Default ability when this tool is being used.
      bonus: string; // Bonus formula added to tool rolls.
      chatFlavor: string; // Additional text added to chat when this tool is used.
      proficient: dnd5e.types.ProficiencyLevel.TypeKey | null; // Level of proficiency as defined in `DND5E.proficiencyLevels`.
      properties: Set<string>; // Tool properties.
      type: Omit<dnd5e.types.data.item.fields.ItemTypeData, "subtype">; // Tool type and base item.
      }

      interface WeaponItemSystemData {
      ammunition: {
        type: string; // Type of ammunition fired by this weapon.
      };
      armor: {
        value: number; // Siege or vehicle weapon's armor class.
      };
      damage: {
        base: dnd5e.types.data.shared.DamageData; // Weapon's base damage.
        versatile: dnd5e.types.data.shared.DamageData; // Weapon's versatile damage.
      };
      magicalBonus: string; // Magical bonus added to attack & damage rolls.
      mastery: dnd5e.types.WeaponMastery.TypeKey | ""; // Mastery Property usable with this weapon.
      properties: Set<string>; // Weapon's properties.
      proficient: 0 | 1 | null; // Does the weapon's owner have proficiency?
      range: {
        value: number; // Short range of the weapon.
        long: number; // Long range of the weapon.
        reach: number|null; // Reach of the weapon.
        units: string; // Units used to measure the weapon's range and reach.
      };
      type: Omit<dnd5e.types.data.item.fields.ItemTypeData, "subtype">; // Weapon type and base item.
      }

  }
}

export {};
