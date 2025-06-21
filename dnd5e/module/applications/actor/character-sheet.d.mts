import BaseActorSheet from "./api/base-actor-sheet.mjs";

/**
 * Extension of base actor sheet for characters.
 */
declare class CharacterActorSheet<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends BaseActorSheet<
  CharacterActorSheet.MakeRenderContext<RenderContext>,
  CharacterActorSheet.MakeConfiguration<Configuration>,
  CharacterActorSheet.MakeRenderOptions<RenderOptions>
> {

  /**
   * Proficiency class names.
   */
  static readonly PROFICIENCY_CLASSES: {
    0: "none";
    0.5: "half";
    1: "full";
    2: "double";
  };

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Whether the user has manually opened the death save tray.
   * @protected
   */
  protected _deathTrayOpen: boolean;

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /**
   * Prepare rendering context for the ability scores.
   * @param context  Context being prepared.
   * @param options  Options which configure application rendering behavior.
   * @returns        Prepared context.
   * @protected
   */
  protected _prepareAbilityScoresContext(context: this['__RenderContext'], options: fvttUtils.DeepPartial<this['__RenderOptions']>): Promise<this['__RenderContext']>;

  /* -------------------------------------------- */

  /**
   * Prepare rendering context for the bastion tab.
   * @param context  Context being prepared.
   * @param options  Options which configure application rendering behavior.
   * @returns        Prepared context.
   * @protected
   */
  protected _prepareBastionContext(context: this['__RenderContext'], options: fvttUtils.DeepPartial<this['__RenderOptions']>): Promise<this['__RenderContext']>;

  /* -------------------------------------------- */

  /**
   * Prepare rendering context for the biography tab.
   * @param context  Context being prepared.
   * @param options  Options which configure application rendering behavior.
   * @returns        Prepared context.
   * @protected
   */
  protected _prepareBiographyContext(context: this['__RenderContext'], options: fvttUtils.DeepPartial<this['__RenderOptions']>): Promise<this['__RenderContext']>;

  /* -------------------------------------------- */

  /**
   * Prepare rendering context for the details tab.
   * @param context  Context being prepared.
   * @param options  Options which configure application rendering behavior.
   * @returns        Prepared context.
   * @protected
   */
  protected _prepareDetailsContext(context: this['__RenderContext'], options: fvttUtils.DeepPartial<this['__RenderOptions']>): Promise<this['__RenderContext']>;

  /* -------------------------------------------- */

  /**
   * Prepare rendering context for the features tab.
   * @param context  Context being prepared.
   * @param options  Options which configure application rendering behavior.
   * @returns        Prepared context.
   * @protected
   */
  protected _prepareFeaturesContext(context: this['__RenderContext'], options: fvttUtils.DeepPartial<this['__RenderOptions']>): Promise<this['__RenderContext']>;

  /* -------------------------------------------- */

  /**
   * Prepare rendering context for the header.
   * @param context  Context being prepared.
   * @param options  Options which configure application rendering behavior.
   * @returns        Prepared context.
   * @protected
   */
  protected _prepareHeaderContext(context: this['__RenderContext'], options: fvttUtils.DeepPartial<this['__RenderOptions']>): Promise<this['__RenderContext']>;

  /* -------------------------------------------- */

  /**
   * Prepare rendering context for the sidebar.
   * @param context  Context being prepared.
   * @param options  Options which configure application rendering behavior.
   * @returns        Prepared context.
   * @protected
   */
  protected _prepareSidebarContext(context: this['__RenderContext'], options: fvttUtils.DeepPartial<this['__RenderOptions']>): Promise<this['__RenderContext']>;

  /* -------------------------------------------- */
  /*  Actor Preparation Helpers                   */
  /* -------------------------------------------- */

  /**
   * Prepare favorites for display.
   * @param context  Context being prepared.
   * @returns        Prepared favorites data.
   * @protected
   */
  protected _prepareFavorites(context?: this['__RenderContext']): Promise<object[]>;

  /* -------------------------------------------- */

  /**
   * Prepare data for a favorited entry.
   * @param type  The type of favorite.
   * @param id    The favorite's identifier.
   * @returns     Favorite data or void if not found.
   * @protected
   */
  protected _getFavoriteData(type: "skill" | "tool" | "slots", id: string): Promise<CharacterActorSheet.FavoriteData | void>;

  /* -------------------------------------------- */
  /*  Item Preparation Helpers                    */
  /* -------------------------------------------- */

  /**
   * Prepare context for a facility.
   * @param item  Item being prepared for display.
   * @param ctx   Item specific context.
   * @protected
   */
  protected _prepareItemFacility(item: Item.Implementation, ctx: any): Promise<void>;

  /* -------------------------------------------- */

  /**
   * Prepare facility livestock for display.
   * @param trade  Facility trade information.
   * @returns      Prepared livestock data.
   * @protected
   */
  protected _prepareItemFacilityLivestock(trade: any): Promise<object[]>;

  /* -------------------------------------------- */

  /**
   * Prepare facility occupants for display.
   * @param occupants  The occupants.
   * @returns          Prepared occupants data.
   * @protected
   */
  protected _prepareItemFacilityOccupants(occupants: any): Promise<object[]>;

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle removing a favorite.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   */
  static #deleteFavorite<This extends CharacterActorSheet.Any>(this: This, event: Event, target: HTMLElement): void;

  /* -------------------------------------------- */

  /**
   * Handle deleting an occupant from a facility.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   */
  static #deleteOccupant<This extends CharacterActorSheet.Any>(this: This, event: Event, target: HTMLElement): Promise<void>;

  /* -------------------------------------------- */

  /**
   * Handle finding an available item of a given type.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   */
  static #findItem<This extends CharacterActorSheet.Any>(this: This, event: Event, target: HTMLElement): Promise<void>;

  /* -------------------------------------------- */

  /**
   * Handle setting the character's spellcasting ability.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   */
  static #setSpellcastingAbility<This extends CharacterActorSheet.Any>(this: This, event: Event, target: HTMLElement): void;

  /* -------------------------------------------- */

  /**
   * Handle toggling the death saves tray.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   */
  static #toggleDeathTray<This extends CharacterActorSheet.Any>(this: This, event: Event, target: HTMLElement): void;

  /* -------------------------------------------- */

  /**
   * Toggle the death save tray.
   * @param open  Force a particular open state.
   * @protected
   */
  protected _toggleDeathTray(open?: boolean): void;

  /* -------------------------------------------- */

  /**
   * Handle toggling inspiration.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   */
  static #toggleInspiration<This extends CharacterActorSheet.Any>(this: This, event: Event, target: HTMLElement): void;

  /* -------------------------------------------- */

  /**
   * Handle using a facility.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   */
  static #useFacility<This extends CharacterActorSheet.Any>(this: This, event: Event, target: HTMLElement): void;

  /* -------------------------------------------- */

  /**
   * Handle using a favorited item.
   * @param event   Triggering click event.
   * @param target  Button that was clicked.
   */
  static #useFavorite<This extends CharacterActorSheet.Any>(this: This, event: Event, target: HTMLElement): Promise<void>;

  /* -------------------------------------------- */
  /*  Drag & Drop                                 */
  /* -------------------------------------------- */

  /**
   * Handle dropping an Activity onto the sheet.
   * @param event     The originating drag event.
   * @param activity  The dropped Activity document.
   * @returns         Updated actor or void.
   * @protected
   */
  protected _onDropActivity(event: DragEvent, activity: dnd5e.types.Activity.Implementation): Promise<Actor.Implementation | void>;

  /* -------------------------------------------- */

  /**
   * Handle an owned item or effect being dropped in the favorites area.
   * @param event     The triggering event.
   * @param favorite  The favorite that was dropped.
   * @returns         Updated actor or void.
   * @protected
   */
  protected _onDropFavorite(event: DragEvent, favorite: CharacterActorSheet.ActorFavorite): Promise<Actor.Implementation | void>;

  /* -------------------------------------------- */

  /**
   * Handle re-ordering the favorites list.
   * @param event  The drop event.
   * @param srcId  The identifier of the dropped favorite.
   * @returns      Updated actor or void.
   * @protected
   */
  protected _onSortFavorites(event: DragEvent, srcId: string): Promise<Actor.Implementation | void>;
}

