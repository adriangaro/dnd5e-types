import BaseActorSheet from "./api/base-actor-sheet.mjs";
import type HabitatConfig from "./config/habitat-config.mjs";
import type TreasureConfig from "./config/treasure-config.mjs";

/**
 * Extension of base actor sheet for NPCs.
 */
declare class NPCActorSheet<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends BaseActorSheet<
  NPCActorSheet.MakeRenderContext<RenderContext>,
  NPCActorSheet.MakeConfiguration<Configuration>,
  NPCActorSheet.MakeRenderOptions<RenderOptions>
> {
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Description currently being edited.
   */
  editingDescriptionTarget: string | null;

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** @override */
  _prepareContext(options: fvttUtils.DeepPartial<this['__RenderOptions']>): Promise<this['__RenderContext']>;

  /** @override */
  _preparePartContext(partId: string, context: this['__RenderContext'], options: fvttUtils.DeepPartial<this['__RenderOptions']>): Promise<this['__RenderContext']>;

  /**
   * Prepare rendering context for the biography tab.
   * @param context Context being prepared.
   * @param options Options which configure application rendering behavior.
   * @returns Updated context.
   * @protected
   */
  protected _prepareBiographyContext(context: this['__RenderContext'], options: fvttUtils.DeepPartial<this['__RenderOptions']>): Promise<this['__RenderContext']>;

  /** @override */
  _prepareSpecialTraitsContext(context: this['__RenderContext'], options: this['__RenderOptions']): Promise<this['__RenderContext']>;

  /** @override */
  _prepareSpellsContext(context: this['__RenderContext'], options: this['__RenderOptions']): Promise<this['__RenderContext']>;

  /**
   * Render a button for creating items in the inventory tab.
   * @protected
   */
  protected _renderCreateInventory(): void;

  /* -------------------------------------------- */
  /*  Item Preparation Helpers                    */
  /* -------------------------------------------- */

  /** @override */
  _assignItemCategories(item: Item.Implementation): Set<string>;

  /** @override */
  _prepareItem(item: Item.Implementation, ctx: any): Promise<void>;

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /** @override */
  _addDocumentItemTypes(tab: string): string[];

  /**
   * Handle expanding the description editor.
   * @param event Triggering click event.
   * @param target Button that was clicked.
   */
  static #editDescription<This extends NPCActorSheet.Any>(this: This, event: Event, target: HTMLElement): void;

  /** @override */
  _showConfiguration(event: Event, target: HTMLElement): boolean | void;

  /* -------------------------------------------- */
  /*  Form Handling                               */
  /* -------------------------------------------- */

  /** @override */
  _processFormData(event: SubmitEvent | null, form: HTMLFormElement, formData: foundry.applications.ux.FormDataExtended): object;
}

// Any class for generic flexibility
declare class AnyNPCActorSheet extends NPCActorSheet<any, any, any> {
  constructor(...args: any[]);
}

declare namespace NPCActorSheet {
  interface Any extends AnyNPCActorSheet {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyNPCActorSheet> {}

  // Make... types for extension support
  type MakeRenderContext<Ctx extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      // NPC-specific context additions
      important: boolean;
      isNPC: boolean;
      hasClasses: boolean;
      spellbook: Record<string, any>;
      classSpellcasting: boolean;
      spellcasting: {
        label: string;
        level: number;
        ability: {
          ability: string;
          mod: number;
          label: string;
        };
        attack: number;
        save: number;
        noSpellcaster: boolean;
        concentration: {
          mod: number;
          tooltip: string;
        };
      }[];
      enriched?: {
        public: string;
        value: string;
      };
      editingDescription?: {
        target: string;
        value: any;
      };
    },
    Ctx
  >;

  type MakeConfiguration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      // No specific NPC configuration identified beyond base
    },
    Cfg
  >;

  type MakeRenderOptions<Opt extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      // No specific NPC render options identified beyond base
    },
    Opt
  >;

  // Type aliases for convenience
  type RenderContext = NPCActorSheet['__RenderContext'];
  type Configuration = NPCActorSheet['__Configuration'];
  type RenderOptions = NPCActorSheet['__RenderOptions'];
}

export default NPCActorSheet; 