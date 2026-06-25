/** Inline application that presents the player with a list of items to be added. */

import AdvancementFlow from "./advancement-flow.mjs";

declare class ItemGrantFlow<
  Document extends dnd5e.types.Advancement.Instance = dnd5e.types.Advancement.Instance,
> extends AdvancementFlow<Document> {
  /** Ability key set externally by the advancement manager when restoring retained state. */
  ability?: dnd5e.types.Ability.TypeKey | null;

  /** Produce the rendering context for this flow. */
  getContext(): Promise<object>;

  /** Get the context information for selected spell abilities. */
  getSelectAbilities(): {
    options: Record<dnd5e.types.Ability.TypeKey, string> | null;
    selected: dnd5e.types.Ability.TypeKey | null;
  };

  /** Handle clicking on a feature during item grant to preview the feature. */
  protected _onClickFeature(event: MouseEvent): Promise<void>;
}

declare namespace ItemGrantFlow {
  interface Any extends ItemGrantFlow<any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof ItemGrantFlow<any>> {}
}

export default ItemGrantFlow;
