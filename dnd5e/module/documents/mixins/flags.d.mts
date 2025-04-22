declare class _SystemFlagsMixin {
  /** @privateRemarks All mixin classses should accept anything for its constructor. */
  constructor(...args: any[]);

  get _systemFlagsDataModel(): foundry.abstract.DataModel.AnyConstructor
}


/**
 * Mixin used to add system flags enforcement to types.
 * @mixin
 */
export default function SystemFlagsMixin<
  T extends fvttUtils.AnyConcreteConstructor
>(Base: T): fvttUtils.Mixin<
  typeof _SystemFlagsMixin, 
  T
>