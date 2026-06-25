/**
 * dnd5e's custom form-input factories, surfaced in every 5e application's render context as
 * `inputs` (merged over `foundry.applications.fields`). See {@link ApplicationV2Mixin.RenderContext}.
 */

import type IdentifierInputElement from "./components/identifier-input.d.mts";

declare global {
  namespace dnd5e.types {
    /** Extra config for {@link createIdentifierInput}. */
    interface IdentifierInputConfig {
      types: string[];
    }
  }
}

/** Signature shared by the input-factory functions. */
export type CreateInputFunction = fvttUtils.ToMethod<
  (
    field: foundry.data.fields.DataField.Any,
    config: foundry.applications.fields.FormInputConfig<any>,
  ) => HTMLElement | HTMLCollection
>;

/** Create a checkbox input for a BooleanField. */
export function createCheckboxInput(
  field: foundry.data.fields.BooleanField<any, any, any, any>,
  config: foundry.applications.fields.FormInputConfig<boolean>,
): HTMLElement;

/** Create an identifier input for an IdentifierField. */
export function createIdentifierInput(
  config: foundry.applications.fields.FormInputConfig<string> & dnd5e.types.IdentifierInputConfig,
): IdentifierInputElement;

/** Create a grid of checkboxes. */
export function createMultiCheckboxInput(
  field: foundry.data.fields.DataField.Any,
  config: foundry.applications.fields.FormInputConfig<any> & { options?: foundry.applications.fields.FormSelectOption[] },
): HTMLCollection;

/** Create a number input for a NumberField. */
export function createNumberInput(
  field: foundry.data.fields.NumberField,
  config: foundry.applications.fields.FormInputConfig<number>,
): HTMLElement | HTMLCollection;

/** Create a text input for a StringField. */
export function createTextInput(
  field: foundry.data.fields.StringField,
  config: foundry.applications.fields.FormInputConfig<string>,
): HTMLElement | HTMLCollection;
