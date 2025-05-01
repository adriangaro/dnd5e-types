/**
 * Configuration data for the size advancement type.
 */
export class SizeConfigurationData extends foundry.abstract.DataModel<
  {
    sizes: foundry.data.fields.SetField<
      dnd5e.types.fields.RestrictedStringField<dnd5e.types.ActorSize.TypeKey>,
      { required: false, initial: ["med"], label: "DND5E.Size" }
    >
  },
  null
> {
  get hint(): string
}

/**
 * Value data for the size advancement type.
 */
export class SizeValueData extends foundry.abstract.DataModel<
  {
    sizes: dnd5e.types.fields.RestrictedStringField<dnd5e.types.ActorSize.TypeKey, { required: false, label: "DND5E.Size" }>
  },
  null
> { }
