/**
 * Item `type.subtype` domains. Each item type's subtypes are split into the SAME per-category
 * registries dnd5e uses (consumable → Ammo/Poison, feature → Class/Enchantment/Feat/SupernaturalGift,
 * facility → Basic/Special), every one an independent Seam-A domain you can widen on its own:
 *
 *   declare global { namespace dnd5e.types.ConsumableType.Ammo {
 *     interface OverrideTypes { plasmaBolt: true }
 *   } }
 *
 * The model's `subtype` field is typed to `<Domain>.Subtype.TypeKey | ""` — the UNION of every
 * category (so a per-category widening flows through automatically) plus a generic `Subtype.Override`
 * escape for subtypes that don't belong to a built-in category. No discriminated value↔subtype
 * coupling (the runtime doesn't enforce it) — just strict, autocompleted, per-category-expandable keys.
 */

declare global {
  namespace dnd5e.types {
    /* ---------- consumable ---------- */
    namespace ConsumableType {
      namespace Ammo {
        interface DefaultTypes {
          arrow: true;
          crossbowBolt: true;
          energyCell: true;
          firearmBullet: true;
          slingBullet: true;
          blowgunNeedle: true;
        }
        interface OverrideTypes extends Record<string, boolean | never> {}
        type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }
      namespace Poison {
        interface DefaultTypes {
          contact: true;
          ingested: true;
          inhaled: true;
          injury: true;
        }
        interface OverrideTypes extends Record<string, boolean | never> {}
        type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }
      /** Flat union of every consumable subtype category, + a generic escape. */
      namespace Subtype {
        interface OverrideTypes extends Record<string, boolean | never> {}
        type TypeKey =
          | dnd5e.types.ConsumableType.Ammo.TypeKey
          | dnd5e.types.ConsumableType.Poison.TypeKey
          | dnd5e.types.ExtractKeys<dnd5e.types.MergeOverrideDefinition<{}, OverrideTypes>>;
      }
    }

    /* ---------- feat / feature ---------- */
    namespace FeatureType {
      namespace Class {
        interface DefaultTypes {
          arcaneShot: true;
          artificerInfusion: true;
          channelDivinity: true;
          defensiveTactic: true;
          eldritchInvocation: true;
          elementalDiscipline: true;
          fightingStyle: true;
          huntersPrey: true;
          ki: true;
          maneuver: true;
          metamagic: true;
          multiattack: true;
          pact: true;
          psionicPower: true;
          rune: true;
          superiorHuntersDefense: true;
        }
        interface OverrideTypes extends Record<string, boolean | never> {}
        type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }
      namespace Enchantment {
        interface DefaultTypes {
          artificerInfusion: true;
          rune: true;
        }
        interface OverrideTypes extends Record<string, boolean | never> {}
        type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }
      namespace Feat {
        interface DefaultTypes {
          epicBoon: true;
          fightingStyle: true;
          general: true;
          origin: true;
        }
        interface OverrideTypes extends Record<string, boolean | never> {}
        type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }
      namespace SupernaturalGift {
        interface DefaultTypes {
          blessing: true;
          charm: true;
          epicBoon: true;
        }
        interface OverrideTypes extends Record<string, boolean | never> {}
        type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }
      /** Flat union of every feature subtype category, + a generic escape. */
      namespace Subtype {
        interface OverrideTypes extends Record<string, boolean | never> {}
        type TypeKey =
          | dnd5e.types.FeatureType.Class.TypeKey
          | dnd5e.types.FeatureType.Enchantment.TypeKey
          | dnd5e.types.FeatureType.Feat.TypeKey
          | dnd5e.types.FeatureType.SupernaturalGift.TypeKey
          | dnd5e.types.ExtractKeys<dnd5e.types.MergeOverrideDefinition<{}, OverrideTypes>>;
      }
    }

    /* ---------- facility ---------- */
    namespace Facility {
      namespace Basic {
        interface DefaultTypes {
          bedroom: true;
          courtyard: true;
          diningRoom: true;
          kitchen: true;
          parlor: true;
          storage: true;
        }
        interface OverrideTypes extends Record<string, boolean | never> {}
        type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }
      namespace Special {
        interface DefaultTypes {
          arcaneStudy: true;
          archive: true;
          armory: true;
          barrack: true;
          demiplane: true;
          gamingHall: true;
          garden: true;
          greenhouse: true;
          guildhall: true;
          laboratory: true;
          library: true;
          meditationChamber: true;
          menagerie: true;
          observatory: true;
          pub: true;
          reliquary: true;
          sacristy: true;
          sanctuary: true;
          sanctum: true;
          scriptorium: true;
          smithy: true;
          stable: true;
          storehouse: true;
          teleportationCircle: true;
          theater: true;
          trainingArea: true;
          trophyRoom: true;
          warRoom: true;
          workshop: true;
        }
        interface OverrideTypes extends Record<string, boolean | never> {}
        type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }
      /** Flat union of basic + special facility subtypes, + a generic escape. */
      namespace Subtype {
        interface OverrideTypes extends Record<string, boolean | never> {}
        type TypeKey =
          | dnd5e.types.Facility.Basic.TypeKey
          | dnd5e.types.Facility.Special.TypeKey
          | dnd5e.types.ExtractKeys<dnd5e.types.MergeOverrideDefinition<{}, OverrideTypes>>;
      }
    }

    /* ---------- loot (no vanilla subtypes; fully open) ---------- */
    namespace LootType {
      namespace Subtype {
        interface OverrideTypes extends Record<string, boolean | never> {}
        type TypeKey = dnd5e.types.ExtractKeys<dnd5e.types.MergeOverrideDefinition<{}, OverrideTypes>>;
      }
    }
  }
}

export {};
