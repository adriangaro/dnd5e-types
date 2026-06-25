/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/applications/api/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.applications.api {
      interface ApplicationContainerParts {
      container?: {
        id?: string; // ID of the container. Containers with the same ID will be grouped together.
        classes?: string[]; // Classes to add to the container.
      };
      }

      interface SheetTabDescriptor5e {
      tab: string; // The tab key.
      label: string; // The tab label's localization key.
      icon?: string; // A font-awesome icon.
      svg?: string; // An SVG icon.
      /** A predicate to check before rendering the tab. Receives the Document instance and returns whether to render the tab. */
      condition?: dnd5e.types.applications.api.SheetTabCondition5e;
      }

      /** A predicate to check before rendering a tab. Receives the Document instance and returns whether to render the tab. */
      type SheetTabCondition5e = (doc: foundry.abstract.Document.Any) => boolean;

  }
}

export {};
