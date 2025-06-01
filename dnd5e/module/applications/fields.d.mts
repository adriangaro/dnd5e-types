export type CreateInputFunction = fvttUtils.ToMethod<(field: foundry.data.fields.DataField.Any, config: foundry.applications.fields.FormInputConfig<any>) => HTMLElement | HTMLCollection>

/**
 * Create a checkbox input for a BooleanField.
 */
export function createCheckboxInput(
  field: foundry.data.fields.BooleanField<any, any, any, any>, 
  config: foundry.applications.fields.FormInputConfig<boolean>
): HTMLElement
/* -------------------------------------------- */

/**
 * Create a grid of checkboxes.
 */
export function createMultiCheckboxInput(
  field: foundry.data.fields.DataField,
  config: foundry.applications.fields.SelectInputConfig
): HTMLCollection

/* -------------------------------------------- */

/**
 * Create a number input for a NumberField.
 */
export function createNumberInput(
  field: foundry.data.fields.NumberField, 
  config: foundry.applications.fields.FormInputConfig<number>
): HTMLElement | HTMLCollection

/* -------------------------------------------- */

/**
 * Create a text input for a StringField.
 */
export function createTextInput(
  field: foundry.data.fields.StringField, 
  config: foundry.applications.fields.FormInputConfig<string>
): HTMLElement | HTMLCollection
