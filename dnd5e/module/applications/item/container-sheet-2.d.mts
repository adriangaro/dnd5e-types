import ContainerSheet from "./container-sheet.mjs";


declare class ContainerSheet2 extends ContainerSheet {
  /**
   * The container's cached contents.
   * @protected
   */
  _items: Item.Implementation[];


  /**
   * Filter the container's contents based on the current set of filters.
   * @param collection    The embedded collection name.
   * @param filters  Filters to apply to the children.
   * @returns
   * @protected
   */
  _filterChildren(collection: string, filters: Set<string>): Document[];

  /**
   * Filter the container's contents based on the current set of filters.
   * @param items       The Items to filter.
   * @param filters  Filters applied to the Item list.
   * @returns
   * @protected
   */
  _filterItems(items: Item.Implementation[], filters: Set<string>): Item.Implementation[];

  /**
   * Determine whether an Item will be shown based on the current set of filters.
   * @param item          The Item.
   * @param filters  Filters applied to the Item.
   * @returns
   * @protected
   */
  _filterItem(item: Item.Implementation, filters: Set<string>): boolean | void;
}

export default ContainerSheet2;
