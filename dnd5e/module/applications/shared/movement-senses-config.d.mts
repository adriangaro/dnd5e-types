import BaseConfigSheet from "../actor/api/base-config-sheet.mjs";
import type { CreateInputFunction } from "../fields.d.mts";

/**
 * Configuration application for an actor or species's movement & senses.
 */
export default class MovementSensesConfig extends BaseConfigSheet<
  {
    data: any
    fields: foundry.data.fields.DataSchema,
    extras: {
      field: foundry.data.fields.DataField,
      input: (field: foundry.data.fields.DataField, config: foundry.applications.fields.FormInputConfig<any>) => HTMLElement,
      value: any
    }[],
    types: {
      field: foundry.data.fields.DataField,
      value: any,
      placeholder: string
    }[],
    unitsOptions: ({ value: string, label: string } | { rule: true })[]
  },
  {},
  {}
> {


  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Path to the movement or senses data on the document.
   */
  get keyPath(): string


  /* -------------------------------------------- */

  /**
   * Specific types measured, depending on trait type and actor type.
   */
  get types(): dnd5e.types.Senses.TypeKey[] | dnd5e.types.Movement.TypeKey[] | ["land", "water", "air"]

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /**
   * Prepare the additional fields listed in the form.
   * @param {ApplicationRenderContext} context  Context being prepared.
   * @returns {object[]}
   * @protected
   */
  _prepareExtraFields(context: this['__RenderContext']): {
    field: foundry.data.fields.DataField,
    input: CreateInputFunction,
    value: any
  }[]
}
