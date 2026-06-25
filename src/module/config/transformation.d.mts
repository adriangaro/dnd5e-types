/**
 * Transformation settings config domain. `CONFIG.DND5E.transformation`.
 *
 * Structured (non-keyed) config controlling how actors are changed when a transformation
 * (wild shape, polymorph, …) is applied. Top-level keys are fixed categories.
 */

declare global {
  namespace dnd5e.types {
    namespace Transformation {
      /** A single toggleable transformation flag (effects/keep/merge/other entry). */
      interface FlagConfig {
        /** Localized label for the flag. */
        label: string;
        /** Localized hint for the flag. */
        hint?: string;
        /** Whether this is part of the default transformation settings. */
        default?: boolean;
        /** Names of specific settings to disable, or whole categories via `*`. */
        disables?: string[];
      }

      /** A named bundle of pre-selected transformation settings. */
      interface PresetConfig {
        /** Icon (HTML) representing this preset on the button. */
        icon: string;
        /** Localized label for the preset. */
        label: string;
        /** Options applied for the preset. */
        settings: Partial<dnd5e.types.data.settings.TransformationSettingData>;
      }

      // ── effects seam ─────────────────────────────────────────────────────────

      interface EffectDefaultTypes {
        all: true;
        origin: true;
        otherOrigin: true;
        background: true;
        class: true;
        feat: true;
        equipment: true;
        spell: true;
      }

      /** Downstream merge point for effects flags. */
      interface EffectOverrideTypes extends Record<string, boolean | never> {}

      type EffectTypes = dnd5e.types.MergeOverrideDefinition<EffectDefaultTypes, EffectOverrideTypes>;
      type EffectKey = dnd5e.types.ExtractKeys<EffectTypes>;

      // ── keep seam ────────────────────────────────────────────────────────────

      interface KeepDefaultTypes {
        physical: true;
        mental: true;
        saves: true;
        skills: true;
        gearProf: true;
        languages: true;
        class: true;
        feats: true;
        items: true;
        spells: true;
        bio: true;
        type: true;
        hp: true;
        tempHP: true;
        resistances: true;
        vision: true;
        self: true;
      }

      /** Downstream merge point for keep flags. */
      interface KeepOverrideTypes extends Record<string, boolean | never> {}

      type KeepTypes = dnd5e.types.MergeOverrideDefinition<KeepDefaultTypes, KeepOverrideTypes>;
      type KeepKey = dnd5e.types.ExtractKeys<KeepTypes>;

      // ── merge seam ───────────────────────────────────────────────────────────

      interface MergeDefaultTypes {
        saves: true;
        skills: true;
      }

      /** Downstream merge point for merge flags. */
      interface MergeOverrideTypes extends Record<string, boolean | never> {}

      type MergeTypes = dnd5e.types.MergeOverrideDefinition<MergeDefaultTypes, MergeOverrideTypes>;
      type MergeKey = dnd5e.types.ExtractKeys<MergeTypes>;

      // ── other seam ───────────────────────────────────────────────────────────

      /** Downstream merge point for other flags (empty by default; extended via preLocalize). */
      interface OtherDefaultTypes extends Record<string, boolean | never> {}

      interface OtherOverrideTypes extends Record<string, boolean | never> {}

      type OtherTypes = dnd5e.types.MergeOverrideDefinition<OtherDefaultTypes, OtherOverrideTypes>;
      type OtherKey = dnd5e.types.ExtractKeys<OtherTypes>;

      // ── presets seam ─────────────────────────────────────────────────────────

      interface PresetDefaultTypes {
        wildshape: true;
        polymorph: true;
        polymorphSelf: true;
      }

      /** Downstream merge point for presets. */
      interface PresetOverrideTypes extends Record<string, boolean | never> {}

      type PresetTypes = dnd5e.types.MergeOverrideDefinition<PresetDefaultTypes, PresetOverrideTypes>;
      type PresetKey = dnd5e.types.ExtractKeys<PresetTypes>;

      // ── Config ───────────────────────────────────────────────────────────────

      /** Shape of `CONFIG.DND5E.transformation`. */
      interface Config {
        effects: { [K in EffectKey]: FlagConfig };
        keep: { [K in KeepKey]: FlagConfig };
        merge: { [K in MergeKey]: FlagConfig };
        other: { [K in OtherKey]: FlagConfig };
        presets: { [K in PresetKey]: PresetConfig };
      }
    }

    interface DND5EConfig {
      transformation: dnd5e.types.Transformation.Config;
    }
  }
}

export {};
