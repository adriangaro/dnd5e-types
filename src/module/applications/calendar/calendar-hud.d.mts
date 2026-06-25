/** Application for showing a date and time interface on the screen. */

import BaseCalendarHUD from "./base-calendar-hud.mjs";

declare class CalendarHUD<
  RenderContext extends object = CalendarHUD.RenderContext,
  Configuration extends foundry.applications.api.ApplicationV2.Configuration = CalendarHUD.Configuration,
  RenderOptions extends foundry.applications.api.ApplicationV2.RenderOptions = CalendarHUD.RenderOptions,
> extends BaseCalendarHUD<RenderContext, Configuration, RenderOptions> {
  /** Default time periods to display for controlling time. */
  static TIME_CONTROL_VALUES: Array<{ value: number; unit: string; default?: boolean }>;

  /**
   * Build the list of default calendar buttons.
   */
  _getCalendarButtons(): CalendarHUD.CalendarHUDButton[];

  /**
   * Prepare the buttons that can be displayed around the calendar UI.
   *
   * Fires the `dnd5e.prepareCalendarButtons` hook event when preparing the buttons displayed around the calendar HUD.
   * Buttons in each list are sorted with those closest to the center first.
   * @param context  Context being prepared.
   * @param options  Options which configure application rendering behavior.
   *
   * @fires dnd5e.prepareCalendarButtons
   */
  _prepareButtonsContext(context: RenderContext, options: foundry.applications.api.HandlebarsApplicationMixin.RenderOptions): Promise<void>;

  /**
   * Adjust the date, time, and progress in the core part without a full re-render to allow animation.
   */
  renderCore(deltas?: CalendarHUD.CalendarTimeDeltas): Promise<void>;

  /** @override */
  _preparePartContext(partId: string, context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /** @override */
  _onClickAction(event: PointerEvent, target: HTMLElement): void;

  static onUpdateWorldTime(worldTime: number, deltaTime: number, options: object, userId: string): void;
}

declare namespace CalendarHUD {
  interface Any extends CalendarHUD<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof CalendarHUD<any, any, any>> {}

  /** Render context for `CalendarHUD`. Open for declaration merging; extended by subclasses. */
  interface RenderContext extends BaseCalendarHUD.RenderContext {
    buttons: CalendarHUDButton[];
  }

  /** Configuration for `CalendarHUD`. Open for declaration merging; extended by subclasses. */
  interface Configuration extends BaseCalendarHUD.Configuration {}

  /** Render options for `CalendarHUD`. Open for declaration merging; extended by subclasses. */
  interface RenderOptions extends BaseCalendarHUD.RenderOptions {}

  /** A control button displayed around the calendar UI. */
  interface CalendarHUDButton {
    /** The action name triggered by clicking the button. */
    action?: string;
    /** Additional buttons that appear when the button is hovered. */
    additional?: Array<Omit<CalendarHUDButton, "additional" | "position">>;
    /** Additional data to attach to the button. */
    dataset?: object;
    /** SVG icon path or font-awesome icon class for the button. */
    icon?: string;
    /** Label used for the button. */
    label?: string;
    /** Should this be displayed before or after the interface. */
    position: "start" | "end";
    /** Tooltip displayed on hover. */
    tooltip?: string;
    /** A custom click handler function. */
    onClick?: (event: PointerEvent) => void | Promise<void>;
    /** Is the control button visible for the current client. */
    visible?: boolean | (() => boolean);
  }

  /** Information on the time change deltas. */
  interface CalendarTimeDeltas {
    /** Number of times midnight has been passed during a time change. */
    midnights: number;
    /** Number of times noon has been passed during a time change. */
    middays: number;
    /** Number of sunrises that occurred during a time change. */
    sunrises: number;
    /** Number of sunsets that occurred during a time change. */
    sunsets: number;
  }
}

export default CalendarHUD;
