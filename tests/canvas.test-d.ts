/**
 * Canvas layer (src/module/canvas/*) — classes exist, extend the right fvtt-types bases,
 * and expose dnd5e-specific members.
 */

import type { Expect, Extends } from "./_assert.ts";
import type Token5e from "../src/module/canvas/token.mjs";
import type Note5e from "../src/module/canvas/note.mjs";
import type AbilityTemplate from "../src/module/canvas/ability-template.mjs";
import type TemplatePlacement from "../src/module/canvas/template-placement.mjs";
import type TokenPlacement from "../src/module/canvas/token-placement.mjs";
import type BasePlacement from "../src/module/canvas/api/base-placement.mjs";
import type TokenLayer5e from "../src/module/canvas/layers/tokens.mjs";

/* ---- subclass the correct fvtt-types bases ---- */
{
  type _tok = Expect<Extends<Token5e, foundry.canvas.placeables.Token>>;
  type _note = Expect<Extends<Note5e, foundry.canvas.placeables.Note>>;
  type _tmpl = Expect<Extends<AbilityTemplate, foundry.canvas.placeables.MeasuredTemplate>>;
  type _layer = Expect<Extends<TokenLayer5e, foundry.canvas.layers.TokenLayer>>;
  type _place = Expect<Extends<TemplatePlacement, BasePlacement.Any>>;
  type _tplace = Expect<Extends<TokenPlacement, BasePlacement.Any>>;
}

/* ---- dnd5e-specific members are present + typed ---- */
{
  type _onTarget = Expect<Extends<typeof Token5e.onTargetToken, (...a: never[]) => void>>;
  type _ringHelper = Expect<Extends<Token5e["_drawHPBar"], (...a: never[]) => void>>;
  // TemplatePlacement.fromActivity is async and resolves to the placed region documents (or null).
  type _fromAct = Expect<
    Extends<Awaited<ReturnType<typeof TemplatePlacement.fromActivity>>, globalThis.RegionDocument.Implementation[] | null>
  >;
}
