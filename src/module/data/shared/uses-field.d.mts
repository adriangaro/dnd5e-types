/**
 * Field for storing uses data.
 *
 * `recovery` is an `ArrayField` of a per-profile `SchemaField` (`period`/`type`/`formula`).
 *
 * `static prepareData` derives `value`/`label` onto the initialized `uses`, and per-recovery
 * `isScaleValue`/`recharge`; these are surfaced on {@link UsesField.UsesData} /
 * {@link UsesField.RecoveryData} for reuse.
 */

import type BasicRoll from "../../dice/basic-roll.mjs";
import type ItemDataModel from "../abstract/item-data-model.mjs";
import type BaseActivityData from "../activity/base-activity.mjs";

declare global {
  namespace dnd5e.types.fields {
    type UsesField = foundry.data.fields.SchemaField<dnd5e.types.fields.UsesField.Schema>;

    namespace UsesField {
      /** A single recovery profile (the inner `SchemaField` of the `recovery` array). */
      interface RecoverySchema extends foundry.data.fields.DataSchema {
        period: dnd5e.types.fields.RestrictedStringField<dnd5e.types.LimitedUsePeriod.TypeKey, { required: true; initial: "lr"; blank: false }>;
        type: foundry.data.fields.StringField<{ required: true; initial: "recoverAll"; blank: false }>;
        formula: dnd5e.types.fields.FormulaField;
      }

      interface Schema extends foundry.data.fields.DataSchema {
        spent: foundry.data.fields.NumberField<{ initial: 0; min: 0; integer: true }>;
        max: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
        recovery: foundry.data.fields.ArrayField<
          foundry.data.fields.SchemaField<dnd5e.types.fields.UsesField.RecoverySchema>
        >;
      }

      /** A recovery profile after `prepareData`'s per-profile derivation. */
      type RecoveryData = dnd5e.types.PrettifyType<
        dnd5e.types.InitializedOf<RecoverySchema> & {
          isScaleValue: boolean;
          recharge?: { options: Array<{ value: number; label: string }> };
        }
      >;

      /**
       * The `uses` shape after `prepareData`: the initialized source plus the derived
       * `value` (clamped remaining uses), `label`, and the elaborated `recovery` profiles.
       */
      type UsesData = dnd5e.types.PrettifyType<
        Omit<dnd5e.types.InitializedOf<Schema>, "recovery"> & {
          value: number;
          label: string;
          recovery: dnd5e.types.fields.UsesField.RecoveryData[];
          rollRecharge?: (config?: dnd5e.types.Dice.RechargeRollProcessConfiguration, dialog?: dnd5e.types.Dice.BasicRollDialogConfiguration, message?: dnd5e.types.Dice.BasicRollMessageConfiguration) => Promise<BasicRoll[] | { rolls: BasicRoll[]; updates: object } | void>;
        }
      >;
    }
  }
}

declare class UsesField extends foundry.data.fields.SchemaField<
  dnd5e.types.fields.UsesField.Schema
> {
  /**
   * Prepare data for this field. Should be called during the `prepareFinalData` stage.
   * @this {ItemDataModel|BaseActivityData}
   * @param rollData  Roll data used for formula replacements.
   * @param labels    Object in which to insert generated labels.
   */
  static prepareData(this: ItemDataModel | BaseActivityData, rollData: dnd5e.types.documents.ItemRollData | dnd5e.types.documents.ActivityRollData, labels?: object): void;

  /** Recharge range options. */
  static get rechargeOptions(): foundry.applications.fields.FormSelectOption[];

  /**
   * Recovery options for an item.
   * @param item   Item for which the recovery options will be created.
   * @param value  Current recovery value.
   */
  static recoveryOptions(item: Item.Implementation, value: string): foundry.applications.fields.FormSelectOption[] | null;

  /**
   * Create a label for uses data that matches the style seen on NPC stat blocks. Complex recovery data might result
   * in no label being generated if it doesn't represent recovery that can be normally found on a NPC.
   * @this {ItemDataModel|BaseActivityData}
   */
  static getStatblockLabel(this: ItemDataModel | BaseActivityData): string;

  /**
   * Determine uses recovery.
   * @this {ItemDataModel|BaseActivityData}
   * @param periods   Recovery periods to check, mapped to the number of times occurred.
   * @param rollData  Roll data to use when evaluating recovery formulas.
   */
  static recoverUses(this: ItemDataModel | BaseActivityData, periods: Map<dnd5e.types.LimitedUsePeriod.TypeKey, number>, rollData?: dnd5e.types.documents.ActorRollData | dnd5e.types.documents.ItemRollData): Promise<{ updates: object; rolls: BasicRoll[] } | false>;

  /**
   * Rolls a recharge test for an Item or Activity that uses the d6 recharge mechanic.
   * @this {Item.Implementation|dnd5e.types.Activity.Instance}
   * @param config   Configuration information for the roll.
   * @param dialog   Configuration for the roll dialog.
   * @param message  Configuration for the roll message.
   */
  static rollRecharge(this: Item.Implementation | dnd5e.types.Activity.Instance, config?: dnd5e.types.Dice.RechargeRollProcessConfiguration, dialog?: dnd5e.types.Dice.BasicRollDialogConfiguration, message?: dnd5e.types.Dice.BasicRollMessageConfiguration): Promise<BasicRoll[] | { rolls: BasicRoll[]; updates: object } | void>;
}

export { UsesField };
export {};
