import BaseConfigSheet from "../actor/api/base-config-sheet.mjs";
import type { CreateInputFunction } from "../fields.d.mts";

/**
 * Configuration application for an actor or species's movement & senses.
 */
declare class MovementSensesConfig<
  Type extends 'movement' | 'senses' = 'movement' | 'senses',
  Document extends MovementSensesConfig.ValidDocument = MovementSensesConfig.ValidDocument,
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends BaseConfigSheet<
  Document,
  MovementSensesConfig.MakeRenderContext<RenderContext, Document>,
  MovementSensesConfig.MakeConfiguration<Configuration>,
  MovementSensesConfig.MakeRenderOptions<RenderOptions>
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

declare namespace MovementSensesConfig {
  type ValidDocument = Extract<Actor.OfType<Actor.SubType>, { system: { senses: any } }>

  type MakeRenderContext<Ctx extends fvttUtils.AnyObject = {}, Document extends ValidDocument = ValidDocument> = dnd5e.types.DeepMerge<
    Ctx,
    {
      data: dnd5e.types.GetTypeFromPath<Document, 'system._source.attributes.concentration'>
      fields: dnd5e.types.GetTypeFromPath<Document, 'system.schema.fields.attributes.fields.concentration.fields'>,
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
    }
  >

  type RenderContext = MovementSensesConfig['__RenderContext'];

  type MakeConfiguration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    Cfg,
    {
      // No specific configuration properties identified
    }
  >

  type Configuration = MovementSensesConfig['__Configuration'];

  type MakeRenderOptions<Opts extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    Opts,
    {
      // No specific render options identified
    }
  >

  type RenderOptions = MovementSensesConfig['__RenderOptions'];
}

export default MovementSensesConfig;
