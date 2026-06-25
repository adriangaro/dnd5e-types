/**
 * Adds drop-behavior resolution (copy/move/link) to an ApplicationV2 class. Mixed into the primary
 * sheets via {@link PrimarySheetMixin}.
 */

declare global {
  namespace dnd5e.types {
    /** Allowed drag-drop effect values (`CONST.DROP_EFFECTS` + "none"). */
    type DropEffectValue = "copy" | "move" | "link" | "none";
  }
}

declare class DragDropApplication {
  /** @privateRemarks All mixin classes accept anything for their constructor. */
  constructor(...args: any[]);

  protected _onDragOver(event: DragEvent): void;

  /** The resolved behavior for the dropped data (call before awaiting in the drop handler). */
  protected _dropBehavior(event: DragEvent, data?: object): dnd5e.types.DropEffectValue;

  /** Allowed drop behaviors based on the origin & target of a drag event. */
  protected _allowedDropBehaviors(event: DragEvent, data?: object): Set<dnd5e.types.DropEffectValue>;

  /** The default drop behavior for the provided operation. */
  protected _defaultDropBehavior(event: DragEvent, data?: object): dnd5e.types.DropEffectValue;
}

/** Adds drop behavior functionality to all sheets. */
declare function DragDropApplicationMixin<TBase extends foundry.applications.api.ApplicationV2.AnyConstructor>(
  Base: TBase,
): typeof DragDropApplication & TBase;

declare namespace DragDropApplicationMixin {
  type MixinClass = DragDropApplication;
}

export default DragDropApplicationMixin;
