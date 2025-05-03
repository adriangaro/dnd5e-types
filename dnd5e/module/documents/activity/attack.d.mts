import AttackRollConfigurationDialog from "../../applications/dice/attack-configuration-dialog.mjs";
import AttackActivityData from "../../data/activity/attack-data.mjs";
import { _applyDeprecatedD20Configs, _createDeprecatedD20Config } from "../../dice/d20-roll.mjs";
import ActivityMixin from "./mixin.mjs";
import BasicRoll from "../../dice/basic-roll.mjs";

/**
 * Activity for making attacks and rolling damage.
 */
declare class AttackActivity extends ActivityMixin(AttackActivityData) {
  /* -------------------------------------------- */
  /*  Rolling                                     */
  /* -------------------------------------------- */

  static metadata: AttackActivity.Metadata;
  get metadata(): AttackActivity.Metadata;
  /**
   * Perform an attack roll.
   * @param config  Configuration information for the roll.
   * @param dialog   Configuration for the roll dialog.
   * @param message  Configuration for the roll message.
   */
  rollAttack(
    config?: Partial<AttackActivity.ProcessConfiguration>, 
    dialog?: Partial<AttackActivity.DialogConfiguration>, 
    message?: Partial<dnd5e.dice.BasicRoll.MessageConfiguration>
  ): Promise<dnd5e.dice.D20Roll[] | null>

  /* -------------------------------------------- */

  /**
   * Configure a roll config for each roll performed as part of the attack process. Will be called once per roll
   * in the process each time an option is changed in the roll configuration interface.
   * @param process          Configuration for the entire rolling process.
   * @param config                  Configuration for a specific roll.
   * @param formData                  Any data entered into the rolling prompt.
   * @param index                                 Index of the roll within all rolls being prepared.
   */
  _buildAttackConfig(
    process: dnd5e.dice.D20Roll.ProcessConfiguration, 
    config: dnd5e.dice.D20Roll.Configuration, 
    formData: FormDataExtended | null | undefined, 
    index: number
  )

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle performing an attack roll.
   * @param event     Triggering click event.
   * @param target     The capturing HTML element which defined a [data-action].
   * @param message  Message associated with the activation.
   */
  static #rollAttack(this: AttackActivity, event: PointerEvent, target: HTMLElement, message: ChatMessage.Implementation): void

  /* -------------------------------------------- */

  /**
   * Handle performing a damage roll.
   * @param event     Triggering click event.
   * @param target     The capturing HTML element which defined a [data-action].
   * @param message  Message associated with the activation.
   */
  static #rollDamage(this: AttackActivity, event: PointerEvent, target: HTMLElement, message: ChatMessage.Implementation): void
}

declare namespace AttackActivity {
  interface Metadata extends ActivityMixin.Metadata {
    sheetClass: typeof dnd5e.applications.activity.AttackSheet
  }
  interface ProcessConfiguration extends dnd5e.dice.D20Roll.ProcessConfiguration {
    ammunition?: string | boolean
    attackMode?: dnd5e.types.Attack.ModeTypeKey
    mastery?: string
  }

  type DialogConfiguration = dnd5e.types.DeepMerge<
    dnd5e.dice.BasicRoll.DialogConfiguration,
    BasicRoll.MakeDialogAppConfig<typeof AttackRollConfigurationDialog<{}, {}, {}>>
  >

  interface AmmunitionUpdate {
    id: string
    destroy: boolean
    quantity: number
  }
}

export default AttackActivity

declare global {
  namespace dnd5e.types.Activity {
    interface DefaultActivityTypes {
      attack: typeof AttackActivity;
    }
  }
}