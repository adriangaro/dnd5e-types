/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/applications/advancement/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.applications.advancement {
      interface _AdvancementManagerOptions {
      automaticApplication?: boolean; // @default false — Apply advancement steps automatically if no user input is required.
      showVisualizer?: boolean; // @default false — Display the step debugging application.
      }

      /** Internal type used to manage each step within the advancement process. */
      interface AdvancementStep {
      type: "forward" | "reverse" | "restore" | "delete"; // Step type from "forward", "reverse", "restore", or "delete".
      flow?: dnd5e.applications.advancement.AdvancementFlow; // Flow object for the advancement being applied by this step. In the case of "delete" steps, this flow indicates the advancement flow that originally deleted the item.
      item?: globalThis.Item.Implementation; // For "delete" steps only, the item to be removed.
      class?: { // Contains data on class if step was triggered by class level change.
        item?: globalThis.Item.Implementation; // Class item that caused this advancement step.
        level?: number; // Level the class should be during this step.
      };
      level?: number; // Character level at this step, if different than flow's level.
      automatic?: boolean; // @default false — Should the manager attempt to apply this step without user interaction?
      synthetic?: boolean; // @default false — Was this step created as a result of an item introduced or deleted?
      }

  }
}

export {};
