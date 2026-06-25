/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/data/actor/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.data.actor {
      interface CharacterActorSystemData {
      attributes: {
        hp: {
          bonuses: {
            level: string; // Bonus formula applied for each class level.
            overall: string; // Bonus formula applied to total HP.
          };
        };
        death: {
          success: number; // Number of successful death saves.
          failure: number; // Number of failed death saves.
          bonuses: {
            save: string; // Numeric or dice bonus to death saving throws.
          };
        };
        inspiration: boolean; // Does this character have inspiration?
      };
      bastion: {
        name: string; // The name of the character's bastion.
        description: string; // Additional description and details for the character's bastion.
      };
      details: {
        background: globalThis.Item.Implementation|string; // Character's background item or name.
        originalClass: string; // ID of first class taken by character.
        xp: { // Experience points gained.
          value: number; // Total experience points earned.
        };
        appearance: string; // Description of character's appearance.
        trait: string; // Character's personality traits.
        gender: string; // Character's gender.
        eyes: string; // Character's eyes.
        height: string; // Character's height.
        faith: string; // Character's faith.
        hair: string; // Character's hair.
        skin: string; // Character's skin.
        age: string; // Character's age.
        weight: string; // Character's weight.
      };
      traits: {
        weaponProf: { // Character's weapon proficiencies.
          mastery: {
            value: Set<string>; // Weapon masteries.
            bonus: Set<string>; // Extra mastery properties that can be chosen when making an attack with a weapon that has mastery.
          };
        };
        armorProf: dnd5e.types.data.actor.fields.SimpleTraitData; // Character's armor proficiencies.
      };
      resources: {
        primary: ResourceData; // Resource number one.
        secondary: ResourceData; // Resource number two.
        tertiary: ResourceData; // Resource number three.
      };
      favorites: ActorFavorites5e[]; // The character's favorites.
      }

      interface ActorFavorites5e {
      type: ActorFavoriteType5e; // The favorite type.
      id: string; // The Document UUID, skill or tool identifier, or spell slot level identifier.
      sort?: number; // The sort value.
      }

      type ActorFavoriteType5e = "activity"|"effect"|"item"|"skill"|"slots"|"tool";

      interface ResourceData {
      value: number; // Available uses of this resource.
      max: number; // Maximum allowed uses of this resource.
      sr: boolean; // Does this resource recover on a short rest?
      lr: boolean; // Does this resource recover on a long rest?
      label: string; // Displayed name.
      }

      interface EncounterActorSystemData {
      members: EncounterMemberData[]; // Members of the encounter.
      }

      interface EncounterMemberData {
      uuid: string; // The UUID to the Actor.
      quantity: {
        value: number; // Number of this actor in the group.
        formula?: string; // Formula used for re-rolling actor quantities in encounters.
      };
      }

      interface GroupActorSystemData {
      attributes: {
        travel: dnd5e.types.data.actor.fields.TravelData;
      };
      details: {
        xp: {
          value: number; // XP currently available to be distributed to a party.
        };
      };
      members: PartyMemberData[]; // Members in this group with associated metadata.
      primaryVehicle: globalThis.Actor.Implementation|null; // The group's primary vehicle.
      }

      interface PartyMemberData {
      actor: globalThis.Actor.Implementation; // Associated actor document.
      }

      interface GroupRestConfiguration extends dnd5e.types.documents.RestConfiguration {
        autoRest?: boolean; // Automatically perform rest for group members rather than creating request message.
        targets?: string[]; // IDs of actors to rest. If not provided, then all group actors will be rested.
      }

      interface TravelPaceDescriptor {
        pace: {
          available: boolean; // Whether a travel pace is available to this group.
          label: string; // The human-readable travel pace label.
          slowed: boolean; // Whether travel pace has been slowed by a member with reduced speed.
          value: dnd5e.types.data.actor.fields.TravelPace5e; // The travel pace key.
        };
        paces: Partial<Record<dnd5e.types.Actor.Vehicle.TravelTypeKey, number>>; // The available travel pace speeds.
      }

      interface NPCActorSystemData {
      attributes: {
        hd: {
          spent: number; // Number of hit dice spent.
        };
        hp: {
          formula: string; // Formula used to determine hit points.
        };
        death: {
          success: number; // Number of successful death saves.
          failure: number; // Number of failed death saves.
          bonuses: {
            save: string; // Numeric or dice bonus to death saving throws.
          };
        };
        price: {
          value: number|null; // The creature's value in the specified denomination.
          denomination: dnd5e.types.Currency.TypeKey; // The currency denomination.
        };
        spell: {
          level: number; // Spellcasting level of this NPC.
        };
      };
      details: {
        type: dnd5e.types.data.shared.CreatureTypeData; // Creature type of this NPC.
        habitat: {
          value: NPCHabitatData[]; // Common habitats in which this NPC is found.
          custom: string; // Custom habitats.
        };
        treasure: {
          value: Set<string>; // Random treasure generation categories for this NPC.
        };
        cr: number; // NPC's challenge rating.
      };
      resources: {
        legact: { // NPC's legendary actions.
          max: number; // Maximum number of legendary actions.
          spent: number; // Spent legendary actions.
        };
        legres: { // NPC's legendary resistances.
          max: number; // Maximum number of legendary resistances.
          spent: number; // Spent legendary resistances.
        };
        lair: { // NPC's lair actions.
          value: boolean; // This creature can possess a lair (2024) or take lair actions (2014).
          initiative: number; // Initiative count when lair actions are triggered.
          inside: boolean; // This actor is currently inside its lair.
        };
      };
      source: dnd5e.types.data.shared.SourceData; // Adventure or sourcebook where this NPC originated.
      traits: {
        important: boolean; // This NPC is important and should have loyalty & death saves.
      };
      }

      interface NPCHabitatData {
      type: dnd5e.types.Habitat.TypeKey; // The habitat category.
      subtype?: string; // An optional discriminator for the main category.
      }

      interface VehicleActorSystemData {
      attributes: {
        hp: {
          mt: number; // Mishap threshold.
        };
        actions: { // Information on how the vehicle performs actions.
          max: number; // Maximum number of actions available with a full crew complement.
          spent: number; // Spent actions.
          stations: boolean; // Does this vehicle rely on action stations that required individual crewing rather than general crew thresholds?
          thresholds: {
            "2": number; // Minimum crew needed to take full action complement.
            "1": number; // Minimum crew needed to take reduced action complement.
            "0": number; // Minimum crew needed to perform any actions.
          };
        };
        capacity: { // Information on the vehicle's carrying capacity.
          cargo: dnd5e.types.core.UnitValue5e; // Cargo carrying capacity.
        };
        price: {
          value: number|null; // The vehicle's cost in the specified denomination.
          denomination: dnd5e.types.Currency.TypeKey; // The currency denomination.
        };
        quality: {
          value: number; // Quality score of the vehicle's crew.
        };
        travel: dnd5e.types.data.actor.fields.TravelData; // Travel speeds.
      };
      crew: {
        max: number; // The maximum crew complement the vehicle supports.
        value: string[]; // The crew roster.
      };
      details: {
        type: dnd5e.types.VehicleType.TypeKey; // The type of vehicle as defined in DND5E.vehicleTypes.
      };
      draft: {
        value: string[]; // The draft animals pulling the vehicle.
      };
      passengers: {
        max: number; // The maximum number of passengers the vehicle supports.
        value: string[]; // The passenger manifest.
      };
      source: dnd5e.types.data.shared.SourceData; // Adventure or sourcebook where this vehicle originated.
      traits: {
        weight: dnd5e.types.core.UnitValue5e; // The vehicle's weight.
        keel: dnd5e.types.core.UnitValue5e; // The vehicle's keel length.
        beam: dnd5e.types.core.UnitValue5e; // The vehicle's beam length.
      };
      }

      interface PassengerData {
      name: string; // Name of individual or type of creature.
      quantity: number; // How many of this creature are onboard?
      }

  }
}

export {};
