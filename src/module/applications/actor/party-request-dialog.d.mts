/** Dialog that allows GM to select party members to receive a roll request. */

import Dialog5e from "../api/dialog.mjs";

declare class PartyRequestDialog<
  RenderContext extends object = PartyRequestDialog.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = PartyRequestDialog.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = PartyRequestDialog.RenderOptions,
> extends Dialog5e<RenderContext, Configuration, RenderOptions> {
  /** Mapping of selected actors and their requested users. */
  get users(): Map<globalThis.Actor.Implementation, User.Implementation>;

  /** A helper to handle displaying and responding to the dialog. */
  static getRecipients(
    options?: fvttUtils.DeepPartial<PartyRequestDialog.Configuration>,
  ): Promise<Map<globalThis.Actor.Implementation, User.Implementation>>;

  /** A helper to handle displaying and responding to the dialog, creating a request chat message. */
  static sendRequest(
    handler: string,
    messageData?: object,
    options?: fvttUtils.DeepPartial<PartyRequestDialog.Configuration>,
  ): Promise<ChatMessage.Implementation | undefined>;
}

declare namespace PartyRequestDialog {
  interface Any extends PartyRequestDialog<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof PartyRequestDialog<any, any, any>> {}

  /** A recipient row in the dialog. */
  interface Recipient {
    actor: globalThis.Actor.Implementation;
    checked: boolean;
    defaultUser: string | null;
    icon: string;
    users: Array<{ rule: true } | { value: string; label: string }>;
  }

  interface RenderContext extends Dialog5e.RenderContext {
    recipients: Recipient[];
  }
  interface Configuration extends Dialog5e.Configuration {
    request?: {
      condition: ((actor: globalThis.Actor.Implementation) => boolean) | null;
      group: globalThis.Actor.Implementation | null;
    };
  }
  interface RenderOptions extends Dialog5e.RenderOptions {}
}

export default PartyRequestDialog;
