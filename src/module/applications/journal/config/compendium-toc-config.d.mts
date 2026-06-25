/** Application for configuring which documents appear in the Table of Contents. */

import Application5e from "../../api/application.mjs";

declare class CompendiumTOCConfig<
  RenderContext extends object = CompendiumTOCConfig.RenderContext,
  Configuration extends foundry.applications.api.ApplicationV2.Configuration = CompendiumTOCConfig.Configuration,
  RenderOptions extends foundry.applications.api.ApplicationV2.RenderOptions = CompendiumTOCConfig.RenderOptions,
> extends Application5e<RenderContext, Configuration, RenderOptions> {
  /** The compendium being configured. */
  get compendium(): CompendiumCollection.Any;

  get title(): string;

  get subtitle(): string;
}

declare namespace CompendiumTOCConfig {
  interface Any extends CompendiumTOCConfig<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof CompendiumTOCConfig<any, any, any>> {}

  /** Render context for `CompendiumTOCConfig`. Open for declaration merging; extended by subclasses. */
  interface RenderContext extends Application5e.RenderContext {
    folders: Array<{
      name: string;
      entries: Array<{
        data: object;
        entry: object;
        fields: dnd5e.applications.api.FieldsConfig[];
        warning: string | null;
      }>;
    }>;
  }

  /** Configuration for `CompendiumTOCConfig`. Open for declaration merging; extended by subclasses. */
  interface Configuration extends Application5e.Configuration {
    compendium: CompendiumCollection.Any | null;
  }

  /** Render options for `CompendiumTOCConfig`. Open for declaration merging; extended by subclasses. */
  interface RenderOptions extends Application5e.RenderOptions {}
}

export default CompendiumTOCConfig;
