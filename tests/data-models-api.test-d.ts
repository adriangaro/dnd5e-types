/**
 * `dnd5e.dataModels.*` must expose every member as BOTH a value (constructor) and a type
 * (instance), inside an OPEN namespace a module can declaration-merge into.
 */

import type { Expect, Extends } from "./_assert.ts";

/* ---- VALUE access: construct / extend ---- */
{
  // abstract bases are constructors
  const _a = dnd5e.dataModels.abstract.ActiveEffectDataModel;
  type _ctor = Expect<Extends<typeof _a, abstract new (...args: never) => any>>;
  // activity data is a value (runtime name → v2 class)
  const _atk = dnd5e.dataModels.activity.AttackActivityData;
  type _ctor2 = Expect<Extends<typeof _atk, new (...args: never) => any>>;
}

/* ---- TYPE access: name usable directly in type position ---- */
{
  type _T = dnd5e.dataModels.abstract.ItemDataModel;
  type _isModel = Expect<Extends<dnd5e.dataModels.activity.AttackActivityData, foundry.abstract.DataModel.Any>>;
}

/* ---- EXPANDABILITY: a module merges its own model into the open namespace ---- */
declare global {
  namespace dnd5e.dataModels.activity {
    const MyCustomActivityData: typeof import("../src/module/data/activity/base-activity.mjs").default;
    type MyCustomActivityData = import("../src/module/data/activity/base-activity.mjs").default;
  }
}
{
  const _mine = dnd5e.dataModels.activity.MyCustomActivityData;
  type _mineT = dnd5e.dataModels.activity.MyCustomActivityData;
  type _ok = Expect<Extends<_mineT, foundry.abstract.DataModel.Any>>;
}
