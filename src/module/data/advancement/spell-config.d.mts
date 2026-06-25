/**
 * Embedded data model describing changes to granted spells.
 *
 * Shared embedded model describing the changes an advancement applies to granted spells (ability
 * override, spellcasting method, preparation, and uses recovery). Used by BOTH the Item Grant and
 * Item Choice advancements (each embeds it via an `EmbeddedDataField`). Fields are strict per the
 * project's domain-typing mandate.
 */

declare global {
  namespace dnd5e.types.Advancement {
    namespace SpellConfig {
      /** The shared spell-configuration schema. */
      type Schema = {
        /** Abilities that can be selected. */
        ability: foundry.data.fields.SetField<
          dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey, { required: true; blank: false }>
        >;
        /** Spellcasting method. */
        method: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Spellcasting.Method.TypeKey | "", { required: true; blank: true }>;
        /** Preparation mode for the spell. */
        prepared: foundry.data.fields.NumberField<{ required: true; nullable: false; integer: true; initial: 0 }>;
        uses: foundry.data.fields.SchemaField<{
          /** Formula for maximum uses. */
          max: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
          /** Recovery period for limited uses. */
          per: dnd5e.types.fields.RestrictedStringField<dnd5e.types.LimitedUsePeriod.TypeKey | "", { required: true; blank: true }>;
          /** Require a spell slot in addition to limited uses. */
          requireSlot: foundry.data.fields.BooleanField;
        }>;
      };
    }
  }
}

/** Embedded model describing changes to granted spells. */
declare class SpellConfigurationData extends foundry.abstract.DataModel<
  dnd5e.types.Advancement.SpellConfig.Schema,
  foundry.abstract.Document.Any
> {
  static override defineSchema(): dnd5e.types.Advancement.SpellConfig.Schema;

  static override migrateData(source: fvttUtils.AnyMutableObject): fvttUtils.AnyMutableObject;

  /** The item this advancement data belongs to. */
  get item(): globalThis.Item.Implementation;

  /**
   * Apply changes to a spell item based on this spell configuration.
   * @param itemData  Data for the item to modify.
   * @param config    Optional configuration.
   * @param config.ability  Spellcasting ability selected during advancement process.
   */
  applySpellChanges(itemData: object, config?: { ability?: string }): void;
}

export default SpellConfigurationData;
