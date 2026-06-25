/** Configuration application for traits. */

import AdvancementConfig from "./advancement-config-v2.mjs";

declare class TraitConfig<
  Document extends dnd5e.types.Advancement.Instance = dnd5e.types.Advancement.Instance,
  RenderContext extends object = TraitConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = TraitConfig.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = TraitConfig.RenderOptions,
> extends AdvancementConfig<Document, RenderContext, Configuration, RenderOptions> {
  /**
   * Index of the selected configuration, `-1` means `grants` array, any other number is equal
   * to an index in `choices` array.
   */
  selected: number;

  /** Trait type to display in the selector interface. */
  trait: dnd5e.types.Trait.TypeKey;

  /** Shortcut to the configuration data on the advancement. */
  get config(): fvttUtils.GetKey<Document, "configuration">;

  /** List of trait types for the current selected configuration. */
  get types(): Set<string>;
}

declare namespace TraitConfig {
  interface Any extends TraitConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof TraitConfig<any, any, any, any>> {}

  interface RenderContext<Document extends dnd5e.types.Advancement.Instance = dnd5e.types.Advancement.Instance>
    extends AdvancementConfig.RenderContext<Document> {
    grants: {
      label: string;
      data: fvttUtils.GetKey<fvttUtils.GetKey<Document, "configuration">, "grants">;
      selected: boolean;
    };
    choices: {
      label: string;
      data: fvttUtils.GetKey<
        fvttUtils.GetKey<fvttUtils.GetKey<Document, "configuration">, "choices">,
        number
      >;
      selected: boolean;
    }[];
    count?: {
      field: foundry.data.fields.NumberField<{ required: true; positive: true; integer: true; initial: 1 }>;
      value: fvttUtils.GetKey<
        fvttUtils.GetKey<
          fvttUtils.GetKey<fvttUtils.GetKey<Document, "configuration">, "choices">,
          number
        >,
        "count"
      >;
    };
    selectedIndex: number;
    disableAllowReplacements: boolean;
    default: {
      title: string;
      icon: string;
      hint: string;
    };
    trait: {
      field: foundry.data.fields.BooleanField;
      input: RenderContext["inputs"]["createCheckboxInput"];
      options: object;
      selected: dnd5e.types.Trait.TypeKey;
      selectedHeader: string;
      typeField: foundry.data.fields.StringField;
      typeOptions: { value: dnd5e.types.Trait.TypeKey; label: string }[];
    };
    mode: {
      hint: string;
      options: { value: dnd5e.types.TraitMode.TypeKey; label: string }[];
    };
  }
  interface Configuration extends AdvancementConfig.Configuration {}
  interface RenderOptions extends AdvancementConfig.RenderOptions {}
}

export default TraitConfig;
