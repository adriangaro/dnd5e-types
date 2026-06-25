/** Configuration application for actor's damage resistances, immunities, and vulnerabilities. */

import { FormulaField } from "../../../data/fields/formula-field.mjs";
import SelectChoices from "../../../documents/actor/select-choices.mjs";
import TraitsConfig from "./traits-config.mjs";
import type { CreateInputFunction } from "../../fields.mjs";

declare class DamagesConfig<
  Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation,
  RenderContext extends object = DamagesConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<Document> = DamagesConfig.Configuration<Document>,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = DamagesConfig.RenderOptions,
> extends TraitsConfig<Document, RenderContext, Configuration, RenderOptions> {
  /** Label used for the "other" category. */
  get otherLabel(): string;
}

declare namespace DamagesConfig {
  interface Any extends DamagesConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof DamagesConfig<any, any, any, any>> {}

  interface RenderContext<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends TraitsConfig.RenderContext<Document> {
    bypasses: SelectChoices;
    value: {
      field: foundry.data.fields.DataField.Any | FormulaField;
      key: "amount" | "value";
      input?: CreateInputFunction;
    };
    bypassHint: string;
    hint?: string;
  }
  interface Configuration<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends TraitsConfig.Configuration<Document> {}
  interface RenderOptions extends TraitsConfig.RenderOptions {}
}

export default DamagesConfig;
