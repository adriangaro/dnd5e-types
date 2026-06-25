/**
 * Custom chat message type used to represent an attack on a bastion.
 *
 * No custom/unported fields here — schema is all native foundry fields.
 */

import ChatMessageDataModel from "../abstract/chat-message-data-model.mjs";

declare global {
  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the `bastionAttack` chat-message subtype on the interface the funnel reads. */
    interface ChatMessage {
      bastionAttack: typeof import("./bastion-attack-message-data.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.ChatMessage.bastionAttack {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

declare class BastionAttackMessageData extends ChatMessageDataModel<
  BastionAttackMessageData.Schema,
  BastionAttackMessageData.Base,
  BastionAttackMessageData.Derived
> {
  static override defineSchema(): BastionAttackMessageData.Schema;

  /** The actor for the chat message. */
  get actor(): Actor.Implementation;

  /**
   * Resolve a bastion attack against a given Actor's bastion.
   * @param actor                   The Actor.
   * @param formula                 The attack formula.
   * @param options
   * @param options.summary         Print a chat message summary of the attack.
   * @param options.threshold       The maximum number on a die roll that is considered a defender death.
   * @returns Created message or message data.
   */
  static handleAttack(
    actor: Actor.Implementation,
    formula: string,
    options?: { summary?: boolean; threshold?: number },
  ): Promise<ChatMessage.Implementation | Partial<{ deaths: number; undefended: boolean }>>;
}

declare namespace BastionAttackMessageData {
  /** Pre-Seam-D source schema (bastion-attack-message-data.mjs `defineSchema`). */
  type BaseSchema = {
    damaged: foundry.data.fields.DocumentIdField;
    deaths: foundry.data.fields.NumberField;
    resolved: foundry.data.fields.BooleanField;
    undefended: foundry.data.fields.BooleanField;
  };

  type Schema = dnd5e.types.MergeSchemas<
    BaseSchema,
    dnd5e.types.DataModelConfig.ChatMessage.bastionAttack.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.ChatMessage.bastionAttack.OverrideBase
  >;
  type Derived = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.ChatMessage.bastionAttack.OverrideDerived
  >;
}

export default BastionAttackMessageData;
