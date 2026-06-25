/**
 * Document-subtype data models: ChatMessage / ActiveEffect / JournalEntryPage now register their
 * dnd5e system subtypes (Seam C), so `.type` narrows `.system`, and each subtype's schema fields type.
 */

import type { Expect, Extends, Equal } from "./_assert.ts";

declare const r: ChatMessage.OfType<"rest">;

/* ---- ChatMessage subtypes ---- */
{
  type _turn = Expect<Extends<"turn", ChatMessage.SubType>>;
  type _rest = Expect<Extends<"rest", ChatMessage.SubType>>;
  type _usage = Expect<Extends<"usage", ChatMessage.SubType>>;

  function narrow(m: ChatMessage.Implementation) {
    if (m.type === "turn") {
      type _trigger = (typeof m)["system"]["trigger"]; // Set<string>
      type _origin = (typeof m)["system"]["origin"];
    }
  }

  // the `rest.system.request` ForeignDocumentField resolves to a FULL ChatMessage (not widened):
  type Req = NonNullable<(typeof r)["system"]["request"]>;
  type _reqIsChatMessage = Expect<Extends<Req, foundry.documents.BaseChatMessage>>;
  type _reqHasRolls = Req["rolls"]; // ChatMessage-specific member — proves it isn't Document.Any
}

/* ---- ActiveEffect subtypes (base is a REAL dnd5e subtype, kept) ---- */
{
  type _base = Expect<Extends<"base", ActiveEffect.SubType>>;
  type _ench = Expect<Extends<"enchantment", ActiveEffect.SubType>>;
}

/* ---- JournalEntryPage subtypes ---- */
{
  type _class = Expect<Extends<"class", JournalEntryPage.SubType>>;
  type _spells = Expect<Extends<"spells", JournalEntryPage.SubType>>;
}
