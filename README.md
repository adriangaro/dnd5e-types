# dnd5e-types

TypeScript definitions for the dnd5e system for Foundry VTT.

## Version Compatibility

**Current Target**: dnd5e system version **4.3.x**

⚠️ **Important**: This package is partially compatible with dnd5e system version **5.0.x**. For dnd5e 5.0.x support progress, see our [Migration Progress Documentation](dnd5e_diff_checklist_4.3.x_to_release-5.0.4.md).

This package provides TypeScript definitions for the dnd5e system and depends on [fvtt-types](https://github.com/League-of-Foundry-Developers/foundry-vtt-types) for core Foundry VTT type definitions.

**Migration Plan**: I am currently working on dnd5e 5.x support to incorporate the changes in the new version.

**Compatibility Notes**:
- Partially compatible with dnd5e 5.0.x or later
- Requires fvtt-types for Foundry VTT core type definitions
- See [Migration Progress](dnd5e_diff_checklist_4.3.x_to_release-5.0.4.md) for dnd5e 5.x support status

## Usage

### Installing as a Dependency

Add this package as a development dependency to your project:

```sh
npm add -D dnd5e@github:adriangaro/dnd5e-types#5.0.x
```

### TypeScript Configuration

To make the types globally available, add them to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["fvtt-types", "dnd5e/dnd5e/dnd5e.d.mts"]
  }
}
```

## Using the definitions

Most dnd5e types, classes and definitions are available under `dnd5e` global namespace (and object).

### Working with Actor and Item Types

When working with Actors and Items in dnd5e, you'll want proper type safety for the best development experience. Here are the recommended approaches:

#### Basic Type Access

```typescript
// Basic access - limited type information
const actor: Actor.Implementation = game.actors.get(id);
const item: Item.Implementation = actor.items.get(itemId);
```

While `Actor.Implementation` and `Item.Implementation` provide the configured actor/item types, they have a major limitation: **you cannot discriminate the underlying subtype by filtering on the `.type` property**.

#### Type Guards for Subtype Discrimination

One solution is to create type guards:

```typescript
function isCharacter(actor: Actor): actor is Actor.OfType<'character'> {
  return actor.type === 'character';
}

function isWeapon(item: Item): item is Item.OfType<'weapon'> {
  return item.type === 'weapon';
}

// Usage
if (isCharacter(actor)) {
  // actor.system is now properly typed as character data
  console.log(actor.system.abilities.str.value);
}
```

#### Using Actor.OfType and Item.OfType

The more flexible approach is casting to union types that can be discriminated:

```typescript
// Cast to union of all known subtypes
const actor = someActor as Actor.OfType<Actor.SubType>;
const item = someItem as Item.OfType<Item.SubType>;

// Now you can discriminate by type
if (actor.type === 'character') {
  // actor.system is properly typed as character data
  actor.system.abilities.str.value;
} else if (actor.type === 'npc') {
  // actor.system is properly typed as NPC data  
  actor.system.details.cr;
}

// Practical example with token.actor
const tokenActor = canvas.tokens.controlled[0]?.actor as Actor.OfType<Actor.SubType>;
if (tokenActor?.type === 'character') {
  // Fully typed character access
  const strength = tokenActor.system.abilities.str.value;
}
```

#### Avoiding Base and Module Subtypes

`Actor.OfType<Actor.SubType>` (and `Item` equivalent) includes two subtypes which don't necessarily help much if not specifically intending compatibility:

1. **Base subtype** - dnd5e explicitly doesn't use this, and no module should declare it, so it is in most cases gonna make `.system` essentially be `{}` and not allow drilling of the system object.
2. **Module subtypes** - Types like `<MODULE_ID>.<name>` where `.system` is always `unknown` which is not really useful again, but one should technically account if intending a module for maximum compatibility

#### Using `Actor.Known` and `Item.Known`

For most cases, use the cleaner approach that excludes problematic subtypes, only using the ones configured by dnd5e-types and your module:

```typescript
// Cleaner approach - excludes base and module subtypes
const actor = someActor as Actor.Known;
const item = someItem as Item.Known;

