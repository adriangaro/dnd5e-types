/**
 * API surface for `dnd5e.applications.shared` (mirrors the runtime _module.mjs public exports).
 */

declare global {
  namespace dnd5e.applications.shared {
    const CreatureTypeConfig: typeof import("../applications/shared/creature-type-config.mjs").default;
    type CreatureTypeConfig<
      Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation,
      RenderContext extends object = import("../applications/shared/creature-type-config.mjs").default.RenderContext<Document>,
      Configuration extends foundry.applications.api.DocumentSheetV2.Configuration<Document> = import("../applications/shared/creature-type-config.mjs").default.Configuration<Document>,
      RenderOptions extends foundry.applications.api.DocumentSheetV2.RenderOptions = import("../applications/shared/creature-type-config.mjs").default.RenderOptions,
    > = import("../applications/shared/creature-type-config.mjs").default<Document, RenderContext, Configuration, RenderOptions>;
    const MovementSensesConfig: typeof import("../applications/shared/movement-senses-config.mjs").default;
    type MovementSensesConfig<
      Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation,
      RenderContext extends object = import("../applications/shared/movement-senses-config.mjs").default.RenderContext<Document>,
      Configuration extends foundry.applications.api.DocumentSheetV2.Configuration<Document> = import("../applications/shared/movement-senses-config.mjs").default.Configuration<Document>,
      RenderOptions extends foundry.applications.api.DocumentSheetV2.RenderOptions = import("../applications/shared/movement-senses-config.mjs").default.RenderOptions,
    > = import("../applications/shared/movement-senses-config.mjs").default<Document, RenderContext, Configuration, RenderOptions>;
    const SourceConfig: typeof import("../applications/shared/source-config.mjs").default;
    type SourceConfig<
      Document extends foundry.abstract.Document.Any = foundry.abstract.Document.Any,
      RenderContext extends object = import("../applications/shared/source-config.mjs").default.RenderContext<Document>,
      Configuration extends foundry.applications.api.DocumentSheetV2.Configuration<Document> = import("../applications/shared/source-config.mjs").default.Configuration<Document>,
      RenderOptions extends foundry.applications.api.DocumentSheetV2.RenderOptions = import("../applications/shared/source-config.mjs").default.RenderOptions,
    > = import("../applications/shared/source-config.mjs").default<Document, RenderContext, Configuration, RenderOptions>;
  }
}

export {};
