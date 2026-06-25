# Full-repo type review — 2026-06-22

Per-file find→verify review of every `src/**/*.d.mts` (541 files) against the dnd5e runtime under `_research/dnd5e/module/`. Two-stage workflow: a finder diffs each declaration vs runtime across five axes, then an adversarial verifier confirms each finding (false positives / deliberate conventions dropped). Raw machine-readable findings: `full-repo-review-2026-06-findings.json`.

## Totals

**1007 confirmed** — 225 high / 499 medium / 283 low.

| Axis | Count |
|---|---|
| coverage | 392 |
| fidelity | 285 |
| correctness | 215 |
| shortcut | 78 |
| seam | 37 |

| Phase | Scope | H | M | L |
|---|---|---|---|---|
| A | core: data/ documents/ types/ funnel/ | 77 | 148 | 121 |
| B | config/ | 11 | 27 | 14 |
| C | applications/ | 61 | 192 | 116 |
| D | _gen/ _api/ canvas/ dice/ loose | 76 | 132 | 32 |

## HIGH findings (full)


### `_gen/data/actor/_types.d.mts`
| member | axis | fix |
|---|---|---|
| CharacterActorSystemData.attributes.inspiration | correctness | Change `inspiration: number;` to `inspiration: boolean;` |
| TravelPaceDescriptor | coverage | Add `pace: { available: boolean; label: string; slowed: boolean; value: dnd5e.types.defs.data.actor.fields.TravelPace5e }; paces: Record<string, number>;` to the interface body. |
| GroupRestConfiguration | coverage | Add `autoRest?: boolean; targets?: string[];` to the `GroupRestConfiguration` interface body. |

### `_gen/data/actor/fields/_types.d.mts`
| member | axis | fix |
|---|---|---|
| TravelData.time | coverage | Add `time: number;` to the TravelData interface. The runtime TravelField constructor (travel-field.mjs:28-31) adds `time: new NumberField({ positive: true, integer: true, initial: initialTime })` to the schema, and prepareData reads it at lines 63-64 (`travel.time`). The `_types.mjs` @typedef omits `time` entirely, so the generator never emitted it. |
| TravelData.units | correctness | Change `units: string;` to `units: string \| null;` in TravelData. The runtime StringField at travel-field.mjs:33 has `nullable: true`, which makes `null` a valid stored value (the default `initialUnits` is `null`). |

### `documents/active-effect.d.mts`
| member | axis | fix |
|---|---|---|
| createDialog | coverage | Add `static createDialog(data?: object, createOptions?: object, dialogOptions?: object): Promise<ActiveEffect.Implementation \| null>;` |
| deleteDialog | coverage | Add `override deleteDialog(options?: { sheet?: object } & object, operation?: object): Promise<this \| false \| null>;` |

### `documents/activity/enchant.d.mts`
| member | axis | fix |
|---|---|---|
| EnchantmentError | coverage | Add `export class EnchantmentError extends Error {}` to the declaration file. |
| applyEnchantment | coverage | Add `applyEnchantment(profile: string, item: globalThis.Item.Implementation, options?: { chatMessage?: ChatMessage.Implementation; concentration?: ActiveEffect.Implementation; strict?: boolean }): Promise<ActiveEffect.Implementation \| null>;`. |
| canEnchant | coverage | Add `canEnchant(item: globalThis.Item.Implementation, options?: { chatMessage?: ChatMessage.Implementation }): true \| EnchantmentError[];`. |

### `documents/activity/mixin.d.mts`
| member | axis | fix |
|---|---|---|
| ActivityBehavior | coverage | Add the mixin-owned getters/methods to ActivityBehavior: canConfigure, canUse, damageFlavor (string), dependentOrigin (ActiveEffect5e\|null), messageFlags (object), relativeUUID (string), validConsumptionTypes (Set<string>); refund(consumed: dnd5e.types.defs.data.chatMessage.fields.ActorDeltasData): Promise<void>, _prepareUsageConfig, _prepareUsageScaling, _prepareUsageUpdates, _requiresConfigurationDialog, _usageChatContext, _finalizeMessageConfig, _usageChatButtons (returns ActivityUsageChatButton[]), shouldHideChatButton, _createUsageMessage, onRenderChatCard, _finalizeUsage, _triggerSubsequentActions, activateChatListeners, getContextMenuOptions (ContextMenuEntry[]), _onChatAction, createConsumedFlag, getFavoriteData, getLinkedActivity, getRollData, getUsageToken, _mergeActivityUpdates. Note ActivityRollData/RollDataOptions are NOT yet present in the activity gen defs, so getRollData cannot use a named return type until that def exists. |
| ActivityBehavior (statics) | coverage | Add the missing statics: static localize(): void; static _localizeSchema(schema, prefixes: string[]): void; static onContextMenu(item: globalThis.Item.Implementation, target: HTMLElement): void; static availableForItem(item: globalThis.Item.Implementation): boolean; static _createDialogTypes(parent): string[]. |
| consume | correctness | Type as consume(usageConfig: dnd5e.types.defs.documents.activity.ActivityUseConfiguration, messageConfig: dnd5e.types.defs.documents.activity.ActivityMessageConfiguration): Promise<dnd5e.types.defs.documents.activity.ActivityUsageUpdates \| false>. Both params are required at runtime. |

### `documents/activity/summon.d.mts`
| member | axis | fix |
|---|---|---|
| placeSummons | coverage | Add: placeSummons(options: SummoningConfiguration): Promise<dnd5e.types.canvas.Token5e.Implementation[] \| void>; (verify the exact options/return type paths exist in the repo; the member itself is genuinely missing). |
| getChanges | coverage | Add: getChanges(actor, profile, options): Promise<{ actorUpdates: object; tokenUpdates: object }>; Note the JSDoc says {actorChanges, tokenChanges} but the real return (summon.mjs:485) is { actorUpdates, tokenUpdates } — the finder's fix correctly uses actorUpdates/tokenUpdates. |
| getPlacement | coverage | Add: getPlacement(token: foundry.data.PrototypeToken, profile: SummonsProfile, options: SummoningConfiguration): Promise<TokenPlacementData[]>; (verify type-path reachability). |

### `documents/actor.d.mts`
| member | axis | fix |
|---|---|---|
| rollInitiative | coverage | Add an override for rollInitiative. Runtime (actor.mjs:1910) is `async rollInitiative(options={}, rollOptions={})` and returns the result of `super.rollInitiative(options)` (a Combat or null), NOT `this`. Use e.g. `override rollInitiative(options?: object, rollOptions?: Partial<dnd5e.types.Dice.InitiativeRollOptions>): Promise<Combat.Implementation \| null>;` |
| toggleStatusEffect | coverage | Add `override toggleStatusEffect(statusId: string, options?: object): Promise<ActiveEffect.Implementation \| boolean>;` |
| createDialog | coverage | Add `static createDialog(data?: object, createOptions?: object, dialogOptions?: object): Promise<Actor.Implementation \| null>;` |

### `documents/advancement/ability-score-improvement.d.mts`
| member | axis | fix |
|---|---|---|
| EPIC_BOON_LEVEL | coverage | Add `static EPIC_BOON_LEVEL: number;` to the class body. |
| allowFeat | coverage | Add `get allowFeat(): boolean;` to the class body. |
| isEpicBoon | coverage | Add `get isEpicBoon(): boolean;` to the class body. |
| points | coverage | Add `get points(): { assigned: number; total: number };` to the class body. |
| canImprove | coverage | Add `canImprove(ability: dnd5e.types.Ability.TypeKey): boolean;` to the class body. |

### `documents/advancement/item-choice.d.mts`
| member | axis | fix |
|---|---|---|
| ItemChoiceAdvancement | correctness | Make the declaration reflect the runtime chain ItemChoiceAdvancement extends ItemGrantAdvancement (item-choice.mjs:16). Either extend ItemGrantAdvancement directly, or if the item-choice data-model binding must be preserved, compose ItemGrant's surface so that static VALID_TYPES, inherited createItemData, and the apply/restore/reverse/_validateItemType overrides resolve against the parent. The current `extends ReturnType<typeof AdvancementMixin<typeof BaseItemChoiceAdvancementData>>` severs the ItemGrant link, so static VALID_TYPES (read by item-choice-flow.mjs:37,248 and item-choice-config.mjs:94 via this.advancement.constructor.VALID_TYPES) and the rest of ItemGrant's inherited surface are absent on the type. |

