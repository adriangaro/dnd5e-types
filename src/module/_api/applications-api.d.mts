/**
 * Runtime API fragment for `dnd5e.applications.api` — mirrors the runtime
 * `module/applications/api/_module.mjs` (the application-layer foundation classes/mixins).
 *
 * Each member is exposed as BOTH a value (`const` → constructor/function) and, for classes, a type
 * (`type` → instance), inside an OPEN namespace so a module can declaration-merge its own members in.
 * The generic type aliases forward to the concrete classes (whose defaults point at their open
 * namespace interfaces), so `dnd5e.applications.api.Application5e<MyCtx>` works for subclassers.
 */

declare global {
  namespace dnd5e.applications.api {
    const Application5e: typeof import("../applications/api/application.mjs").default;
    type Application5e<
      RenderContext extends object = import("../applications/api/application.mjs").default.RenderContext,
      Configuration extends
        foundry.applications.api.ApplicationV2.Configuration = import("../applications/api/application.mjs").default.Configuration,
      RenderOptions extends
        foundry.applications.api.ApplicationV2.RenderOptions = import("../applications/api/application.mjs").default.RenderOptions,
    > = import("../applications/api/application.mjs").default<RenderContext, Configuration, RenderOptions>;

    const ApplicationV2Mixin: typeof import("../applications/api/application-v2-mixin.mjs").default;

    const Dialog5e: typeof import("../applications/api/dialog.mjs").default;
    type Dialog5e<
      RenderContext extends object = import("../applications/api/dialog.mjs").default.RenderContext,
      Configuration extends
        foundry.applications.api.ApplicationV2.Configuration = import("../applications/api/dialog.mjs").default.Configuration,
      RenderOptions extends
        foundry.applications.api.ApplicationV2.RenderOptions = import("../applications/api/dialog.mjs").default.RenderOptions,
    > = import("../applications/api/dialog.mjs").default<RenderContext, Configuration, RenderOptions>;

    const DocumentSheet5e: typeof import("../applications/api/document-sheet.mjs").default;
    type DocumentSheet5e<
      Document extends foundry.abstract.Document.Any = foundry.abstract.Document.Any,
      RenderContext extends object = import("../applications/api/document-sheet.mjs").default.RenderContext<Document>,
      Configuration extends
        foundry.applications.api.DocumentSheetV2.Configuration<Document> = import("../applications/api/document-sheet.mjs").default.Configuration<Document>,
      RenderOptions extends
        foundry.applications.api.DocumentSheetV2.RenderOptions = import("../applications/api/document-sheet.mjs").default.RenderOptions,
    > = import("../applications/api/document-sheet.mjs").default<Document, RenderContext, Configuration, RenderOptions>;

    const PseudoDocumentSheet: typeof import("../applications/api/pseudo-document-sheet.mjs").default;
    type PseudoDocumentSheet<
      Document extends foundry.abstract.DataModel.Any = foundry.abstract.DataModel.Any,
      RenderContext extends object = import("../applications/api/pseudo-document-sheet.mjs").default.RenderContext<Document>,
      Configuration extends
        foundry.applications.api.ApplicationV2.Configuration = import("../applications/api/pseudo-document-sheet.mjs").default.Configuration,
      RenderOptions extends
        foundry.applications.api.ApplicationV2.RenderOptions = import("../applications/api/pseudo-document-sheet.mjs").default.RenderOptions,
    > = import("../applications/api/pseudo-document-sheet.mjs").default<Document, RenderContext, Configuration, RenderOptions>;

    const PrimarySheetMixin: typeof import("../applications/api/primary-sheet-mixin.mjs").default;
    const DragDropApplicationMixin: typeof import("../applications/api/drag-drop-mixin.mjs").default;

    /** A prepared form-field descriptor (the shape sheets push into their render context). */
    type FieldsConfig = import("../applications/api/application.mjs").default.FieldsConfig;
  }

  namespace dnd5e.applications {
    /** dnd5e custom form-input factories (also surfaced in every render context's `inputs`). */
    namespace fields {
      const createCheckboxInput: typeof import("../applications/fields.mjs").createCheckboxInput;
      const createMultiCheckboxInput: typeof import("../applications/fields.mjs").createMultiCheckboxInput;
      const createNumberInput: typeof import("../applications/fields.mjs").createNumberInput;
      const createTextInput: typeof import("../applications/fields.mjs").createTextInput;
      const createIdentifierInput: typeof import("../applications/fields.mjs").createIdentifierInput;
    }
  }
}

export {};
