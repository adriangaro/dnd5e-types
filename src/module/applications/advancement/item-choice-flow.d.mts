/** Inline application that presents the player with a choice of items. */

import ItemGrantFlow from "./item-grant-flow-v2.mjs";

declare class ItemChoiceFlow<
  RenderContext extends object = ItemChoiceFlow.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = ItemChoiceFlow.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = ItemChoiceFlow.RenderOptions,
> extends ItemGrantFlow<RenderContext, Configuration, RenderOptions> {
  /** Current counts of selected items. */
  get counts(): { current: number; max: number; full: boolean; replacement: boolean };

  /** Level that will be used to evaluate feature prerequisites. */
  get featureLevel(): number;

  /** Cached items from the advancement's pool. */
  pool: globalThis.Item.Implementation[];

  /** Copies of items added at earlier levels to pull from when re-creating items. */
  retained: Record<number, Record<string, globalThis.Item.Implementation>>;

  /** Source UUIDs of all currently selected items for this level with how many times they have been selected. */
  get selected(): Map<string, number>;

  /** Determine the maximum spell slot level for the actor to which this advancement is being applied. */
  _maxSpellSlotLevel(): number;

  /** Handle dropping item onto the flow. */
  protected _onDrop(event: DragEvent): Promise<false | null | void>;
}

declare namespace ItemChoiceFlow {
  interface Any extends ItemChoiceFlow<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof ItemChoiceFlow<any, any, any>> {}

  interface SectionEntry {
    header: string;
    items: Array<{
      id: string;
      img: string;
      name: string;
      uuid: string;
      checked: boolean;
      disabled?: boolean;
      dropped?: boolean;
      previouslyReplaced?: boolean;
      replaced?: boolean;
    }>;
    isCurrentLevel?: boolean;
  }

  interface RenderContext extends ItemGrantFlow.RenderContext {
    replaceable: boolean;
    noReplacement: boolean;
    sections: IterableIterator<SectionEntry>;
    selectLabel: string;
    showBrowseButton: boolean;
  }
  interface Configuration extends ItemGrantFlow.Configuration {}
  interface RenderOptions extends ItemGrantFlow.RenderOptions {}
}

export default ItemChoiceFlow;
