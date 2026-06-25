/**
 * Add support for system-specific modifiers to the base die.
 */
declare class BasicDie extends foundry.dice.terms.Die {
  /** Modifier handlers keyed by their formula token. */
  static override MODIFIERS: foundry.dice.terms.Die.Modifiers & { adv: "advantage"; dis: "advantage" };

  /**
   * Handle rolling advantage and disadvantage for a die. The extra rolls have already been performed by the main roll
   * loop (pre-expansion inflated the dice count before the resolver opened), so this handler just partitions results
   * into count + 1 sets of size, keeps the set with the best (adv) or worst (dis) total, and discards the others.
   * @param modifier  The matched modifier query.
   */
  advantage(modifier: string): Promise<void>;

  /**
   * Pre-expand any adv/dis modifier on this term so that the resolver sees the final dice count up-front. Multiplies
   * _number by count + 1 and stashes partition data in options.pending.advantage for the advantage handler to consume.
   * No-op for complex terms that have a Roll for a number.
   */
  expandAdvantage(): void;

  /** @inheritDoc */
  override _evaluateAsync(options?: fvttUtils.InexactPartial<foundry.dice.terms.DiceTerm.EvaluationOptions>): Promise<this>;

  /** @inheritDoc */
  protected override _evaluateModifiers(): Promise<void>;
}

declare namespace BasicDie {
  interface Any extends BasicDie {}
  type AnyConstructor = typeof BasicDie;
}

export default BasicDie;
