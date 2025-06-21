import type DocumentSheet from "../../api/document-sheet.d.mts";

/**
 * Adds V2 sheet functionality shared between primary document sheets (Actors & Items).
 * @param Base The base class being mixed.
 * @returns The same base class (deprecated passthrough).
 * @deprecated Use ItemSheet5e directly instead
 */
declare function ItemSheetV2Mixin<T extends DocumentSheet.AnyConstructor>(Base: T): T;

export default ItemSheetV2Mixin;
