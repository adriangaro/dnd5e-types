import * as Trait from "../../../documents/actor/trait.mjs";
import BaseConfigSheet from "../api/base-config-sheet.mjs";

/**
 * Base application for configuring an actor's abilities, skills, or tools.
 */
declare class BaseProficiencyConfig<
  Trait extends dnd5e.types.Trait.TypeKey = dnd5e.types.Trait.TypeKey,
  Key extends BaseProficiencyConfig.ValidKeysOfTrait<Trait> = BaseProficiencyConfig.ValidKeysOfTrait<Trait>,
  Document extends BaseProficiencyConfig.ValidDocument<
    Extract<`${dnd5e.types.Trait.TraitKeyPath<Trait>}.${Key}`, BaseProficiencyConfig.ValidTraitKeyCombinations>
  > = BaseProficiencyConfig.ValidDocument<
    Extract<`${dnd5e.types.Trait.TraitKeyPath<Trait>}.${Key}`, BaseProficiencyConfig.ValidTraitKeyCombinations>
  >,
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends BaseConfigSheet<
  Document,
  BaseProficiencyConfig.MakeRenderContext<RenderContext, Extract<`${dnd5e.types.Trait.TraitKeyPath<Trait>}.${Key}`, BaseProficiencyConfig.ValidTraitKeyCombinations>, Document>,
  BaseProficiencyConfig.MakeConfiguration<Configuration>,
  BaseProficiencyConfig.MakeRenderOptions<RenderOptions>
> {
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Configuration data for the ability being edited.
   * @abstract
   */
  get propertyConfig(): object

  /* -------------------------------------------- */

  /**
   * Label for the specific skill or tool being configured.
   */
  get propertyLabel(): string
}

declare namespace BaseProficiencyConfig {
  type _PathToObject<T extends string> = T extends `${infer First}.${infer Rest}`
    ? First extends `${infer F}`
    ? { [K in F]: _PathToObject<Rest> }
    : never
    : T extends `${infer F}`
    ? { [K in F]: any }
    : never;

  type GetAllKeys<T> = T extends any ? keyof T : never

  type ValidKeysOfTrait<Trait extends dnd5e.types.Trait.TypeKey = dnd5e.types.Trait.TypeKey> = Exclude<
    GetAllKeys<dnd5e.types.GetTypeFromPath<
      Actor.OfType<Actor.SubType>,
      dnd5e.types.Trait.TraitKeyPath<Trait>
    >>,
    symbol
  > extends infer K
    ? K extends string | number  // Add this constraint
    ? fvttUtils.IsObject<dnd5e.types.GetTypeFromPath<
      Actor.OfType<Actor.SubType>,
      `${dnd5e.types.Trait.TraitKeyPath<Trait>}.${K}`
    >> extends never
    ? never
    : K
    : never
    : never

  // First, create a type for all valid trait/key combinations
  type ValidTraitKeyCombinations = {
    [Trait in dnd5e.types.Trait.TypeKey]: {
      [Key in ValidKeysOfTrait<Trait>]: `${dnd5e.types.Trait.TraitKeyPath<Trait>}.${Key}`
    }[ValidKeysOfTrait<Trait>]
  }[dnd5e.types.Trait.TypeKey]

  // Then modify ValidDocument to work with the full path
  type ValidDocument<Path extends ValidTraitKeyCombinations = ValidTraitKeyCombinations> = Extract<
    Actor.OfType<Actor.SubType>,
    _PathToObject<Path>
  >

  type d = ValidDocument

  // Helper to extract Trait and Key from a path
  type ExtractTraitAndKey<Path extends ValidTraitKeyCombinations> = {
    [Trait in dnd5e.types.Trait.TypeKey]:
    Path extends `${dnd5e.types.Trait.TraitKeyPath<Trait>}.${infer Key}`
    ? {
      trait: Trait,
      key: Key
    }
    : never
  }[dnd5e.types.Trait.TypeKey]
  
  type MapToSchemaPath<T extends string> = T extends `system.${infer Rest}`
    ? MapToSchemaPath<Rest>
    : T extends `${infer First}.${infer Second}`
    ? `${First}.fields.${MapToSchemaPath<Second>}`
    : T

  type MakeRenderContext<
    Ctx extends fvttUtils.AnyObject = {},
    Path extends ValidTraitKeyCombinations = ValidTraitKeyCombinations,
    Document extends ValidDocument<Path> = ValidDocument<Path>,
    Extracted extends ExtractTraitAndKey<Path> = ExtractTraitAndKey<Path>
  > = dnd5e.types.DeepMerge<
    {
      data: dnd5e.types.GetTypeFromPath<Document, Path>,
      fields: dnd5e.types.GetTypeFromPath<Document, `system.schema.fields.${MapToSchemaPath<dnd5e.types.Trait.TraitKeyPath<Extracted['trait']>>}.model.fields`>,
      label: string,
      prefix: string,
      global: {
        data: dnd5e.types.GetTypeFromPath<Document, 'system._source.bonuses.abilities'>,
        fields: dnd5e.types.GetTypeFromPath<Document, 'system.schema.fields.bonuses.fields.abilities.fields'>
      }
    },
    Ctx
  >
  type RenderContext = BaseProficiencyConfig['__RenderContext']

  type MakeConfiguration<
    Cfg extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {

    },
    Cfg
  >
  type Configuration = BaseProficiencyConfig['__Configuration']
  type MakeRenderOptions<
    Opt extends fvttUtils.AnyObject = {}
  > = dnd5e.types.DeepMerge<
    {

    },
    Opt
  >
  type RenderOptions = BaseProficiencyConfig['__RenderOptions']

}

export default BaseProficiencyConfig;