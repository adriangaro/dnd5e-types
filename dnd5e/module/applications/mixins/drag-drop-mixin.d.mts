import type { DropEffectValue } from "@dnd5e/module/drag-drop.mjs";

// Define DropEffectValue based on standard Drag and Drop API and potential custom values

/**
 * Represents the instance members added by the DragDropApplicationMixin.
 */
declare class DragDropApplication {
  /** @privateRemarks All mixin classes should accept anything for its constructor. */
  constructor(...args: any[]);

  /** @override */
  protected _onDragOver(event: DragEvent): void;

  /**
   * The behavior for the dropped data. When called during the drop event, ensure this is called before awaiting
   * anything or the drop behavior will be lost.
   * @param event - The drag event.
   * @param data - The drag payload (type should be refined based on DragDrop5e.getPayload).
   * @returns The determined drop effect.
   */
  protected _dropBehavior(event: DragEvent, data: any): DropEffectValue;

  /**
   * Types of allowed drop behaviors based on the origin & target of a drag event.
   * Override this in subclasses to define specific allowed behaviors.
   * @param event - The drag event.
   * @param data - The drag payload (type should be refined based on DragDrop5e.getPayload).
   * @returns A Set containing the allowed drop effect values.
   * @protected
   */
  protected _allowedDropBehaviors(event: DragEvent, data: any): Set<DropEffectValue>;

  /**
   * Determine the default drop behavior for the provided operation.
   * Override this in subclasses to define a different default.
   * @param event - The drag event.
   * @param data - The drag payload (type should be refined based on DragDrop5e.getPayload).
   * @returns The default drop effect value.
   * @protected
   */
  protected _defaultDropBehavior(event: DragEvent, data: any): DropEffectValue;
}

declare namespace DragDropApplication {
}

/**
 * Adds drop behavior functionality to Application classes.
 * @param Base - The base Application class constructor being mixed into.
 * @returns A new class constructor that extends the Base class and includes drag and drop handling features.
 */
declare function DragDropApplicationMixin<TBase extends Application.AnyConstructor>(
  Base: TBase
): typeof DragDropApplication & TBase; // Intersects the static side of the mixin class and the base class

/**
 * Namespace for the DragDropApplicationMixin containing the mixin class definition.
 */
declare namespace DragDropApplicationMixin {
  export import MixinClass = DragDropApplication;
}

export default DragDropApplicationMixin;