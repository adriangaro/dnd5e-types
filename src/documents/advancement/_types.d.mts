/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/documents/advancement/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.documents.advancement {
      /** Information on how an advancement type is configured. */
      interface AdvancementMetadata extends dnd5e.types.documents.mixins.PseudoDocumentsMetadata {
      dataModels: {
        /** Data model used for validating configuration data. */
        configuration: foundry.abstract.DataModel.AnyConstructor;
        /** Data model used for validating value data. */
        value: foundry.abstract.DataModel.AnyConstructor;
      };
      order: number; // Number used to determine default sorting order of advancement items.
      icon: string; // Icon used for this advancement type if no user icon is specified.
      typeIcon: string; // Icon used when selecting this advancement type during advancement creation.
      title: string; // Title to be displayed if no user title is specified.
      hint: string; // Description of this type shown in the advancement selection dialog.
      multiLevel: boolean; // Can this advancement affect more than one level? If this is set to true, the level selection control in the configuration window is hidden and the advancement should provide its own implementation of `Advancement#levels` and potentially its own level configuration interface.
      validItemTypes: Set<string>; // Set of types to which this advancement can be added. (deprecated)
      apps: {
        config: typeof dnd5e.applications.advancement.AdvancementConfigV2; // Subclass of AdvancementConfig that allows for editing of this advancement type.
        flow: typeof dnd5e.applications.advancement.AdvancementFlowV2; // Subclass of AdvancementFlow that is displayed while fulfilling this advancement.
      };
      }

      interface AdvancementApplicationData {
      }

      interface AdvancementApplicationOptions {
      automatic?: boolean; // This application is part of an automatic application.
      initial?: boolean; // This application is the initial application before the flow is first rendered.
      }

      interface AdvancementRestorationOptions {
      }

      interface AdvancementReversalOptions {
      }

      interface AbilityScoreImprovementAdvancementApplicationData extends AdvancementApplicationData {
      assignments?: Partial<Record<dnd5e.types.Ability.TypeKey, number>>; // Changes to specific ability scores.
      retainedItems?: Record<string, object>; // Item data grouped by UUID.
      type?: "asi"|"feat"; // Type of ASI being handled.
      uuid?: string; // UUID of the feat item to add.
      }

      interface ItemChoiceAdvancementApplicationData extends Omit<ItemGrantAdvancementApplicationData, "retainedData"> {
      previousItems: Record<number, Record<string, globalThis.Item.Implementation>>; // Copies of items added at earlier levels.
      replace?: string; // ID of the item being replaced.
      retainedData?: ItemChoiceRetainedData; // Retained data including replacement data.
      }

      interface ItemChoiceRetainedData extends ItemGrantRetainedData {
      replaced?: object; // Details on item replacement.
      }

      interface ItemChoiceAdvancementReversalOptions extends ItemGrantAdvancementReversalOptions {
      clearReplacement?: boolean; // Clear the replacement and restore the original item.
      previousItems: Record<number, Record<string, globalThis.Item.Implementation>>; // Copies of items added at earlier levels.
      skipEvaluation?: boolean; // Do not re-evaluate other item selected at this level.
      }

      interface ItemGrantAdvancementApplicationData extends AdvancementApplicationData {
      ability?: dnd5e.types.Ability.TypeKey; // Selected ability for added spells.
      retainedData?: ItemGrantRetainedData; // Retained item data grouped by UUID and selected ability. If item data is present, it will be used rather than fetching new data from the source.
      selected?: string[]; // UUIDs of items to add. If none provided, then will fall back to the items provided in the `items` object.
      }

      interface ItemGrantRetainedData {
      ability?: dnd5e.types.Ability.TypeKey; // Selected ability.
      items?: object[]; // Data for retained items.
      }

      interface ItemGrantAdvancementReversalOptions extends AdvancementReversalOptions {
      uuid?: string; // UUID of a single item to remove.
      }

      interface SubclassAdvancementApplicationData extends AdvancementApplicationData {
      retainedData?: object; // Retained data object for a previous subclass.
      uuid?: string; // UUID of subclass to add.
      }

      /** The advancement configuration is flattened into separate options for the user that are chosen step-by-step. Some are automatically picked for them if they are 'grants' or if there is only one option after the character's existing traits have been taken into account. */
      interface TraitChoices {
      type: "grant"|"choice"; // Whether this trait is automatically granted or is chosen from some options.
      choiceIdx?: number; // An index that groups each separate choice into the groups that they originally came from.
      choices: import("../actor/select-choices.mjs").default; // The available traits to pick from. Grants have only 0 or 1, depending on whether the character already has the granted trait.
      }

      interface TraitAdvancementApplicationData extends AdvancementApplicationData {
      chosen?: string[]; // Array of trait keys to add.
      key?: string; // Key of a single trait to add.
      }

      interface TraitAdvancementReversalOptions extends AdvancementReversalOptions {
      key?: string; // Key of a single trait to remove.
      }

  }
}

export {};
