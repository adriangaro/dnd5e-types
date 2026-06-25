/**
 * Keystone of the dnd5e application layer: wraps `foundry.applications.api.HandlebarsApplicationMixin`
 * and adds the shared 5e surface (expandable sections, window subtitle, ProseMirror plugin hook, and
 * the `CONFIG`/`inputs` entries every 5e render context carries).
 *
 * EXPANDABILITY: the shared shapes are plain OPEN interfaces in this namespace
 * ({@link ApplicationV2Mixin.RenderContext} etc.). A module adds a field to EVERY 5e application's
 * context by declaration-merging the interface — no generic threading. The window `subtitle` is
 * added directly to foundry's `WindowConfiguration`/`WindowRenderOptions` (a system-wide addition),
 * so the per-class `Configuration`/`RenderOptions` interfaces never need to restate `window`.
 */

declare global {
  namespace foundry.applications.api.ApplicationV2 {
    interface WindowConfiguration {
      /** dnd5e: secondary line shown under the window title. */
      subtitle: string;
    }
    interface WindowRenderOptions {
      /** dnd5e: secondary line shown under the window title. */
      subtitle?: string;
    }
  }
}

declare class BaseApplication5e {
  /** @privateRemarks All mixin classes accept anything for their constructor. */
  constructor(...args: any[]);

  /**
   * Parts of this application. Each part may carry a dnd5e `container` config used by
   * {@link BaseApplication5e._renderContainers} to group parts together.
   */
  static PARTS: Record<
    string,
    foundry.applications.api.HandlebarsApplicationMixin.HandlebarsTemplatePart &
      ApplicationV2Mixin.ApplicationContainerParts
  >;

  /** Expanded states for collapsible sections, persisted between renders. */
  get expandedSections(): Map<string, boolean>;

  /** A reference to the window subtitle. */
  get subtitle(): string;

  /** Translate header controls to context menu entries. */
  protected _getHeaderControlContextEntries(): Generator<foundry.applications.ux.ContextMenu.Entry<HTMLElement>>;

  /** Lazily create containers and place parts appropriately. */
  protected _renderContainers(context: object, options: object): void;

  /** Handle re-rendering the mode toggle on ownership changes. */
  protected _renderModeToggle(): void;

  /** Disable form fields that aren't marked with the `always-interactive` class. */
  _disableFields(): void;

  /** Configure plugins for the ProseMirror instance. */
  protected _onConfigurePlugins(event: Event & { plugins: Record<string, unknown> }): void;

  /** Edit a Document image. Not restricted to `<img>` elements to allow editing `<dnd5e-icon>` elements. */
  static _onEditImage(
    this: foundry.applications.api.DocumentSheetV2.Any,
    event: Event,
    target: HTMLElement,
  ): Promise<void>;

  /** Render a confirm dialog as a child of this application. */
  _confirmDialog(config: object): Promise<"yes" | "no" | null>;

  /** Get render options to open an application as its own detached window. */
  _detachOptions(): { window?: { detached: boolean; windowId: number } };

  /** Render an application in the same workspace as this one. */
  _renderChild(
    app: foundry.applications.api.ApplicationV2.Any,
    options?: foundry.applications.api.ApplicationV2.RenderOptions,
  ): Promise<foundry.applications.api.ApplicationV2.Any>;
}

/** Mixin for ApplicationV2-based 5e applications (without Handlebars; Base need not be a Handlebars class). */
declare function ApplicationV2Mixin<T extends abstract new (...args: any[]) => foundry.applications.api.ApplicationV2.Any>(
  Base: T,
  options: { handlebars: false },
): typeof BaseApplication5e & T;

/** Mixin for ApplicationV2-based 5e applications (default: wraps Base with HandlebarsApplicationMixin). */
declare function ApplicationV2Mixin<T extends foundry.applications.api.HandlebarsApplicationMixin.BaseClass>(
  Base: T,
  options?: { handlebars?: true },
): typeof BaseApplication5e & ReturnType<typeof foundry.applications.api.HandlebarsApplicationMixin<T>>;

declare namespace ApplicationV2Mixin {
  type MixinClass = BaseApplication5e;

  /** dnd5e: per-part container config used to group parts together in the rendered frame. */
  interface ApplicationContainerParts {
    container?: {
      /** ID of the container. Containers with the same ID will be grouped together. */
      id?: string;
      /** Classes to add to the container. */
      classes?: string[];
    };
  }

  /**
   * Render-context fields shared by every 5e application. Open — declaration-merge to add a field to
   * all 5e application contexts.
   */
  interface RenderContext {
    CONFIG: dnd5e.types.DND5EConfig;
    inputs: fvttUtils.PrettifyType<typeof foundry.applications.fields & typeof import("../fields.mjs")>;
  }

  /** Configuration fields shared by every 5e application. Open for declaration merging. */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Configuration {}

  /** Render-option fields shared by every 5e application. Open for declaration merging. */
  interface RenderOptions
    extends foundry.applications.api.HandlebarsApplicationMixin.RenderOptions,
      foundry.applications.api.ApplicationV2.RenderOptions {}
}

export default ApplicationV2Mixin;
