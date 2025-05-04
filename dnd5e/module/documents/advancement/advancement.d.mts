import type AdvancementDataField from "@dnd5e/module/data/fields/advancement-data-field.mjs";
import AdvancementConfig from "../../applications/advancement/advancement-config-v2.mjs";
import AdvancementFlow from "../../applications/advancement/advancement-flow.mjs";
import BaseAdvancement from "../../data/advancement/base-advancement.mjs";
import PseudoDocumentMixin from "../mixins/pseudo-document.mjs";

/**
 * Error that can be thrown during the advancement update preparation process.
 */
declare class AdvancementError extends Error {
  name: "AdvancementError"
}

/**
 * Abstract base class which various advancement types can subclass.
 */
declare class Advancement<
  Type extends string,
  ConfigurationData extends AdvancementDataField.RequiredType,
  ValueData extends AdvancementDataField.RequiredType
> extends PseudoDocumentMixin(BaseAdvancement)<
  Type,
  ConfigurationData,
  ValueData
> {
  apps: Record<string, foundry.applications.api.ApplicationV2>

  /* -------------------------------------------- */

  static ERROR: typeof AdvancementError;

  /* -------------------------------------------- */

  /**
   * Configuration information for this advancement type.
   */
  static get metadata(): Advancement.Metadata
  get metadata(): Advancement.Metadata

  /* -------------------------------------------- */

  /**
   * Perform the pre-localization of this data model.
   */
  static localize()

  /* -------------------------------------------- */
  /*  Instance Properties                         */
  /* -------------------------------------------- */

  /**
   * List of levels in which this advancement object should be displayed. Will be a list of class levels if this
   * advancement is being applied to classes or subclasses, otherwise a list of character levels.
   */
  get levels(): number[]

  /* -------------------------------------------- */

  /**
   * Should this advancement be applied to a class based on its class restriction setting? This will always return
   * true for advancements that are not within an embedded class item.
   */
  get appliesToClass(): boolean

  /* -------------------------------------------- */
  /*  Preparation Methods                         */
  /* -------------------------------------------- */

  /**
   * Prepare data for the Advancement.
   */
  prepareData()

  /* -------------------------------------------- */
  /*  Display Methods                             */
  /* -------------------------------------------- */

  /**
   * Has the player made choices for this advancement at the specified level?
   */
  configuredForLevel(level: number): boolean

  /* -------------------------------------------- */

  /**
   * Value used for sorting this advancement at a certain level.
   */
  sortingValueForLevel(level: number): string

  /* -------------------------------------------- */

  /**
   * Title displayed in advancement list for a specific level.
   */
  titleForLevel(level: number, options?: {
    legacyDisplay?: boolean,
    configMode?: boolean
  }): string

  /* -------------------------------------------- */

  /**
   * Summary content displayed beneath the title in the advancement list.
   */
  summaryForLevel(level: number, options?: {
    legacyDisplay?: boolean,
    configMode?: boolean
  }): string

  /* -------------------------------------------- */
  /*  Editing Methods                             */
  /* -------------------------------------------- */

  /**
   * Can an advancement of this type be added to the provided item?
   */
  static availableForItem(item: Item.Implementation): boolean

  /* -------------------------------------------- */
  /*  Application Methods                         */
  /* -------------------------------------------- */

  /**
   * Locally apply this advancement to the actor.
   */
  apply(level: number, data: this['value']): Promise<any>


  /* -------------------------------------------- */

  /**
   * Retrieves the data to pass to the apply method in order to apply this advancement automatically, if possible.
   */
  automaticApplicationValue(level: number): object | false 

  /* -------------------------------------------- */

  /**
   * Locally apply this advancement from stored data, if possible. If stored data can not be restored for any reason,
   * throw an AdvancementError to display the advancement flow UI.
   */
  restore(level: number, data: this['value']): Promise<any>

  /* -------------------------------------------- */

  /**
   * Locally remove this advancement's changes from the actor.
   */
  reverse(level: number): Promise<object | null | void> 

  /* -------------------------------------------- */

  /**
   * Fetch an item and create a clone with the proper flags.
   */
  createItemData(uuid: string, id?: string): Promise<object | null>

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Construct context menu options for this Activity.
   */
  getContextMenuOptions(): foundry.applications.ux.ContextMenu.Entry<HTMLElement | JQuery>[]

  /* -------------------------------------------- */

  /**
   * Handle context menu events on activities.
   */
  static onContextMenu(item: Item.Implementation, target: HTMLElement)
}

declare class AnyAdvancement extends Advancement<dnd5e.types.Advancement.TypeKey, any, any>{
  constructor(...args: never);
}

declare namespace Advancement {
  interface Any extends AnyAdvancement {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyAdvancement> {}

  interface Metadata extends PseudoDocumentMixin.MixinClass.Metadata {
    name: string,
    label: string,
    dataModels?: {
      configuration?: foundry.abstract.DataModel.AnyConstructor,
      value?: foundry.abstract.DataModel.AnyConstructor
    },
    order: number
    icon: string,
    typeIcon: string,
    title: string,
    hint: string,
    multiLevel: boolean,
    validItemTypes: Set<Item.SubType>,
    apps: {
      config: AdvancementConfig.AnyConstructor
      flow: AdvancementFlow.AnyConstructor
    }
  }
}

export default Advancement