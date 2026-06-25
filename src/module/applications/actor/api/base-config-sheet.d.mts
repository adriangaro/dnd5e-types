/**
 * Base document sheet from which all actor configuration sheets should be based.
 *
 * Base class for the small actor/item "config" dialogs (movement, senses, skills, …). A plain
 * {@link DocumentSheet5e}; generic over its `Document` so each leaf binds the document it configures.
 */

import Application5e from "../../api/application.mjs";
import DocumentSheet5e from "../../api/document-sheet.mjs";

declare class BaseConfigSheet<
  Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation,
  RenderContext extends object = BaseConfigSheet.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<Document> = BaseConfigSheet.Configuration<Document>,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = BaseConfigSheet.RenderOptions,
> extends DocumentSheet5e<Document, RenderContext, Configuration, RenderOptions> {}

declare namespace BaseConfigSheet {
  interface Any extends BaseConfigSheet<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof BaseConfigSheet<any, any, any, any>> {}

  interface RenderContext<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends DocumentSheet5e.RenderContext<Document> {
    advantageModeOptions: { value: dnd5e.types.AdvantageMode; label: string }[];
  }
  interface Configuration<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends DocumentSheet5e.Configuration<Document> {}
  interface RenderOptions extends DocumentSheet5e.RenderOptions {}
}

export default BaseConfigSheet;
