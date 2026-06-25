/**
 * Shared actor field bundles for dnd5e's `AttributesFields` / `DetailsField` /
 * `TraitsField` static getters and the `CurrencyTemplate` mixin.
 *
 * Each runtime `static get common()/creature()/…` returns an object of DataField instances that
 * the models spread into their `SchemaField`s. We mirror that exactly: the getter's TYPE is a
 * named schema interface (a record of field types) under `dnd5e.types.Actor.*`, and models
 * compose those interfaces via `dnd5e.types.MergeSchemas`. Patching a bundle interface (Seam A/D)
 * therefore propagates to every model that spreads it — same propagation as the runtime.
 */

import type SystemDataModel from "../../abstract/system-data-model.mjs";
import type { ActorDataModel } from "../../abstract/system-data-model.mjs";

declare global {
  namespace dnd5e.types.Actor.Attributes {
    /** attributes.mjs — `static get armorClass()`. */
    interface ArmorClassSchema extends foundry.data.fields.DataSchema {
      armor: foundry.data.fields.NumberField<{ integer: true; min: 0; initial: 10 }>; // persisted:false
      base: foundry.data.fields.NumberField<{ integer: true; initial: number }>;
      bonus: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
      calc: dnd5e.types.fields.RestrictedStringField<dnd5e.types.ArmorClass.TypeKey | "custom", {}>;
      cover: foundry.data.fields.NumberField<{ integer: true; min: 0; initial: 0 }>;
      flat: foundry.data.fields.NumberField<{ required: true; integer: true; min: 0 }>;
      formula: foundry.data.fields.StringField;
      formulas: dnd5e.types.fields.ACFormulasField;
      min: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
      override: foundry.data.fields.NumberField<{ min: 0; integer: true }>;
      selectedFormulas: foundry.data.fields.SetField<dnd5e.types.fields.RestrictedStringField<dnd5e.types.ArmorClass.TypeKey, {}>>;
      shield: foundry.data.fields.NumberField<{ integer: true; min: 0; initial: 0 }>;
    }

    /** attributes.mjs — `static get hitPoints()`. */
    interface HitPointsSchema extends foundry.data.fields.DataSchema {
      dt: foundry.data.fields.NumberField<{ integer: true; min: 0; nullable: true; initial: null }>;
      max: foundry.data.fields.NumberField<{ nullable: true; integer: true; min: 0; initial: null }>;
      temp: foundry.data.fields.NumberField<{ integer: true; initial: 0; min: 0; required: true; nullable: false }>;
      tempmax: foundry.data.fields.NumberField<{ integer: true; initial: 0; required: true; nullable: false }>;
      value: foundry.data.fields.NumberField<{ nullable: true; integer: true; min: 0; initial: null }>;
    }

    /** attributes.mjs — `static get common()`. */
    interface CommonSchema extends foundry.data.fields.DataSchema {
      ac: foundry.data.fields.SchemaField<dnd5e.types.Actor.Attributes.ArmorClassSchema>;
      init: dnd5e.types.fields.RollConfigField<
        { bonus: dnd5e.types.fields.FormulaField<{ required: true }> },
        true
      >;
      movement: dnd5e.types.fields.MovementField;
      encumbrance: foundry.data.fields.SchemaField<{
        bonuses: foundry.data.fields.SchemaField<{
          encumbered: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
          heavilyEncumbered: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
          maximum: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
          overall: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
        }>;
        multipliers: foundry.data.fields.SchemaField<{
          encumbered: dnd5e.types.fields.FormulaField<{ deterministic: true; initial: "1" }>;
          heavilyEncumbered: dnd5e.types.fields.FormulaField<{ deterministic: true; initial: "1" }>;
          maximum: dnd5e.types.fields.FormulaField<{ deterministic: true; initial: "1" }>;
          overall: dnd5e.types.fields.FormulaField<{ deterministic: true; initial: "1" }>;
        }>;
      }>;
    }

    /** attributes.mjs — `static get creature()`. */
    interface CreatureSchema extends foundry.data.fields.DataSchema {
      attunement: foundry.data.fields.SchemaField<{
        max: foundry.data.fields.NumberField<{ required: true; nullable: false; integer: true; min: 0; initial: 3 }>;
        value: foundry.data.fields.NumberField<{ integer: true; min: 0; initial: 0 }>;
      }>;
      senses: dnd5e.types.fields.SensesField;
      spell: foundry.data.fields.SchemaField<{
        attack: foundry.data.fields.NumberField<{ integer: true }>;
        dc: foundry.data.fields.NumberField<{ integer: true }>;
        mod: foundry.data.fields.NumberField<{ integer: true }>;
      }>;
      spellcasting: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey | "", { required: true; blank: true }>;
      exhaustion: foundry.data.fields.NumberField<{ required: true; nullable: false; integer: true; min: 0; initial: 0 }>;
      concentration: dnd5e.types.fields.RollConfigField<
        {
          bonuses: foundry.data.fields.SchemaField<{ save: dnd5e.types.fields.FormulaField<{ required: true }> }>;
          limit: foundry.data.fields.NumberField<{ integer: true; min: 0; initial: 1 }>;
        },
        true
      >;
      loyalty: foundry.data.fields.SchemaField<{
        value: foundry.data.fields.NumberField<{ integer: true; min: 0; max: 20 }>;
      }>;
    }
  }

  namespace dnd5e.types.Actor.Details {
    /** details.mjs — `static get common()`. */
    interface CommonSchema extends foundry.data.fields.DataSchema {
      biography: foundry.data.fields.SchemaField<{
        value: foundry.data.fields.HTMLField;
        public: foundry.data.fields.HTMLField;
      }>;
    }

    /** details.mjs — `static get creature()`. */
    interface CreatureSchema extends foundry.data.fields.DataSchema {
      alignment: foundry.data.fields.StringField<{ required: true }>;
      ideal: foundry.data.fields.StringField<{ required: true }>;
      // runtime: `persisted: false` (computed in prepareBaseData, always a number after prep).
      level: foundry.data.fields.NumberField<{ required: true; nullable: false; integer: true; min: 0; initial: 0 }>;
      bond: foundry.data.fields.StringField<{ required: true }>;
      flaw: foundry.data.fields.StringField<{ required: true }>;
      race: dnd5e.types.fields.LocalDocumentField<globalThis.Item.Implementation>;
    }
  }

  namespace dnd5e.types.Actor.Traits {
    /** traits.mjs — `static get common()`. */
    interface CommonSchema extends foundry.data.fields.DataSchema {
      size: dnd5e.types.fields.RestrictedStringField<dnd5e.types.ActorSize.TypeKey, { required: true; blank: false; initial: "med" }>;
      di: dnd5e.types.fields.DamageTraitField<dnd5e.types.Damage.TypeKey>;
      dr: dnd5e.types.fields.DamageTraitField<dnd5e.types.Damage.TypeKey>;
      dv: dnd5e.types.fields.DamageTraitField<dnd5e.types.Damage.TypeKey>;
      dm: foundry.data.fields.SchemaField<{
        amount: dnd5e.types.fields.MappingField<
          dnd5e.types.fields.FormulaField<{ deterministic: true }>,
          dnd5e.types.Damage.TypeKey
        >;
        bypasses: foundry.data.fields.SetField<foundry.data.fields.StringField>;
      }>;
      ci: dnd5e.types.fields.SimpleTraitField<{}, dnd5e.types.Condition.TypeKey>;
    }

    /** traits.mjs — `static get creature()`. */
    interface CreatureSchema extends foundry.data.fields.DataSchema {
      languages: dnd5e.types.fields.SimpleTraitField<
        {
          communication: dnd5e.types.fields.MappingField<
            foundry.data.fields.SchemaField<{
              units: dnd5e.types.fields.RestrictedStringField<dnd5e.types.MovementUnit.TypeKey | "", { required: true; blank: true }>;
              value: foundry.data.fields.NumberField<{ required: true; min: 0 }>;
            }>,
            dnd5e.types.Language.CommunicationTypeKey
          >;
        },
        dnd5e.types.Language.TypeKey
      >;
    }
  }

  namespace dnd5e.types.Actor {
    /** currency.mjs — the currency map. */
    interface CurrencySchema extends foundry.data.fields.DataSchema {
      currency: dnd5e.types.fields.MappingField<
        foundry.data.fields.NumberField<{ required: true; nullable: false; min: 0; initial: 0 }>,
        dnd5e.types.Currency.TypeKey
      >;
    }
  }
}

