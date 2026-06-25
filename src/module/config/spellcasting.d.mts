/**
 * Spellcasting-method config domain (Seam A). `CONFIG.DND5E.spellcasting`.
 *
 * Keyed record of the available spellcasting METHODS (at-will, innate, ritual, pact, spell).
 * NOTE: `dnd5e.types.Spellcasting.{Types,TypeKey}` is already owned by the method-CLASS registry
 * (base/single/multi models — see src/module/data/spellcasting/spellcasting-model.d.mts). To avoid
 * colliding with it, this config domain's key union lives under `Spellcasting.Method`.
 */

declare global {
  namespace dnd5e.types {
    namespace Spellcasting {
      /**
       * Ways a class can contribute to spellcasting levels (`CONFIG.DND5E.spellProgression`).
       * Stored in `class`/`subclass` `system.spellcasting.progression`. Seam-A expandable:
       * `declare global { namespace dnd5e.types.Spellcasting.Progression { interface OverrideTypes { quarter: true } } }`.
       */
      namespace Progression {
        interface DefaultTypes {
          none: true;
          full: true;
          half: true;
          third: true;
          pact: true;
          artificer: true;
        }
        interface OverrideTypes extends Record<string, boolean | never> {}
        type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }

      namespace Method {
        /** Core spellcasting methods. */
        interface DefaultTypes {
          atwill: true;
          innate: true;
          ritual: true;
          pact: true;
          spell: true;
        }

        /** Downstream merge point — add `{ myMethod: true }` here. */
        interface OverrideTypes extends Record<string, boolean | never> {}

        type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;

        /** A single progression option within a method (e.g. full / half / third). */
        interface ProgressionConfig {
          /** Localized label. */
          label: string;
          /** How much this progression mode contributes to the base progression of the spellcasting method. */
          divisor?: number;
          /** Whether to round up when dividing. */
          roundUp?: boolean;
        }

        /**
         * Shape of each `CONFIG.DND5E.spellcasting[key]` entry (a `SpellcastingMethod5e`).
         * Built from partial spellcasting model data, so most fields are optional.
         */
        interface Config {
          /** Localized label. */
          label: string;
          /** Sort order among methods. */
          order: number;
          /** Slot-progression style: single-level (pact) or multi-level (spell). */
          type?: "single" | "multi";
          /** Whether this method grants cantrips. */
          cantrips?: boolean;
          /**
           * Whether spells using this method are variably available for casting.
           * In 2024 this term was unified to 'prepares', but 2014 uses different
           * nomenclature for different classes.
           */
          prepares?: boolean;
          /**
           * Exclusivity options.
           * - `slots`: Whether the slots provided by this spellcasting method may only
           *   be used to cast spells that use this spellcasting method.
           * - `spells`: Whether spells that use this spellcasting method may only be cast
           *   with slots provided by this spellcasting method.
           */
          exclusive?: {
            /** Whether the slots provided by this method may only be used for spells of this method. */
            slots?: boolean;
            /** Whether spells of this method may only be cast with slots of this method. */
            spells?: boolean;
          };
          /** Icon path (may contain a `{id}` placeholder). */
          img?: string;
          /** Slot/level progression table. */
          table?: dnd5e.types.data.spellcasting.SpellcastingTable5e | dnd5e.types.data.spellcasting.SpellcastingTableSingle5e;
          /** Named progression variants for this method. */
          progression?: Record<string, ProgressionConfig>;
        }
      }
    }

    interface DND5EConfig {
      spellcasting: { [K in dnd5e.types.Spellcasting.Method.TypeKey]: dnd5e.types.Spellcasting.Method.Config };
      /** Ways in which a class can contribute to spellcasting levels. */
      spellProgression: { [K in dnd5e.types.Spellcasting.Progression.TypeKey]: dnd5e.types.data.spellcasting.SpellcastingProgression5e & { type?: dnd5e.types.Spellcasting.Method.TypeKey } };
    }
  }
}

export {};
