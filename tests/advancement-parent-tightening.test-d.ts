/**
 * Config-driven, EXPANDABLE parent-item tightening for advancements. A restricted advancement
 * narrows its `item` to the item subtype(s) it is valid for — carried DIRECTLY on the document type
 * (usable straight from the dnd5e API), driven by the expandable per-advancement set
 * `Advancement.ValidItemTypes.<Key>` (an open interface, mergeable like `ItemProperty.OverrideTypes`)
 * and the `Advancement.ParentItemOf<K>` fetch utility. A module can (a) WIDEN a built-in's valid
 * items and (b) declare its own — both via declaration merging, no closed unions. All cycle-safe.
 */

import type { Expect, Equal, Extends } from "./_assert.ts";
import type SubclassAdvancement from "#dnd5e/module/documents/advancement/subclass.mjs";

/* ---- a module WIDENS the built-in Subclass advancement to also allow a custom item subtype ---- */
declare global {
  namespace dnd5e.types.Advancement.ValidItemTypes {
    // impossible with a closed string union; trivial by merging the interface
    interface Subclass {
      feat: true;
    }
  }
}

/* ---- the narrowing is carried DIRECTLY on the document type (not just a helper) ---- */
{
  // narrowed item = class | subclass | feat (built-in default + the widening above)
  type _direct = Expect<Extends<SubclassAdvancement["item"], Item.OfType<"class" | "subclass" | "feat">>>;
  type _excludesOthers = Expect<Equal<Extract<SubclassAdvancement["item"], Item.OfType<"weapon">>, never>>;
  // and the registry view agrees (OfType<K> still equals the plain document — no overlay)
  type _ofTypeIsDoc = Expect<Equal<dnd5e.types.Advancement.OfType<"Subclass">, SubclassAdvancement>>;
}

/* ---- ParentItemOf<K> is the fetch utility; expandable set drives it ---- */
{
  type Keys = dnd5e.types.ExtractKeys<dnd5e.types.Advancement.ValidItemTypes.Subclass>;
  type _widened = Expect<Equal<Keys, "class" | "subclass" | "feat">>;
  type _fetch = Expect<Equal<dnd5e.types.Advancement.ParentItemOf<"Subclass">, Item.OfType<"class" | "subclass" | "feat">>>;
}

/* ---- default: an advancement with no ValidItemTypes entry accepts any item ---- */
{
  type _any = Expect<Equal<dnd5e.types.Advancement.ParentItemOf<"ScaleValue">, globalThis.Item.Implementation>>;
}

/* ---- a module declares its OWN advancement's (expandable) valid item set + fetches it ---- */
declare global {
  namespace dnd5e.types.Advancement {
    interface ValidItemTypes {
      MyAdvancement: ValidItemTypes.MyAdvancement;
    }
    namespace ValidItemTypes {
      interface MyAdvancement {
        feat: true;
      }
    }
  }
}
{
  type _resolved = Expect<Equal<dnd5e.types.Advancement.ParentItemOf<"MyAdvancement">, Item.OfType<"feat">>>;
  // a consumer document would write: `override get item(): dnd5e.types.Advancement.ParentItemOf<"MyAdvancement">;`
}
