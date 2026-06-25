/**
 * Subclass of NumberField that tracks the number of changes made to a roll mode.
 */

declare global {
  namespace dnd5e.types.fields {
    type AdvantageModeField = foundry.data.fields.NumberField<
      { choices: dnd5e.types.AdvantageMode[]; initial: 0 },
      dnd5e.types.AdvantageMode,
      dnd5e.types.AdvantageMode,
      dnd5e.types.AdvantageMode
    >;
  }
}

declare class AdvantageModeField extends foundry.data.fields.NumberField<
  { choices: dnd5e.types.AdvantageMode[]; initial: 0 },
  dnd5e.types.AdvantageMode,
  dnd5e.types.AdvantageMode,
  dnd5e.types.AdvantageMode
> {
  /**
   * Retrieve the counts from several advantage mode fields and determine the final advantage mode.
   * @param model     The model containing the fields.
   * @param keyPaths  Paths to the individual fields to combine within the model.
   * @param counts    External sources of advantage/disadvantage.
   */
  static combineFields(
    model: foundry.abstract.DataModel.Any,
    keyPaths: string[],
    counts?: Partial<dnd5e.types.data.fields.AdvantageModeData>,
  ): { advantage: boolean; disadvantage: boolean; mode: number };

  /**
   * Retrieve the advantage/disadvantage counts from the model.
   * @param model    The model the change is applied to.
   * @param keyPath  Path to the field or effect change being applied.
   */
  static getCounts(
    model: foundry.abstract.DataModel.Any,
    keyPath: string | ActiveEffect.ChangeData,
  ): dnd5e.types.data.fields.AdvantageModeData;

  /**
   * Resolve multiple sources of advantage and disadvantage into a single roll mode per the game rules.
   * @param model    The model the change is applied to.
   * @param keyPath  Path to the field or effect change being applied.
   * @param counts   The current advantage/disadvantage counts.
   * @returns        An integer in the interval [-1, 1], indicating advantage (1), disadvantage (-1),
   *                 or neither (0).
   */
  static resolveMode(
    model: foundry.abstract.DataModel.Any,
    keyPath: string | ActiveEffect.ChangeData | null,
    counts?: dnd5e.types.data.fields.AdvantageModeData,
  ): number;

  /**
   * Helper for setting the advantage mode programmatically.
   * @param model              The model the change is applied to.
   * @param keyPath            Path to the advantage mode field on the model.
   * @param value              An integer in the interval [-1, 1], indicating advantage (1),
   *                           disadvantage (-1), or neither (0).
   * @param options
   * @param options.override   Override the mode rather than following the normal advantage rules.
   * @returns                  Final advantage value.
   */
  static setMode(
    model: foundry.abstract.DataModel.Any,
    keyPath: string,
    value: number,
    options?: { override?: boolean },
  ): number;
}

export default AdvantageModeField;
export {};
