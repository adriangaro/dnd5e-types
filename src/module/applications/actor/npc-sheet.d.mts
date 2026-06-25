/** Extension of base actor sheet for NPCs. */

import BaseActorSheet from "./api/base-actor-sheet.mjs";

declare class NPCActorSheet<
  RenderContext extends foundry.applications.sheets.ActorSheetV2.RenderContext = NPCActorSheet.RenderContext,
  Configuration extends
    foundry.applications.sheets.ActorSheetV2.Configuration = NPCActorSheet.Configuration,
  RenderOptions extends
    foundry.applications.sheets.ActorSheetV2.RenderOptions = NPCActorSheet.RenderOptions,
> extends BaseActorSheet<RenderContext, Configuration, RenderOptions> {
  /** Description currently being edited. */
  editingDescriptionTarget: string | null;

  /** Prepare rendering context for the biography tab. */
  _prepareBiographyContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /** Prepare rendering context for the features tab. */
  _prepareFeaturesContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /** Prepare rendering context for the header. */
  _prepareHeaderContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /** Prepare rendering context for the sidebar. */
  _prepareSidebarContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /** @override */
  _showConfiguration(event: Event, target: HTMLElement): boolean | void;

  /** Assign item categories, treating classes/subclasses specially and adding weapons to features. */
  _assignItemCategories(item: globalThis.Item.Implementation): Set<string>;

  /** Add document item types for a given tab, adding "weapon" to the features tab. */
  _addDocumentItemTypes(tab: string): string[];

  /** Process form submission data, converting the NPC challenge rating string to a number. */
  _processFormData(
    event: SubmitEvent | null,
    form: HTMLFormElement,
    formData: foundry.applications.ux.FormDataExtended,
  ): object;
}

declare namespace NPCActorSheet {
  interface Any extends NPCActorSheet<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof NPCActorSheet<any, any, any>> {}

  interface RenderContext extends BaseActorSheet.RenderContext {
    important: boolean;
    isNPC: true;
    hasConditions?: boolean;
    hasClasses?: number;
    spellbook?: any;
    classSpellcasting?: boolean;
    enriched?: { public: string; value?: string };
    editingDescription?: { target: string; value: any };
    portrait?: object;
    abilities?: object[];
    classes?: globalThis.Item.Implementation[];
    legact?: Array<{ n: number; filled: boolean; tooltip: string; label: string; classes: string }>;
    legres?: Array<{ n: number; filled: boolean; tooltip: string; label: string; classes: string }>;
    hasLegendaries?: boolean | number;
    showDeathSaves?: boolean;
    showInitiativeScore?: boolean;
    showLoyalty?: boolean;
    showRests?: boolean;
    encumbrance?: any;
    gear?: Array<{ draggable: boolean; label: string; link: object; value?: number }>;
    habitat?: Array<{ label: string }>;
    senses?: object[];
    skills?: object[];
    tools?: object[];
    speed?: Array<{ label?: string; value?: number; icons?: Array<{ icon: string; label: string }> }>;
    traits?: Record<string, object[]>;
    treasure?: Array<{ label: string }>;
    sections?: object[];
    listControls?: any;
    spellcasting?: Array<{
      label: string;
      level: number;
      ability: { ability: dnd5e.types.Ability.TypeKey | ""; mod: number; label?: string };
      attack: number;
      save: number;
      noSpellcaster: boolean;
      concentration: { mod: number; tooltip: string };
    }>;
  }

  interface Configuration extends BaseActorSheet.Configuration {}

  interface RenderOptions extends BaseActorSheet.RenderOptions {}
}

export default NPCActorSheet;
