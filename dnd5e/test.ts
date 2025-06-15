function HMRApplicationMixin<T extends typeof HMRApplicationMixin.AnyMixableApplicationV2>(
  Base: T,
): typeof HMRApplicationMixin.Mixin & T;

function HMRApplicationMixin(
  Base: typeof HMRApplicationMixin.AnyMixableApplicationV2,
) {
  return class extends Base {
    _frameListeners: [string, Function][];
    _frameListenersJQuarry: [string, string, Function][];
    _previousClasses: string[];

    constructor(...args: any[]) {
      super(...args);
      this._frameListeners = [];
      this._frameListenersJQuarry = [];
      // @ts-expect-error
      this._previousClasses = this.constructor.DEFAULT_OPTIONS.classes ?? []; // Initialize with current classes
      // ui.hmrWindows.set(this, this);
    }

    hmrAttachListener<K extends keyof HTMLElementEventMap>(
      type: K,
      listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions,
    ) {
      this._frameListeners.push([type, listener]);
      this.element.addEventListener(type, listener, options);
    }

    hmrAttachListenerJQuery<TType extends string>(
      events: TType,
      selector: JQuery.Selector,
      handler: JQuery.TypeEventHandler<HTMLElement, undefined, any, any, TType>,
    ) {
      this._frameListenersJQuarry.push([events, selector, handler]);
      $(this.element).on(events, selector, handler);
    }

    _detachFrameListeners() {
      this._frameListeners.forEach(([type, listener]) => {
        this.element.removeEventListener(type, listener as any);
      });
      this._frameListenersJQuarry.forEach(([events, selector, handler]) => {
        $(this.element).off(events, selector, handler as any);
      });

      if (this instanceof dnd5e.applications.api.Dialog5e && this.options.tag === "form" && this.form) {
        this.form.removeEventListener("submit", this._onSubmitForm.bind(this, this.options.form!));
        this.form.removeEventListener("change", this._onChangeForm.bind(this, this.options.form!));
      }
    }

    override close(...args: Parameters<HMRApplicationMixin.AnyMixableApplicationV2["close"]>) {
      // ui.hmrWindows.delete(this);
      return super.close(...args);
    }

    onHMR() {
      if (!this.element) return; // Guard against missing element

      // Remove previous classes before updating options
      if (this._previousClasses.length > 0) {
        this.element.classList.remove(...this._previousClasses);
      }

      this.options = {
        ...this.options,
        // @ts-expect-error
        ...this.constructor.DEFAULT_OPTIONS,
      } as any; // Update instance options

      // Store the new classes for the next HMR cycle
      this._previousClasses = [...(this.options.classes ?? [])];

      this.element.classList.add(...this._previousClasses); // Add base 'application' and new classes

      // Detach old listeners and re-attach potentially updated ones
      this._detachFrameListeners();
      this._attachFrameListeners();
    }
  };
}

declare namespace HMRApplicationMixin {
  class AnyHMRApplicationMixin extends HMRApplicationMixin(foundry.applications.api.ApplicationV2<any, any, any>) {}
  interface Any extends AnyHMRApplicationMixin {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyHMRApplicationMixin> {}

  class AnyMixableApplicationV2 extends foundry.applications.api.ApplicationV2<any, any, any> {
    constructor(...args: any[]);
  }

  class Mixin {
    constructor(...args: any[]);

    _frameListeners: [string, Function][];
    _frameListenersJQuarry: [string, string, Function][];
    _previousClasses: string[];

    hmrAttachListener<K extends keyof HTMLElementEventMap>(
      type: K,
      listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions,
    ): void;
    hmrAttachListenerJQuery<TType extends string>(
      events: TType,
      selector: JQuery.Selector,
      handler: JQuery.TypeEventHandler<HTMLElement, undefined, any, any, TType>,
    ): void;

    _detachFrameListeners();
    onHMR();
  }
}

class StaminaDiceConfig extends HMRApplicationMixin(dnd5e.applications.actor.BaseConfigSheetV2)<
  Actor.OfType<'character'>,
  StaminaDiceConfig.MakeRenderContext<{}>,
  StaminaDiceConfig.MakeConfiguration<{}>,
  StaminaDiceConfig.MakeRenderOptions<{}>
> { 
  
  static override DEFAULT_OPTIONS = {
    classes: ["hit-dice"],
    actions: {
      // decrease: StaminaDiceConfig.#stepValue,
      // increase: StaminaDiceConfig.#stepValue,
      // roll: StaminaDiceConfig.#rollDie
    },
    position: {
      width: 420
    }
  } as any;
}

namespace StaminaDiceConfig {
  export type MakeRenderContext<Ctx extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      classes: {
        id: string | null
        label: string
        denomination: number
        data:  dnd5e.types.GetTypeFromPath<Item.OfType<'class'>, 'system.sd'>
      }[]
    },
    Ctx
  >
  export type RenderContext = StaminaDiceConfig['__RenderContext']
  export type MakeConfiguration<
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {

    },
    Cfg
  >
  export type Configuration = StaminaDiceConfig['__Configuration']
  export type MakeRenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {

    },
    Opt
  >
  export type RenderOptions = StaminaDiceConfig['__RenderOptions']
}