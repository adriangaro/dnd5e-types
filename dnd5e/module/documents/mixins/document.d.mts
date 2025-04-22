import SystemFlagsMixin from "./flags.mjs";

declare class _SystemDocumentMixin {
  /** @privateRemarks All mixin classses should accept anything for its constructor. */
  constructor(...args: any[]);

  get _systemFlagsDataModel(): foundry.abstract.DataModel.AnyConstructor
}

/**
 * Mixin used to share some logic between Actor & Item documents.
 * @mixin
 */
export default function SystemDocumentMixin<
  T extends fvttUtils.AnyConcreteConstructor
>(Base: T): fvttUtils.Mixin<
  typeof _SystemDocumentMixin,
  ReturnType<typeof SystemFlagsMixin<T>>
>