// Any class for generic flexibility
declare class AnyCharacterActorSheet extends CharacterActorSheet<any, any, any> {
  constructor(...args: any[]);
}

// Complete namespace with all required types
declare namespace CharacterActorSheet {
  // Required interfaces for extensibility
  interface Any extends AnyCharacterActorSheet {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyCharacterActorSheet> {}

  // Make... types for extension support
  type MakeRenderContext<Ctx extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      // Character-specific context
      abilityRows: {
        bottom: any[];
        top: any[];
        optional: number;
      };
      bastion?: {
        description: string;
      };
      characteristics?: Array<{
        name: string;
        label: string;
        value: string;
      }>;
      classes?: Item.Implementation[];
      creatureType?: {
        class: string;
        icon: string;
        title: string;
        reference?: string;
        subtitle?: string;
      };
      death?: {
        open: boolean;
        success: any[];
        failure: any[];
      };
      defenders?: any[];
      enriched?: {
        value: string;
      };
      epicBoonsEarned?: string;
      exhaustion?: {
        left: any[];
        right: any[];
      };
      facilities?: {
        basic: { chosen: any[]; value: number; max: number; available: any[] };
        special: { chosen: any[]; value: number; max: number; available: any[] };
      };
      favorites?: object[];
      isCharacter: true;
      saves?: Record<string, any>;
      senses?: any[];
      showClassDrop?: boolean;
      showExperience?: boolean;
      size?: {
        label: string;
        abbr: string;
        mod: number;
      };
      skills?: Record<string, any>;
      speed?: {
        value: number;
        label: string;
      };
      spellcasting?: Array<{
        label: string;
        ability: { mod: number; ability: string };
        attack: number;
        preparation: string;
        primary: boolean;
        save: number;
      }>;
      subclasses?: Item.Implementation[];
      tools?: Record<string, any>;
      traits?: Record<string, any[]>;
    },
    Ctx
  >;

  type MakeConfiguration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      // Character-specific configuration
    },
    Cfg
  >;

  type MakeRenderOptions<Opt extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      // Character-specific render options
    },
    Opt
  >;

  // Type aliases for convenience
  type RenderContext = CharacterActorSheet['__RenderContext'];
  type Configuration = CharacterActorSheet['__Configuration'];
  type RenderOptions = CharacterActorSheet['__RenderOptions'];

  // Additional types specific to character sheet
  interface ActorFavorite {
    type: string;
    id: string;
    sort?: number;
  }

  interface FavoriteData {
    img?: string;
    title?: string;
    subtitle?: string | string[];
    value?: any;
    uses?: {
      value: number;
      max: number;
      name: string;
    };
    quantity?: number;
    modifier?: number;
    passive?: number;
    save?: {
      dc: number;
      ability: string | Set<string>;
    };
    range?: any;
    reference?: string;
    toggle?: boolean;
    suppressed?: boolean;
    level?: number;
  }
}

// Default export
export default CharacterActorSheet;
