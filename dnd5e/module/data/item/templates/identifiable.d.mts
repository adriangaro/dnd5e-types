import SystemDataModel from "../../abstract.mjs";

/**
 * Data model template for items that can be identified.
 *
 * @mixin
 */
export default class IdentifiableTemplate extends SystemDataModel<{
  identified: foundry.data.fields.BooleanField<{required: true, initial: true, label: "DND5E.Identified"}>,
  unidentified: foundry.data.fields.SchemaField<{
    name: foundry.data.fields.StringField<{label: "DND5E.NameUnidentified"}>,
    description: foundry.data.fields.HTMLField<{label: "DND5E.DescriptionUnidentified"}>
  }>
}> {

  /* -------------------------------------------- */
  /*  Migrations                                  */
  /* -------------------------------------------- */

  /**
   * Move unidentified description into new location.
   */
  static #migrateUnidentified(source: IdentifiableTemplate['_source'])

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /**
   * Prepare the unidentified name for the item.
   */
  prepareIdentifiable()

  /* -------------------------------------------- */
  /*  Socket Event Handlers                       */
  /* -------------------------------------------- */

  /**
   * If no unidentified name or description are set when the identified checkbox is unchecked, then fetch values
   * from base item if possible.
   * @see {Document#_preUpdate}
   * @protected
   */
  preUpdateIdentifiable(changed: object, options: object, user: User.Implementation): Promise<boolean | void>
}
