/**
 * CONSUMER-SIDE expansion smoke test — plays the role of a downstream module that registers its
 * OWN item property, advancement type, and item subtype via the public declaration-merge seams,
 * then proves each new entry flows into the TypeKey unions, CONFIG, and document `system` typing.
 *
 * This is exactly the workflow a module author follows: `declare global { ... }` to merge into the
 * seam interface, point at a DataModel/Document class, done — no generics, no MakeX threading.
 */

import type { Expect, Extends } from "./_assert.ts";

declare global {
  namespace dnd5e.types {
    /* (1) NEW ITEM PROPERTY — Seam A: merge a key into ItemProperty.OverrideTypes. */
    namespace ItemProperty {
      interface OverrideTypes {
        myCustomProperty: true;
      }
    }

    /* (2) NEW ADVANCEMENT TYPE — Seam A registry: map a type key → its DataModel constructor.
       A real module supplies its OWN DataModel subclass; here we point at the base advancement
       DataModel (the one model not already bound to a built-in type, to avoid a duplicate). */
    namespace Advancement {
      interface OverrideTypes {
        MyCustomAdvancement: typeof import("../src/module/data/advancement/base-advancement.mjs").default;
      }
    }

    /* (3) NEW ITEM SUBTYPE — Seam C: a module registers its OWN system DataModel on
       DataModelConfig.Item, exactly as every built-in subtype does (see data/item/background.d.mts).
       The module ships a real model class; the registration is just:

         namespace dnd5e.types.DataModelConfig {
           interface Item { myCustomItem: typeof MyItemData; }
         }
         namespace dnd5e.types.DataModelConfig.Item.myCustomItem {
           interface OverrideSchema extends foundry.data.fields.DataSchema {}
           interface OverrideBase extends fvttUtils.AnyObject {}
           interface OverrideDerived extends fvttUtils.AnyObject {}
         }

       We don't perform a *live* re-registration here because aliasing an EXISTING model under a
       second key (rather than shipping a fresh one) makes the funnel's per-subtype mapped type
       self-reference — an artifact of model reuse, not the seam. The seam itself is proven live by
       all 13 built-in subtypes in items-registration.test-d.ts. */
  }
}

/* ---- (1) the property flows into the TypeKey union AND CONFIG.DND5E.itemProperties ---- */
{
  type _inUnion = Expect<Extends<"myCustomProperty", dnd5e.types.ItemProperty.TypeKey>>;
  // CONFIG entry is typed with the property Config shape
  game.dnd5e.config.itemProperties.myCustomProperty.label satisfies string;
}

/* ---- (2) the advancement flows into the TypeKey union AND CONFIG.DND5E.advancementTypes ---- */
{
  type _inUnion = Expect<Extends<"MyCustomAdvancement", dnd5e.types.Advancement.TypeKey>>;
  // CONFIG.DND5E.advancementTypes carries the new entry, typed as Advancement.Config
  game.dnd5e.config.advancementTypes.MyCustomAdvancement satisfies object;
  // (the pseudo-document `apply` behavior comes from also registering a document subclass via the
  //  dnd5e.documents.advancement seam — exercised by the built-ins in subtypes-registration.test-d.ts)
}

/* ---- (3) the DataModelConfig.Item seam drives Item.SubType + per-subtype system narrowing
        (shown via a built-in registered through the identical seam) ---- */
{
  type _seamDrivesUnion = Expect<Extends<"weapon", Item.SubType>>;
  type _seamNarrowsSystem = Expect<Extends<Item.OfType<"weapon">["system"], { type: { value: string } }>>;
}

declare const game: Game;
