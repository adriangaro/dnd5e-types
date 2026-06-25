/**
 * Rest type config domain (Seam A). `CONFIG.DND5E.restTypes`.
 *
 * Describes the kinds of rests (short / long) and what they recover.
 */

declare global {
  namespace dnd5e.types {
    namespace RestType {
      /** The core rest types. */
      interface DefaultTypes {
        short: true;
        long: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.restTypes[key]` entry. */
      interface Config {
        /** Duration of different rest variants (normal/gritty/epic) in minutes. */
        duration: Record<string, number>;
        /** Localized label for the rest type. */
        label: string;
        /** FontAwesome classes or an image path representing this rest type. */
        icon: string;
        /** A class for the dialog window. */
        dialogClass?: typeof import("../applications/actor/rest/base-rest-dialog.d.mts").default;
        /** Localization string for the chat summary, or a boolean toggling its creation. */
        chat?: string | boolean;
        /** Does this rest carry over to a new day? */
        newDay?: boolean;
        /** Should a bastion turn be advanced for all players? */
        advanceBastionTurn?: boolean;
        /** Should the game clock be advanced by the rest duration? */
        advanceTime?: boolean;
        /** Should hit dice be spent automatically during the rest? */
        autoHD?: boolean;
        /** Activation types that should be displayed in the chat card. */
        activationPeriods?: string[];
        /** Delta exhaustion to apply to creatures undergoing the rest. */
        exhaustionDelta?: number;
        /** Should hit dice be recovered during this rest? */
        recoverHitDice?: boolean;
        /** Should hit points be recovered during this rest? */
        recoverHitPoints?: boolean;
        /** What recovery periods should be applied when this rest is taken. The ordering of the periods determines which is applied if more than one recovery profile is found. */
        recoverPeriods?: string[];
        /** Types of spellcasting slots to recover during this rest. */
        recoverSpellSlotTypes?: Set<string>;
        /** Reset temp HP to zero. */
        recoverTemp?: boolean;
        /** Reset temp max HP to zero. */
        recoverTempMax?: boolean;
      }
    }

    interface DND5EConfig {
      restTypes: { [K in dnd5e.types.RestType.TypeKey]: dnd5e.types.RestType.Config };
    }
  }
}

export {};
