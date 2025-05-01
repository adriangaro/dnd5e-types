import SelectChoices from "../../../documents/actor/select-choices.mjs";
import BaseConfigSheet from "../api/base-config-sheet.mjs";

/**
 * Base application for selecting an actor's proficiencies.
 */
declare class TraitsConfig<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends BaseConfigSheet<
  TraitsConfig.MakeRenderContext<RenderContext>,
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
  type MakeRenderContext<Ctx extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      keyPath: string,
      data: any,
      checkbox: foundry.data.fields.DataField.Any,
      choices: SelectChoices.Instance<any> & {
        OTHER: {
          label: string,
          children: SelectChoices.Instance<any>
          otherGroup: boolean
        }
      },
      fields: foundry.data.fields.DataSchema
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