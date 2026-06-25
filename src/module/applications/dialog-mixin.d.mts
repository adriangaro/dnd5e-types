/** Mixin method for v2-style dialogs. */

declare class Dialog {
  /** @privateRemarks All mixin classes accept anything for their constructor. */
  constructor(...args: any[]);
}

/** Adds v2-style dialog behavior to an appv1 Application class. */
declare function DialogMixin<TBase extends foundry.appv1.api.Application.AnyConstructor>(
  Base: TBase,
): typeof Dialog & TBase;

declare namespace DialogMixin {
  type MixinClass = Dialog;
}

export default DialogMixin;
