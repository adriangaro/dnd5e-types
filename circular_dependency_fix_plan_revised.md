# Revised Plan to Resolve Type-Level Circular Dependencies

This revised plan addresses the type circularity while preserving the accuracy of the `getRollData` type, as requested. The approach involves creating new, dedicated type-only files for the complex `ItemRollData` structure and using minimal reference types where appropriate to break the dependency cycles without modifying the underlying JavaScript (`.mjs`) files.

The core issue remains the cyclical dependency involving `ConsumableData`, `ActivitiesTemplate`, `Item5e`, `ActivityMixin`, and `Actor.Implementation` at the type definition level.

## Proposed Changes

The following changes will be made to the `.d.mts` files:

1.  **Create a Dedicated Type File for Accurate Item Roll Data**:
    *   Create a new file: `dnd5e/module/types/item-roll-data.d.mts`.
    *   Define the `AccurateItemRollData` type within this file. This type should accurately represent the structure returned by `Item.Implementation['getRollData']`, including data derived from `Actor.Implementation['getRollData']` and item-specific properties. You will likely need to import types from `dnd5e/module/documents/actor/actor.d.mts` using `import type` to define the actor-related parts of the roll data.

    ```typescript
    // In dnd5e/module/types/item-roll-data.d.mts

    import type { Actor5e } from '../documents/actor/actor.d.mts';
    import type { Scaling } from '../documents/scaling.d.mts';
    import type { Item5e } from '../documents/item.d.mts'; // Import Item5e for 'item' property type

    /**
     * Accurate type for the data returned by Item.Implementation['getRollData'].
     * This combines Actor roll data with item-specific data.
     */
    export type AccurateItemRollData<This extends Item5e = Item5e> = ReturnType<Actor5e['getRollData']> & {
      item: This['system'];
      scaling: Scaling;
      // Add any other properties specifically added by Item5e's getRollData
    };
    ```
    *Note: Using `ReturnType<Actor5e['getRollData']>` here is acceptable because the circularity we are primarily breaking is between `Item5e`/`ActivitiesTemplate` and `ActivityMixin`/`ActivitiesField`. This new file serves as a neutral ground.*

2.  **Update `Item5e.RollData`**:
    *   In `dnd5e/module/documents/item.d.mts`, import `AccurateItemRollData` using `import type`.
    *   Update the definition of `Item5e.RollData` to be an alias for `AccurateItemRollData` or extend it, ensuring it accurately reflects the return type of `Item5e['getRollData']`.

    ```typescript
    // In dnd5e/module/documents/item.d.mts

    import type { AccurateItemRollData } from '../types/item-roll-data.d.mts';

    declare namespace Item5e {
      // ... other type definitions

      // Update RollData to reference AccurateItemRollData
      type RollData<This extends Item5e> = AccurateItemRollData<This>;

      // ... rest of the namespace
    }
    ```

3.  **Update `ActivitiesTemplate.RollData`**:
    *   In `dnd5e/module/data/item/templates/activities.d.mts`, import `AccurateItemRollData` using `import type`.
    *   Update the definition of `ActivitiesTemplate.RollData` to extend `AccurateItemRollData`.

    ```typescript
    // In dnd5e/module/data/item/templates/activities.d.mts

    import type { AccurateItemRollData } from '../../types/item-roll-data.d.mts';

    /**
     * Data model template for items with activities.
     * @mixin
     */
    export default class ActivitiesTemplate extends SystemDataModel<{
      activities: ActivitiesField,
      uses: UsesField
    }> {
      // ... existing properties and methods

      /**
       * Roll data for activities, extending the accurate item roll data.
       */
      // Update RollData to extend AccurateItemRollData
      interface RollData extends AccurateItemRollData<this> {
        // Add any activity-specific roll data properties here
      }

      // Update the getRollData method signature if it exists and uses a specific return type
      // getRollData(options?: { deterministic?: boolean }): ActivitiesTemplate.RollData;
    }
    ```

