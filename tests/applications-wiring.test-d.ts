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

// --- Config-sheet `{ fields, source, data }` subset is strongly typed from its schema -----
//     hit-points-config edits `system.attributes.hp`: `fields` is the HitPoints schema map,
//     `source` its `_source` shape, `data` the live post-derivation slice (via PathValue).
//     This is the pattern a downstream config (e.g. lewd-handbook's StaminaPointsConfig) follows.
{
  type Ctx = HitPointsConfig.RenderContext;
  // `fields` is the concrete schema map → indexable to real DataFields (`context.fields.max`, etc.)
  type _fieldsIsSchema = Expect<Extends<Ctx["fields"], dnd5e.types.Actor.Attributes.HitPointsSchema>>;
  type _fieldsKey = Expect<Extends<Ctx["fields"]["max"], foundry.data.fields.DataField.Any>>;
  // `source` is the schema's `_source` shape → `context.source.value` is a number, not `unknown`
  type _sourceVal = Expect<Extends<Ctx["source"], dnd5e.types.SourceOf<dnd5e.types.Actor.Attributes.HitPointsSchema>>>;
  // `source.value` is the schema's number field — `value` exists as a key (not an opaque `object`)
  type _sourceHasValue = Expect<Extends<"value", keyof Ctx["source"]>>;
  // `data` is resolved from the live document slice (PathValue), carrying derived hp props
  type _dataValue = Expect<Extends<Ctx["data"], dnd5e.types.PathValue<Actor.Implementation, "system.attributes.hp">>>;
  type _pathWorks = Expect<Extends<dnd5e.types.PathValue<{ a: { b: { c: number } } }, "a.b.c">, number>>;
}