### `documents/advancement/mixin.d.mts`
| member | axis | fix |
|---|---|---|
| AdvancementBehavior (instance methods) | coverage | Add the missing cross-advancement instance methods to AdvancementBehavior with runtime signatures: prepareData(): void; _preCreate(data: object): boolean \| void; configuredForLevel(level: number): boolean; sortingValueForLevel(level: number): string; titleForLevel(level: number, options?: { legacyDisplay?: boolean; configMode?: boolean }): string; summaryForLevel(level: number, options?: { legacyDisplay?: boolean; configMode?: boolean }): string; automaticApplicationValue(level: number): Promise<object \| false>; restore(level: number, data: object, options?: object): Promise<void>; createItemData(uuid: string, id?: string): Promise<object \| null>; getContextMenuOptions(): ContextMenuEntry[]. |
| AdvancementBehavior (getters) | coverage | Add get levels(): number[]; get supportsHTMLHint(): boolean; get _defaultIcon(): string; get _defaultTitle(): string to AdvancementBehavior. |
| AdvancementBehavior (statics) | coverage | Add static members to AdvancementBehavior so the Pick<typeof AdvancementBehavior, ...> surfaces them: static ERROR: typeof Error; static localize(): void; static availableForItem(item: Item.Implementation): boolean; static onContextMenu(item: Item.Implementation, target: HTMLElement): void; static _createDialogData(type: string, parent: Item.Implementation): object; static _createDialogTypes(parent: Item.Implementation): string[]. |

### `documents/chat-message.d.mts`
| member | axis | fix |
|---|---|---|
| migrateData | coverage | Add `static override migrateData(source: object): object;` to the class body. |

### `documents/combatant.d.mts`
| member | axis | fix |
|---|---|---|
| getInitiativeRoll | coverage | Add `getInitiativeRoll(formula?: string): import("../module/dice/d20-roll.mjs").default \| null;`. The runtime override (combatant.mjs:85-89) narrows the parent's `Roll.Implementation` return to a D20Roll and can return null (delegates to `this.actor.getInitiativeRoll()` which is `D20Roll \| null` per actor.d.mts:182). This is a meaningful override absent from the .d.mts. |

### `documents/item.d.mts`
| member | axis | fix |
|---|---|---|
| createScrollFromCompendiumSpell | coverage | Add `static createScrollFromCompendiumSpell(uuid: string, config?: object): Promise<globalThis.Item.Implementation \| void>;` |

### `documents/journal-entry-page.d.mts`
| member | axis | fix |
|---|---|---|
| JournalEntryPage5e | seam | Add 'interface JournalEntryPage5e<SubType extends JournalEntryPage.SubType = JournalEntryPage.SubType> {}' after the class for declaration merging. |
| RollData.page | correctness | Type page as 'this["system"] & { name: string; flags: fvttUtils.GetKey<This, "flags"> }' (spread of the system data, not the whole document). |

### `documents/token.d.mts`
| member | axis | fix |
|---|---|---|
| getBarAttribute | coverage | Add: override getBarAttribute(barName: string, options?: { alternative?: string }): TokenDocument5e.BarAttribute \| null; |
| getTrackedAttributeChoices | coverage | Add: static override getTrackedAttributeChoices(attributes?: object): Array<{ value: string; group: string; [key: string]: unknown }>; |

### `funnel/flag-config.d.mts`
| member | axis | fix |
|---|---|---|
| FlagConfig.Actor | coverage | Add the missing optional Actor flag members (diamondSoul?, halflingLucky?, reliableTalent?, remarkableAthlete?, tavernBrawlerFeat?, elvenAccuracy?, enhancedDualWielding?, meleeCriticalDamageDice?, showTokenPortrait?, previousActorIds?: string[], summonedCopy?, restSettings?, spellLists?, showVehicleAbilities?/showVehicleInitiative?/showVehicleQuality?, initiativeAdv?/initiativeAlert?, summon?: {origin?: string}, transform?: {profile?: string; uuid?: string}) to interface Actor. |
| FlagConfig.Item | coverage | Add optional Item flag members advancementOrigin?: string; advancementRoot?: string; cachedFor?: string; order?; gear?; riders?; summon? to interface Item. |

### `module/_api/dataModels-actor.d.mts`
| member | axis | fix |
|---|---|---|
| CharacterData / EncounterData / GroupData / NPCData / VehicleData | coverage | Add `const CharacterData: typeof import('../data/actor/character.mjs').default; type CharacterData = import('../data/actor/character.mjs').default;` (and likewise for EncounterData, GroupData, NPCData, VehicleData) to the `dnd5e.dataModels.actor` namespace. Their `.d.mts` files already exist so no new files are needed. |

### `module/applications/activity/cast-sheet.d.mts`
| member | axis | fix |
|---|---|---|
| CastSheet.RenderContext.abilityOptions | coverage | Add `abilityOptions: foundry.applications.fields.FormSelectOption[];` to CastSheet.RenderContext. |
| CastSheet.RenderContext.propertyOptions | coverage | Add `propertyOptions: foundry.applications.fields.FormSelectOption[];` to CastSheet.RenderContext. |

### `module/applications/advancement/size-config.d.mts`
| member | axis | fix |
|---|---|---|
| SizeConfig.RenderContext.default | correctness | Remove the `Omit<AdvancementConfig.RenderContext<Document>, "default">` and re-declaration. Extend plain `AdvancementConfig.RenderContext<Document>` directly (no Omit), since `foundry.utils.mergeObject` deep-merges the child's `{ hint }` into the parent's `{ title, icon, hint }` — the final runtime shape is `{ title: string; icon: string; hint: string }`, which the parent type already models correctly. |

### `module/applications/components/double-range-picker.d.mts`
| member | axis | fix |
|---|---|---|
| declare namespace DoubleRangePickerElement { interface Any; interface AnyConstructor } | seam | Add `declare namespace DoubleRangePickerElement { interface Any extends DoubleRangePickerElement {} interface AnyConstructor extends fvttUtils.Identity<typeof DoubleRangePickerElement> {} }` after the class declaration. |
| constructor | correctness | Add `constructor();` as a public member inside `declare class DoubleRangePickerElement`. |

### `module/applications/components/filter-menu.d.mts`
| member | axis | fix |
|---|---|---|
| FilterMenu (namespace) | seam | Add 'declare namespace FilterMenu { interface Any extends FilterMenu {} interface AnyConstructor extends fvttUtils.Identity<typeof FilterMenu> {} }' after the class declaration, matching the pattern used by every sibling component. |

### `module/canvas/map-location-control-icon.d.mts`
| member | axis | fix |
|---|---|---|
| constructor | coverage | Add `constructor(options?: { code: string } & ConstructorParameters<typeof foundry.canvas.containers.ControlIcon>[0]): MapLocationControlIcon;` |
| code | coverage | Add `code: string;` as a public instance property. |
| style | coverage | Add `style: Omit<dnd5e.types.defs.core.MapLocationMarkerStyle, 'icon'>;` as a public instance property. |
| extrude | coverage | Add `extrude: PIXI.Graphics;` as a public instance property. |
| shadow | coverage | Add `shadow: PIXI.Graphics;` as a public instance property. |
| text | coverage | Add `text: foundry.canvas.containers.PreciseText;` as a public instance property. |

### `module/canvas/template-placement.d.mts`
| member | axis | fix |
|---|---|---|
| TemplatePlacement.fromActivity | correctness | Change return type to `Promise<globalThis.RegionDocument.Implementation[] \| null>` |
| TemplatePlacement.fromActivity | correctness | Change the options parameter to `options?: { createData?: object; placementConfig?: Partial<dnd5e.types.defs.canvas.TemplatePlacementConfiguration> }` |

### `module/config/_stubs.d.mts`
| member | axis | fix |
|---|---|---|
| Tool.DefaultTypes | coverage | Add all runtime DND5E.tools keys (config.mjs:685, ~36 entries: alchemist, bagpipes, brewer, calligrapher, card, carpenter, cartographer, chess, cobbler, cook, dice, disg, drum, dulcimer, flute, forg, glassblower, herb, horn, jeweler, leatherworker, lute, lyre, mason, navg, painter, panflute, pois, potter, shawm, smith, thief, tinker, viol, weaver, woodcarver) to Tool.DefaultTypes. |
| Condition.DefaultTypes | coverage | Add the 11 missing runtime conditionTypes keys (bleeding, burning, cursed, dehydration, diseased, falling, malnutrition, silenced, suffocation, surprised, transformed) to Condition.DefaultTypes. |
| Movement.DefaultTypes | coverage | Add `jump: true;` to Movement.DefaultTypes. |

