import BaseConfigSheet from "../api/base-config-sheet.mjs";
/**
 * Configuration application for an actor's initiative.
 */
declare class InitiativeConfig<
  Document extends InitiativeConfig.ValidDocument = InitiativeConfig.ValidDocument,
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends BaseConfigSheet<
  Document,
  InitiativeConfig.MakeRenderContext<RenderContext, Document>,
  InitiativeConfig.MakeConfiguration<Configuration>,
  InitiativeConfig.MakeRenderOptions<RenderOptions>
> {
  // No specific methods/properties to declare in the boilerplate
}

declare namespace InitiativeConfig {
  type ValidDocument = Extract<Actor.OfType<Actor.SubType>, { system: { attributes: { init: any } } }>

  type MakeRenderContext<
    Ctx extends fvttUtils.AnyObject = {},
    Document extends ValidDocument = ValidDocument
  > = dnd5e.types.DeepMerge<
    {
      abilityOptions: dnd5e.types.FormSelectOption[];
      ability: {
        label: string;
        global: {
          field: dnd5e.types.GetTypeFromPath<Document, 'system.schema.fields.bonuses.fields.abilities.fields.check'>;
          name: string;
          value: any;
        };
        local: {
          field: dnd5e.types.GetTypeFromPath<Document, 'system.schema.fields.abilities.model.fields.bonuses.fields.check'>;
          name: string;
          value: any;
        };
      };
      flags: {
        alert: {
          field: foundry.data.fields.DataField.Any;
          name: string;
          value: any;
        };
        advantage: {
          field: foundry.data.fields.DataField.Any;
          name: string;
          value: any;
        };
      };
    },
    Ctx
  >;
  type RenderContext = InitiativeConfig['__RenderContext'];

  type MakeConfiguration<
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific configuration properties identified
    },
    Cfg
  >;
  type Configuration = InitiativeConfig['__Configuration'];

  type MakeRenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific render options identified
    },
    Opt
  >;
  type RenderOptions = InitiativeConfig['__RenderOptions'];
}

export default InitiativeConfig;
