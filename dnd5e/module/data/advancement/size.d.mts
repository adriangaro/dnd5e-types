/**
 * Configuration data for the size advancement type.
 */
export class SizeConfigurationData extends foundry.abstract.DataModel<
  {
    sizes: foundry.data.fields.SetField<
      foundry.data.fields.StringField<{}, dnd5e.types.ActorSize.TypeKey, dnd5e.types.ActorSize.TypeKey, dnd5e.types.ActorSize.TypeKey>,
      { required: false, initial: ["med"], label: "DND5E.Size" }
    >
  },
  dnd5e.documents.advancement.Advancement<any, any>
> {
  get hint(): string
}

/**
 * Value data for the size advancement type.
 */
export class SizeValueData extends foundry.abstract.DataModel<
  {
    sizes: foundry.data.fields.StringField<{ required: false, label: "DND5E.Size" }, dnd5e.types.ActorSize.TypeKey, dnd5e.types.ActorSize.TypeKey, dnd5e.types.ActorSize.TypeKey>
  },
  dnd5e.documents.advancement.Advancement<any, any>
> { }
