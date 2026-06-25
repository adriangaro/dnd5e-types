/**
 * Mixin used to add support for registering documents in the dependents registry.
 *
 * Adds support for registering documents in the dependents registry (via `flags.dnd5e.dependentOn`).
 * Functionally it only overrides `prepareData`/`_onDelete`, so it introduces no new public surface —
 * it is transparent at the type level and simply preserves the base document's construct signature
 * (so `DependentDocumentMixin(ActiveEffect)<SubType>` still threads the subtype through).
 */

declare class _DependentDocumentMixin {
  /** @privateRemarks All mixin classes accept anything for their constructor. */
  constructor(...args: any[]);
}

/** Mixin adding dependents-registry tracking to a document class. */
export default function DependentDocumentMixin<T extends fvttUtils.AnyConcreteConstructor>(
  Base: T,
): fvttUtils.Mixin<typeof _DependentDocumentMixin, T>;
