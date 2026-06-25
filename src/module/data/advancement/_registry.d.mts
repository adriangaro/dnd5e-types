/**
 * Advancement type registry (Seam A) — the expandable map of advancement `type` → DataModel
 * constructor. Mirrors the activity registry exactly (see activity/_registry.d.mts).
 */

declare global {
  namespace dnd5e.types {
    namespace Advancement {
      interface DefaultTypes extends Record<string, dnd5e.types.fields.AnyDataModelConstructor | never> {}
      interface OverrideTypes extends Record<string, dnd5e.types.fields.AnyDataModelConstructor | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<
        dnd5e.types.Advancement.DefaultTypes,
        dnd5e.types.Advancement.OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<dnd5e.types.Advancement.Types>;

      /**
       * Per-advancement-type EXPANDABLE set of valid parent item subtypes (the type-level mirror of
       * the runtime `validItemTypes` set). Each entry is an OPEN `Record<itemSubtypeKey, true | never>`
       * declared in the `ValidItemTypes` namespace and bridged here by key — exactly the expandable
       * shape of `ItemProperty.OverrideTypes`. To allow an advancement on more item types, a module
       * declaration-merges `{ myItemType: true }` into the relevant `Advancement.ValidItemTypes.<Key>`
       * interface (works for built-ins AND your own advancements). Advancement keys with no entry here
       * accept any item (`Item.Implementation`).
       *
       *   // widen the built-in Subclass advancement to also allow a module's custom item type:
       *   declare global { namespace dnd5e.types.Advancement.ValidItemTypes {
       *     interface Subclass { myCustomItem: true }
       *   } }
       */
      interface ValidItemTypes {}
      namespace ValidItemTypes {}

      /** Resolve advancement `K`'s parent-item type from its (expandable) valid-item-type set. */
      type ParentItemOf<K extends string> = K extends keyof dnd5e.types.Advancement.ValidItemTypes
        ? globalThis.Item.OfType<
            Extract<dnd5e.types.ExtractKeys<dnd5e.types.Advancement.ValidItemTypes[K]>, globalThis.Item.SubType>
          >
        : globalThis.Item.Implementation;

      type Schema<T extends dnd5e.types.Advancement.TypeKey = dnd5e.types.Advancement.TypeKey> =
        dnd5e.types.fields.SchemaOf<dnd5e.types.Advancement.Types[T]>;

      type Instance = dnd5e.types.fields.RegistryInstance<dnd5e.types.Advancement.Types>;
      type Source = dnd5e.types.fields.RegistrySource<dnd5e.types.Advancement.Types>;
      type OfType<T extends dnd5e.types.Advancement.TypeKey = dnd5e.types.Advancement.TypeKey> = Extract<
        dnd5e.types.Advancement.Instance,
        { type: T }
      >;

      type Field = dnd5e.types.fields.TypedCollectionField<dnd5e.types.Advancement.Types, string>;

      interface Collection extends foundry.utils.Collection<dnd5e.types.Advancement.Instance> {
        toObject(source?: boolean): dnd5e.types.Advancement.Source[];
      }

      interface Config<T extends dnd5e.types.Advancement.TypeKey = dnd5e.types.Advancement.TypeKey> {
        documentClass: dnd5e.types.Advancement.Types[T];
        validItemTypes: Set<globalThis.Item.SubType>;
        hidden?: boolean;
      }
    }
  }
}

export {};
