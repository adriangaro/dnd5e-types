/** Configuration application for an NPC's treasure categories. */

import BaseConfigSheet from "../api/base-config-sheet.mjs";

declare class TreasureConfig<
  Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation,
  RenderContext extends object = TreasureConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<Document> = TreasureConfig.Configuration<Document>,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = TreasureConfig.RenderOptions,
> extends BaseConfigSheet<Document, RenderContext, Configuration, RenderOptions> {}

declare namespace TreasureConfig {
  interface Any extends TreasureConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof TreasureConfig<any, any, any, any>> {}

  interface RenderContext<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends BaseConfigSheet.RenderContext<Document> {
    treasure: { label: string; name: dnd5e.types.Treasure.TypeKey; checked: boolean; disabled?: boolean }[];
  }
  interface Configuration<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends BaseConfigSheet.Configuration<Document> {}
  interface RenderOptions extends BaseConfigSheet.RenderOptions {}
}

export default TreasureConfig;
