/**
 * `DamageRoll` — a damage roll (`module/dice/damage-roll.mjs`), extends {@link BasicRoll}. Build/config
 * statics use the `dnd5e.types.Dice.Damage*` configs.
 */

import type BasicRoll from "./basic-roll.mjs";
import type DamageRollConfigurationDialog from "../applications/dice/damage-configuration-dialog.mjs";

declare class DamageRoll<D extends fvttUtils.AnyObject = fvttUtils.AnyObject> extends BasicRoll<D> {
  static override DefaultConfigurationDialog: typeof DamageRollConfigurationDialog;

  static override fromConfig(
    config: dnd5e.types.Dice.DamageRollConfiguration,
    process: dnd5e.types.Dice.DamageRollProcessConfiguration,
  ): DamageRoll;

  static override build(
    config?: dnd5e.types.Dice.DamageRollProcessConfiguration,
    dialog?: dnd5e.types.Dice.BasicRollDialogConfiguration,
    message?: dnd5e.types.Dice.BasicRollMessageConfiguration,
  ): Promise<DamageRoll[]>;

  static override applyKeybindings(
    config: dnd5e.types.Dice.DamageRollProcessConfiguration,
    dialog: dnd5e.types.Dice.BasicRollDialogConfiguration,
    message: dnd5e.types.Dice.BasicRollMessageConfiguration,
  ): void;

  /** Whether this damage roll is a critical hit. */
  get isCritical(): boolean;

  /** Perform any term-merging required to ensure that criticals can be calculated successfully. */
  protected preprocessFormula(): void;

  /**
   * Apply optional modifiers which customize the behavior of the d20term.
   * @param options
   * @param options.critical - Critical configuration to take into account, will be superseded by the roll's configuration.
   */
  protected configureDamage(options?: { critical?: dnd5e.types.Dice.CriticalDamageConfiguration }): void;
}

declare namespace DamageRoll {
  interface Any extends DamageRoll<fvttUtils.AnyObject> {}
  type AnyConstructor = typeof DamageRoll;
}

export default DamageRoll;
