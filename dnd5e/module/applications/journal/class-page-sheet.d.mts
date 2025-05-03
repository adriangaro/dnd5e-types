
//TODO foundry.appv1?.sheets?.JournalPageSheet
/**
 * Journal entry page that displays an automatically generated summary of a class along with additional description.
 */
export default class JournalClassPageSheet extends JournalPageSheet {

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */
  /**
   * Whether this page represents a class or subclass.
   */
  get type(): string;

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /**
   * Prepare features granted by various advancement types.
   * @param {Item5e} item                  Class item belonging to this journal.
   * @param {object} options
   * @param {boolean} options.modernStyle  Is the modern style being displayed?
   * @returns {object}                     Prepared advancement section.
   * @protected
   */
  _getAdvancement(item: Item.Implementation, options: { modernStyle: boolean }): object;

  /* -------------------------------------------- */

  /**
   * Enrich all of the entries within the descriptions object on the sheet's system data.
   * @param {JournalEntryPage} page  Journal page being enriched.
   * @returns {Promise<object>}      Object with enriched descriptions.
   * @protected
   */
  _getDescriptions(page: JournalEntryPage): Promise<object>;

  /* -------------------------------------------- */

  /**
   * Prepare table based on non-optional GrantItem advancement & ScaleValue advancement.
   * @param {Item5e} item                      Class item belonging to this journal.
   * @param {object} options
   * @param {number} [options.initialLevel=1]  Level at which the table begins.
   * @param {boolean} options.modernStyle      Is the modern style being displayed?
   * @returns {object}                         Prepared table.
   * @protected
   */
  _getTable(item: Item.Implementation, options?: { initialLevel?: number; modernStyle: boolean }): Promise<object>;

  /* -------------------------------------------- */

  /**
   * Build out the spell progression data.
   * @param {Item5e} item  Class item belonging to this journal.
   * @returns {object}     Prepared spell progression table.
   * @protected
   */
  _getSpellProgression(item: Item.Implementation): Promise<object | null>;

  /* -------------------------------------------- */

  /**
   * Prepare options table based on optional GrantItem advancement.
   * @param {Item5e} item                  Class item belonging to this journal.
   * @param {object} options
   * @param {boolean} options.modernStyle  Is the modern style being displayed?
   * @returns {object|null}                Prepared optional features table.
   * @protected
   */
  _getOptionalTable(item: Item.Implementation, options: { modernStyle: boolean }): Promise<object | null>;

  /* -------------------------------------------- */

  /**
   * Fetch data for each class feature listed.
   * @param {Item5e} item                       Class or subclass item belonging to this journal.
   * @param {object} options
   * @param {boolean} options.modernStyle       Is the modern style being displayed?
   * @param {boolean} [options.optional=false]  Should optional features be fetched rather than required features?
   * @returns {object[]}   Prepared features.
   * @protected
   */
  _getFeatures(item: Item.Implementation, options?: { modernStyle: boolean; optional?: boolean }): Promise<object[]>;

  /* -------------------------------------------- */

  /**
   * Fetch each subclass and their features.
   * @param {string[]} uuids   UUIDs for the subclasses to fetch.
   * @returns {object[]|null}  Prepared subclasses.
   * @protected
   */
  _getSubclasses(uuids: string[]): Promise<{
    document: Item.Implementation,
    name: string,
    description: string
  }[] | null>;

  /* -------------------------------------------- */

  /**
   * Prepare data for the provided subclass.
   * @param {Item5e} item  Subclass item being prepared.
   * @returns {object}     Presentation data for this subclass.
   * @protected
   */
  _getSubclass(item: Item.Implementation): Promise<{
    document: Item.Implementation,
    name: string,
    description: string
  }>;

  /* -------------------------------------------- */
  /*  Event Handlers                              */
  /* -------------------------------------------- */


  /* -------------------------------------------- */

  /**
   * Handle deleting a dropped item.
   * @param {Event} event  The triggering click event.
   * @returns {JournalClassSummary5ePageSheet}
   */
  _onDeleteItem(event: Event): Promise<JournalClassPageSheet | void>;

  /* -------------------------------------------- */

  /**
   * Handle launching the individual text editing window.
   * @param {Event} event  The triggering click event.
   */
  _onLaunchTextEditor(event: Event): void;
}
