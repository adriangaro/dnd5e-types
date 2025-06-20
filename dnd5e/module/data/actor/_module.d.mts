import _CharacterData from "./character.mjs";
import _GroupData from "./group.mjs";
import _NPCData from "./npc.mjs";
import _VehicleData from "./vehicle.mjs";

export {
  _CharacterData as CharacterData,
  _GroupData as GroupData,
  _NPCData as NPCData,
  _VehicleData as VehicleData,
};
export { default as GroupSystemFlags } from "./group-system-flags.mjs";
export { default as DamageTraitField } from "./fields/damage-trait-field.mjs";
export { default as SimpleTraitField } from "./fields/simple-trait-field.mjs";
export { default as AttributesFields } from "./templates/attributes.mjs";
export { default as CommonTemplate } from "./templates/common.mjs";
export { default as CreatureTemplate } from "./templates/creature.mjs";
export { default as DetailsFields } from "./templates/details.mjs";
export { default as TraitsFields } from "./templates/traits.mjs";

export const config: {
  character: typeof _CharacterData,
  group: typeof _GroupData,
  npc: typeof _NPCData,
  vehicle: typeof _VehicleData
};
declare global {
  namespace dnd5e.types {
    namespace DataModelConfig {
      interface Actor {
      }
    }
  }
}

declare module "fvtt-types/configuration" {
  interface DataModelConfig {
    Actor: fvttUtils.InterfaceToObject<dnd5e.types.DataModelConfig.Actor>,
  }
}
