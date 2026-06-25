/**
 * Mixin used to share some logic between Actor & Item documents.
 *
 * Shared base behaviour for the dnd5e Actor & Item documents (system-flags handling + small
 * shared helpers). Layered on top of {@link SystemFlagsMixin}. The mixed result keeps the base's
 * generic construct signature, so `SystemDocumentMixin(Item)<SubType>` / `(Actor)<SubType>` still
 * thread the document subtype through to `system` narrowing.
 */

import type DependentDocumentMixin from "./dependent.mjs";
import type SystemFlagsMixin from "./flags.mjs";

declare class _SystemDocumentMixin {
  /** @privateRemarks All mixin classes accept anything for their constructor. */
  constructor(...args: any[]);

  /** The `DataModel` definition for this document's `flags.dnd5e`, or `null`. */
  get _systemFlagsDataModel(): foundry.abstract.DataModel.AnyConstructor | null;
}

/** Mixin shared between the dnd5e Actor & Item document classes. */
export default function SystemDocumentMixin<T extends fvttUtils.AnyConcreteConstructor>(
  Base: T,
): fvttUtils.Mixin<typeof _SystemDocumentMixin, ReturnType<typeof DependentDocumentMixin<ReturnType<typeof SystemFlagsMixin<T>>>>>;
