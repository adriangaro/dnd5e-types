import _Advancement from "./advancement.mjs";

import AbilityScoreImprovementAdvancement from "./ability-score-improvement.mjs";
import HitPointsAdvancement from "./hit-points.mjs";
import ItemChoiceAdvancement from "./item-choice.mjs";
import ItemGrantAdvancement from "./item-grant.mjs";
import ScaleValueAdvancement from "./scale-value.mjs";
import SizeAdvancement from "./size.mjs";
import SubclassAdvancement from "./subclass.mjs";
import TraitAdvancement from "./trait.mjs";

export {
  _Advancement as Advancement,
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
      interface DefaultAdvancementTypes extends Record<string, _Advancement.AnyConstructor | never> {
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
      interface OverrideTypes extends Record<string, _Advancement.AnyConstructor | never> { }

      // --- Derived Types ---
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultAdvancementTypes,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      
      type AdvancementInstances = {
        [K in TypeKey]: fvttUtils.FixedInstanceType<Types[K]>
      }
    
      
      type AnyClass = Types[TypeKey];
      type Any = Implementation;
      type OfType<T extends TypeKey> = AdvancementInstances[T]
      type ClassOfType<T extends TypeKey> = Types[T]
      type Implementation<T extends TypeKey = TypeKey> = AdvancementInstances[T]
      type ImplementationClass<T extends TypeKey = TypeKey> = Types[T]

      /**
       * Configuration information for advancement types.
       */
      type AdvancementTypeConfig<T extends TypeKey> = {
        /**
         *  The advancement's document class.
         */
        documentClass: Types[T],
        /**
         * What item types this advancement can be used with.
         */
        validItemTypes: Set<Item.SubType>
        /**
         * Should this advancement type be hidden in the selection dialog?
         */
        hidden?: boolean
      }

      type SchemaMap = {
        [K in keyof Types]: dnd5e.types.GetSchema<Types[K]>
      }
      type Schema<T extends TypeKey = TypeKey> = SchemaMap[T]

      type ConfigSheetMap = {
        [K in keyof Types]: OfType<K>['sheet']
      }
      type ConfigSheet<T extends TypeKey = TypeKey> = ConfigSheetMap[T]
    }
    interface DND5EConfig {
      /**
       * Advancement types that can be added to items.
       */
      advancementTypes: {
        [K in dnd5e.types.Advancement.TypeKey]: dnd5e.types.Advancement.AdvancementTypeConfig<K>
      }
    }
  }
}
