
declare class RollConfigField<
  const Config extends {
    rolls?: foundry.data.fields.DataSchema,
    ability?: dnd5e.types.Ability.TypeKey | '' | false
  },
  const Options extends RollConfigField.Options<Config> = RollConfigField.DefaultOptions,
  const AssignmentType = RollConfigField.AssignmentType<Config, Options>,
  const InitializedType = RollConfigField.InitializedType<Config, Options>,
  const PersistedType extends fvttUtils.AnyObject | null | undefined = RollConfigField.PersistedType<Config, Options>,
> extends foundry.data.fields.SchemaField<
  RollConfigField.SchemaFromConfig<Config>,
  Options,
  AssignmentType,
  InitializedType,
  PersistedType
> {
  constructor(config: Config, options: Options)
}

declare namespace RollConfigField {
  type SchemaFromConfig<
    Config extends {
      rolls?: foundry.data.fields.DataSchema,
      ability?: dnd5e.types.Ability.TypeKey | '' | false
    },
    Schema extends foundry.data.fields.DataSchema = Omit<Config, 'rolls' | 'ability'> extends foundry.data.fields.DataSchema ? Omit<Config, 'rolls' | 'ability'> : {},
    Ability extends dnd5e.types.Ability.TypeKey | '' | false = Config['ability'] extends dnd5e.types.Ability.TypeKey | '' | false ? Config['ability'] : '',
    RollSchema extends foundry.data.fields.DataSchema = Config['rolls'] extends foundry.data.fields.DataSchema ? Config['rolls'] : {},
  > = Schema & (
    Ability extends true ?
    {
      ability: foundry.data.fields.StringField<{
        required: true,
        choices: (dnd5e.types.Ability.TypeKey | '')[],
      }>,
    } :
    {}
  ) & {
    roll: foundry.data.fields.SchemaField<{
      min: foundry.data.fields.NumberField,
      max: foundry.data.fields.NumberField,
      mode: dnd5e.dataModels.fields.AdvantageModeField
    } & RollSchema>
  }

  type Options<
    Config extends {
      rolls?: foundry.data.fields.DataSchema,
      ability?: dnd5e.types.Ability.TypeKey | '' | false
    },
  > = foundry.data.fields.SchemaField.Options<
    SchemaFromConfig<Config>
  >;
  export import DefaultOptions = foundry.data.fields.SchemaField.DefaultOptions;
  type AssignmentType<
    Config extends {
      rolls?: foundry.data.fields.DataSchema,
      ability?: dnd5e.types.Ability.TypeKey | '' | false
    },
    Options extends RollConfigField.Options<Config>,
  > = foundry.data.fields.SchemaField.Internal.AssignmentType<
    SchemaFromConfig<Config>,
    Options
  >
  type InitializedType<
    Config extends {
      rolls?: foundry.data.fields.DataSchema,
      ability?: dnd5e.types.Ability.TypeKey | '' | false
    },
    Options extends RollConfigField.Options<Config>,
  > = foundry.data.fields.SchemaField.Internal.InitializedType<
    SchemaFromConfig<Config>,
    Options
  >
  type PersistedType<
    Config extends {
      rolls?: foundry.data.fields.DataSchema,
      ability?: dnd5e.types.Ability.TypeKey | '' | false
    },
    Options extends RollConfigField.Options<Config>,
  > = foundry.data.fields.SchemaField.Internal.PersistedType<
    SchemaFromConfig<Config>,
    Options
  >
}

export default RollConfigField