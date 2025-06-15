import SelectChoices from "../../../documents/actor/select-choices.mjs";
import BaseConfigSheet from "../api/base-config-sheet.mjs";

/**
 * Base application for selecting an actor's proficiencies.
 */
declare class TraitsConfig<
  Trait extends dnd5e.types.Trait.TypeKey = dnd5e.types.Trait.TypeKey,
  Document extends TraitsConfig.ValidDocument<Trait> = TraitsConfig.ValidDocument<Trait>,
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends BaseConfigSheet<
  Document,
  TraitsConfig.MakeRenderContext<RenderContext, Trait, Document>,
  TraitsConfig.MakeConfiguration<Configuration>,
  TraitsConfig.MakeRenderOptions<RenderOptions>
> {
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */
  /**
   * Label used for the "other" category.
   */
  get otherLabel(): string

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /**
   * Processes the choices to ensure that children are checked if the category is checked and that
   * masteries are only enabled if character has proficiency.
   * @param data                     Traits data.
   * @param choices           Choices object.
   * @param categoryChosen  Is the category above this one selected?
   * @protected
   */
  _processChoices(data: object, choices: SelectChoices.Instance<any>, categoryChosen?: boolean)

  /* -------------------------------------------- */

  /**
   * Perform any modification on a choice.
   * @param data                     Traits data.
   * @param key                      Choice key.
   * @param choice                   Data for the choice.
   * @param categoryChosen  Is the category above this one selected?
   * @protected
   */
  _processChoice(data: object, key: string, choice: object, categoryChosen?: boolean)

  /* -------------------------------------------- */
  /*  Form Submission                             */
  /* -------------------------------------------- */

  /**
   * Filter and order list of traits before submission.
   * @param submitData  Form submission data.
   * @param keyPath     Path to the trait to modify.
   * @protected
   */
  _filterData(submitData: object, keyPath: string)
}

declare namespace TraitsConfig {
  type _PathToObject<T extends string> = T extends `${infer First}.${infer Rest}`
    ? First extends `${infer F}`
    ? { [K in F]: _PathToObject<Rest> }
    : never
    : T extends `${infer F}`
    ? { [K in F]: any }
    : never

  // ValidDocument for traits - checks if the trait path exists
  type ValidDocument<Trait extends dnd5e.types.Trait.TypeKey> = Extract<
    Actor.OfType<Actor.SubType>,
    _PathToObject<dnd5e.types.Trait.TraitKeyPath<Trait>>
  >

  type MapToSchemaPath<T extends string> = T extends `system.${infer Rest}`
    ? MapToSchemaPath<Rest>
    : T extends `${infer First}.${infer Second}`
    ? `${First}.fields.${MapToSchemaPath<Second>}`
    : T

  type MakeRenderContext<
    Ctx extends fvttUtils.AnyObject = {},
    Trait extends dnd5e.types.Trait.TypeKey = dnd5e.types.Trait.TypeKey,
    Document extends ValidDocument<Trait> = ValidDocument<Trait>  
  > = dnd5e.types.DeepMerge<
    {
      keyPath: dnd5e.types.Trait.TraitKeyPath<Trait>,
      data: dnd5e.types.GetTypeFromPath<Document, dnd5e.types.Trait.TraitKeyPath<Trait>>,
      checkbox: foundry.data.fields.DataField.Any,
      choices: SelectChoices.Instance<any> & {
        OTHER: {
          label: string,
          children: SelectChoices.Instance<any>
          otherGroup: boolean
        }
      },
      fields: dnd5e.types.GetTypeFromPath<Document, `system.schema.fields.${MapToSchemaPath<dnd5e.types.Trait.TraitKeyPath<Trait>>}.fields`>
    },
    Ctx
  >
  type RenderContext = TraitsConfig['__RenderContext']

  type MakeConfiguration<
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {

    },
    Cfg
  >
  type Configuration = TraitsConfig['__Configuration']
  type MakeRenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {

    },
    Opt
  >
  type RenderOptions = TraitsConfig['__RenderOptions']

}

export default TraitsConfig;