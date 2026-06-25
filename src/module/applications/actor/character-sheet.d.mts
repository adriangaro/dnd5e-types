/** Extension of base actor sheet for characters. */

import BaseActorSheet from "./api/base-actor-sheet.mjs";

declare class CharacterActorSheet<
  RenderContext extends foundry.applications.sheets.ActorSheetV2.RenderContext = CharacterActorSheet.RenderContext,
  Configuration extends
    foundry.applications.sheets.ActorSheetV2.Configuration = CharacterActorSheet.Configuration,
  RenderOptions extends
    foundry.applications.sheets.ActorSheetV2.RenderOptions = CharacterActorSheet.RenderOptions,
> extends BaseActorSheet<RenderContext, Configuration, RenderOptions> {
  /**
   * Proficiency class names.
   * @enum {string}
   */
  static PROFICIENCY_CLASSES: {
    0: "none";
    0.5: "half";
    1: "full";
    2: "double";
  };

  /** Whether the user has manually opened the death save tray. */
  _deathTrayOpen: boolean;

  /** Prepare rendering context for the ability scores. */
  _prepareAbilityScoresContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /** Prepare rendering context for the bastion tab. */
  _prepareBastionContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /** Prepare rendering context for the biography tab. */
  _prepareBiographyContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /** Prepare rendering context for the details tab. */
  _prepareDetailsContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /** Prepare rendering context for the features tab. */
  _prepareFeaturesContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /** Prepare rendering context for the header. */
  _prepareHeaderContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /** Prepare rendering context for the sidebar. */
  _prepareSidebarContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /**
   * Prepare favorites for display.
   * @param {ApplicationRenderContext} context  Context being prepared.
   * @returns {Promise<object>}
   */
  _prepareFavorites(context?: RenderContext): Promise<object[]>;

  /**
   * Prepare data for a favorited entry.
   * @param {"skill"|"tool"|"slots"} type  The type of favorite.
   * @param {string} id                    The favorite's identifier.
   * @returns {Promise<FavoriteData5e|void>}
   */
  _getFavoriteData(type: "skill" | "tool" | "slots", id: string): Promise<CharacterActorSheet.FavoriteData | void>;

  /**
   * Prepare context for a facility.
   * @param {Item5e} item  Item being prepared for display.
   * @param {object} ctx   Item specific context.
   */
  _prepareItemFacility(item: globalThis.Item.Implementation, ctx: object): Promise<void>;

  /**
   * Prepare facility livestock for display.
   * @param {object} trade  Facility trade information.
   * @returns {Promise<object[]>}
   */
  _prepareItemFacilityLivestock(trade: object): Promise<object[]>;

  /** Prepare facility occupants for display. */
  _prepareItemFacilityOccupants(occupants: dnd5e.types.data.item.FacilityOccupants): Promise<object[]>;

  /**
   * Toggle the death save tray.
   * @param {boolean} [open]  Force a particular open state.
   */
  _toggleDeathTray(open?: boolean): void;

  /**
   * Handle dropping an Activity onto the sheet.
   * @param {DragEvent} event    The originating drag event.
   * @param {Activity} activity  The dropped Activity document.
   * @returns {Promise<Actor5e|void>}
   */
  _onDropActivity(event: DragEvent, activity: dnd5e.types.Activity.Instance): Promise<Actor.Implementation | void>;

  /**
   * Handle an owned item or effect being dropped in the favorites area.
   * @param {DragEvent} event            The triggering event.
   * @param {ActorFavorites5e} favorite  The favorite that was dropped.
   * @returns {Promise<Actor5e>|void}
   */
  _onDropFavorite(event: DragEvent, favorite: CharacterActorSheet.ActorFavorite): Promise<Actor.Implementation | void>;

  /**
   * Handle re-ordering the favorites list.
   * @param {DragEvent} event  The drop event.
   * @param {string} srcId     The identifier of the dropped favorite.
   * @returns {Promise<Actor5e>|void}
   */
  _onSortFavorites(event: DragEvent, srcId: string): Promise<Actor.Implementation | void>;

  /**
   * Determine if the sheet should show a bastion tab.
   * @param {Actor5e} actor
   */
  static hasBastion(actor: Actor.Implementation): boolean;
}

declare namespace CharacterActorSheet {
  interface Any extends CharacterActorSheet<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof CharacterActorSheet<any, any, any>> {}

  interface RenderContext extends BaseActorSheet.RenderContext {
    abilityRows: {
      bottom: any[];
      top: any[];
      optional: number;
    };
    isCharacter: true;
    traits?: Record<string, any[]>;
    hasConditions?: boolean;
    spellbook?: any;
    bastion?: { description: string };
    defenders?: any[];
    facilities?: {
      basic: { chosen: any[]; value?: number; max?: number; available?: any[] };
      special: { chosen: any[]; value?: number; max?: number; available?: any[] };
    };
    enriched?: { label: string; value: string };
    characteristics?: Array<{ name: string; label: string; value: string; source: string }>;
    creatureType?: {
      class: string;
      icon: string;
      title: string;
      reference?: string;
      subtitle?: string;
    };
    species?: globalThis.Item.Implementation;
    background?: globalThis.Item.Implementation;
    saves?: Record<string, any>;
    senses?: any[];
    skills?: any[];
    tools?: any[];
    subclasses?: globalThis.Item.Implementation[];
    classes?: globalThis.Item.Implementation[];
    sections?: any[];
    listControls?: any;
    showClassDrop?: boolean;
    epicBoonsEarned?: string;
    showExperience?: boolean;
    showRests?: boolean;
    portrait?: any;
    death?: { open: boolean } & Record<string, any>;
    exhaustion?: { left: any[]; right: any[] };
    favorites?: object[];
    speed?: { label?: string; value: number };
    size?: { label: string; abbr: string; mod: number };
    spellcasting?: Array<{
      label: string;
      ability: { mod: number; ability: dnd5e.types.Ability.TypeKey };
      attack: number;
      preparation: any;
      primary: boolean;
      save: number;
    }>;
  }

  interface Configuration extends BaseActorSheet.Configuration {}

  interface RenderOptions extends BaseActorSheet.RenderOptions {}

  /** A favorite descriptor dropped onto the favorites area. */
  interface ActorFavorite {
    type: dnd5e.types.data.actor.ActorFavoriteType5e;
    id: string;
    sort?: number;
  }

  /** Data prepared for a favorited entry. */
  interface FavoriteData {
    img?: string;
    title?: string;
    subtitle?: string | string[];
    value?: any;
    uses?: { value: number; max: number; name: string };
    quantity?: number;
    modifier?: number | string;
    passive?: number;
    save?: { dc?: number; ability?: dnd5e.types.Ability.TypeKey | Set<dnd5e.types.Ability.TypeKey> };
    range?: any;
    reference?: string;
    toggle?: boolean;
    suppressed?: boolean;
    level?: number;
    method?: string;
  }
}

export default CharacterActorSheet;
