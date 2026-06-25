/** A dialog for resolving bastion attacks. */

import Dialog5e from "../api/dialog.mjs";

declare class BastionAttackDialog<
  RenderContext extends object = BastionAttackDialog.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = BastionAttackDialog.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = BastionAttackDialog.RenderOptions,
> extends Dialog5e<RenderContext, Configuration, RenderOptions> {
  constructor(options?: { actor?: Actor.Implementation } & Partial<Configuration>);

  /** The bastion attack formula. */
  get formula(): string | null;

  /**
   * Create the bastion attack prompt.
   * @param actor - The Actor whose bastion is being attacked.
   * @returns A promise that resolves to the input bastion attack formula.
   */
  static prompt(actor: Actor.Implementation): Promise<string | null>;
}

declare namespace BastionAttackDialog {
  interface Any extends BastionAttackDialog<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof BastionAttackDialog<any, any, any>> {}

  interface RenderContext extends Dialog5e.RenderContext {
    formula: {
      field: foundry.data.fields.StringField;
      name: string;
    };
  }
  interface Configuration extends Dialog5e.Configuration {}
  interface RenderOptions extends Dialog5e.RenderOptions {}
}

export default BastionAttackDialog;
