import BaseConfigSheet from "../actor/api/base-config-sheet.mjs";

/**
 * Configuration application for an actor's creature type.
 */
declare class CreatureTypeConfig<
  Document extends CreatureTypeConfig.ValidDocument = CreatureTypeConfig.ValidDocument,
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends BaseConfigSheet<
  Document,
  CreatureTypeConfig.MakeRenderContext<RenderContext, Document>,
  CreatureTypeConfig.MakeConfiguration<Configuration>,
  CreatureTypeConfig.MakeRenderOptions<RenderOptions>
> {
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Return a reference to the Actor. Either the NPCs themselves if they are being edited, otherwise the parent Actor
   * if a race Item is being edited.
   */
  get actor(): Actor.Implementation
}


declare namespace CreatureTypeConfig {
  type ValidDocument = Extract<Actor.OfType<Actor.SubType>, { system: { details: { type: any } } }>
  type MakeRenderContext<Ctx extends fvttUtils.AnyObject = {}, Document extends ValidDocument = ValidDocument> = dnd5e.types.DeepMerge<
    Ctx,
    {
      data: any
      fields: foundry.data.fields.DataSchema,
      keyPath: string,
      swarmOptions: ({ value: string, label: string })[]
      typeOptions: ({ value: dnd5e.types.Creature.TypeKey, label: string, selected: boolean })[]
      custom?: {
        enabled: boolean,
        selected: boolean
      },
      rows: number,
      preview: string
    }
  >

  type RenderContext = CreatureTypeConfig['__RenderContext'];

  type MakeConfiguration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    Cfg,
    {
      // No specific configuration properties identified
    }
  >

  type Configuration = CreatureTypeConfig['__Configuration'];

  type MakeRenderOptions<Opts extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    Opts,
    {
      // No specific render options identified
    }
  >

  type RenderOptions = CreatureTypeConfig['__RenderOptions'];

}

export default CreatureTypeConfig;
