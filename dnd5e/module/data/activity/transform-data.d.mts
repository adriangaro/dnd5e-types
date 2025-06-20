import FormulaField from "../fields/formula-field.mjs";
import IdentifierField from "../fields/identifier-field.mjs";
import TransformationSetting from "../settings/transformation-setting.mjs";
import BaseActivityData from "./base-activity.mjs";

/**
 * Data model for a transform activity.
 */
declare class TransformActivityData extends BaseActivityData<
  'transform',
  dnd5e.types.MergeSchemas<
    {
      profiles: foundry.data.fields.ArrayField<foundry.data.fields.SchemaField<{
        _id: foundry.data.fields.DocumentIdField,
        cr: FormulaField<{ deterministic: true }>,
        level: foundry.data.fields.SchemaField<{
          min: foundry.data.fields.NumberField<{ integer: true, min: 0 }>,
          max: foundry.data.fields.NumberField<{ integer: true, min: 0 }>
        }>,
        movement: foundry.data.fields.SetField<
          dnd5e.types.fields.RestrictedStringField<dnd5e.types.Movement.TypeKey>
        >,
        name: foundry.data.fields.StringField,
        sizes: foundry.data.fields.SetField<
          dnd5e.types.fields.RestrictedStringField<dnd5e.types.ActorSize.TypeKey>
        >,
        types: foundry.data.fields.SetField<
          dnd5e.types.fields.RestrictedStringField<dnd5e.types.Creature.TypeKey>
        >
      }>>,
      settings: foundry.data.fields.EmbeddedDataField<typeof TransformationSetting, { nullable: true, initial: null }>,
      transform: foundry.data.fields.SchemaField<{
        customize: foundry.data.fields.BooleanField,
        identifier: IdentifierField,
        preset: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Transform.Presets.TypeKey>
      }>
    },
    {}
  >
> {
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /** @override */
  get applicableEffects(): null;

  /* -------------------------------------------- */

  /**
   * Transform profiles that can be performed based on spell/character/class level.
   */
  get availableProfiles(): TransformActivityData.TransformProfile[];

  /* -------------------------------------------- */

  /**
   * Determine the level used to determine profile limits, based on the spell level for spells or either the
   * character or class level, depending on whether `classIdentifier` is set.
   */
  get relevantLevel(): number;


}

declare namespace TransformActivityData {
  /**
   * Transform profile configuration - extracted from the profiles array element type.
   */
  type TransformProfile = TransformActivityData['profiles'][number]
}

export default TransformActivityData;

declare global {
  namespace dnd5e.types {
    namespace Transform {
      type TransformationProfile = TransformActivityData.TransformProfile;

      /**
       * Common configuration for transformation flags (effects, keep, merge, other).
       * Based on TransformationFlagConfiguration from config.mjs.
       */
      interface FlagConfig {
        /** Localized label for the flag. */
        label: string;
        /** Localized hint for the flag. */
        hint?: string;
        /** This should be part of the default transformation settings. */
        default?: boolean;
        /** Names of specific settings to disable, or whole categories if an `*` is used. */
        disables?: string[];
      }

      namespace Effects {
        interface DefaultTypes extends Record<string, boolean> {
          all: true;
          origin: true;
          otherOrigin: true;
          background: true;
          class: true;
          feat: true;
          equipment: true;
          spell: true;
        }

        interface OverrideTypes extends Record<string, boolean | never> {}

        type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;

        /**
         * Configuration for transformation effect settings.
         * Controls which effects are applied during transformation.
         */
        interface Config extends FlagConfig {}
      }

      namespace Keep {
        interface DefaultTypes extends Record<string, boolean> {
          physical: true;
          mental: true;
          saves: true;
          skills: true;
          class: true;
          feats: true;
          items: true;
          spells: true;
          bio: true;
          type: true;
          hp: true;
          vision: true;
          self: true;
        }

        interface OverrideTypes extends Record<string, boolean | never> {}

        type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;

        /**
         * Configuration for transformation keep settings.
         * Controls which attributes from the original actor are retained during transformation.
         */
        interface Config extends FlagConfig {}
      }

      namespace Merge {
        interface DefaultTypes extends Record<string, boolean> {
          saves: true;
          skills: true;
        }

        interface OverrideTypes extends Record<string, boolean | never> {}

        type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;

        /**
         * Configuration for transformation merge settings.
         * Controls which attributes are merged between the original and target actors.
         */
        interface Config extends FlagConfig {}
      }

      namespace Other {
        interface DefaultTypes extends Record<string, boolean> {}

        interface OverrideTypes extends Record<string, boolean | never> {}

        type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;

        /**
         * Configuration for additional transformation settings.
         * Reserved for future extensibility and custom transformation options.
         */
        interface Config extends FlagConfig {}
      }

      namespace Presets {
        interface DefaultTypes extends Record<string, boolean> {
          wildshape: true;
          polymorph: true;
          polymorphSelf: true;
        }

        interface OverrideTypes extends Record<string, boolean | never> {}

        type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;

        /**
         * Configuration for transformation presets.
         * Based on TransformationPresetConfiguration from config.mjs.
         */
        interface Config {
          /** Icon representing this preset on the button. */
          icon: string;
          /** Localized label for the preset. */
          label: string;
          /** Options that will be set for the preset (TransformationSettingData). */
          settings: TransformationSetting.Data;
        }
      }
    }

    interface DND5EConfig {
      /**
       * Settings that configuration how actors are changed when transformation is applied.
       */
      transformation: {
        effects: {
          [K in dnd5e.types.Transform.Effects.TypeKey]: dnd5e.types.Transform.Effects.Config
        };
        keep: {
          [K in dnd5e.types.Transform.Keep.TypeKey]: dnd5e.types.Transform.Keep.Config
        };
        merge: {
          [K in dnd5e.types.Transform.Merge.TypeKey]: dnd5e.types.Transform.Merge.Config
        };
        other: {
          [K in dnd5e.types.Transform.Other.TypeKey]: dnd5e.types.Transform.Other.Config
        };
        presets: {
          [K in dnd5e.types.Transform.Presets.TypeKey]: dnd5e.types.Transform.Presets.Config
        };
      }
    }
  }
}