// Still allows type discrimination without the problematic subtypes
if (actor.type === 'character') {
  // Works perfectly for known dnd5e types
  actor.system.abilities.str.value;
}
```

**Recommendation**: Use `Actor.Known` and `Item.Known` unless you specifically need to handle module-defined subtypes. This pattern is only necessary for Actor and Item documents, which are the most commonly used. ChatMessage/ActiveEffect etc do use the `base` type in dnd5e, so this is not as necessary there, in most cases `ChatMessage.Implementation` and such is good enough.

### dnd5e-Specific Type System

Beyond the standard Foundry document types, the dnd5e system provides its own comprehensive type system for game mechanics, configuration, and data models.

#### Core dnd5e Namespace

The main `dnd5e` namespace contains all the classes, functions, and runtime objects you'll interact with:

```typescript
// Document classes - directly using dnd5e document classes approach (avoid this)
const actor = new dnd5e.documents.Actor5e(data);
const item = new dnd5e.documents.Item5e(data);

// Document classes - Foundry's recommended approach (use this instead)
const actor = new Actor.implementation(data);  // Automatically uses dnd5e.documents.Actor5e
const item = new Item.implementation(data);    // Automatically uses dnd5e.documents.Item5e

// Data models
const characterData = new dnd5e.dataModels.actor.CharacterData(data);
const weaponData = new dnd5e.dataModels.item.WeaponData(data);

// Dice and rolls
const damageRoll = new dnd5e.dice.DamageRoll('2d6+3');
const d20Roll = new dnd5e.dice.D20Roll('1d20+5');
```

#### dnd5e.types Namespace

There is an auxiliary `dnd5e.types` namespace which does not map to actually any object/path inside the global `dnd5e` object, but contains type definitions that can be used for module writing, or for expanding the `dnd5e` system.

This namespace includes:
- **Game mechanic types** - Damage, healing, abilities, skills, etc.
- **Configuration interfaces** - For extending system behavior
- **Data model schemas** - For type-safe data manipulation
- **Utility types** - Helper types for various purposes ⚠️ *Note: These utility types are somewhat unorganized and may require exploration to find what you need*

The most commonly used types are the game mechanic namespaces (like `Damage`, `Ability`, `Skill`) which follow consistent patterns for extension.

#### fvttUtils Namespace

The `fvttUtils` global namespace is exposed by dnd5e (from fvtt-types) and contains utility types that are particularly useful when working with dnd5e-types and fvtt-types. These utilities are normally not easily accessible, but dnd5e makes them available globally:

```typescript
// Convert interfaces to object types
type MyConfig = fvttUtils.InterfaceToObject<dnd5e.types.DataModelConfig.Item>;

// Work with empty objects
type EmptyObj = fvttUtils.EmptyObject;

// Utility types for type manipulation
type KeysOf<T> = fvttUtils.KeysOf<T>;
```

These utilities help bridge fvtt-types and dnd5e-types, especially when working with configuration interfaces and type transformations.

### Working with Override Interfaces

Most dnd5e type namespaces can be extended through their `OverrideTypes` interfaces. These allow you to:

- **Add new types**: Define new entries with `true` or appropriate values
- **Remove existing types**: Set core types to `never` to exclude them from your game

```typescript
declare global {
  namespace dnd5e.types.Damage {
    interface OverrideTypes {
      // Add custom damage types
      "void": true;
      "divine": true;
      
      // Remove core damage type
      "psychic": never;
    }
  }
}
```

The extended types become available throughout the system with full type safety. See [Extending Core dnd5e Types](#extending-core-dnd5e-types) for detailed examples, or [Enhancing DND5EConfig](#enhancing-dnd5econfig) for custom configuration patterns.

### Common Type Extension Pattern

Most dnd5e type namespaces follow a consistent pattern for extensibility. Understanding this pattern helps when working with any namespace in the system:

#### Standard Structure

```typescript
namespace SomeType {
  // 1. Default definitions (core system types)
  interface DefaultSomeTypeTypes {
    // Core types defined by the system
    "coreType1": true;
    "coreType2": true;
  }

  // 2. Override interface for module extensions
  interface OverrideTypes extends Record<string, boolean | never> {}

  // 3. Merged types combining defaults and overrides
  type Types = dnd5e.types.MergeOverrideDefinition<
    DefaultSomeTypeTypes,
    OverrideTypes
  >;

  // 4. Union of all valid type keys
  type TypeKey = dnd5e.types.ExtractKeys<Types>;

