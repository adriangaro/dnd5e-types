/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/documents/activity/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.documents.activity {
      /** Configuration information for Activities. */
      interface ActivityMetadata extends dnd5e.types.documents.mixins.PseudoDocumentsMetadata {
      type: string; // Type name of this activity.
      img: string; // Default icon.
      title: string; // Default title.
      hint?: string; // Hint about how this activity type functions.
      sheetClass: typeof dnd5e.applications.activity.ActivitySheet; // Sheet class used to configure this activity.
      usage: {
        actions: Record<string, Function>; // Actions that can be triggered from the chat card.
        chatCard: string; // Template used to render the chat card.
        dialog: typeof dnd5e.applications.activity.ActivityUsageDialog; // Default usage prompt.
      };
      }

      /** Configuration data for an activity usage being prepared. */
      interface ActivityUseConfiguration {
      create: {
        measuredTemplate: boolean; // Should this item create a template?
      }|false; // JSDoc `object|false`; usage checks `config.create !== false`.
      concentration: {
        begin: boolean; // Should this usage initiate concentration?
        end: string|null; // ID of an active effect to end concentration on.
      };
      consume: {
        action: boolean; // Should action economy be tracked? Currently only handles legendary actions.
        resources: boolean|number[]; // Set to `true` or `false` to enable or disable all resource consumption or provide a list of consumption target indexes to only enable those targets.
        spellSlot: boolean; // Should this spell consume a spell slot?
      }|boolean; // JSDoc `object|false`; usage also accepts `config.consume === true`.
      event: Event; // The browser event which triggered the item usage, if any.
      scaling: false | number; // Number of steps above baseline to scale this usage, or `false` if scaling is not allowed.
      spell: {
        slot: number; // The spell slot to consume.
      };
      subsequentActions?: boolean; // @default true — Trigger subsequent actions defined by this activity.
      cause?: {
        activity?: string; // Relative UUID to the activity that caused this one to be used. Activity must be on the same actor as this one.
        resources?: boolean|number[]; // Control resource consumption on linked item.
      };
      }

      /** Data for the activity activation configuration dialog. */
      interface ActivityDialogConfiguration {
      configure?: boolean; // @default true — Display a configuration dialog for the item usage, if applicable?
      applicationClass?: typeof dnd5e.applications.activity.ActivityUsageDialog; // Alternate activation dialog to use.
      options?: Record<string, unknown>; // Options passed through to the dialog.
      }

      /** Message configuration for activity usage. */
      interface ActivityMessageConfiguration {
      create?: boolean; // @default true — Whether to automatically create a chat message (if true) or simply return the prepared chat message data (if false).
      data?: Record<string, unknown>; // @default {} — Additional data (ChatMessage creation data) used when creating the message.
      hasConsumption?: boolean; // Was consumption available during activation.
      rollMode?: CONST.DICE_ROLL_MODES; // The roll display mode with which to display (or not) the card.
      }

      interface ActivityUsageChatButton {
      label: string; // Label to display on the button.
      icon: string; // Icon to display on the button.
      classes: string; // Classes for the button.
      dataset: Record<string, string>; // Data attributes attached to the button (rendered as HTML `data-*` attributes).
      }

      /** Details of final changes performed by the usage. */
      interface ActivityUsageResults {
      effects: globalThis.ActiveEffect.Implementation[]; // Active effects that were created or deleted.
      message: globalThis.ChatMessage.Implementation|Record<string, unknown>; // The chat message created for the activation, or the message data if `create` in ActivityMessageConfiguration was `false`.
      templates: globalThis.MeasuredTemplateDocument.Implementation[]; // Created measured templates.
      updates: ActivityUsageUpdates; // Updates to the actor & items.
      }

      /** Update data produced by activity usage. */
      interface ActivityUsageUpdates extends dnd5e.types.data.chatMessage.fields.ActorUpdatesDescription {
      activity: Record<string, unknown>; // Updates (dotted keypaths) applied to activity that performed the activation.
      rolls: foundry.dice.Roll[]; // Any rolls performed as part of the activation.
      }

      interface ActivityConsumptionDescriptor {
      actor: { keyPath: string, delta: number }[]; // Changes for the actor.
      item: Record<string, { keyPath: string, delta: number }[]>; // Changes for each item grouped by ID.
      }

      interface AmmunitionUpdate {
      id: string; // ID of the ammunition item to update.
      destroy: boolean; // Will the ammunition item be deleted?
      quantity: number; // New quantity after the ammunition is spent.
      }

      interface EnchantUseConfiguration extends ActivityUseConfiguration {
      enchantmentProfile: string;
      }

      interface OrderUseConfiguration extends ActivityUseConfiguration {
      building?: {
        size?: string; // The size of facility to build.
      };
      costs?: {
        days?: number; // The cost of executing the order, in days.
        gold?: number; // The cost of executing the order, in gold.
        paid?: boolean; // Whether the gold cost has been paid.
      };
      craft?: {
        item?: string; // The item being crafted or harvested.
        quantity?: number; // The quantity of items to harvest.
      };
      trade?: {
        sell?: boolean; // Whether the trade was a sell operation.
        stock?: {
          stocked?: boolean; // Whether the order was to fully stock the inventory.
          value?: boolean; // The base value of goods transacted. NOTE: runtime JSDoc declares this as `{boolean}` — likely a typo in the source, but faithfully matched here.
        };
        creatures?: {
          buy?: string[]; // Additional animals purchased.
          sell?: boolean[]; // Whether a creature in a given slot was sold.
          price?: number; // The base value of the animals sold.
        };
      };
      }

      type SummonUseConfiguration = Omit<ActivityUseConfiguration, "create"> & {
      create: {
        summons: string; // Should a summoned creature be created?
      }|false; // JSDoc `object|false`.
      summons: Partial<SummoningConfiguration>; // Options for configuring summoning behavior.
      };

      /** Configuration data for summoning behavior. */
      interface SummoningConfiguration {
      profile: string; // ID of the summoning profile to use.
      creatureSize?: dnd5e.types.ActorSize.TypeKey; // Selected creature size if multiple are available.
      creatureType?: dnd5e.types.Creature.TypeKey; // Selected creature type if multiple are available.
      }

      interface SummonUsageResults extends ActivityUsageResults {
      summoned: foundry.canvas.placeables.Token.Implementation[]; // Summoned tokens.
      }

      /** Configuration for creating a modified token. */
      interface TokenUpdateData {
      actor: globalThis.Actor.Implementation; // Original actor from which the token will be created.
      placement: dnd5e.types.canvas.TokenPlacementData; // Information on the location to summon the token.
      tokenUpdates: Record<string, unknown>; // Additional updates (dotted keypaths) that will be applied to token data.
      actorUpdates: Record<string, unknown>; // Updates (dotted keypaths) that will be applied to actor delta.
      }

      interface TransformUseConfiguration extends ActivityUseConfiguration {
      transform: Partial<TransformationUseDetails>; // Options for configuring transformation behavior.
      }

      interface TransformationUseDetails {
      profile: string; // ID of the transformation profile to use.
      uuid?: string; // UUID of the creature to transform into.
      }

  }
}

export {};
