/**
 * `PseudoDocumentMixin(Base)` is the internal mixin shared by Activity & Advancement: it layers the
 * pseudo-document surface (id / relativeID / uuid / item / actor / sheet + update / delete /
 * createDialog) atop a base DataModel, WITHOUT discarding the base's own members. This pins both
 * halves of that contract — the added surface AND base passthrough — plus the static side.
 */

import type { Expect, Equal, Extends } from "./_assert.ts";
import type PseudoDocumentMixin from "#dnd5e/module/documents/mixins/pseudo-document.mjs";
import type { PseudoDocument } from "#dnd5e/module/documents/mixins/pseudo-document.mjs";

// A minimal base data model carrying its own member, to prove passthrough.
declare const MyBase: new (...args: any[]) => foundry.abstract.DataModel.Any & { customField: number };

declare const Mixed: ReturnType<typeof PseudoDocumentMixin<typeof MyBase>>;
type Inst = InstanceType<typeof Mixed>;

/* ---- the mixed instance carries the shared pseudo-document surface ---- */
{
  type _isPseudo = Expect<Extends<Inst, PseudoDocument>>;
  type _id = Expect<Equal<Inst["id"], string>>;
  type _relativeID = Expect<Equal<Inst["relativeID"], string>>;
  type _uuid = Expect<Equal<Inst["uuid"], string | null>>;
  type _item = Expect<Equal<Inst["item"], Item.Implementation>>;
  type _actor = Expect<Equal<Inst["actor"], Actor.Implementation | null>>;
  // update/delete resolve back to the mixed instance (`this`), not bare PseudoDocument
  type _update = Expect<Extends<ReturnType<Inst["update"]>, Promise<Inst>>>;
  type _delete = Expect<Extends<ReturnType<Inst["delete"]>, Promise<Inst>>>;
}

/* ---- ...without discarding the base model's own members ---- */
{
  type _basePassthrough = Expect<Equal<Inst["customField"], number>>;
  type _stillDataModel = Expect<Extends<Inst, foundry.abstract.DataModel.Any>>;
}

/* ---- the static side carries the pseudo-document statics + base statics ---- */
{
  type _createDialog = Expect<Extends<typeof Mixed, Pick<typeof PseudoDocument, "createDialog" | "defaultName">>>;
  // documentName is exposed on both the instance and the constructor
  type _docNameInst = Expect<Equal<Inst["documentName"], string>>;
  type _docNameStatic = Expect<Equal<(typeof Mixed)["documentName"], string>>;
}