/** attributes.mjs — bundle getters spread into the actor attribute schemas + prepare helpers. */
export declare class AttributesFields {
  static get armorClass(): dnd5e.types.Actor.Attributes.ArmorClassSchema;
  static get hitPoints(): dnd5e.types.Actor.Attributes.HitPointsSchema;
  static get common(): dnd5e.types.Actor.Attributes.CommonSchema;
  static get creature(): dnd5e.types.Actor.Attributes.CreatureSchema;

  // Migration helpers (called during data migration, @internal).
  /**
   * Migrate the old single armor formula into formulas.
   * @param source  The source attributes object.
   * @internal
   */
  static _migrateArmorClass(source?: object): void;
  /**
   * Migrate the old init.value and incorporate it into init.bonus.
   * @param source  The source attributes object.
   * @internal
   */
  static _migrateInitiative(source?: object): void;

  // prepare* statics (called via .call(this, …) from the subtype prepare methods).
  /**
   * Initialize derived AC fields for Active Effects to target.
   * @this {CharacterData|NPCData|VehicleData}
   */
  static prepareBaseArmorClass(this: ActorDataModel.Any): void;
  /**
   * Initialize base encumbrance fields to be targeted by active effects.
   * @this {CharacterData|NPCData|VehicleData}
   */
  static prepareBaseEncumbrance(this: ActorDataModel.Any): void;
  /**
   * Prepare a character's AC value from their equipped armor and shield.
   * @this {CharacterData|NPCData|VehicleData}
   * @param rollData  The Actor's roll data.
   */
  static prepareArmorClass(this: ActorDataModel.Any, rollData: dnd5e.types.documents.ActorRollData): void;
  /**
   * Prepare concentration data for an Actor.
   * @this {CharacterData|NPCData}
   * @param rollData  The Actor's roll data.
   */
  static prepareConcentration(this: ActorDataModel.Any, rollData: dnd5e.types.documents.ActorRollData): void;
  /**
   * Calculate encumbrance details for an Actor.
   * @this {CharacterData|NPCData|VehicleData}
   * @param rollData              The Actor's roll data.
   * @param options.validateItem  Determine whether an item's weight should count toward encumbrance.
   */
  static prepareEncumbrance(
    this: ActorDataModel.Any,
    rollData: dnd5e.types.documents.ActorRollData,
    options?: { validateItem?: (item: globalThis.Item.Implementation) => boolean },
  ): void;
  /**
   * Adjust exhaustion level based on Active Effects.
   * @this {CharacterData|NPCData}
   */
  static prepareExhaustionLevel(this: ActorDataModel.Any): void;
  /**
   * Calculate maximum hit points, taking an provided advancement into consideration.
   * @param hp                  HP object to calculate.
   * @param options.advancement  Advancement items from which to get hit points per-level.
   * @param options.bonus        Additional bonus to add atop the calculated value.
   * @param options.mod          Modifier for the ability to add to hit points from advancement.
   * @this {ActorDataModel}
   */
  static prepareHitPoints(
    this: ActorDataModel.Any,
    hp: object,
    options?: { advancement?: object[]; mod?: number; bonus?: number },
  ): void;
  /**
   * Prepare the initiative data for an actor.
   * @this {CharacterData|NPCData|VehicleData}
   * @param rollData  The Actor's roll data.
   */
  static prepareInitiative(this: ActorDataModel.Any, rollData: dnd5e.types.documents.ActorRollData): void;
  /**
   * Modify movement speeds taking exhaustion and any other conditions into account.
   * @this {CharacterData|NPCData|VehicleData}
   * @param rollData  The Actor's roll data.
   */
  static prepareMovement(this: ActorDataModel.Any, rollData?: dnd5e.types.documents.ActorRollData): void;
  /**
   * Apply movement and sense changes based on a race item. This method should be called during
   * the `prepareEmbeddedData` step of data preparation.
   * @param race          Race item from which to get the stats.
   * @param options.force  Override any values on the actor.
   * @this {CharacterData|NPCData}
   */
  static prepareRace(this: ActorDataModel.Any, race: globalThis.Item.Implementation, options?: { force?: boolean }): void;
  /**
   * Prepare spellcasting DC & modifier.
   * @this {CharacterData|NPCData}
   */
  static prepareSpellcastingAbility(this: ActorDataModel.Any): void;

