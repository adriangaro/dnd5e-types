/**
 * Application foundation (Layer 0): the bases are clean & subclassable via OPEN namespace interfaces
 * (the usability mandate). A consumer declares its own `RenderContext` interface extending the
 * parent's, passes it as the type argument, and the merged shape (including the shared 5e
 * `CONFIG`/`inputs`) flows into the class — read back via `ApplicationV2.RenderContextOf<this>`.
 */

import type { Expect, Extends } from "./_assert.ts";

import Application5e from "#dnd5e/module/applications/api/application.mjs";
import DocumentSheet5e from "#dnd5e/module/applications/api/document-sheet.mjs";
import Dialog5e from "#dnd5e/module/applications/api/dialog.mjs";

type CtxOf<T extends foundry.applications.api.ApplicationV2.Internal.Instance.Any> =
  foundry.applications.api.ApplicationV2.RenderContextOf<T>;

// --- Consumer subclasses a base application with its own context interface ------
declare namespace MyApp {
  interface RenderContext extends Application5e.RenderContext {
    myField: number;
  }
}
declare class MyApp extends Application5e<MyApp.RenderContext> {}

{
  type Ctx = CtxOf<MyApp>;
  // shared 5e render context (CONFIG + dnd5e field inputs) flows in
  type _config = Expect<Extends<Ctx["CONFIG"], dnd5e.types.DND5EConfig>>;
  // the subclass's own field is present
  type _custom = Expect<Extends<Ctx, { myField: number }>>;
  // window subtitle was added system-wide to foundry's WindowConfiguration
  type _subtitle = Expect<Extends<foundry.applications.api.ApplicationV2.WindowConfiguration, { subtitle: string }>>;
}

// --- Consumer subclasses the document sheet bound to an Item --------------------
declare namespace MyItemSheet {
  interface RenderContext extends DocumentSheet5e.RenderContext<globalThis.Item.Implementation> {
    rows: string[];
  }
}
declare class MyItemSheet extends DocumentSheet5e<globalThis.Item.Implementation, MyItemSheet.RenderContext> {}
{
  type Ctx = CtxOf<MyItemSheet>;
  type _doc = Expect<Extends<MyItemSheet["document"], globalThis.Item.Implementation>>;
  type _rows = Expect<Extends<Ctx, { rows: string[] }>>;
  type _config = Expect<Extends<Ctx["CONFIG"], dnd5e.types.DND5EConfig>>;
}

// --- Dialog adds buttons to the context ----------------------------------------
declare class MyDialog extends Dialog5e {}
{
  type Ctx = CtxOf<MyDialog>;
  type _buttons = Expect<Extends<Ctx["buttons"], Dialog5e.Button[]>>;
}
