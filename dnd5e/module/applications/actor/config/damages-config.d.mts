import SelectChoices from "../../../documents/actor/select-choices.mjs";
import type { CreateInputFunction } from "../../fields.d.mts";
import type TraitsConfig from "./traits-config.d.mts";

/**
 * Configuration application for actor's damage resistances, immunities, and vulnerabilities.
 */
declare class DamagesConfig<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends TraitsConfig<
  DamagesConfig.MakeRenderContext<RenderContext>,
  DamagesConfig.MakeConfiguration<Configuration>,
  DamagesConfig.MakeRenderOptions<RenderOptions>
> {
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /** @override */
  get otherLabel(): string;
}

declare namespace DamagesConfig {
  type MakeRenderContext<Ctx extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      bypasses: SelectChoices;
      value: {
        field: foundry.data.fields.DataField.Any; // Type of context.checkbox is unknown without TraitsConfig definition
        key: "amount" | "value";
        input?: CreateInputFunction
      };
      choices: SelectChoices; // Type of chosen is unknown without TraitsConfig definition
      bypassHint: string;
      hint: string;
    },
    Ctx
  >;
  type RenderContext = DamagesConfig['__RenderContext'];

  type MakeConfiguration<
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      // No specific configuration properties identified in the provided .mjs
    },
    Cfg
  >;
  type Configuration = DamagesConfig['__Configuration'];

  type MakeRenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {
      trait: "di" | "dr" | "dv" | "dm";
    },
    Opt
  >;
  type RenderOptions = DamagesConfig['__RenderOptions'];
}

export default DamagesConfig;