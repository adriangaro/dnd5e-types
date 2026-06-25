/** Sheet for the attack activity. */

import ActivitySheet from "./activity-sheet.mjs";

declare class AttackSheet<
  Document extends dnd5e.types.Activity.Instance = dnd5e.types.Activity.OfType<"attack">,
  RenderContext extends object = AttackSheet.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = AttackSheet.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = AttackSheet.RenderOptions,
> extends ActivitySheet<Document, RenderContext, Configuration, RenderOptions> {}

declare namespace AttackSheet {
  interface Any extends AttackSheet<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AttackSheet<any, any, any, any>> {}

  interface RenderContext<Document extends dnd5e.types.Activity.Instance = dnd5e.types.Activity.OfType<"attack">>
    extends ActivitySheet.RenderContext<Document> {
    hasBaseDamage: boolean;
    abilityOptions: foundry.applications.fields.FormSelectOption[];
    attackTypeOptions: foundry.applications.fields.FormSelectOption[];
    attackClassificationOptions: foundry.applications.fields.FormSelectOption[];
  }
  interface Configuration extends ActivitySheet.Configuration {}
  interface RenderOptions extends ActivitySheet.RenderOptions {}
}

export default AttackSheet;