### `module/config/activityConsumptionTypes.d.mts`
| member | axis | fix |
|---|---|---|
| Config.consume | fidelity | Type as `(this: dnd5e.types.fields.ConsumptionTargetData, config: dnd5e.types.defs.documents.activity.ActivityUseConfiguration, updates: dnd5e.types.defs.documents.activity.ActivityUsageUpdates) => Promise<void> \| void`. |

### `module/config/defaultArtwork.d.mts`
| member | axis | fix |
|---|---|---|
| defaultArtwork | fidelity | Type as a structured shape with sub-type-union inner keys, e.g. `defaultArtwork: { ActiveEffect: Partial<Record<ActiveEffect.SubType, string>>; Actor: Partial<Record<Actor.SubType, string>>; Item: Partial<Record<Item.SubType, string>> }`. |

### `module/config/itemPropertiesByType.d.mts`
| member | axis | fix |
|---|---|---|
| ItemProperty.Class / ValidPropertyMap.class | coverage | Add a `namespace Class { interface DefaultTypes { sidekick: true } interface OverrideTypes ... type Types ... type TypeKey ... }` and a `class: dnd5e.types.ItemProperty.Class.TypeKey;` entry in ValidPropertyMap. |
| ItemProperty.Tool.DefaultTypes | correctness | Add `foc: true;` to ItemProperty.Tool.DefaultTypes. |

### `module/config/movementTypes.d.mts`
| member | axis | fix |
|---|---|---|
| movementTypes | coverage | Add `jump: true;` to Movement.DefaultTypes in src/module/config/_stubs.d.mts so TypeKey/movementTypes cover the runtime `jump` entry. |

### `module/config/skill.d.mts`
| member | axis | fix |
|---|---|---|
| Skill.Config | coverage | Add `pace?: { advantage?: Set<dnd5e.types.TravelPace.TypeKey>; disadvantage?: Set<dnd5e.types.TravelPace.TypeKey> };` to the Config interface. |

### `module/config/spellcasting.d.mts`
| member | axis | fix |
|---|---|---|
| DND5EConfig.spellProgression | correctness | Type the value as an object record, e.g. `{ label: string; divisor?: number; roundUp?: boolean; type?: Spellcasting.Method.TypeKey }` (reusing ProgressionConfig & { type? }), instead of `string`. |

### `module/config/transformation.d.mts`
| member | axis | fix |
|---|---|---|
| Transformation.PresetConfig.settings | fidelity | Replace `settings: unknown` with `settings: Partial<dnd5e.types.defs.data.settings.TransformationSettingData>;` |

### `module/data/abstract/system-data-model.d.mts`
| member | axis | fix |
|---|---|---|
| ItemDataModel | coverage | Add the missing ItemDataModel instance getters/methods and the two statics to the ItemDataModel class declaration mirroring item-data-model.mjs. |
| ActorDataModel | coverage | Add groupSection, transferDestinations getters and _prepareScaleValues/recoverCombatUses methods to the ActorDataModel declaration. |

### `module/data/activity/base-activity.d.mts`
| member | axis | fix |
|---|---|---|
| createInitialActivity / transform* statics | coverage | Add the static signatures to BaseActivityData, e.g. `static createInitialActivity(source: object, options?: { offset?: number }): void;` and `static transformTypeData(source: object, activityData: object, options: object): object;` plus the sibling transform* statics (transformActivationData/ConsumptionData/DamagePartData/DescriptionData/DurationData/EffectsData/RangeData/TargetData/UsesData). |
| getDamageConfig / _processDamagePart / prepareDamageLabel | coverage | Declare on BaseActivityData: `getDamageConfig(config?: Partial<dnd5e.types.Dice.DamageRollProcessConfiguration>, options?: { formulaOptions?: object; rollData?: dnd5e.types.defs.documents.ActivityRollData }): dnd5e.types.Dice.DamageRollProcessConfiguration;`, `prepareDamageLabel(rollData: dnd5e.types.defs.documents.ActivityRollData): void;`, and protected `_processDamagePart(...): dnd5e.types.Dice.DamageRollConfiguration;`. |
| scaling/visibility getters | coverage | Add the getters to BaseActivityData: `get canConfigureScaling(): boolean;`, `get canScale(): boolean;`, `get canScaleDamage(): boolean;`, `get isRider(): boolean;`, `get isScaledScroll(): boolean;`, `get requiresConcentration(): boolean;`, `get requiresSpellSlot(): boolean;`, `get spellcastingAbility(): dnd5e.types.Ability.TypeKey \| null;`, `get applicableEffects(): ActiveEffect.Implementation[] \| null;`, `get activationLabels(): object \| null;`. |

### `module/data/activity/fields/consumption-targets-field.d.mts`
| member | axis | fix |
|---|---|---|
| ConsumptionError | coverage | Add `class ConsumptionError extends Error {}` to the dnd5e.types.fields namespace (or export it alongside). |
| ConsumptionTargetsField | coverage | Declare `class ConsumptionTargetsField extends foundry.data.fields.ArrayField<EmbeddedDataField<typeof ConsumptionTargetData>> { constructor(options?: ...); }` instead of a bare type alias. |
| ConsumptionTargetData | coverage | Add all runtime getters/methods/statics with their JSDoc-typed signatures (get activity/actor/combatOnly/item/validTargets; consume, _usesConsumption, getConsumptionLabels, _resolveHintCost, hasZeroCost, resolveCost, resolveLevel, _resolveScaledRoll; statics consumeActivityUses/Attribute/HitDice/ItemUses/Material/SpellSlots, consumptionLabels*, validAttributeTargets/validHitDiceTargets/validItemUsesTargets/validMaterialTargets/validSpellSlotsTargets). |

### `module/data/activity/order-data.d.mts`
| member | axis | fix |
|---|---|---|
| Schema | correctness | Replace MergeSchemas<BaseSchema, {...}> with an explicit object literal schema of only _id, type, name, img, order matching the runtime defineSchema (order-data.mjs:16-26), which does NOT spread super.defineSchema(). |

### `module/data/actor/group.d.mts`
| member | axis | fix |
|---|---|---|
| TravelPaceKey | fidelity | type TravelPaceKey = dnd5e.types.TravelPace.TypeKey; (delete the `= string` fallback). Consumed by TravelSchema.pace (line 23) and TravelPaceDescriptor.pace.value (line 170). |

### `module/data/actor/npc.d.mts`
| member | axis | fix |
|---|---|---|
| recoverCombatUses | coverage | Add `recoverCombatUses(periods: dnd5e.types.LimitedUsePeriod.TypeKey[], results: object): Promise<void>;` to the NPCData class. |

### `module/data/actor/templates/_fields.d.mts`
| member | axis | fix |
|---|---|---|
| dnd5e.types.Actor.Attributes.CreatureSchema | coverage | Add `attunement.value: foundry.data.fields.NumberField<{ integer: true; min: 0; initial: 0 }>` to the attunement SchemaField; add a `spell: foundry.data.fields.SchemaField<{ attack: foundry.data.fields.NumberField<{ integer: true }>; dc: foundry.data.fields.NumberField<{ integer: true }>; mod: foundry.data.fields.NumberField<{ integer: true }> }>`; and add `loyalty: foundry.data.fields.SchemaField<{ value: foundry.data.fields.NumberField<{ integer: true; min: 0; max: 20 }> }>`. |
| dnd5e.types.Actor.Details.CreatureSchema | coverage | Add `level: foundry.data.fields.NumberField<{ integer: true; min: 0; initial: 0 }>;` to Details.CreatureSchema. |

### `module/data/actor/vehicle.d.mts`
| member | axis | fix |
|---|---|---|
| TravelTypeKey | shortcut | Replace line 265 with `type TravelTypeKey = dnd5e.types.TravelType.TypeKey;` and delete the redundant local `Travel` namespace (lines 257-262). |

### `module/data/advancement/item-grant-data.d.mts`
| member | axis | fix |
|---|---|---|
| ItemGrant.ValueSchema (added) | correctness | Model `added` as an object map (id -> uuid), e.g. a TypedObjectField/ObjectField of Record<string,string>, not an ArrayField of {document,uuid} SchemaFields. |
| ItemGrant.ValueSchema (ability) | coverage | Add `ability: foundry.data.fields.StringField` to ValueSchema. |

