import Advancement from "./advancement.mjs";

import AbilityScoreImprovementAdvancement from "./ability-score-improvement.mjs";
import HitPointsAdvancement from "./hit-points.mjs";
import ItemChoiceAdvancement from "./item-choice.mjs";
import ItemGrantAdvancement from "./item-grant.mjs";
import ScaleValueAdvancement from "./scale-value.mjs";
import SizeAdvancement from "./size.mjs";
import SubclassAdvancement from "./subclass.mjs";
import TraitAdvancement from "./trait.mjs";
import type AdvancementConfig from "@dnd5e/module/applications/advancement/advancement-config-v2.mjs";

export {
  Advancement,
  AbilityScoreImprovementAdvancement,
  HitPointsAdvancement,
  ItemChoiceAdvancement,
  ItemGrantAdvancement,
  ScaleValueAdvancement,
  SizeAdvancement,
  SubclassAdvancement,
  TraitAdvancement
}

declare global {
  namespace dnd5e.types {
    namespace Advancement {
      interface DefaultAdvancementTypes {
      }

      /**
         * Override interface for declaration merging.
         * Add custom advancement type here.
         * @example
         * declare global {
         * namespace dnd5e.types.Advancement {
         * interface OverrideTypes {
         * stamina: typeof StaminaAdvancement
         * }
         * }
         * }
         */
      interface OverrideTypes extends Record<never, typeof Advancement | never> { }

      // --- Derived Types ---
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultAdvancementTypes,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
      
      type AnyClass = Types[TypeKey];
      type Any = fvttUtils.FixedInstanceType<Types[TypeKey]>;

      type AdvancementTypeConfig<T extends TypeKey> = {
        documentClass: Types[T],
        validItemTypes: Set<Item.SubType>
      }

      type SchemaMap = {
        [K in keyof Types]: dnd5e.types.GetSchema<Types[K]>
      }

      // TODO: infer Config
      type ConfigSheetMap = {
        [K in keyof Types]: AdvancementConfig<Any>
      }

      type AdvancementAssignmentData<T extends TypeKey = TypeKey> = foundry.data.fields.SchemaField.AssignmentData<
        SchemaMap[T]
      >
    }
    interface DND5EConfig {
      advancementTypes: {
        [K in dnd5e.types.Advancement.TypeKey]: dnd5e.types.Advancement.AdvancementTypeConfig<K>
      }
    }
  }
}
