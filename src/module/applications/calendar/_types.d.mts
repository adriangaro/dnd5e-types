/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/applications/calendar/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.applications.calendar {
      interface CalendarHUDButton {
      action?: string; // The action name triggered by clicking the button.
      additional?: Omit<CalendarHUDButton, "additional"|"position">[]; // Additional buttons that appear when the button is hovered.
      dataset?: object; // Additional data to attach to the button.
      icon?: string; // SVG icon path or font-awesome icon class for the button.
      label?: string; // Label used for the button.
      position: "start"|"end"; // Should this be displayed before or after the interface.
      tooltip?: string; // Tooltip displayed on hover.
      onClick?: (event: PointerEvent) => void|Promise<void>; // A custom click handler function.
      visible?: boolean|(() => boolean); // Is the control button visible for the current client.
      }

  }
}

export {};