  // Socket event handlers (called via .call(this, …) from the subtype hooks).
  /**
   * Track changes to HP when updated and set death save status.
   * @this {CharacterData|NPCData|VehicleData}
   * @param changes  The candidate changes to the Document.
   * @param options  Additional options which modify the update request.
   * @param user     The User requesting the document update.
   */
  static preUpdateHP(this: ActorDataModel.Any, changes: object, options: object, user: foundry.documents.BaseUser): Promise<void>;
  /**
   * Display concentration challenge if necessary, set bloodied status, and fire damage hook.
   * @this {CharacterData|NPCData|VehicleData}
   * @param changed  The differential data that was changed relative to the document's prior values.
   * @param options  Additional options which modify the update request.
   * @param userId   The id of the User requesting the document update.
   */
  static onUpdateHP(this: ActorDataModel.Any, changed: object, options: object, userId: string): Promise<void>;
}

/** details.mjs — bundle getters. */
export declare class DetailsField {
  static get common(): dnd5e.types.Actor.Details.CommonSchema;
  static get creature(): dnd5e.types.Actor.Details.CreatureSchema;
}

/** traits.mjs — bundle getters. */
export declare class TraitsField {
  static get common(): dnd5e.types.Actor.Traits.CommonSchema;
  static get creature(): dnd5e.types.Actor.Traits.CreatureSchema;

