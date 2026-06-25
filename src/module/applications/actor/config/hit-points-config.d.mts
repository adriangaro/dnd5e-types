/** Configuration application for hit point bonuses and current values. */

import BaseConfigSheet from "../api/base-config-sheet.mjs";
import PropertyAttribution from "../../property-attribution.mjs";

declare class HitPointsConfig<
  Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation,
  RenderContext extends object = HitPointsConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<Document> = HitPointsConfig.Configuration<Document>,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = HitPointsConfig.RenderOptions,
> extends BaseConfigSheet<Document, RenderContext, Configuration, RenderOptions> {
  get title(): string;
}

declare namespace HitPointsConfig {
  interface Any extends HitPointsConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof HitPointsConfig<any, any, any, any>> {}

  interface RenderContext<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends BaseConfigSheet.RenderContext<Document> {
    data: object;
    fields: object;
    source: object;
    ability?: { mod: number; name: string };
    classes: { id: string; anchor: string; name: string; total: number }[];
    effects: {
      bonuses: (PropertyAttribution.AttributionDescription & { anchor: string })[];
      max: (PropertyAttribution.AttributionDescription & { anchor: string })[];
      overall: (PropertyAttribution.AttributionDescription & { anchor: string })[];
    };
    levels: number;
    levelMultiplier: string;
    showCalculation: number | foundry.data.fields.DataField.Any | false;
    showMaxInCalculation: boolean;
    otherFields: { field: foundry.data.fields.DataField.Any; value: unknown }[];
  }
  interface Configuration<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends BaseConfigSheet.Configuration<Document> {}
  interface RenderOptions extends BaseConfigSheet.RenderOptions {}
}

export default HitPointsConfig;
