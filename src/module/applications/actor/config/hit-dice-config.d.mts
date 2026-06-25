/** Configuration application for adjusting hit dice amounts and rolling. */

import BaseConfigSheet from "../api/base-config-sheet.mjs";
import type ClassData from "../../../data/item/class.d.mts";

declare class HitDiceConfig<
  Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation,
  RenderContext extends object = HitDiceConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<Document> = HitDiceConfig.Configuration<Document>,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = HitDiceConfig.RenderOptions,
> extends BaseConfigSheet<Document, RenderContext, Configuration, RenderOptions> {
  get title(): string;
}

declare namespace HitDiceConfig {
  interface Any extends HitDiceConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof HitDiceConfig<any, any, any, any>> {}

  interface RenderContext<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends BaseConfigSheet.RenderContext<Document> {
    classes: {
      data: ClassData.DerivedData["hd"];
      denomination: number;
      id: string;
      label: string;
    }[];
  }
  interface Configuration<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends BaseConfigSheet.Configuration<Document> {}
  interface RenderOptions extends BaseConfigSheet.RenderOptions {}
}

export default HitDiceConfig;
