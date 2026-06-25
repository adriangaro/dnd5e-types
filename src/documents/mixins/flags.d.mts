/**
 * Mixin used to add system flags enforcement to types.
 *
 * Adds system-flags enforcement (`flags.dnd5e` typed by a system-provided `DataModel`) to a
 * document base. Declarations-only carrier: `fvttUtils.Mixin<MixinClass, BaseClass>` is just
 * `MixinClass & BaseClass`, so the result stays a single, extendable constructor.
 */

declare class _SystemFlagsMixin {
  constructor(...args: any[]);

  /**
   * Get the data model that represents system flags.
   * @abstract
   */
  get _systemFlagsDataModel(): foundry.abstract.DataModel.AnyConstructor | null;
}

/** Mixin used to add system-flags enforcement to a document class. */
export default function SystemFlagsMixin<T extends fvttUtils.AnyConcreteConstructor>(
  Base: T,
): fvttUtils.Mixin<typeof _SystemFlagsMixin, T>;
