/** Dialog with shared resting functionality. */

import Dialog5e from "../../api/dialog.mjs";
import type HitDice from "../../../../documents/actor/hit-dice.mjs";

declare class BaseRestDialog<
  RenderContext extends object = BaseRestDialog.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = BaseRestDialog.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = BaseRestDialog.RenderOptions,
> extends Dialog5e<RenderContext, Configuration, RenderOptions> {
  /** The actor being rested. */
  actor: Actor.Implementation;

  /** The rest configuration. */
  get config(): dnd5e.types.documents.RestConfiguration;

  /** Duration of the rest in minutes. */
  get duration(): number;

  /** Is the resting actor a party? */
  get isPartyGroup(): boolean;

  /** Should the user be prompted as to whether a new day has occurred? */
  get promptNewDay(): boolean;

  /** Was the rest button pressed? */
  get rested(): boolean;

  /** Holds any result data (declared to satisfy `_prepareContext`; always undefined on this base class). */
  result?: unknown;

  /** A helper to handle displaying and responding to the dialog. */
  static configure(
    actor: Actor.Implementation,
    config: dnd5e.types.documents.RestConfiguration,
  ): Promise<dnd5e.types.documents.RestConfiguration>;
}

declare namespace BaseRestDialog {
  interface Any extends BaseRestDialog<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof BaseRestDialog<any, any, any>> {}

  interface RenderContext extends Dialog5e.RenderContext {
    actor: Actor.Implementation;
    config: dnd5e.types.documents.RestConfiguration;
    fields: (dnd5e.applications.api.FieldsConfig & { disabled?: boolean } | { template: string })[];
    hitPoints: (dnd5e.applications.api.FieldsConfig & { disabled?: boolean })[];
    formSections: { legend: string; fields: dnd5e.applications.api.FieldsConfig[] }[];
    result?: unknown;
    hd?: HitDice;
    hp?: foundry.data.fields.SchemaField.InitializedData<dnd5e.types.Actor.Attributes.HitPointsSchema>;
    isGroup: boolean;
    variant: "normal" | "gritty" | "epic";
    duration?: { fields: dnd5e.applications.api.FieldsConfig[]; showSunriseButton: boolean };
    request?: dnd5e.applications.api.FieldsConfig[];
  }
  interface Configuration extends Dialog5e.Configuration {
    config: dnd5e.types.documents.RestConfiguration;
    document: Actor.Implementation;
  }
  interface RenderOptions extends Dialog5e.RenderOptions {}
}

export default BaseRestDialog;
