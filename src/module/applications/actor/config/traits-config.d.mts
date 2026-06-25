/** Base application for selecting an actor's proficiencies. */

import SelectChoices from "../../../documents/actor/select-choices.mjs";
import BaseConfigSheet from "../api/base-config-sheet.mjs";

declare class TraitsConfig<
  Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation,
  RenderContext extends object = TraitsConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<Document> = TraitsConfig.Configuration<Document>,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = TraitsConfig.RenderOptions,
> extends BaseConfigSheet<Document, RenderContext, Configuration, RenderOptions> {
  /** Label used for the "other" category. */
  get otherLabel(): string;

  /**
   * Processes the choices to ensure that children are checked if the category is checked and that
   * masteries are only enabled if character has proficiency.
   * @param data            Traits data.
   * @param choices         Choices object.
   * @param categoryChosen  Is the category above this one selected?
   */
  protected _processChoices(data: object, choices: SelectChoices, categoryChosen?: boolean): void;

  /**
   * Perform any modification on a choice.
   * @param data            Traits data.
   * @param key             Choice key.
   * @param choice          Data for the choice.
   * @param categoryChosen  Is the category above this one selected?
   */
  protected _processChoice(data: object, key: string, choice: object, categoryChosen?: boolean): void;

  /**
   * Filter and order list of traits before submission.
   * @param submitData  Form submission data.
   * @param keyPath     Path to the trait to modify.
   */
  protected _filterData(submitData: object, keyPath: string): void;
}

declare namespace TraitsConfig {
  interface Any extends TraitsConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof TraitsConfig<any, any, any, any>> {}

  interface RenderContext<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends Omit<BaseConfigSheet.RenderContext<Document>, "fields"> {
    keyPath: string;
    data: object;
    checkbox: foundry.data.fields.BooleanField;
    choices: SelectChoices & { OTHER?: { label: string; children: SelectChoices; otherGroup: boolean } };
    fields?: Record<string, foundry.data.fields.DataField.Any>;
  }
  interface Configuration<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends BaseConfigSheet.Configuration<Document> {
    trait: dnd5e.types.Trait.TypeKey | null;
  }
  interface RenderOptions extends BaseConfigSheet.RenderOptions {}
}

export default TraitsConfig;
