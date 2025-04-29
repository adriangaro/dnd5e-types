import DamageRollConfigurationDialog from "../applications/dice/damage-configuration-dialog.mjs";
import { areKeysPressed } from "../utils.mjs";
import BasicRoll from "./basic-roll.mjs";



/* -------------------------------------------- */

/**
 * A type of Roll specific to a damage (or healing) roll in the 5e system.
 */
declare class DamageRoll<
  D extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  Configuration extends fvttUtils.AnyObject = {},
  ProcessConfiguration extends fvttUtils.AnyObject = {},
  DialogConfiguration extends fvttUtils.AnyObject = {},
  MessageConfiguration extends fvttUtils.AnyObject = {},
> extends BasicRoll<
  D,
  DamageRoll.MakeConfiguration<Configuration>,
  DamageRoll.MakeProcessConfiguration<ProcessConfiguration, DamageRoll.MakeConfiguration<Configuration>>,
  DamageRoll.MakeDialogConfiguration<DialogConfiguration>,
  DamageRoll.MakeMessageConfiguration<MessageConfiguration>
> {
  /* -------------------------------------------- */

  /** @inheritDoc */
  static DefaultConfigurationDialog: typeof DamageRollConfigurationDialog;

  /* -------------------------------------------- 
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Is this damage critical.
   */
  get isCritical(): boolean

  /* -------------------------------------------- */
  /*  Roll Configuration                          */
  /* -------------------------------------------- */

  /**
   * Perform any term-merging required to ensure that criticals can be calculated successfully.
   * @protected
   */
  preprocessFormula() 

  /* -------------------------------------------- */

  /**
   * Apply optional modifiers which customize the behavior of the d20term.
   * @protected
   */
  configureDamage(options?: { critical?: DamageRoll.CriticalDamageConfiguration })

  /* -------------------------------------------- */
  /*  Configuration Dialog                        */
  /* -------------------------------------------- */

  /**
   * Create a Dialog prompt used to configure evaluation of an existing D20Roll instance.
   */
  configureDialog(data?: {
    title?: string,
    defaultRollMode?: dnd5e.dice.D20Roll.AdvantageMode,
    defaultCritical?: boolean,
    template?: string,
    allowCritical?: boolean
  }, options?: object): Promise<dnd5e.dice.D20Roll | null>

  /* -------------------------------------------- */

  /**
   * Create a Dialog prompt used to configure evaluation of one or more damage rolls.
   */
  static configureDialog(data?: {
    title?: string,
    defaultRollMode?: dnd5e.dice.D20Roll.AdvantageMode,
    defaultCritical?: boolean,
    template?: string,
    allowCritical?: boolean
  }, options?: object): Promise<dnd5e.dice.D20Roll | null>
}

declare class AnyDamageRoll extends DamageRoll<fvttUtils.EmptyObject, {}, {}, {}, {}> {
  constructor(...args: never);
}


declare namespace DamageRoll {
  interface Any extends AnyDamageRoll {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyDamageRoll> {}
  type DefaultConstructor = typeof DamageRoll<fvttUtils.EmptyObject, {}, {}, {}, {}>

  type MakeConfiguration<
    Cfg extends fvttUtils.AnyObject = {}
  > = fvttUtils.PrettifyType<dnd5e.types.DeepMerge<
    {
      options?: Options
    },
    Cfg
  >>
  type Configuration = DamageRoll['__Configuration']

  type MakeProcessConfiguration<
    PrcCfg extends fvttUtils.AnyObject = {},
    Cfg extends MakeConfiguration<any> = MakeConfiguration
  > = fvttUtils.PrettifyType<
    dnd5e.types.DeepMerge<
      {
        rolls: Cfg[],
        critical?: CriticalDamageConfiguration,
        isCritical?: boolean,
        scaling?: number
      },
      PrcCfg
    >
  >
  type ProcessConfiguration = DamageRoll['__ProcessConfiguration']

  /* -------------------------------------------- */

  interface Options extends BasicRoll.Options {
    isCritical?: boolean,
    critical?: CriticalDamageConfiguration,
    properties?: (dnd5e.types.ItemProperties.TypeKey | (string & {}))[]
    type: dnd5e.types.Damage.TypeKey |  dnd5e.types.Healing.TypeKey | (string & {})
    types: (dnd5e.types.Damage.TypeKey |  dnd5e.types.Healing.TypeKey | (string & {}))[]
  }

  /**
   * Critical effects configuration data.
   */
  interface CriticalDamageConfiguration {
    allow?: boolean;
    multiplier?: number;
    bonusDice?: number;
    bonusDamage?: string;
    multiplyDice?: boolean;
    multiplyNumeric?: boolean;
    powerfulCritical?: string;
  }

  type MakeDialogConfiguration<
    DlgCfg extends fvttUtils.AnyObject = {},
  > = fvttUtils.PrettifyType<
    dnd5e.types.DeepMerge<
      {

      },
      DlgCfg
    >
  >
  type DialogConfiguration = DamageRoll['__DialogConfiguration']

  /* -------------------------------------------- */

  /**
  * Configuration data for creating a roll message.
  */

  type MakeMessageConfiguration<
    MsgCfg extends fvttUtils.AnyObject = {},
  > = fvttUtils.PrettifyType<
    dnd5e.types.DeepMerge<
      {
      },
      MsgCfg
    >
  >
  type MessageConfiguration = DamageRoll['__MessageConfiguration']

}

export default DamageRoll;