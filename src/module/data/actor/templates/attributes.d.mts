/**
 * Shared `AttributesFields` bundle for dnd5e actor attribute schemas.
 *
 * Each runtime `static get armorClass()/hitPoints()/common()/creature()` returns an object of
 * DataField instances that the models spread into their `SchemaField`s. We mirror that exactly: the
 * getter's TYPE is a named schema interface (a record of field types) under
 * `dnd5e.types.Actor.Attributes`, and models compose those interfaces via `dnd5e.types.MergeSchemas`.
 * Patching a bundle interface (Seam A/D) therefore propagates to every model that spreads it.
 */

import type ActorDataModel from "../../abstract/actor-data-model.mjs";

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
}

/** attributes.mjs — bundle getters spread into the actor attribute schemas + prepare helpers. */
declare class AttributesFields {
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

export default AttributesFields;