  // 5. Configuration interface for each type
  interface SomeTypeConfig {
    label: string;
    // other config properties...
  }
}
```

#### Pattern Variations

**Naming Variations**: Some namespaces use slightly different naming:
- Most use `DefaultXxxTypes` and `OverrideTypes`
- `ArmorProficiency` and `WeaponProficiency` use more complex structures with groups and maps
- `Proficiency` uses `DefaultProficiencyTypes` and `OverrideTypes` for basic proficiency, but `DefaultWeaponProficiencyTypes` and `OverrideWeaponProficiencyTypes` for weapon-specific proficiency

**Value Type Variations**: The default interface values vary by purpose:
- Simple flags: `{ "type": true }` (most common)
- Numeric values: `{ "cp": 100, "sp": 10 }` (Currency conversion rates)
- String mappings: `{ "battleaxe": "mar" }` (WeaponProficiency mapping to groups)
- Mixed types: `{ "full": true, "artificer": true }` (Spellcasting progression)

**Nested Namespaces**: Some types have sub-namespaces:
- `Facility.Types.Basic` and `Facility.Types.Special` for facility categories
- `WeaponProficiency` has groups, specific weapons, proficiency maps, and type maps
- `ArmorProficiency` has similar group/specific/map structure
- `Spellcasting` has `Progression`, `PreparationModes`, `ListType`, `Scaling`, and `School` sub-namespaces

#### Complex Structures

**ArmorProficiency & WeaponProficiency**: These deviate significantly from the standard pattern:
```typescript
// These have multiple layers: Groups → Specific Types → Proficiency Maps
namespace WeaponProficiency {
  interface DefaultWeaponGroupTypes { sim: true; mar: true; }
  interface DefaultWeaponProficiencyTypes extends Record<string, GroupTypeKey> {
    battleaxe: 'mar'; dagger: 'sim'; // maps specific weapons to groups
  }
  interface DefaultWeaponProficiencyMap extends Record<string, GroupTypeKey | boolean> {
    simpleM: 'sim'; martialR: 'mar'; improv: true; // maps trait keys to groups or flags
  }
}
```

### Available Namespaces

The following namespaces are available under `dnd5e.types`. Most follow the standard pattern (`OverrideTypes`, `Types`, `TypeKey`) - only deviations are noted:

**`Ability`** → [`common.d.mts#L138`](dnd5e/module/data/actor/templates/common.d.mts#L138)
- **Defines**: Character ability scores (str, dex, con, int, wis, cha)
- **Config**: `CONFIG.DND5E.abilities`

