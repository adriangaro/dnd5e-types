/**
 * Applications wiring (Layer 2 + API surface): every application class is reachable through the
 * `dnd5e.applications.*` namespace as BOTH a value (constructor) and a type, and the clean+expandable
 * pattern survives all the way to the leaves — a consumer can subclass a leaf sheet with its own
 * RenderContext and the merged shape (including the shared 5e `CONFIG`/`inputs`) flows through.
 */

import type { Expect, Extends } from "./_assert.ts";

import CharacterActorSheet from "#dnd5e/module/applications/actor/character-sheet.mjs";
import AttackSheet from "#dnd5e/module/applications/activity/attack-sheet.mjs";
import HitPointsConfig from "#dnd5e/module/applications/actor/config/hit-points-config.mjs";

// --- API namespace exposes classes as values (constructors) --------------------
{
  type _char = Expect<Extends<typeof dnd5e.applications.actor.CharacterActorSheet, abstract new (...a: any) => any>>;
  type _attack = Expect<Extends<typeof dnd5e.applications.activity.AttackSheet, abstract new (...a: any) => any>>;
  type _dialog = Expect<Extends<typeof dnd5e.applications.api.Dialog5e, abstract new (...a: any) => any>>;
  type _item = Expect<Extends<typeof dnd5e.applications.item.ItemSheet5e, abstract new (...a: any) => any>>;
  type _settings = Expect<Extends<typeof dnd5e.applications.settings.BaseSettingsConfig, abstract new (...a: any) => any>>;
  // function-valued mixin is exposed too
  type _mixin = Expect<Extends<typeof dnd5e.applications.DialogMixin, (...a: any) => any>>;
}

// --- API namespace exposes instance types --------------------------------------
{
  type _charInstance = dnd5e.applications.actor.CharacterActorSheet;
  type _ok = Expect<Extends<_charInstance, foundry.applications.api.ApplicationV2.Any>>;
}

// --- A consumer subclasses a leaf sheet with its own render context -------------
declare namespace MyAttackSheet {
  interface RenderContext extends AttackSheet.RenderContext {
    myExtra: boolean;
  }
}
declare class MyAttackSheet extends AttackSheet<dnd5e.types.Activity.Instance, MyAttackSheet.RenderContext> {}
{
  type Ctx = foundry.applications.api.ApplicationV2.RenderContextOf<MyAttackSheet>;
  type _config = Expect<Extends<Ctx["CONFIG"], dnd5e.types.DND5EConfig>>;
  type _extra = Expect<Extends<Ctx, { myExtra: boolean }>>;
}

// --- And the leaf is the same class reachable via the namespace -----------------
{
  type _same = Expect<Extends<CharacterActorSheet, dnd5e.applications.actor.CharacterActorSheet>>;
}

// --- Config-sheet `fields` context member is a DataSchema, not bare `object` -----
//     (a downstream config that narrows `fields` to its OWN precise schema field-set — as
//      lewd-handbook's StaminaPointsConfig does — must still satisfy the base member.)
{
  type Ctx = HitPointsConfig.RenderContext;
  type _fieldsIsSchema = Expect<Extends<Ctx["fields"], foundry.data.fields.DataSchema>>;
  // `context.fields.X` resolves to a DataField (enables `context.fields.bonuses`, `p in context.fields`).
  type _indexable = Expect<Extends<Ctx["fields"][string], foundry.data.fields.DataField.Any>>;
  // a precise field-set narrows cleanly onto the base member (override-safe).
  type PreciseFields = { max: foundry.data.fields.NumberField; value: foundry.data.fields.NumberField };
  type _narrowable = Expect<Extends<PreciseFields, Ctx["fields"]>>;
}
