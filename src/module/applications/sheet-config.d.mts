/**
 * Sheet config with extra options.
 * @deprecated since DnD5e 6.0, until DnD5e 6.1. `SheetConfig5e` is not used, inherit from `DocumentSheetConfig` instead.
 */
declare class SheetConfig5e extends foundry.applications.apps.DocumentSheetConfig {}

declare namespace SheetConfig5e {
  interface Any extends SheetConfig5e {}
  interface AnyConstructor extends fvttUtils.Identity<typeof SheetConfig5e> {}
}

export default SheetConfig5e;