4.  **Address Other Circular References (Minimal References)**:
    *   Create a new type-only file: `dnd5e/module/types/document-references.d.mts`.
    *   Define minimal reference types for Item and Actor in this file.

    ```typescript
    // In dnd5e/module/types/document-references.d.mts

    /** Minimal interface for referencing an Item. */
    export interface MinimalItemReference {
      _id: string;
      uuid: string;
    }

    /** Minimal interface for referencing an Actor. */
    export interface MinimalActorReference {
        _id: string;
        uuid: string;
    }
    ```
    *   In `dnd5e/module/documents/activity/mixin.d.mts`, import `MinimalItemReference` and `MinimalActorReference` using `import type`.
    *   Update `ActivityMixin.MessageFlags` to use `MinimalItemReference` for the `item` property.
    *   Review other types within `ActivityMixin` and concrete activity types for direct references to `Item.Implementation` or `Actor.Implementation` that are causing circularity and replace them with the minimal reference types where appropriate and where the full type is not strictly needed for type safety within that specific type definition. For example, the `summonedCreatures` property in `ActivitiesTemplate` might need to be typed as `MinimalActorReference[]` if the full `Actor.Implementation` type is causing a cycle there.

    ```typescript
    // In dnd5e/module/documents/activity/mixin.d.mts

    import type { MinimalItemReference, MinimalActorReference } from '../types/document-references.d.mts';
    // ... other imports

    declare namespace ActivityMixin {
      // ... other type definitions

      interface MessageFlags<This> {
        activity: {
          type: dnd5e.types.Activity.TypeKey,
          id: dnd5e.types.GetKey<This, 'id'>,
          uuid: dnd5e.types.GetKey<This, 'uuid'>
        },
        // Use MinimalItemReference
        item: MinimalItemReference & {
          type: Item.SubType;
        };
        targets: ReturnType<typeof dnd5e.utils.getTargetDescriptors>
      }

      // RollData now extends AccurateItemRollData, defined in a separate file
      // interface RollData<This> extends AccurateItemRollData<Item.Implementation> { // Example if AccurateItemRollData is generic
      //   activity: This;
      // }

      // ... rest of the namespace
    }
    ```
    *   In `dnd5e/module/data/item/templates/activities.d.mts`, if `summonedCreatures` is causing a cycle, update its type:

    ```typescript
    // In dnd5e/module/data/item/templates/activities.d.mts

    import type { MinimalActorReference } from '../../types/document-references.d.mts';
    // ... other imports

    export default class ActivitiesTemplate extends SystemDataModel<{
      activities: ActivitiesField,
      uses: UsesField
    }> {
      // ... existing properties and methods

      /**
       * Creatures summoned by this item (using minimal reference type).
       */
      get summonedCreatures(): MinimalActorReference[] // Change from Actor.Implementation[]
      // ... rest of the class
    }
    ```

## Implementation Steps (Requires Code Mode)

1.  Create the file `dnd5e/module/types/item-roll-data.d.mts` and add the `AccurateItemRollData` type definition.
2.  Create the file `dnd5e/module/types/document-references.d.mts` and add the `MinimalItemReference` and `MinimalActorReference` interface definitions.
3.  Open `dnd5e/module/documents/item.d.mts`, add the import for `AccurateItemRollData`, and update the `Item5e.RollData` definition.
4.  Open `dnd5e/module/data/item/templates/activities.d.mts`, add the import for `AccurateItemRollData` and `MinimalActorReference`, and update the `ActivitiesTemplate.RollData` and `summonedCreatures` type definitions.
5.  Open `dnd5e/module/documents/activity/mixin.d.mts`, add the imports for `MinimalItemReference` and `MinimalActorReference`, and update the `ActivityMixin.MessageFlags` interface.

This revised plan should effectively break the type circularity while maintaining accurate type information for the item roll data, addressing the user's feedback.