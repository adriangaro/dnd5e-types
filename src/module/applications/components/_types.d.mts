/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/applications/components/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.applications.components {
      interface InventorySectionDescriptor {
      id: string; // The section identifier.
      order: number; // Sections are displayed in ascending order of this value.
      groups: Record<string, string>; // Group identifiers that this section belongs to.
      label: string; // The name of the section. Will be localized.
      minWidth?: number; // The minimum width of the primary column in this section. If the section is resized such that the primary column would be smaller than this width, secondary columns are hidden in order to retain this minimum.
      columns: (string|InventoryColumnDescriptor)[]; // A list of column descriptors or IDs of well-known columns.
      dataset?: Record<string, string>; // Section data stored in the DOM.
      }

      interface InventoryColumnDescriptor {
      id: string; // The column identifier.
      template: string; // The handlebars template used to render the column.
      width: number; // The amount of pixels of width allocated to represent this column.
      order: number; // Columns are displayed from left-to-right in ascending order of this value.
      priority: number; // Columns with a higher priority take precedence when there is not enough space to display all columns.
      }

      interface FilterState5e {
      name: string; // Filtering by name.
      properties: Set<string>; // Filtering by some property.
      }

      type ItemListComparator5e = (a: globalThis.Item.Implementation, b: globalThis.Item.Implementation) => number;

      interface ListControlDescriptor {
      key: string; // A key to identify the option.
      label: string; // A human-readable label that describes the option.
      icon?: string; // Font Awesome icon classes to represent the option.
      classes?: string; // CSS classes to apply when the option is active.
      dataset?: Record<string, string>; // The above properties packed into a dataset for rendering.
      }

      interface ListControlConfiguration {
      label: string; // The placeholder value to use in the main search box.
      list: string; // The identifier of the item list associated with these controls.
      filters: ListControlDescriptor[]; // Filter configuration.
      sorting: ListControlDescriptor[]; // Sorting configuration.
      grouping: ListControlDescriptor[]; // Grouping configuration.
      }

  }
}

export {};
