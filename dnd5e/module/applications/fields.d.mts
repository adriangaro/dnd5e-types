import type { FormInputConfig, SelectInputConfig } from "node_modules/fvtt-types/src/foundry/client-esm/applications/forms/fields.d.mts";
export type CreateInputFunction = fvttUtils.ToMethod<(field: foundry.data.fields.DataField.Any, config: FormInputConfig<any>) => HTMLElement | HTMLCollection>

/**
 * Create a checkbox input for a BooleanField.
 */
export function createCheckboxInput(
  field: foundry.data.fields.BooleanField<any, any, any, any>, 
  config: FormInputConfig<boolean>
): HTMLElement
/* -------------------------------------------- */

/**
 * Create a grid of checkboxes.
 */
export function createMultiCheckboxInput(
  field: foundry.data.fields.DataField,
  config: SelectInputConfig
): HTMLCollection

/* -------------------------------------------- */

/**
 * Create a number input for a NumberField.
 */
export function createNumberInput(
  field: foundry.data.fields.NumberField, 
  config: FormInputConfig<number>
): HTMLElement | HTMLCollection

/* -------------------------------------------- */

/**
 * Create a text input for a StringField.
 */
export function createTextInput(
  field: foundry.data.fields.StringField, 
  config: FormInputConfig<string>
): HTMLElement | HTMLCollection
