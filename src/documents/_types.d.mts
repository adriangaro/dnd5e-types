/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/documents/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.documents {
      interface BastionTurnResult {
      order?: string; // The order that was completed, if any.
      gold?: number; // Gold generated.
      items?: BastionTurnItem[]; // Items created.
      updates: object; // Updates applied to the facility.
      }

      interface BastionTurnItem {
      uuid: string; // The UUID of the generated Item.
      quantity: number; // The quantity of items generated.
      }

      interface CombatRecoveryResults extends dnd5e.types.data.chatMessage.fields.ActorUpdatesDescription {
      rolls: import("../module/dice/basic-roll.mjs").default[]; // Any recovery rolls performed.
      }

      /** Description of a source of damage. */
      interface DamageDescription {
      value: number; // Amount of damage.
      type: dnd5e.types.Damage.TypeKey | string; // Type of damage (a damage type id, or an untyped/healing key).
      properties?: Set<string>; // Physical properties that affect damage application (weapon/item property ids).
      active?: {
        all?: DamageAffectDescription; // How resistance/etc. targeting All Damage affected this total.
        multiplier?: number; // Final calculated multiplier.
        threshold?: boolean; // Did threshold affect this description?
        type?: DamageAffectDescription; // How resistance/etc. targeting this type affected this total.
      };
      }

      interface DamageAffectDescription {
      modification?: boolean; // Did modification affect this description?
      resistance?: boolean; // Did resistance affect this description?
      vulnerability?: boolean; // Did vulnerability affect this description?
      immunity?: boolean; // Did immunity affect this description?
      }

      type DamageAffectCategory = "modification"|"resistance"|"vulnerability"|"immunity";

      /** Options for damage application. */
      interface DamageApplicationOptions {
      downgrade?: boolean|Set<string>; // Should this actor's resistances and immunities be downgraded by one step? A set of damage types to be downgraded or `true` to downgrade all damage types.
      multiplier?: number; // @default 1 — Amount by which to multiply all damage.
      /**
       * Set to `true` to ignore all damage modifiers. If set to an object, then values can either be `true` to
       * indicate that all modifications of that type should be ignored, or a set of specific damage types for which
       * it should be ignored.
       */
      ignore?: boolean | {
        immunity?: boolean|Set<string>; // Should this actor's damage immunity be ignored?
        resistance?: boolean|Set<string>; // Should this actor's damage resistance be ignored?
        vulnerability?: boolean|Set<string>; // Should this actor's damage vulnerability be ignored?
        modification?: boolean|Set<string>; // Should this actor's damage modification be ignored?
        threshold?: boolean; // Should this actor's damage threshold be ignored?
      };
      invertHealing?: boolean; // @default true — Automatically invert healing types to it heals, rather than damages.
      only?: "damage"|"healing"; // Apply only damage or healing parts. Untyped rolls will always be applied.
      originatingMessage?: globalThis.ChatMessage.Implementation; // Chat message that holds the damage being applied.
      isDelta?: boolean; // Whether the damage is coming from a relative change.
      }

      type DamageSummary = (Array<DamageDescription>) & {
      amount: number; // Total amount of damage/healing across all damage types.
      temp: number; // Total amount of temp HP across all damage types.
      tempMax: number; // Total amount of temp max HP across all damage types.
      };

      /** Configuration options for a rest. */
      interface RestConfiguration {
      type: "short" | "long" | string; // Type of rest to perform (a `CONFIG.DND5E.restTypes` id; core ids are "short" | "long").
      dialog: boolean; // Present a dialog window which allows for rolling hit dice as part of the rest and selecting whether a new day has occurred.
      dialogClass?: typeof import("../module/applications/actor/rest/base-rest-dialog.mjs").default; // A class for the dialog window.
      chat: boolean; // Should a chat message be created to summarize the results of the rest?
      duration: number; // Amount of time passed during the rest in minutes.
      newDay: boolean; // Does this rest carry over to a new day?
      advanceBastionTurn?: boolean; // Should a bastion turn be advanced for all players?
      advanceTime?: boolean; // Should the game clock be advanced by the rest duration?
      autoHD?: boolean; // Should hit dice be spent automatically during the rest?
      autoHDThreshold?: number; // How many hit points should be missing before hit dice are automatically spent during the rest.
      recoverTemp?: boolean; // Reset temp HP to zero.
      recoverTempMax?: boolean; // Reset temp max HP to zero.
      exhaustionDelta?: number; // A delta exhaustion to apply to creatures undergoing this rest.
      request?: globalThis.ChatMessage.Implementation; // Rest request chat message for which this rest was performed.
      }

      /** Results from a rest operation. */
      interface RestResult {
      type: "short" | "long" | string; // Type of rest performed (a `CONFIG.DND5E.restTypes` id; core ids are "short" | "long").
      clone: globalThis.Actor.Implementation; // Clone of the actor before rest is performed.
      deleteItems: string[]; // IDs of items to be deleted from the actor.
      deltas: {
        hitPoints: number; // Hit points recovered during the rest.
        hitDice: number; // Hit dice recovered or spent during the rest.
      };
      message?: globalThis.ChatMessage.Implementation; // The created chat message.
      newDay: boolean; // Whether a new day occurred during the rest.
      rolls: foundry.dice.Roll[]; // Any rolls that occurred during the rest process, not including hit dice.
      updateData: object; // Updates applied to the actor.
      updateItems: object[]; // Updates applied to actor's items.
      /** @deprecated Backwards-compatibility alias for `deltas.hitPoints` (hit points recovered). */
      dhp?: number;
      /** @deprecated Backwards-compatibility alias for `deltas.hitDice` (hit dice recovered/spent). */
      dhd?: number;
      /** @deprecated Backwards-compatibility flag: whether this was a long rest (`type === "long"`). */
      longRest?: boolean;
      }

      type ActivityRollData = (ItemRollData & Partial<ActorRollData>) & {
      activity: object; // Object containing the activity's data.
      consumed?: object; // Information on what resources the activity's activation consumed.
      mod: number; // The ability modifier value used by the activity.
      };

      interface ActorRollData extends RollData {
      flags: object; // Flags set on the actor.
      name: string; // Name of the actor.
      prof: import("./actor/proficiency.mjs").default; // Actor's proficiency data.
      statuses: Record<string, number>; // Status effects applied to the actor with a value of 1 if the effect is applied (or a higher number of statuses that have numeric value).
      }

      type ItemRollData = (RollData & Partial<ActorRollData>) & {
      item: {
        flags: object; // Flags set on the item.
        name: string; // Name of the item.
      };
      labels: object; // Human-readable labels generated by the item.
      scaling: import("./scaling.mjs").default; // Scaling data.
      };

      interface JournalEntryPageRollData extends RollData {
      page: {
        flags: object; // Flags set on the page.
        name: string; // Name of the page.
      };
      }

      interface RollData {
      }

      interface RollDataOptions {
      deterministic?: boolean; // Whether to force deterministic values for data properties that could be either a die term or a flat term.
      }

      /**
       * Callback to transform items during content copying/importing.
       * @param item - Data for the item to transform.
       * @param options - Transform options.
       * @param options.container - ID of the container to create the items.
       * @param options.depth - Current depth of the item being created.
       * @returns Transformed item data, or void to skip.
       */
      type ItemContentsTransformer = (
        item: globalThis.Item.Implementation | object,
        options: { container: string; depth: number }
      ) => globalThis.Item.Implementation | object | void;

      /** Object representing a nested set of choices to be displayed in a grouped select list or a trait selector. */
      interface SelectChoicesEntry {
      label: string; // Label, either pre- or post-localized.
      chosen?: boolean; // Has this choice been selected?
      sorting?: boolean; // @default true — Should this value be sorted? If there are a mixture of this value at a level, unsorted values are listed first followed by sorted values.
      children?: import("./actor/select-choices.mjs").default; // Nested choices. If wildcard filtering support is desired, then trait keys should be provided prefixed for children (e.g. `parent:child`, rather than just `child`).
      }

      /** Spellcasting details for a class or subclass. */
      interface SpellcastingDescription {
      type: dnd5e.types.Spellcasting.TypeKey | string; // Spellcasting method as defined in `CONFIG.DND5E.spellcasting`.
      progression: string|null; // Progression within the specified spellcasting type if supported (a `CONFIG.DND5E.spellProgression` id).
      ability: dnd5e.types.Ability.TypeKey | string; // Ability used when casting spells from this class or subclass.
      levels: number|null; // Number of levels of this class or subclass's class if embedded.
      }

      /** Configuration options for spell scroll creation. */
      interface SpellScrollConfiguration {
      dialog?: boolean; // @default true — Present scroll creation dialog?
      explanation?: "full"|"reference"|"none"; // @default "full" — Length of spell scroll rules text to include.
      level?: number; // Level at which the spell should be cast.
      values?: Partial<dnd5e.types.core.SpellScrollValues>; // Spell scroll DC and attack bonus.
      }

  }
}

export {};
