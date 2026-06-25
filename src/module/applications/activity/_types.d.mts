/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/applications/activity/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.applications.activity {
      interface ActivityChoiceDialogContext {
      id: string;
      name: string;
      icon: { src: string; svg: boolean };
      sort: number;
      }

  }
}

export {};
