/** Base application that calendar HUDs should inherit from. */

import Application5e from "../api/application.mjs";

declare class BaseCalendarHUD<
  RenderContext extends object = BaseCalendarHUD.RenderContext,
  Configuration extends foundry.applications.api.ApplicationV2.Configuration = BaseCalendarHUD.Configuration,
  RenderOptions extends foundry.applications.api.ApplicationV2.RenderOptions = BaseCalendarHUD.RenderOptions,
> extends Application5e<RenderContext, Configuration, RenderOptions> {
  /** Should the calendar HUD be displayed for the current user? */
  static get shouldDisplay(): boolean;

  /** Should the calendar HUD be displayed for the current user? */
  get shouldDisplay(): boolean;

  /** Respond to changes in the calendar settings. */
  onUpdateSettings(): void;

  /**
   * Respond to changes in the world time.
   * @param worldTime - The new world time.
   * @param deltaTime - The time delta.
   * @param options   - Additional options.
   * @param userId    - The ID of the user who triggered the update.
   */
  static onUpdateWorldTime(worldTime: number, deltaTime: number, options: object, userId: string): void;
}

declare namespace BaseCalendarHUD {
  interface Any extends BaseCalendarHUD<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof BaseCalendarHUD<any, any, any>> {}

  interface RenderContext extends Application5e.RenderContext {}
  interface Configuration extends Application5e.Configuration {}
  interface RenderOptions extends Application5e.RenderOptions {}
}

export default BaseCalendarHUD;
