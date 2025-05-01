import ActivitySheet from "./activity-sheet.mjs";

/**
 * Sheet for the attack activity.
 */
export default class AttackSheet extends ActivitySheet<
  dnd5e.types.Activity.OfType<'attack'>, 
  {
    hasBaseDamage: boolean
    abilityOptions: dnd5e.types.FormSelectOption[]
    attackTypeOptions: dnd5e.types.FormSelectOption[]
    attackClassificationOptions: dnd5e.types.FormSelectOption[]
  }, 
  {

  },
  {
    
  }
> {}
