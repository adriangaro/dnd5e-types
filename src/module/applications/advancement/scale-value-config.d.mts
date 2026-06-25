/** Configuration application for scale values. */

import AdvancementConfig from "./advancement-config-v2.mjs";

declare class ScaleValueConfig<
  Document extends dnd5e.types.Advancement.Instance = dnd5e.types.Advancement.Instance,
  RenderContext extends object = ScaleValueConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = ScaleValueConfig.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = ScaleValueConfig.RenderOptions,
> extends AdvancementConfig<Document, RenderContext, Configuration, RenderOptions> {
  /** Range of levels that can be used based on what item type this advancement is within. */
  get levelRange(): number[];

  /** Prepare the data to display at each of the scale levels. */
  _prepareLevelData(): Record<string, {
    fields: Record<string, object>;
    value: object;
  }>;

  /**
   * For scale values with multiple properties, have missing properties inherit from earlier filled-in values.
   * @param value      The primary value.
   * @param lastValue  The previous value.
   * @deprecated since DnD5e 6.0
   */
  _mergeScaleValues(value: object, lastValue: object): void;

  /**
   * If no identifier is manually entered, slugify the custom title and display as placeholder.
   * @param event  Change event to the title input.
   */
  _onChangeTitle(event: Event): void;

  /** @inheritDoc */
  activateListeners(html: JQuery | HTMLElement): void;

  /** @inheritDoc */
  prepareConfigurationUpdate(configuration: object): Promise<object>;

  /** @inheritDoc */
  _processSubmitData(event: SubmitEvent, submitData: object): Promise<void>;
}

declare namespace ScaleValueConfig {
  interface Any extends ScaleValueConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof ScaleValueConfig<any, any, any, any>> {}

  interface RenderContext<Document extends dnd5e.types.Advancement.Instance = dnd5e.types.Advancement.Instance>
    extends Omit<AdvancementConfig.RenderContext<Document>, "levels"> {
    distanceOptions: {
      value: string;
      label: string;
    }[];
    identifier: {
      placeholder: string;
      hint: string;
    };
    levels: Record<string, {
      fields: Record<string, object>;
      value: object;
    }>;
    type: {
      label: string;
      hint: string;
      identifier: string;
      isNumeric: boolean;
      fields: foundry.data.fields.DataSchema;
      options: { value: string; label: string }[];
    };
  }
  interface Configuration extends AdvancementConfig.Configuration {}
  interface RenderOptions extends AdvancementConfig.RenderOptions {}
}

export default ScaleValueConfig;
