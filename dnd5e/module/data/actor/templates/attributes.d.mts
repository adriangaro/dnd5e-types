import type Proficiency from "../../../documents/actor/proficiency.mjs";
import type { ActorDataModel } from "../../abstract.d.mts";
import type FormulaField from "../../fields/formula-field.mjs";
import type MovementField from "../../shared/movement-field.mjs";
import type RollConfigField from "../../shared/roll-config-field.mjs";
import type SensesField from "../../shared/senses-field.mjs";

type ConcentrationData = {
  ability: "",
  bonuses: foundry.data.fields.SchemaField<{
    save: FormulaField<{ required: true, label: "DND5E.ConcentrationBonus" }>
  }>,
  limit: foundry.data.fields.NumberField<{ integer: true, min: 0, initial: 1, label: "DND5E.ConcentrationLimit" }>
}

type InitData = {
  ability: "",
  bonus: FormulaField<{ required: true, label: "DND5E.InitiativeBonus" }>
}

type AttunementData = {
  max: foundry.data.fields.NumberField<{
    required: true, nullable: false, integer: true, min: 0, initial: 3, label: "DND5E.AttunementMax"
  }>
}

export default class AttributesFields {
  /**
   * Armor class fields shared between characters, NPCs, and vehicles.
   */
  static get armorClass(): {
    calc: foundry.data.fields.StringField<{ initial: "default", label: "DND5E.ArmorClassCalculation" }, dnd5e.types.ArmorProficiency.ArmorClassKey, dnd5e.types.ArmorProficiency.ArmorClassKey, dnd5e.types.ArmorProficiency.ArmorClassKey>,
    flat: foundry.data.fields.NumberField<{ integer: true, min: 0, label: "DND5E.ArmorClassFlat" }>,
    formula: FormulaField<{ deterministic: true, label: "DND5E.ArmorClassFormula" }>
  };


  /* -------------------------------------------- */

  /**
   * Fields shared between characters, NPCs, and vehicles.
   */
  static get common(): {
    ac: foundry.data.fields.SchemaField<
      typeof AttributesFields['armorClass'],
      { label: "DND5E.ArmorClass" },
      foundry.data.fields.SchemaField.AssignmentData<typeof AttributesFields['armorClass']>,
      fvttUtils.SimpleMerge<
        foundry.data.fields.SchemaField.InitializedData<typeof AttributesFields['armorClass']>,
        {
          armor: number,
          shield: number,
          cover: number,
          min: string,
          bonus: string,
          base: number,
          value: number,
          dex: number,
          equippedArmor?: Item.OfType<'equipment'>;
          equippedShield?: Item.OfType<'equipment'>;
        }
      >
    >,
    init: RollConfigField<
      InitData,
      {},
      RollConfigField.AssignmentType<InitData, {}>,
      fvttUtils.SimpleMerge<
        RollConfigField.InitializedType<InitData, {}>,
        {
          mod: number,
          prof: Proficiency,
          score: number
        }
      >
    >,
    movement: MovementField,
    // prepared base from here
    encumbrance: foundry.data.fields.SchemaField<
      {},
      {
        required: true,
        nullable: false
      },
      undefined,
      {
        multipliers: {
          encumbered: string
          heavilyEncumbered: string,
          maximum: string,
          overall: string
        },
        bonuses: {
          encumbered: string
          heavilyEncumbered: string,
          maximum: string,
          overall: string
        },
        value: number,
        thresholds: {
          encumbered: number
          heavilyEncumbered: number,
          maximum: number,
        },
        max: number,
        mod: number,
        stops: {
          encumbered: number
          heavilyEncumbered: number,
        },
        pct: number,
        encumbered: boolean
      },
      undefined
    >,
  };


  /* -------------------------------------------- */

  /**
   * Fields shared between characters and NPCs.
   */
  static get creature(): {
    attunement: foundry.data.fields.SchemaField<
      AttunementData, 
      { label: "DND5E.Attunement" },
      foundry.data.fields.SchemaField.Internal.AssignmentType<AttunementData, {}>,
      fvttUtils.SimpleMerge<
        foundry.data.fields.SchemaField.Internal.InitializedType<AttunementData, {}>,
        {
          value: number
        }
      >
    >,
    senses: SensesField,
    spellcasting: foundry.data.fields.StringField<{ required: true, blank: true, label: "DND5E.SpellAbility" }>,
    exhaustion: foundry.data.fields.NumberField<{
      required: true, nullable: false, integer: true, min: 0, initial: 0, label: "DND5E.Exhaustion"
    }>,
    concentration: RollConfigField<
      ConcentrationData,
      {},
      RollConfigField.AssignmentType<ConcentrationData, {}>,
      fvttUtils.SimpleMerge<
        RollConfigField.InitializedType<ConcentrationData, {}>,
        {
          save: number
        }
      >
    >,
    loyalty: foundry.data.fields.SchemaField<{
      value: foundry.data.fields.NumberField<{ integer: true, min: 0, max: 20, label: "DND5E.Loyalty" }>
    }>,
    // prepared base from here
    spell: foundry.data.fields.SchemaField<
      {},
      {
        required: true,
        nullable: false
      },
      undefined,
      {
        abilityLabel: string,
        attack: number,
        dc: number,
        mod: number,
      },
      undefined
    >,
  };

