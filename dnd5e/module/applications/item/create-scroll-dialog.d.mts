import Dialog5e from "../api/dialog.mjs";
import Item5e from "../../documents/item.mjs";
import type Application5e from "../api/application.d.mts";

/**
 * Configuration options for scroll creation.
 */
interface SpellScrollConfiguration {
    explanation: string;
    level: number;
    bonus?: number; // Based on context. Could be optional.
    dc?: number; // Based on context. Could be optional.
}

/**
 * Application for configuration spell scroll creation.
 */
export default class CreateScrollDialog extends Dialog5e<{
  anchor: string,
  config: Item5e.SpellScrollConfiguration,
  fields: Application5e.FieldsConfig[]
  values: {
    bonus: foundry.data.fields.DataField.Any
    dc: foundry.data.fields.DataField.Any
  }
  valuePlaceholders: dnd5e.types.DND5EConfig['spellScrollValues'][number]
}, {
  config: Item5e.SpellScrollConfiguration,
  spell: Item.OfType<'spell'>
}, {
  
}> {
    /* -------------------------------------------- */
    /*  Properties                                  */
    /* -------------------------------------------- */

    /**
     * Configuration options for scroll creation.
     */
    #config: Item5e.SpellScrollConfiguration | null;

    get config(): Item5e.SpellScrollConfiguration | null;

    /* -------------------------------------------- */

    /**
     * Spell from which the scroll will be created.
     */
    #spell: Item.OfType<'spell'> | object | null;

    get spell(): Item.OfType<'spell'> | object | null;

    /* -------------------------------------------- */
    /*  Rendering                                   */
    /* -------------------------------------------- */

   
    /* -------------------------------------------- */
    /*  Event Listeners and Handlers                */
    /* -------------------------------------------- */

    /**
     * Handle submission of the dialog using the form buttons.
     * @param event    The form submission event.
     * @param form       The submitted form.
     * @param formData  Data from the dialog.
     */
    static #handleFormSubmission(this: CreateScrollDialog, event: Event | SubmitEvent, form: HTMLFormElement, formData: FormDataExtended): Promise<void>;

    /* -------------------------------------------- */
    /*  Factory Methods                             */
    /* -------------------------------------------- */

    /**
     * Display the create spell scroll dialog.
     * @param spell              The spell or item data to be made into a scroll.
     * @param config  Configuration options for scroll creation.
     * @param options              Additional options for the application.
     * @returns Form data object with results of the dialog.
     */
    static create(spell: Item5e | object, config: SpellScrollConfiguration, options?: object): Promise<SpellScrollConfiguration | null>;
}
