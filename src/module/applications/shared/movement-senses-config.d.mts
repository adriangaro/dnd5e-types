/** Configuration application for an actor or species's movement & senses. */

import BaseConfigSheet from "../actor/api/base-config-sheet.mjs";

declare class MovementSensesConfig<
  Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation,
  RenderContext extends object = MovementSensesConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<Document> = MovementSensesConfig.Configuration<Document>,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = MovementSensesConfig.RenderOptions,
> extends BaseConfigSheet<Document, RenderContext, Configuration, RenderOptions> {
  /** Path to the movement or senses data on the document. */
  get keyPath(): string;

  /** Location of the specific distances within the data. */
  get subPath(): string | null;

  get title(): string;

  /** Specific types measured, depending on trait type and actor type. */
  get types(): string[];

  /**
   * Prepare the additional fields listed in the form.
   * @param context  Context being prepared.
   */
  _prepareExtraFields(context: RenderContext): object[];

  /**
   * Prepare travel-specific fields.
   * @param context  Context being prepared.
   */
  _prepareTravelFields(context: RenderContext): void;
}

declare namespace MovementSensesConfig {
  interface Any extends MovementSensesConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof MovementSensesConfig<any, any, any, any>> {}

  interface RenderContext<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends Omit<BaseConfigSheet.RenderContext<Document>, "fields"> {
    data: object;
    fields?: Record<string, foundry.data.fields.DataField.Any>;
    extras?: { field: foundry.data.fields.DataField.Any; value: unknown; localize: true; options?: ({ value: string; label: string } | { rule: true })[] }[];
    types?: { field: foundry.data.fields.DataField.Any; label: string; name: string; value: unknown; placeholder: unknown }[];
    unitsOptions?: ({ value: string; label: string } | { rule: true })[] & { blank?: boolean };
    hover?: { field: foundry.data.fields.DataField.Any; input: (...args: unknown[]) => HTMLElement; value: unknown; localize: true };
    travel?: {
      data: object;
      extras: { field: foundry.data.fields.DataField.Any; value: unknown; localize: true; options?: { value: string; label: string }[] }[];
      fields: Record<string, foundry.data.fields.DataField.Any>;
      unitsOptions: { value: string; label: string }[];
      types: { label: string; pace: { field: foundry.data.fields.DataField.Any; name: string; placeholder: unknown; value: unknown }; speed: { field: foundry.data.fields.DataField.Any; name: string; placeholder: unknown; value: unknown } }[];
    };
    legend?: string;
  }
  interface Configuration<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends BaseConfigSheet.Configuration<Document> {
    type: "movement" | "senses" | null;
    keyPath: string | null;
  }
  interface RenderOptions extends BaseConfigSheet.RenderOptions {}
}

export default MovementSensesConfig;