  /* -------------------------------------------- */
  /*  Data Migration                              */
  /* -------------------------------------------- */

  /**
   * Migrate the old init.value and incorporate it into init.bonus.
   * @internal
   */
  static _migrateInitiative(source: object): void

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /**
   * Initialize derived AC fields for Active Effects to target.
   */
  static prepareBaseArmorClass<T extends {
    attributes: foundry.data.fields.SchemaField.InitializedData<typeof AttributesFields['common']>
  }>(this: T)
  /* -------------------------------------------- */

  /**
   * Initialize base encumbrance fields to be targeted by active effects.
   */
  static prepareBaseEncumbrance<T extends {
    attributes: foundry.data.fields.SchemaField.InitializedData<typeof AttributesFields['common']>
  }>(this: T)

  /* -------------------------------------------- */

  /**
   * Prepare a character's AC value from their equipped armor and shield.
   */
  static prepareArmorClass<T extends {
    attributes: foundry.data.fields.SchemaField.InitializedData<
      typeof AttributesFields['common']
    >
  }>(this: T, rollData: object)

  /* -------------------------------------------- */

  /**
   * Prepare concentration data for an Actor.
   */
  static prepareConcentration<T extends {
    attributes: foundry.data.fields.SchemaField.InitializedData<
      typeof AttributesFields['common'] &
      typeof AttributesFields['creature']
    >
  }>(this: T, rollData: object)

  /* -------------------------------------------- */

  /**
   * Calculate encumbrance details for an Actor.
   */
  static prepareEncumbrance<T extends {
    attributes: foundry.data.fields.SchemaField.InitializedData<typeof AttributesFields['common']>
  }>(this: T, rollData: object, options?: {
    validateItem?: (item: Item.Implementation) => boolean
  })

  /* -------------------------------------------- */

  /**
   * Adjust exhaustion level based on Active Effects.
   */
  static prepareExhaustionLevel<T extends {
    attributes: foundry.data.fields.SchemaField.InitializedData<
      typeof AttributesFields['common'] &
      typeof AttributesFields['creature']
    >
  }>(this: T)

  /* -------------------------------------------- */

  /**
   * Calculate maximum hit points, taking an provided advancement into consideration.
   */
  static prepareHitPoints(
    this: ActorDataModel,
    hp: {
      max: number,
      effectiveMax: number,
      tempmax?: number,
      value: number,
      damage: number,
      pct: number
    }, options?: {
      advancement?: []
      bonus?: number,
      mod?: number
    }
  )

  /* -------------------------------------------- */

  /**
   * Prepare the initiative data for an actor.
   */
  static prepareInitiative<T extends {
    attributes: foundry.data.fields.SchemaField.InitializedData<typeof AttributesFields['common']>
  }>(this: T, rollData: object)

  /* -------------------------------------------- */

  /**
   * Modify movement speeds taking exhaustion and any other conditions into account.
   */
  static prepareMovement<T extends {
    attributes: foundry.data.fields.SchemaField.InitializedData<
      typeof AttributesFields['common'] &
      typeof AttributesFields['creature']
    >
  }>(this: T, rollData: object)

  /* -------------------------------------------- */

  /**
   * Apply movement and sense changes based on a race item. This method should be called during
   * the `prepareEmbeddedData` step of data preparation.
   */
  static prepareRace<T extends {
    attributes: foundry.data.fields.SchemaField.InitializedData<
      typeof AttributesFields['common'] &
      typeof AttributesFields['creature']
    >
  }>(this: T, race: Item.Implementation, options?: {
    force?: boolean
  })

  /* -------------------------------------------- */

  /**
   * Prepare spellcasting DC & modifier.
   */
  static prepareSpellcastingAbility<T extends {
    attributes: foundry.data.fields.SchemaField.InitializedData<
      typeof AttributesFields['common'] &
      typeof AttributesFields['creature']
    >
  }>(this: T, rollData: object)
}