### `module/data/advancement/scale-value-data.d.mts`
| member | axis | fix |
|---|---|---|
| ScaleValueType / ScaleValueTypeNumber / ScaleValueTypeCR / ScaleValueTypeDice / ScaleValueTypeDistance / ScaleValueTypeUsage | coverage | Declare the ScaleValueType base class and its five subclasses (Number/CR/Dice/Distance/Usage) with their schemas, static metadata, convertFrom/getFields/getPlaceholder statics and formula/display/die/mods/denom/toString getters, and export them; surface them in the _api scaleValue namespace. |
| TYPES | coverage | Add `export const TYPES: { string: typeof ScaleValueType; number: typeof ScaleValueTypeNumber; cr: typeof ScaleValueTypeCR; dice: typeof ScaleValueTypeDice; distance: typeof ScaleValueTypeDistance; usage: typeof ScaleValueTypeUsage };` once the classes are declared. |

### `module/data/advancement/size-data.d.mts`
| member | axis | fix |
|---|---|---|
| BaseSizeValueData / Size.ValueSchema.size | correctness | Change the size field options to { required: false; blank: true } to match runtime new StringField({ required: false }) (StringField defaults blank:true, required defaults false). |

### `module/data/advancement/spell-config.d.mts`
| member | axis | fix |
|---|---|---|
| applySpellChanges | coverage | Add `applySpellChanges(itemData: object, config?: { ability?: string }): void;` to the class. |

### `module/data/chat-message/fields/deltas-field.d.mts`
| member | axis | fix |
|---|---|---|
| ActorDeltasField.DeltaDisplayContext.rolls | correctness | Change `rolls?: foundry.dice.Roll[];` to `rolls?: Array<{ roll: foundry.dice.Roll; anchor: string }>;` |

### `module/data/fields/activities-field.d.mts`
| member | axis | fix |
|---|---|---|
| ActivitiesField | coverage | Add a module-scoped value class mirroring advancement-collection-field.d.mts: `declare class ActivitiesField extends foundry.data.fields.ObjectField<dnd5e.types.fields.MappingField.DefaultOptions, Record<string, dnd5e.types.fields.RegistrySource<dnd5e.types.Activity.Types>>, Record<string, dnd5e.types.fields.RegistryInstance<dnd5e.types.Activity.Types>>, Record<string, dnd5e.types.fields.RegistrySource<dnd5e.types.Activity.Types>>> {} export { ActivitiesField };` and surface it in dnd5e.dataModels.fields. |

