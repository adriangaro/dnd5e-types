/** Configuration application for an actor's creature type. */

import BaseConfigSheet from "../actor/api/base-config-sheet.mjs";

declare class CreatureTypeConfig<
  Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation,
  RenderContext extends object = CreatureTypeConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<Document> = CreatureTypeConfig.Configuration<Document>,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = CreatureTypeConfig.RenderOptions,
> extends BaseConfigSheet<Document, RenderContext, Configuration, RenderOptions> {
  /** @override */
  get title(): string;

  /**
   * Return a reference to the Actor. Either the NPCs themselves if they are being edited, otherwise the parent Actor
   * if a race Item is being edited.
   */
  get actor(): globalThis.Actor.Implementation;
}

declare namespace CreatureTypeConfig {
  interface Any extends CreatureTypeConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof CreatureTypeConfig<any, any, any, any>> {}

  interface RenderContext<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends BaseConfigSheet.RenderContext<Document> {
    data: dnd5e.types.CreatureTypeData;
    fields: foundry.data.fields.DataSchema;
    keyPath: string;
    swarmOptions: { value: dnd5e.types.ActorSize.TypeKey | ""; label: string }[];
    typeOptions: { value: dnd5e.types.Creature.TypeKey; label: string; selected: boolean }[];
    custom?: {
      enabled: boolean;
      selected: boolean;
    };
    rows: number;
    preview: string;
  }
  interface Configuration<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends BaseConfigSheet.Configuration<Document> {}
  interface RenderOptions extends BaseConfigSheet.RenderOptions {}
}

export default CreatureTypeConfig;