  // prepare* statics (called via .call(this, …) from the subtype prepare methods).
  /**
   * Prepare the language labels.
   * @this {CharacterData|NPCData}
   */
  static prepareLanguages(this: ActorDataModel.Any): void;
  /**
   * Prepare condition immunities & petrified condition and handle "All Damage" value.
   * @this {CharacterData|NPCData|VehicleData}
   */
  static prepareResistImmune(this: ActorDataModel.Any): void;

  // Socket event handlers.
  /**
   * Update the prototype token size for newly created actors.
   * @this {CharacterData|NPCData|VehicleData}
   * @param data     The initial data object provided to the document creation request.
   * @param options  Additional options which modify the creation request.
   */
  static preCreateSize(this: ActorDataModel.Any, data: object, options: object): Promise<void>;
  /**
   * Update the prototype token size when the actor size is changed.
   * @this {CharacterData|NPCData|VehicleData}
   * @param changes  The candidate changes to the Document.
   * @param options  Additional options which modify the update request.
   */
  static preUpdateSize(this: ActorDataModel.Any, changes: object, options: object): Promise<void>;
}

/** currency.mjs — the real `CurrencyTemplate` mixin model. */
export declare class CurrencyTemplate extends SystemDataModel<dnd5e.types.Actor.CurrencySchema> {
  static override defineSchema(): dnd5e.types.Actor.CurrencySchema;
}
