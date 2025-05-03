import type { ResolvedUUID } from "node_modules/fvtt-types/src/foundry/common/utils/helpers.d.mts";

/**
 * FIXME: Remove when v12 support dropped or https://github.com/foundryvtt/foundryvtt/issues/11991 backported.
 * Should NOT be exported for general use.
 * @ignore
 */
export default function parseUuid(uuid: string, options?: {relative?: foundry.abstract.Document.Any}): ResolvedUUID

/** @ignore */
declare function _resolveRelativeUuid(uuid: string, relative: foundry.abstract.Document.Any | null): ResolvedUUID