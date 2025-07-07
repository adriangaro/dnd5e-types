import type SizeAdvancement from "#dnd5e/module/documents/advancement/size.mjs";
import { filteredKeys } from "../../utils.mjs";
import AdvancementConfig from "./advancement-config-v2.mjs";

/**
 * Configuration application for size advancement.
 */
export default class SizeConfig extends AdvancementConfig<
  SizeAdvancement, 
  {
    default: {
      hint: string
    },
    showLevelSelector: boolean,
    sizes: Record<
      dnd5e.types.ActorSize.TypeKey,
      {
        fields: foundry.data.fields.BooleanField,
        input: AdvancementConfig<SizeAdvancement>['__RenderContext']['inputs']['createCheckboxInput'],
        value: boolean
      }
    >
  }
> {}