### `module/data/fields/advancement-collection-field.d.mts`
| member | axis | fix |
|---|---|---|
| AdvancementCollectionField | correctness | Set the InitializedType (3rd ObjectField type param on line 22) to `dnd5e.types.Advancement.Collection` so reading `system.advancement` yields the Collection with `.get`/`.map`/`.toObject`. The alias on line 9 resolves to `dnd5e.types.Advancement.Field` (= the registry's `TypedCollectionField`) whose InitializedType is `Record<id, RegistryInstance>`; overlay it (e.g. intersection or a dedicated read-type override) rather than re-spelling, since line 9 is what actually types `system.advancement` via `templates/advancement.d.mts`. |

### `module/data/fields/mapping-field.d.mts`
| member | axis | fix |
|---|---|---|
| MappingField | shortcut | Change heritage (both the type alias and the value class) to extend foundry.data.fields.TypedObjectField<Element, Options, ...> instead of ObjectField directly. |
| model | coverage | Add `model: Element;` to the declared value-class body (it mirrors `this.model = this.element`). |
| constructor | coverage | Declare `constructor(model: Element, options?: Options, context?: foundry.data.fields.DataField.ConstructionContext);` (after switching the parent to TypedObjectField, whose constructor is element-first). |

### `module/data/item/consumable.d.mts`
| member | axis | fix |
|---|---|---|
| ConsumableData.Derived / dnd5e.types.Item.Consumable.DerivedData | coverage | Add a DerivedData overlay that intersects the initialized schema `type` with `{ label: string }` and feed it into Derived, e.g. `interface DerivedDefault { type: dnd5e.types.InitializedOf<ConsumableData.Schema>["type"] & { label: string } }` then `type Derived = MergeData<DerivedDefault, OverrideDerived>` (mirroring weapon.d.mts:155-161 / equipment.d.mts:65-76). |

### `module/data/item/fields/item-type-field.d.mts`
| member | axis | fix |
|---|---|---|
| <file> | coverage | Add `export default ItemTypeField;` after line 28. |

### `module/data/item/fields/spellcasting-field.d.mts`
| member | axis | fix |
|---|---|---|
| SpellcastingField.prepareData | coverage | Add the static to the declare class body, e.g. `static prepareData(this: dnd5e.types.Item.SystemData, rollData: dnd5e.types.Item.RollData): void;` (exact `this`/rollData type to match ItemDataModel + ItemRollData). |

### `module/data/item/subclass.d.mts`
| member | axis | fix |
|---|---|---|
| SubclassData.Derived | coverage | Add a DerivedData interface mirroring ClassData's spellcasting overlay (spellcasting.type: Spellcasting.Method.TypeKey; slots; levels/attack/save: number; preparation.value/max: number) and set Derived = MergeData<DerivedData, OverrideDerived>. Note subclass has no own `levels` schema field, but prepareData still assigns spellcasting.levels via fallback to parent class. |

### `module/data/item/templates/equippable-item.d.mts`
| member | axis | fix |
|---|---|---|
| compendiumBrowserAttunementFilter | coverage | Add `static get compendiumBrowserAttunementFilter(): dnd5e.types.defs.applications.CompendiumBrowserFilterDefinitionEntry;` to the EquippableItemTemplate class body. |

### `module/data/item/templates/item-description.d.mts`
| member | axis | fix |
|---|---|---|
| compendiumBrowserPropertiesFilter | coverage | Add `static compendiumBrowserPropertiesFilter(type: string): dnd5e.types.defs.applications.CompendiumBrowserFilterDefinitionEntry;` to the class body. |

### `module/data/item/templates/starting-equipment.d.mts`
| member | axis | fix |
|---|---|---|
| EquipmentEntrySchema.type | fidelity | Type as `dnd5e.types.fields.RestrictedStringField<"OR"\|"AND"\|"armor"\|"tool"\|"weapon"\|"focus"\|"currency"\|"linked", { required: true; initial: "OR" }>`. |

### `module/data/item/tool.d.mts`
| member | axis | fix |
|---|---|---|
| ToolData.Derived | correctness | Add a DerivedDefault interface { type: dnd5e.types.InitializedOf<ToolData.Schema>["type"] & { label: string; identifier: string } } and make Derived = MergeData<DerivedDefault, OverrideDerived>, mirroring weapon.d.mts. |

### `module/data/journal/rule.d.mts`
| member | axis | fix |
|---|---|---|
| BaseSchema.type | fidelity | type: dnd5e.types.fields.RestrictedStringField<dnd5e.types.RuleType.TypeKey, { required: true; blank: false; initial: "rule" }>; |

### `module/data/region-behavior/rotate-area.d.mts`
| member | axis | fix |
|---|---|---|
| rotate | coverage | Add `rotate(reverse?: boolean): Promise<boolean>;` to the class body. |
| rotateTo | coverage | Add `rotateTo(options: { angle?: number; position?: number }): Promise<boolean \| void>;` to the class body. |
| updateRotatateArea | coverage | Add `updateRotatateArea(changes: object, options: object): Promise<void>;` to the class body (keep the runtime misspelling). |

### `module/data/shared/source-field.d.mts`
| member | axis | fix |
|---|---|---|
| SourceField.prepareData | coverage | Add `static prepareData(this: dnd5e.types.fields.SourceField.SourceData, uuid: string): void;` to the class body. |
| SourceField.getPackage | coverage | Add `static getPackage(uuidOrCollection: CompendiumCollection \| string): foundry.packages.BasePackage \| null;` to the class body (verify the exact ClientPackage/CompendiumCollection type names against fvtt-types). |
| SourceField.getModuleBook | coverage | Add `static getModuleBook(pkg: foundry.packages.BasePackage \| null): string \| null;` to the class body (use the same ClientPackage type returned by getPackage for consistency). |

### `module/data/shared/uses-field.d.mts`
| member | axis | fix |
|---|---|---|
| UsesField.recoveryOptions | coverage | Add `static recoveryOptions(item: Item.Implementation, value: string): foundry.applications.fields.FormSelectOption[] \| null;` to the class body. |
| UsesField.rechargeOptions | coverage | Add `static get rechargeOptions(): foundry.applications.fields.FormSelectOption[];` to the class body. |
| UsesField.recoverUses | coverage | Add `static recoverUses(this: ItemDataModel \| BaseActivityData, periods: Map<dnd5e.types.LimitedUsePeriod.TypeKey, number>, rollData?: object): Promise<{ updates: object; rolls: dnd5e.types.Dice.BasicRoll[] } \| false>;`. |
| UsesField.rollRecharge | coverage | Add `static rollRecharge(this: Item.Implementation \| dnd5e.types.Activity.Instance, config?: object, dialog?: object, message?: object): Promise<dnd5e.types.Dice.BasicRoll[] \| { rolls: dnd5e.types.Dice.BasicRoll[]; updates: object } \| void>;`. |

### `_gen/applications/activity/_types.d.mts`
| member | axis | fix |
|---|---|---|
| ActivityChoiceDialogContext.icon | correctness | Replace `icon: { src: string; svg: boolean }` with `img: string` in `ActivityChoiceDialogContext`. The runtime `_prepareActivityContext` at line 113-114 returns `{ id, name, img, sort }` — a flat `img: string` field. The upstream JSDoc typedef in `_types.mjs` is stale/wrong; the generated interface faithfully mirrors the stale JSDoc but diverges from the actual runtime shape. |

### `_gen/applications/components/_types.d.mts`
| member | axis | fix |
|---|---|---|
| ItemListComparator5e | coverage | Add `type ItemListComparator5e = (a: globalThis.Item.Implementation, b: globalThis.Item.Implementation) => number;` inside the `dnd5e.types.defs.applications.components` namespace in src/_gen/applications/components/_types.d.mts. |

### `_gen/core/_types.d.mts`
| member | axis | fix |
|---|---|---|
| TraitConfiguration.dataType | correctness | Change `dataType?: boolean\|number;` to `dataType?: typeof MappingField \| NumberConstructor;` (using whatever the project's field reference is — `dnd5e.types.fields.MappingField` or an import — plus `NumberConstructor`). The JSDoc in `_types.mjs` line 601 is wrong; it should be corrected to `{typeof MappingField \| NumberConstructor}` so the generator re-emits the correct type. |

### `_gen/data/abstract/_types.d.mts`
| member | axis | fix |
|---|---|---|
| ChatMessageDataModelMetadata.actions | correctness | Change type to `Record<string, foundry.applications.api.ApplicationV2.ClickAction \| { handler: foundry.applications.api.ApplicationV2.ClickAction; buttons: number[] }>` |

### `_gen/data/activity/_types.d.mts`
| member | axis | fix |
|---|---|---|
| ActivityData.activation | correctness | Change `activation: { override: boolean }` to `activation: dnd5e.types.defs.data.shared.ActivationData & { override: boolean }` |
| ActivityData.duration | correctness | Change `duration: { concentration: boolean; override: boolean }` to `duration: dnd5e.types.defs.data.shared.DurationData & { concentration: boolean; override: boolean }` |
| ActivityData.range | correctness | Change `range: { override: boolean }` to `range: dnd5e.types.defs.data.shared.RangeData & { override: boolean }` |
| ActivityData.target | correctness | Change `target: { override: boolean; prompt: boolean }` to `target: dnd5e.types.defs.data.shared.TargetData & { override: boolean; prompt: boolean }` |

### `_gen/data/actor/templates/_types.d.mts`
| member | axis | fix |
|---|---|---|
| AttributesCommonData.init | correctness | Change the inline `init` type to `dnd5e.types.defs.data.shared.RollConfigData & { ability: dnd5e.types.Ability.TypeKey \| ""; bonus: string }` — the field is constructed via `new RollConfigField(...)` which always injects the `roll: { min, max, mode }` sub-object, confirmed by `init.roll.mode` usage at attributes.mjs:479 and `{RollConfigData} init` in the JSDoc. |
| AttributesCreatureData.concentration | correctness | Change the inline `concentration` type to `dnd5e.types.defs.data.shared.RollConfigData & { ability: dnd5e.types.Ability.TypeKey \| ""; bonuses: { save: string }; limit: number }` — the field is constructed via `new RollConfigField(...)` at attributes.mjs:124 which always injects the `roll: { min, max, mode }` sub-object. |

### `_gen/data/chatMessage/_types.d.mts`
| member | axis | fix |
|---|---|---|
| TurnMessageSystemData.periods | correctness | Rename the property from `periods` to `trigger: Set<string>` to match the runtime schema key defined in turn-message-data.mjs:31. |
| UsageMessageSystemData | coverage | Add `concentration?: string \| null; scaling?: number; spellLevel?: number;` to the `UsageMessageSystemData` interface. |
| UsageMessageSystemData.deltas | correctness | Change the type to `dnd5e.types.defs.data.chatMessage.fields.ActorDeltasData \| null`. |

### `_gen/data/fields/_types.d.mts`
| member | axis | fix |
|---|---|---|
| IdentifierFieldOptions.allowType | correctness | Change `allowType?: string[]` to `allowType?: boolean` |

### `_gen/data/item/_types.d.mts`
| member | axis | fix |
|---|---|---|
| ConsumableItemSystemData.uses | correctness | Change the `uses` type to `dnd5e.types.defs.data.shared.UsesData & { autoDestroy: boolean }` — the runtime UsesField prepends `spent`, `max`, and `recovery` before merging the extra `autoDestroy` field, and the JSDoc @typedef at _types.mjs:34 reads `@property {UsesData} uses` with `uses.autoDestroy` as an addendum. |
| WeaponItemSystemData.damage.bonus | coverage | Add `bonus: string;` to the `WeaponItemSystemData.damage` object type. |

### `_gen/data/item/fields/_types.d.mts`
| member | axis | fix |
|---|---|---|
| ItemTypeData | coverage | Add the three fields inside `interface ItemTypeData {}`: `value: string; subtype: string; baseItem: string;` |

### `_gen/data/regionBehavior/_types.d.mts`
| member | axis | fix |
|---|---|---|
| RotateAreaRegionBehaviorSystemData.walls | correctness | Change `walls: { link: boolean }` to `walls: RotateAreaDocumentLinks & { link: boolean }`. The runtime `defineSchema()` (rotate-area.mjs lines 38-41) defines `walls` as a `SchemaField` containing both `ids: SetField<DocumentIdField>` and `link: BooleanField`. The JSDoc in `_types.mjs` line 26 annotates it as `{RotateAreaDocumentLinks} walls`, making the `ids` property part of the declared shape. The generator dropped the base type reference and kept only the extra `link` annotation. |

### `_gen/data/shared/_types.d.mts`
| member | axis | fix |
|---|---|---|
| ActivationData.type | fidelity | type: dnd5e.types.ActivityActivationType.TypeKey; |
| CreatureTypeData.value | fidelity | value: dnd5e.types.Creature.TypeKey \| "custom"; |
| CreatureTypeData.swarm | fidelity | swarm: dnd5e.types.ActorSize.TypeKey \| ""; |
| CurrencyTemplateData.currency | fidelity | currency: Record<dnd5e.types.Currency.TypeKey, number>; |
| DamageData.types | fidelity | types: Set<dnd5e.types.Damage.TypeKey>; |
| DamageData.scaling.mode | fidelity | mode: dnd5e.types.DamageScalingMode.TypeKey; |
| DurationData.units | fidelity | units: dnd5e.types.TimePeriod.TypeKey; |
| MovementData.units | fidelity | units: dnd5e.types.MovementUnit.TypeKey; |
| MovementData.ignoredDifficultTerrain | fidelity | ignoredDifficultTerrain: Set<dnd5e.types.DifficultTerrain.TypeKey>; |
| RangeData.units | fidelity | units: dnd5e.types.DistanceUnit.TypeKey; |
| RollConfigData.roll.mode | fidelity | mode: dnd5e.types.AdvantageMode; |
| SensesData.ranges | fidelity | ranges: Record<dnd5e.types.Senses.TypeKey, number>; |
| TargetData.template.type | fidelity | type: dnd5e.types.AreaTargetType.TypeKey; |
| TargetData.affects.type | fidelity | type: dnd5e.types.IndividualTargetType.TypeKey; |
| UsesRecoveryData.period | fidelity | period: dnd5e.types.LimitedUsePeriod.TypeKey \| "recharge"; |
| UsesRecoveryData.type | fidelity | type: "recoverAll" \| "loseAll" \| "formula"; |

### `_gen/data/user/_types.d.mts`
| member | axis | fix |
|---|---|---|
| TabPreferences5e.group | correctness | Change `group?: boolean;` to `group?: string;` in `TabPreferences5e`. |

### `_gen/documents/_types.d.mts`
| member | axis | fix |
|---|---|---|
| ItemContentsTransformer | coverage | Add `type ItemContentsTransformer = (item: globalThis.Item.Implementation \| object, options: { container: string; depth: number }) => globalThis.Item.Implementation \| object \| void;` to the dnd5e.types.defs.documents namespace. The @callback is defined in _types.mjs line 88-94 and referenced in item.mjs lines 1293-1294 as the type for context.transformAll and context.transformFirst parameters. |
| DamageApplicationOptions.ignore | correctness | Change `ignore?: { immunity?: boolean\|Set<string>; resistance?: boolean\|Set<string>; vulnerability?: boolean\|Set<string>; modification?: boolean\|Set<string>; threshold?: boolean; };` to `ignore?: boolean \| { immunity?: boolean\|Set<string>; resistance?: boolean\|Set<string>; vulnerability?: boolean\|Set<string>; modification?: boolean\|Set<string>; threshold?: boolean; };` |

### `_gen/documents/advancement/_types.d.mts`
| member | axis | fix |
|---|---|---|
| AdvancementMetadata.configuration / AdvancementMetadata.value (top-level) | correctness | Remove the top-level `configuration` and `value` lines from `AdvancementMetadata` (lines 20-21). The correct representation is already present: they belong only inside the `dataModels?` nested object (lines 14-19). The runtime JSDoc's ambiguous `@property` indentation caused the generator to emit them twice — once correctly nested and once incorrectly as top-level fields. Runtime access is always `this.metadata.dataModels?.configuration` and `this.metadata.dataModels?.value`. |

### `module/_api.d.mts`
| member | axis | fix |
|---|---|---|
| dnd5e.canvas.TokenLayer5e | correctness | Move `const TokenLayer5e` into a `namespace layers { }` sub-namespace inside `namespace canvas { }`, matching the runtime shape `canvas.layers.TokenLayer5e` (the canvas `_module.mjs` re-exports the layers directory as `export * as layers from "./layers/_module.mjs"`). |

### `module/_api/dataModels-advancement.d.mts`
| member | axis | fix |
|---|---|---|
| dnd5e.dataModels.advancement (AbilityScoreImprovementConfigurationData, AbilityScoreImprovementValueData, ItemChoiceConfigurationData, ItemChoiceValueData, ModifyItemConfigurationData, ModifyItemValueData, SizeConfigurationData, SizeValueData, TraitConfigurationData, TraitValueData, SubclassValueData) | shortcut | Add const+type pairs for each missing runtime export inside the dnd5e.dataModels.advancement namespace, referencing the already-typed src classes. For example: `const AbilityScoreImprovementConfigurationData: typeof import('../data/advancement/ability-score-improvement-data.mjs').BaseAbilityScoreImprovementConfigData;` and `type AbilityScoreImprovementConfigurationData = import('../data/advancement/ability-score-improvement-data.mjs').BaseAbilityScoreImprovementConfigData;`, repeated for all six modules' exports (ability-score-improvement-data, item-choice-data, modify-item-data, size-data, trait-data, subclass-data). The src counterpart declarations already exist in their respective .d.mts files. |

### `module/_api/dataModels-fields.d.mts`
| member | axis | fix |
|---|---|---|
| ActivitiesField | coverage | Add `const ActivitiesField: typeof import('../data/fields/activities-field.mjs').ActivitiesField; type ActivitiesField = dnd5e.types.fields.ActivitiesField;` to the `dnd5e.dataModels.fields` namespace, or add it to the OMITTED comment if intentionally excluded. Note: since `activities-field.d.mts` only exposes a type alias (no runtime constructor shim), a const would need a shim — at minimum add to OMITTED. |

### `module/_api/dataModels-item.d.mts`
| member | axis | fix |
|---|---|---|
| BackgroundData, ClassData, ConsumableData, ContainerData, EquipmentData, FacilityData, FeatData, LootData, RaceData, SpellData, SubclassData, ToolData, WeaponData | coverage | Add `const BackgroundData: typeof import('../data/item/background.mjs').default; type BackgroundData = import('../data/item/background.mjs').default;` (and equivalents for all 13 models) inside `namespace dnd5e.dataModels.item`, mirroring the pattern used for templates in the same file. |
| config | coverage | Add `const config: { background: typeof import('../data/item/background.mjs').default; class: typeof import('../data/item/class.mjs').default; consumable: typeof import('../data/item/consumable.mjs').default; container: typeof import('../data/item/container.mjs').default; equipment: typeof import('../data/item/equipment.mjs').default; facility: typeof import('../data/item/facility.mjs').default; feat: typeof import('../data/item/feat.mjs').default; loot: typeof import('../data/item/loot.mjs').default; race: typeof import('../data/item/race.mjs').default; spell: typeof import('../data/item/spell.mjs').default; subclass: typeof import('../data/item/subclass.mjs').default; tool: typeof import('../data/item/tool.mjs').default; weapon: typeof import('../data/item/weapon.mjs').default; };` inside `namespace dnd5e.dataModels.item`. |

### `module/_api/documents-activity.d.mts`
| member | axis | fix |
|---|---|---|
| EnchantmentError | coverage | Declare `export class EnchantmentError extends Error { name: 'EnchantmentError'; }` in `src/documents/activity/enchant.d.mts`, then add `const EnchantmentError: typeof import('../../documents/activity/enchant.mjs').EnchantmentError; type EnchantmentError = import('../../documents/activity/enchant.mjs').EnchantmentError;` to the `dnd5e.documents.activity` namespace in this file. |

### `module/_api/documents-advancement.d.mts`
| member | axis | fix |
|---|---|---|
| Advancement | coverage | Port src/documents/advancement/advancement.d.mts (the base class wrapping PseudoDocumentMixin(BaseAdvancementData)) and then add `const Advancement` / `type Advancement` to the dnd5e.documents.advancement namespace, mirroring the other members. |
| HitPointsAdvancement | coverage | Port src/documents/advancement/hit-points.d.mts and then add `const HitPointsAdvancement` / `type HitPointsAdvancement` to the dnd5e.documents.advancement namespace, matching the pattern of all other members. |

### `module/applications/activity/activity-usage-dialog.d.mts`
| member | axis | fix |
|---|---|---|
| create | correctness | Change return type to `Promise<dnd5e.types.defs.documents.activity.ActivityUseConfiguration>` — remove `\| null`. The runtime (line 556) calls `reject()` on cancel, never `resolve(null)`, so the null arm is unreachable and misleads callers. |

### `module/applications/activity/forward-sheet.d.mts`
| member | axis | fix |
|---|---|---|
| ForwardSheet.RenderContext#behaviorFields | correctness | Change `behaviorFields: foundry.data.fields.DataField.Any[]` to `behaviorFields: { field: foundry.data.fields.DataField.Any; value: unknown; input: Function }[]` — matching the shape pushed at activity-sheet.mjs:342-346 and already used in the sibling cast-sheet.d.mts:22. |

### `module/applications/actor/api/base-config-sheet.d.mts`
| member | axis | fix |
|---|---|---|
| _prepareField | correctness | Remove the `_prepareField` declaration entirely from the class body — it has no counterpart anywhere in the runtime source. |

### `module/applications/actor/config/armor-class-config.d.mts`
| member | axis | fix |
|---|---|---|
| RenderContext.limitFields[].options | correctness | Change the `options` field type to `Array<{ value: null \| boolean; label: string }>` to match the runtime shape at lines 140-144. |

### `module/applications/actor/config/initiative-config.d.mts`
| member | axis | fix |
|---|---|---|
| get title | coverage | Add `get title(): string;` inside the `declare class InitiativeConfig` body, matching the pattern in death-config.d.mts. |

### `module/applications/actor/group-sheet.d.mts`
| member | axis | fix |
|---|---|---|
| _prepareHeaderContext | coverage | Add `protected _prepareHeaderContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;` to the GroupActorSheet class body. |
| _prepareMembersContext | coverage | Add `protected _prepareMembersContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;` to the GroupActorSheet class body. |
| _prepareMemberEncumbrance | coverage | Add `protected _prepareMemberEncumbrance(actor: globalThis.Actor.Implementation, context: object): Promise<void>;` to the GroupActorSheet class body. |
| _prepareMemberSkills | coverage | Add `protected _prepareMemberSkills(actor: globalThis.Actor.Implementation, context: object): void;` to the GroupActorSheet class body. |
| _prepareCharacterContext | coverage | Add `protected _prepareCharacterContext(actor: globalThis.Actor.Implementation, context: object, options: RenderOptions): Promise<void>;` to the GroupActorSheet class body. |
| _prepareNPCContext | coverage | Add `protected _prepareNPCContext(actor: globalThis.Actor.Implementation, context: object, options: RenderOptions): Promise<void>;` to the GroupActorSheet class body. |
| _prepareVehicleContext | coverage | Add `protected _prepareVehicleContext(actor: globalThis.Actor.Implementation, context: object, options: RenderOptions): Promise<void>;` to the GroupActorSheet class body. |

### `module/applications/actor/rest/base-rest-dialog.d.mts`
| member | axis | fix |
|---|---|---|
| BaseRestDialog.Configuration | correctness | Add `config: dnd5e.types.defs.documents.RestConfiguration; document: Actor.Implementation;` to `interface Configuration extends Dialog5e.Configuration`. |

### `module/applications/actor/rest/short-rest-dialog.d.mts`
| member | axis | fix |
|---|---|---|
| RenderContext.hitDice | correctness | Mark the property optional: `hitDice?: { canRoll: boolean; denomination?: string; options: (foundry.applications.fields.FormSelectOption & { number?: number })[]; };` |

### `module/applications/advancement/advancement-config.d.mts`
| member | axis | fix |
|---|---|---|
| getData | coverage | Add: getData(): { appId: string; CONFIG: object; src: object; source: object; default: { title: string; icon: string; hint: string }; levels: Record<number, number \| string>; classRestrictionOptions: { value: '' \| 'primary' \| 'secondary'; label: string }[]; showClassRestrictions: boolean; showLevelSelector: boolean }; |
| _onDrop | coverage | Add: protected _onDrop(event: DragEvent): Promise<void>; |

### `module/applications/advancement/advancement-flow-v2.d.mts`
| member | axis | fix |
|---|---|---|
| Configuration | coverage | Add `document: dnd5e.types.Advancement.Instance \| null; level: number \| null;` to `AdvancementFlow.Configuration`. |

### `module/applications/advancement/advancement-flow.d.mts`
| member | axis | fix |
|---|---|---|
| options / Options interface | seam | Add `interface Options extends foundry.appv1.api.FormApplication.Options { manager?: AdvancementManager.Any; }` inside `namespace AdvancementFlow`, and change the class generic from `foundry.appv1.api.FormApplication.Options` to `AdvancementFlow.Options` so that `this.options.manager` is reachable by TypeScript consumers. |

### `module/applications/advancement/item-grant-config.d.mts`
| member | axis | fix |
|---|---|---|
| RenderContext.items[].fields | correctness | Change `fields: foundry.data.fields.DataField.Any;` to `fields: foundry.data.fields.DataSchema;` in the `items[]` element shape. |

### `module/applications/advancement/item-grant-flow.d.mts`
| member | axis | fix |
|---|---|---|
| getData | coverage | Add `getData(options?: Partial<foundry.appv1.api.FormApplication.Options>): Promise<{ appId: string; advancement: Document \| null; type: string; title: string; hint: string; summary: string; level: number; optional: boolean; items: object[]; abilities: ReturnType<ItemGrantFlow['getSelectAbilities']> }>;` to the class body. |

### `module/applications/advancement/subclass-flow.d.mts`
| member | axis | fix |
|---|---|---|
| SubclassFlow.RenderContext.subclass | correctness | Change to `subclass: globalThis.Item.OfType<"subclass"> \| null;` |

### `module/applications/api/application-v2-mixin.d.mts`
| member | axis | fix |
|---|---|---|
| ApplicationV2Mixin | correctness | Add `options?: { handlebars?: boolean }` as a second parameter. Note: when `handlebars: false`, the return type should omit the HandlebarsApplicationMixin wrapping — consider two overloads or a conditional return type. |

### `module/applications/api/dialog.d.mts`
| member | axis | fix |
|---|---|---|
| RenderContext.buttons | correctness | Change `buttons: Button[];` to `buttons?: Button[];` in `Dialog5e.RenderContext`. |
| Button.type | coverage | Add `type?: HTMLButtonElement["type"];` to `Dialog5e.Button`. |

### `module/applications/api/primary-sheet-mixin.d.mts`
| member | axis | fix |
|---|---|---|
| PrimarySheetMixin.RenderContext.mode | correctness | Remove `mode: ModeValue \| null` from `PrimarySheetMixin.RenderContext`. The sheet mode is stored on the instance field `_mode`, not passed into render context — `_prepareContext` (line 163-169 of the runtime) only sets `owner`, `locked`, `editable`, and `tabs`. |
| PrimarySheetMixin.RenderContext.filters | correctness | Remove `filters: Record<string, FilterState>` from `PrimarySheetMixin.RenderContext`. Filter data lives on the instance field `_filters`, which is correctly typed separately — it is never injected into the render context. |

### `module/applications/award.d.mts`
| member | axis | fix |
|---|---|---|
| parseAwardCommand | correctness | Change the `currency` field in the `parseAwardCommand` return type to `Record<dnd5e.types.Currency.TypeKey, string>`. The function stores raw regex-capture strings (`currency[label] = amount` at runtime line 418), not evaluated numbers. Numbers only appear after `handleAward` calls `roll.evaluate()` and reassigns `currency[key] = roll.total`. The JSDoc on the runtime method also incorrectly documents this as `Record<string, number>`, but the actual returned values are formula strings. |

### `module/applications/chat-log.d.mts`
| member | axis | fix |
|---|---|---|
| updateMessage | coverage | Add `override updateMessage(message: ChatMessage.Implementation, notify?: boolean): Promise<void>;` inside the `declare class ChatLog5e` body. |

### `module/applications/combat/combat-tracker.d.mts`
| member | axis | fix |
|---|---|---|
| _prepareTrackerContext | coverage | Add: protected override _prepareTrackerContext(context: foundry.applications.sidebar.tabs.CombatTracker.RenderContext, options: foundry.applications.sidebar.tabs.CombatTracker.RenderOptions): Promise<foundry.applications.sidebar.tabs.CombatTracker.TrackerContext \| void>; |

### `module/applications/compendium-browser.d.mts`
| member | axis | fix |
|---|---|---|
| CompendiumBrowser.TABS | coverage | Add `static TABS: CompendiumBrowser.TabDescriptor[];` to the `declare class CompendiumBrowser` body. |

### `module/applications/components/adopted-stylesheet-mixin.d.mts`
| member | axis | fix |
|---|---|---|
| AdoptedStyleSheetMixin | correctness | Change `TBase extends fvttUtils.AnyConstructor` to `TBase extends typeof HTMLElement` in the function signature, matching the runtime JSDoc `@param {typeof HTMLElement} Base` and the sibling `TargetedApplicationMixin` declaration. |
| _getStyleSheet | correctness | Change return type to `CSSStyleSheet \| undefined`. |

### `module/applications/components/chat-tray-element.d.mts`
| member | axis | fix |
|---|---|---|
| ChatTrayElement (namespace) | seam | Add `declare namespace ChatTrayElement { interface Any extends ChatTrayElement {} interface AnyConstructor extends fvttUtils.Identity<typeof ChatTrayElement> {} }` before the export, matching the pattern used by every other component in this directory (EffectsElement, SlideToggleElement, etc.). |

### `module/applications/components/damage-application.d.mts`
| member | axis | fix |
|---|---|---|
| calculateDamage | correctness | Change the return type's `active` to `{ modification: Set<string>; resistance: Set<string>; vulnerability: Set<string>; immunity: Set<string>; threshold: boolean }` |

### `module/applications/components/effects.d.mts`
| member | axis | fix |
|---|---|---|
| _getContextOptions | correctness | Change return type to an inline shape matching the runtime: `{ label: string; icon?: string; group?: string; visible?: () => boolean; onClick: (event: Event, target: HTMLElement) => unknown }[]`. Alternatively declare `ContextMenu5e.Entry` in context-menu.d.mts and use that here. |

### `module/applications/components/targeted-application-mixin.d.mts`
| member | axis | fix |
|---|---|---|
| disconnectedCallback | coverage | Add `disconnectedCallback(): void;` to the `TargetedApplicationElement` declare class body (after `targetSourceControl` and before the rendering methods). |

### `module/applications/context-menu.d.mts`
| member | axis | fix |
|---|---|---|
| ContextMenu5e | seam | Add `declare namespace ContextMenu5e { interface Any extends ContextMenu5e {} interface AnyConstructor extends fvttUtils.Identity<typeof ContextMenu5e> {} }` after the class declaration. |

### `module/applications/create-document-dialog.d.mts`
| member | axis | fix |
|---|---|---|
| Configuration | coverage | Add the custom DEFAULT_OPTIONS fields to `interface Configuration extends Dialog5e.Configuration { documentType?: typeof foundry.abstract.Document \| object \| null; createData?: object; createOptions?: object; folders?: foundry.abstract.Document.DialogFoldersChoices[] \| null; types?: string[] \| null; }` |

### `module/applications/dice/d20-configuration-dialog.d.mts`
| member | axis | fix |
|---|---|---|
| Configuration | coverage | Add `defaultButton?: 'advantage' \| 'normal' \| 'disadvantage';` to the `interface Configuration extends RollConfigurationDialog.Configuration {}` body in the D20RollConfigurationDialog namespace. |

### `module/applications/dice/roll-configuration-dialog.d.mts`
| member | axis | fix |
|---|---|---|
| RenderContext.buttons | correctness | Add `buttons: Record<string, Dialog5e.Button>` to `RollConfigurationDialog.RenderContext` to override the inherited `Button[]` array type. |

### `module/applications/item/config/starting-equipment-config.d.mts`
| member | axis | fix |
|---|---|---|
| _prepareContext | coverage | Add `protected _prepareContext(options: RenderOptions): Promise<RenderContext>;` to the class body. |
| _processSubmitData | coverage | Add `protected _processSubmitData(event: Event \| SubmitEvent, form: HTMLFormElement, submitData: object): Promise<void>;` to the class body. |

### `module/applications/item/item-compendium.d.mts`
| member | axis | fix |
|---|---|---|
| ItemCompendium5e (namespace) | seam | Add `declare namespace ItemCompendium5e { interface Any extends ItemCompendium5e {} interface AnyConstructor extends fvttUtils.Identity<typeof ItemCompendium5e> {} }` after the class declaration. |

### `module/applications/item/item-directory.d.mts`
| member | axis | fix |
|---|---|---|
| _handleDroppedEntry | coverage | Add `protected _handleDroppedEntry(target: HTMLElement, data: any, event: DragEvent): Promise<void>;` to the class body. |
| _onClickEntry | coverage | Add `protected _onClickEntry(event: Event, target: HTMLElement): Promise<void>;` to the class body. |

### `module/applications/item/item-sheet.d.mts`
| member | axis | fix |
|---|---|---|
| Configuration | correctness | Add `legacyDisplay?: boolean;` to the `ItemSheet5e.Configuration` interface. |

### `module/applications/item/split-stack-dialog.d.mts`
| member | axis | fix |
|---|---|---|
| SplitStackDialog.Configuration.document | coverage | Add `document: Item.Implementation \| null;` to `interface SplitStackDialog.Configuration extends Dialog5e.Configuration`. |

### `module/applications/journal/map-page-sheet.d.mts`
| member | axis | fix |
|---|---|---|
| JournalMapLocationPageSheet | seam | Declare the class as `declare class JournalMapLocationPageSheet<RenderContext extends JournalMapLocationPageSheet.RenderContext = JournalMapLocationPageSheet.RenderContext, Configuration extends JournalMapLocationPageSheet.Configuration = JournalMapLocationPageSheet.Configuration, RenderOptions extends JournalMapLocationPageSheet.RenderOptions = JournalMapLocationPageSheet.RenderOptions> extends foundry.applications.sheets.journal.JournalEntryPageProseMirrorSheet<RenderContext, Configuration, RenderOptions>` |
| JournalMapLocationPageSheet.RenderContext | seam | Add `interface RenderContext extends foundry.applications.sheets.journal.JournalEntryPageProseMirrorSheet.RenderContext {}`, `interface Configuration extends foundry.applications.sheets.journal.JournalEntryPageProseMirrorSheet.Configuration {}`, and `interface RenderOptions extends foundry.applications.sheets.journal.JournalEntryPageProseMirrorSheet.RenderOptions {}` to the namespace. |

### `module/applications/journal/spells-page-sheet.d.mts`
| member | axis | fix |
|---|---|---|
| JournalSpellListPageSheet | seam | Make the class generic over RenderContext/Configuration/RenderOptions defaulting to namespace interfaces, and add open `interface RenderContext`, `interface Configuration`, `interface RenderOptions` declarations in the namespace (extending the corresponding Handlebars base interfaces). Mirrors JournalRulePageSheet pattern. |
| _onDrop | coverage | Add `protected _onDrop(event: DragEvent): Promise<false \| undefined>;` to the class body. |

### `module/applications/journal/spells-unlinked-config.d.mts`
| member | axis | fix |
|---|---|---|
| RenderContext (unlinked spell spread fields) | coverage | Add the spread unlinked spell fields to RenderContext as optional properties, since `find()` can return `undefined` and the spread of `undefined` would add nothing. For example: `_id?: string; identifier?: object; name?: string; system?: { level: number; school: string }; source?: object;`. Alternatively, intersect with `Partial<foundry.data.fields.SchemaField.InnerInitializedType<SpellListJournalPageData.BaseSchema['unlinkedSpells']['element']['fields']>>` if the schema type resolution is tractable. |

### `module/applications/roll-table-sheet.d.mts`
| member | axis | fix |
|---|---|---|
| RollTableSheet5e | correctness | Add a `handlebars: false` overload to `ApplicationV2Mixin` in application-v2-mixin.d.mts that returns a non-Handlebars type (omitting PARTS, _renderParts, and other HandlebarsApplicationMixin-exclusive members), then update the extends clause to `ApplicationV2Mixin(foundry.applications.sheets.RollTableSheet, { handlebars: false })`. |

### `module/applications/settings/compendium-browser-settings.d.mts`
| member | axis | fix |
|---|---|---|
| PackConfig.tag | coverage | Add `tag: string;` to the `PackConfig` interface. |

### `module/applications/shared/movement-senses-config.d.mts`
| member | axis | fix |
|---|---|---|
| Configuration | coverage | Add `type: 'movement' \| 'senses' \| null; keyPath: string \| null;` to `interface Configuration<Document>` in the namespace. |

### `module/canvas/ability-template.d.mts`
| member | axis | fix |
|---|---|---|
| fromActivity | correctness | Change return type to `AbilityTemplate[] \| null`. |
| activity | coverage | Add `activity: dnd5e.types.Activity.Instance;` as a public instance property. |
| item | coverage | Add `item: Item.Implementation;` as a public instance property. |
| actorSheet | coverage | Add `actorSheet: globalThis.Actor.Implementation['sheet'] \| null;` as a public instance property. |
| activatePreviewListeners | correctness | Change return type to `Promise<StoredDocument<MeasuredTemplateDocument>[]>`. |

### `module/canvas/api/base-placement.d.mts`
| member | axis | fix |
|---|---|---|
| constructor | correctness | Change `constructor(config?: Configuration)` to `constructor(config: Configuration)` |
| BasePlacement | correctness | Change `declare class BasePlacement` to `declare abstract class BasePlacement` and change `protected _place(): Promise<PlacementData[]>` to `protected abstract _place(): Promise<PlacementData[]>` |

### `module/canvas/note.d.mts`
| member | axis | fix |
|---|---|---|
| _drawControlIcon | correctness | Change `protected _drawControlIcon()` to `protected override _drawControlIcon()`. |

### `module/dice/basic-die.d.mts`
| member | axis | fix |
|---|---|---|
| advantage | correctness | Change `advantage(modifier: string): Promise<false \| void>;` to `advantage(modifier: string): Promise<void>;` |

### `module/dice/basic-roll.d.mts`
| member | axis | fix |
|---|---|---|
| constructParts | correctness | Change return type from `string[]` to `{ parts: string[]; data: object }`. |
| preCalculateTerm | correctness | Change return type from `{ min: number; max: number } \| null` to `number \| null`. |
| preCalculateDiceTerms | correctness | Change return type from `Array<{ min: number; max: number }>` to `void`. |
| invert | correctness | Change return type from `void` to `this`. |
| buildEvaluate | correctness | Change return type from `Promise<BasicRoll[]>` to `Promise<void>`. |

### `module/dice/d20-roll.d.mts`
| member | axis | fix |
|---|---|---|
| d20 (setter) | coverage | Add `set d20(die: import('./d20-die.mjs').default): void;` alongside the existing getter declaration. |

### `module/registry.d.mts`
| member | axis | fix |
|---|---|---|
| SpellList.getSpells | correctness | Change return type to `Promise<globalThis.Item.Implementation[]>` |