**`ActivityActivation`** → [`activation-field.d.mts#L93`](dnd5e/module/data/shared/activation-field.d.mts#L93)
- **Defines**: Activity activation types (action, bonus, reaction, minute, hour, etc.)
- **Config**: `CONFIG.DND5E.activityActivationTypes`

**`Activity`** → [`mixin.d.mts#L230`](dnd5e/module/documents/activity/mixin.d.mts#L230)
- **Defines**: Available activity types for items and features
- **Override**: Maps to activity constructors (`attack: typeof AttackActivity`)
- **Config**: `CONFIG.DND5E.activityTypes`

**`Advancement`** → [`_module.d.mts#L26`](dnd5e/module/documents/advancement/_module.d.mts#L26)
- **Defines**: Character advancement types (ability score improvement, feat, etc.)
- **Override**: Maps to advancement constructors
- **Config**: `CONFIG.DND5E.advancementTypes`

**`Alignment`** → [`details.d.mts#L43`](dnd5e/module/data/actor/templates/details.d.mts#L43)
- **Defines**: Character alignments (lg, ng, cg, ln, tn, cn, le, ne, ce)
- **Config**: `CONFIG.DND5E.alignments`

**`ArmorProficiency`** → [`equipment.d.mts#L191`](dnd5e/module/data/item/equipment.d.mts#L191)
- **Defines**: Armor proficiency system with groups and specific armor mappings
- **Override**: Complex structure with `OverrideArmorGroupTypes`, `OverrideArmorProficiencyTypes`, `OverrideArmorProficiencyMap`
- **Config**: `CONFIG.DND5E.armorProficiencies`, `CONFIG.DND5E.armorProficienciesMap`

**`Attack`** → [`attack-data.d.mts#L102`](dnd5e/module/data/activity/attack-data.d.mts#L102)
- **Defines**: Attack types (melee, ranged), modes (thrown, finesse), and classifications (weapon, spell)
- **Override**: Separate `OverrideTypes` for `AttackTypes`, `AttackModeTypes`, and `ClassificationTypes`
- **Config**: `CONFIG.DND5E.attackTypes`, `CONFIG.DND5E.attackModes`, `CONFIG.DND5E.attackClassifications`

**`Attunement`** → [`equippable-item.d.mts#L79`](dnd5e/module/data/item/templates/equippable-item.d.mts#L79)
- **Defines**: Item attunement requirements
- **Config**: `CONFIG.DND5E.attunementTypes`

**`CharacterFlags`** → [`actor.d.mts#L1215`](dnd5e/module/documents/actor/actor.d.mts#L1215)
- **Defines**: Character-specific flags and their configuration
- **Override**: Maps to `CharacterFlagConfig<Type>` where `Type` represents the flag data type (`number`, `boolean`, or `string`)
- **Config**: `CONFIG.DND5E.characterFlags`

**`Creature`** → [`creature-type-field.d.mts#L90`](dnd5e/module/data/shared/creature-type-field.d.mts#L90)
- **Defines**: Creature types (humanoid, dragon, fiend, etc.)
- **Config**: `CONFIG.DND5E.creatureTypes`

**`Currency`** → [`currency.d.mts#L33`](dnd5e/module/data/shared/currency.d.mts#L33)
- **Defines**: Currency types and their conversion rates
- **Override**: Numeric values representing conversion rates relative to GP
- **Config**: `CONFIG.DND5E.currencies`

**`Damage`** → [`damage-field.d.mts#L93`](dnd5e/module/data/shared/damage-field.d.mts#L93)
- **Defines**: Damage types and resistance bypass methods
- **TypeKey**: Includes both damage types and `Bypass` types (ada, mgc, sil)
- **Config**: `CONFIG.DND5E.damageTypes`, `CONFIG.DND5E.damageResistanceTypes`

**`DataModelConfig`** → [`_module.d.mts#L25`](dnd5e/module/data/journal/_module.d.mts#L25)
- **Defines**: Data model registration system for Actor, Item, Journal, ChatMessage, ActiveEffect
- **Override**: Register new data model classes in nested namespaces
- **Config**: Integrated with Foundry's data model system
- **See**: [DataModelConfig Deep Dive](#datamodelconfig-deep-dive) section below

**`DND5EConfig`** → [`config.d.mts#L172`](dnd5e/module/config.d.mts#L172)
- **Defines**: Main system configuration interface
- **Override**: Add custom configuration sections
- **Config**: `CONFIG.DND5E` (the root configuration object)

**`Duration`** → [`duration-field.d.mts#L97`](dnd5e/module/data/shared/duration-field.d.mts#L97)
- **Defines**: Duration units and scaling for spells and effects
- **Override**: Three separate interface merging types: `OverrideDurationUnits`, `OverrideDurationScales`, `OverrideDurationTypes`
- **Config**: `CONFIG.DND5E.durationUnits`

**`Equipment`** → [`equipment.d.mts#L342`](dnd5e/module/data/item/equipment.d.mts#L342)
- **Defines**: Equipment types and their category mappings (armors are automatically merged in)
- **Override**: Nullable string values (`null` for no category, string for equipment category/group)
- **Config**: `CONFIG.DND5E.equipmentTypes`

**`Facility`** → [`facility.d.mts#L120`](dnd5e/module/data/item/facility.d.mts#L120)
- **Defines**: Bastion facility system (no direct default/override types)
- **Override**: Nested `OverrideTypes` in `Types.Basic`, `Types.Special`, `Advancement`, `Orders`, `Sizes` sub-namespaces
- **Config**: `CONFIG.DND5E.facilityTypes`, related bastion configurations

**`Group`** → [`group.d.mts#L179`](dnd5e/module/data/actor/group.d.mts#L179)
- **Defines**: Actor group types (party, encounter)
- **Config**: `CONFIG.DND5E.groupTypes`

**`Habitat`** → [`npc.d.mts#L363`](dnd5e/module/data/actor/npc.d.mts#L363)
- **Defines**: Creature habitats and environments
- **Config**: `CONFIG.DND5E.habitats`

**`Healing`** → [`damage-field.d.mts#L149`](dnd5e/module/data/shared/damage-field.d.mts#L149)
- **Defines**: Healing types (healing, temphp)
- **Config**: `CONFIG.DND5E.healingTypes`

**`ItemProperties`** → [`item-description.d.mts#L59`](dnd5e/module/data/item/templates/item-description.d.mts#L59)
- **Defines**: Valid property keys for each item type
- **Override**: Complex validation system for type-safe item properties
- **Config**: Used for item property validation, not direct config mapping

**`Movement`** → [`movement-field.d.mts#L102`](dnd5e/module/data/shared/movement-field.d.mts#L102)
- **Defines**: Movement types (walk, fly, swim, climb, burrow)
- **Override**: Cannot be expanded (system limitation - `OverrideTypes` only accepts `never` values)
- **Config**: `CONFIG.DND5E.movementTypes`

**`Proficiency`** → [`proficiency.d.mts#L93`](dnd5e/module/documents/actor/proficiency.d.mts#L93)
- **Defines**: Proficiency levels and weapon proficiency categories
- **Override**: Numeric keys for levels (`0`, `1`, `0.5`, `2`) plus separate `OverrideWeaponProficiencyTypes` interface
- **Config**: `CONFIG.DND5E.proficiencyLevels`, `CONFIG.DND5E.weaponAndArmorProficiencyLevels`

**`Range`** → [`range-field.d.mts#L91`](dnd5e/module/data/shared/range-field.d.mts#L91)
- **Defines**: Distance units for ranges and areas
- **Config**: `CONFIG.DND5E.distanceUnits`

**`RecoveryPeriod`** → [`uses-field.d.mts#L133`](dnd5e/module/data/shared/uses-field.d.mts#L133)
- **Defines**: Recovery periods for limited-use abilities
- **Override**: `OverrideRecoveryPeriods` with mixed values - maps to recovery groups (`sr: 'short'`, `lr: 'long'`) or boolean flags (`charges: true`, `dawn: true`)
- **Config**: `CONFIG.DND5E.limitedUsePeriods`

**`Senses`** → [`senses-field.d.mts#L95`](dnd5e/module/data/shared/senses-field.d.mts#L95)
- **Defines**: Creature senses (darkvision, tremorsense, blindsight, etc.)
- **Override**: Cannot be expanded (system limitation - `OverrideTypes` only accepts `never` values)
- **Config**: `CONFIG.DND5E.senses`

**`Skill`** → [`creature.d.mts#L225`](dnd5e/module/data/actor/templates/creature.d.mts#L225)
- **Defines**: Character skills and their associated abilities
- **Config**: `CONFIG.DND5E.skills`

**`Spellcasting`** → [`spellcasting-field.d.mts#L109`](dnd5e/module/data/item/fields/spellcasting-field.d.mts#L109)
- **Defines**: Spellcasting system components
- **Override**: Nested `OverrideTypes` in `Progression`, `PreparationModes`, `ListType`, `Scaling`, `School`
- **Config**: `CONFIG.DND5E.spellcastingTypes`, `CONFIG.DND5E.spellPreparationModes`, `CONFIG.DND5E.spellProgression`, `CONFIG.DND5E.spellUpcastModes`, `CONFIG.DND5E.spellSchools`

**`Target`** → [`target-field.d.mts#L109`](dnd5e/module/data/shared/target-field.d.mts#L109)
- **Defines**: Targeting types and template shapes for spells and abilities
- **Override**: `OverrideTargetTypes` for target types (`self`, `creature`, `object`) and `OverrideTemplateTypes` for template shapes (`cone`, `cube`, `cylinder`, `line`, `sphere`, `wall`)
- **Config**: `CONFIG.DND5E.targetTypes`, `CONFIG.DND5E.areaTargetTypes`

**`Trait`** → [`trait.d.mts#L191`](dnd5e/module/documents/actor/trait.d.mts#L191)
- **Defines**: Actor trait categories and their display configuration
- **Override**: Maps to trait configuration objects with keyPath, configKey, children
- **Config**: `CONFIG.DND5E.traits`

**`Weapon`** → [`weapon.d.mts#L444`](dnd5e/module/data/item/weapon.d.mts#L444)
- **Defines**: Weapon types derived from weapon proficiency system
- **Override**: `OverrideWeaponTypes` interface, plus `OverrideWeaponClassificationTypes` for weapon classifications
- **TypeKey**: Derived from `WeaponProficiency.Types` plus custom overrides
- **Config**: `CONFIG.DND5E.weaponTypes`, `CONFIG.DND5E.weaponClassifications`

**`WeaponProficiency`** → [`weapon.d.mts#L242`](dnd5e/module/data/item/weapon.d.mts#L242)
- **Defines**: Complete weapon proficiency system with groups, specific weapons, and mappings
- **Override**: Multiple override interfaces for groups, proficiencies, maps, types, and masteries
- **Config**: `CONFIG.DND5E.weaponProficiencies`, `CONFIG.DND5E.weaponProficienciesMap`, `CONFIG.DND5E.weaponTypes`

**`fields`** → [`fields.d.mts#L3`](dnd5e/module/types/fields.d.mts#L3)
- **Defines**: Utility types for custom field validation and restrictions
- **Override**: Not applicable - utility types only
- **Config**: Used for field type safety, not config mapping

## DataModelConfig Deep Dive

The `DataModelConfig` namespace is a special configuration system that allows you to register and extend data models used throughout the dnd5e system. It provides type-safe ways to add new data models and enhance existing ones.

### Available DataModelConfig Namespaces

DataModelConfig is organized into several sub-namespaces, each corresponding to different document types:

- `DataModelConfig.Actor` - Actor data models (character, npc, vehicle, group)
- `DataModelConfig.Item` - Item data models (weapon, spell, feat, etc.)
- `DataModelConfig.Journal` - Journal page data models (class, rule, map, etc.)  
- `DataModelConfig.ChatMessage` - Chat message data models (turn, rest)
- `DataModelConfig.ActiveEffect` - Active effect data models (enchantment)

### Adding New Data Models

To add a new data model to the system, you need to:

1. **Define your data model class** extending the appropriate base class
2. **Register it in the DataModelConfig namespace** 

#### Example: Adding a New Item Type

```typescript
// 1. Define your data model
declare class MyCustomItemData extends dnd5e.dataModels.ItemDataModel<{
  customProperty: foundry.data.fields.StringField<{required: true}>
}> {
  static get metadata() {
    return foundry.utils.mergeObject(super.metadata, {
      type: "customitem"
    });
  }
}

// 2. Register in DataModelConfig
declare global {
  namespace dnd5e.types {
    namespace DataModelConfig {
      interface Item {
        customitem: typeof MyCustomItemData;
      }
    }
  }
}
```

`dnd5e-types` does the following to register all the configured Data Models to `fvtt-types.

```typescript
// 3. Add to global configuration (this is done by dnd5e-types so mostly illustrated how it is interfaced with fvtt-types)
declare module "fvtt-types/configuration" {
  interface DataModelConfig {
    Item: fvttUtils.InterfaceToObject<dnd5e.types.DataModelConfig.Item>;
  }
}
```

### Enhancing Existing Schemas

You can extend existing data models without modifying the core system by using the `OverrideSchema` interface merging pattern. This pattern is available for Actor and Item data models, allowing you to add custom fields to existing types.

**Understanding OverrideSchema Mechanics:**

The `OverrideSchema` interface works by leveraging the `dnd5e.types.MergeSchemas` utility type under the hood. When you define fields in an `OverrideSchema`, they get merged with the base data model schema using the same field merging logic. This means you can:

- **Add new fields** - Define completely new fields that will be added to the data model
- **Override existing fields** - Redefine existing fields with different Field type or different options
- **Remove fields** - Set existing fields to `never` to exclude them from the final schema

For a deep understanding of how this merging process works, including nested field merging and field removal with `never`, see the [Schema Merging with MergeSchemas](#schema-merging-with-mergeschemas) section.

### Available OverrideSchema Interfaces

The `OverrideSchema` pattern is available for the following data models:

**Actor Types:**
- `Actor.character`
- `Actor.npc` 
- `Actor.vehicle`
- `Actor.group`

**Item Types:**
- `Item.weapon`
- `Item.spell`
- `Item.feat`
- `Item.equipment`
- `Item.consumable`
- `Item.container`
- `Item.loot`
- `Item.class`
- `Item.subclass`
- `Item.background`
- `Item.race`