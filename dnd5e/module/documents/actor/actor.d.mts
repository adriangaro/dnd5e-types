import type TransformationSetting from "@dnd5e/module/data/settings/transformation-setting.mjs";
import SkillToolRollConfigurationDialog from "../../applications/dice/skill-tool-configuration-dialog.mjs";
import { type AttributionDescription } from "../../applications/property-attribution.mjs";
import SystemDocumentMixin from "../mixins/document.mjs";
import SelectChoices from "./select-choices.mjs";
import type { CreatureTemplate } from "@dnd5e/module/data/actor/_module.mjs";
import type CreatureTypeField from "@dnd5e/module/data/shared/creature-type-field.mjs";


/**
 * Extend the base Actor class to implement additional system-specific logic.
 */
declare class Actor5e<
  SubType extends Actor.SubType = Actor.SubType
> extends SystemDocumentMixin(Actor)<
  SubType
> {
  type: SubType
  system: Actor.SystemOfType<SubType> & dnd5e.types.CreateParentLink<this>

  /**
   * Lazily computed store of classes, subclasses, background, and species.
   */
  _lazy: Record<string, Record<string, Item.Implementation | Item.Implementation[]>>;

  /**
   * Mapping of item compendium source UUIDs to the items.
   */
  sourcedItems: SourcedItemsMap

  /* -------------------------------------------- */

  /**
   * Types that can be selected within the compendium browser.
   * @param options
   * @param options.chosen  Types that have been selected.
   */
  static compendiumBrowserTypes(
    options?: { chosen?: Set<string> }
  ): SelectChoices<{
    [K in Actor.SubType]: { label: string, chosen: boolean }
  }>

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * A mapping of classes belonging to this Actor.
   */
  get classes(): Record<string, Item.OfType<'class'>>

  /* -------------------------------------------- */

  /**
   * Calculate the bonus from any cover the actor is affected by.
   */
  get coverBonus(): number

  /* -------------------------------------------- */

  /**
   * Get all classes which have spellcasting ability.
   */
  get spellcastingClasses(): Record<string, Item.OfType<'class'>>

  /* -------------------------------------------- */

  /**
   * A mapping of subclasses belonging to this Actor.
   */
  get subclasses(): Record<string, Item.OfType<'subclass'>>

  /* -------------------------------------------- */

  /**
   * Is this Actor currently polymorphed into some other creature?
   */
  get isPolymorphed(): boolean

  /* -------------------------------------------- */

  /**
   * The Actor's currently equipped armor, if any.
   */
  get armor(): Item.OfType<'equipment'> | null

  /* -------------------------------------------- */

  /**
   * The Actor's currently equipped shield, if any.
   */
  get shield(): Item.OfType<'equipment'> | null

  /* -------------------------------------------- */

  /**
   * The items this actor is concentrating on, and the relevant effects.
   */
  get concentration(): {
    items: Set<Item.Implementation>,
    effects: Set<ActiveEffect.Implementation>
  }

  /* -------------------------------------------- */

  /**
   * Creatures summoned by this actor.
   */
  get summonedCreatures(): Actor.Implementation[]

  /* -------------------------------------------- */
  
  /**
   * Apply package-provided art to a compendium Document.
   * @param source                  The Document's source data.
   * @param pack      The Document's compendium.
   * @param art          The art being applied.
   */
  static applyCompendiumArt(
    source: Actor.Implementation['_source'], 
    pack: foundry.documents.collections.CompendiumCollection<'Actor'>, 
    art: foundry.helpers.media.CompendiumArt.Info
  ): void;

  /* -------------------------------------------- */

  /* -------------------------------------------- */
  /*  Methods                                     */
  /* -------------------------------------------- */

  _preparationWarnings: any[]
  labels: Record<string, Record<string, string>>

  /**
   * Exists only during @see Actor5e['prepareEmbeddedDocuments']
   * @internal
   */
  _embeddedPreparation?: boolean;
  /**
   * Clear cached class collections.
   * @internal
   */
  _clearCachedValues()

  /* -------------------------------------------- */

  // /** @inheritDoc */
  allApplicableEffects(): Generator<ActiveEffect.OfType<Exclude<ActiveEffect.SubType, 'enchantment'>>>


  /* -------------------------------------------- */

  /**
   * Calculate the DC of a concentration save required for a given amount of damage.
   * @param damage  Amount of damage taken.
   * @returns        DC of the required concentration save.
   */
  getConcentrationDC(damage: number): number

  /* -------------------------------------------- */

  /**
   * Return the amount of experience required to gain a certain character level.
   * @param level  The desired level.
   * @returns      The XP required.
   */
  getLevelExp(level: number): number

  /* -------------------------------------------- */

  /**
   * Return the amount of experience granted by killing a creature of a certain CR.
   * @param cr  The creature's challenge rating.
   * @returns   The amount of experience granted per kill.
   */
  getCRExp(cr: null): null
  getCRExp(cr: number): number
  getCRExp(cr: number | null): number | null

  /* -------------------------------------------- */

  /**
   * @inheritdoc
   * @param options
   * @param options.deterministic Whether to force deterministic values for data properties that could be
   *                                          either a die term or a flat term.
   */
  getRollData(
    options?: { deterministic?: boolean }
  ): Actor5e.RollData<this>

  /* -------------------------------------------- */

  /**
   * Is this actor under the effect of this property from some status or due to its level of exhaustion?
   * @param key      A key in `DND5E.conditionEffects`.
   * @returns        Whether the actor is affected.
   */
  hasConditionEffect(key: string): boolean

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /**
   * Prepares data for a specific skill.
   * @param skillId    The id of the skill to prepare data for.
   * @param options  Additional options passed to {@link CreatureTemplate#prepareSkill}.
   * @returns {SkillData}
   * @internal
   */
  _prepareSkill(
    ...args: Parameters<CreatureTemplate['prepareSkill']>
  ): ReturnType<CreatureTemplate['prepareSkill']> | {}

  /* -------------------------------------------- */
  /*  Spellcasting Preparation                    */
  /* -------------------------------------------- */

  /**
   * Prepare data related to the spell-casting capabilities of the Actor.
   * Mutates the value of the system.spells object. Must be called after final item preparation.
   * @protected
   */
  _prepareSpellcasting()

  /* -------------------------------------------- */

  /**
   * Contribute to the actor's spellcasting progression.
   * @param progression                             Spellcasting progression data. *Will be mutated.*
   * @param cls                                     Class for whom this progression is being computed.
   * @param config
   * @param config.actor                   Actor for whom the data is being prepared.
   * @param config.spellcasting  Spellcasting descriptive object.
   * @param config.count                        Number of classes with this type of spellcasting.
   */
  static computeClassProgression(
    progression: Actor5e.SpellProgresionPrep,
    cls: Item.OfType<'class'>,
    config?: {
      actor?: Actor.Implementation,
      spellcasting?: dnd5e.documents.Item5e.SpellcastingDescription,
      count?: number
    }
  )

  /* -------------------------------------------- */

  /**
   * Contribute to the actor's spellcasting progression for a class with leveled spellcasting.
   * @param progression                    Spellcasting progression data. *Will be mutated.*
   * @param actor                         Actor for whom the data is being prepared, if any.
   * @param cls                            Class for whom this progression is being computed.
   * @param spellcasting  Spellcasting descriptive object.
   * @param count                          Number of classes with this type of spellcasting.
   */
  static computeLeveledProgression(
    progression: Actor5e.SpellProgresionPrep,
    actor: Actor.Implementation | void,
    cls: Item.OfType<'class'>,
    spellcasting: dnd5e.documents.Item5e.SpellcastingDescription,
    count: number
  )

  /* -------------------------------------------- */

  /**
   * Contribute to the actor's spellcasting progression for a class with pact spellcasting.
   * @param progression                    Spellcasting progression data. *Will be mutated.*
   * @param actor                         Actor for whom the data is being prepared, if any.
   * @param cls                            Class for whom this progression is being computed.
   * @param spellcasting  Spellcasting descriptive object.
   * @param count                          Number of classes with this type of spellcasting.
   */
  static computePactProgression(
    progression: Actor5e.SpellProgresionPrep,
    actor: Actor.Implementation | void,
    cls: Item.OfType<'class'>,
    spellcasting: dnd5e.documents.Item5e.SpellcastingDescription,
    count: number
  )

  /* -------------------------------------------- */

  /**
   * Prepare actor's spell slots using progression data.
   * @param spells           The `data.spells` object within actor's data. *Will be mutated.*
   * @param type             Type of spellcasting slots being prepared.
   * @param progression      Spellcasting progression data.
   * @param config
   * @param config.actor  Actor for whom the data is being prepared.
   */
  static prepareSpellcastingSlots(
    spells: dnd5e.types.GetTypeFromPath<Actor.Implementation, 'system.spells'>,
    type: dnd5e.types.Spellcasting.TypeKey,
    progression: Actor5e.SpellProgresionPrep,
    config: { actor: Actor.Implementation }
  )

  /* -------------------------------------------- */

  /**
   * Prepare leveled spell slots using progression data.
   * @param spells        The `data.spells` object within actor's data. *Will be mutated.*
   * @param actor        Actor for whom the data is being prepared, if any.
   * @param progression   Spellcasting progression data.
   */
  static prepareLeveledSlots(
    spells: dnd5e.types.GetTypeFromPath<Actor.Implementation, 'system.spells'>,
    actor: Actor.Implementation | void,
    progression: Actor5e.SpellProgresionPrep,
  )

  /* -------------------------------------------- */

  /**
   * Prepare non-leveled spell slots using progression data.
   * @param spells        The `data.spells` object within actor's data. *Will be mutated.*
   * @param actor        Actor for whom the data is being prepared, if any.
   * @param progression   Spellcasting progression data.
   * @param key           The internal key for these spell slots on the actor.
   * @param table         The table used for determining the progression of slots.
   */
  static prepareAltSlots(
    spells: dnd5e.types.GetTypeFromPath<Actor.Implementation, 'system.spells'>,
    actor: Actor.Implementation | void,
    progression: Actor5e.SpellProgresionPrep,
    key: string,
    table: object
  )

  /* -------------------------------------------- */

  /**
   * Convenience method for preparing pact slots specifically.
   * @param spells        The `data.spells` object within actor's data. *Will be mutated.*
   * @param actor        Actor for whom the data is being prepared, if any.
   * @param progression   Spellcasting progression data.
   */
  static preparePactSlots(
    spells: dnd5e.types.GetTypeFromPath<Actor.Implementation, 'system.spells'>,
    actor: Actor.Implementation | void,
    progression: Actor5e.SpellProgresionPrep,
  )

  /* -------------------------------------------- */
  /*  Event Handlers                              */
  /* -------------------------------------------- */

  /**
   * Assign a class item as the original class for the Actor based on which class has the most levels.
   * @returns Instance of the updated actor.
   * @protected
   */
  _assignPrimaryClass(): Promise<this>

  /* -------------------------------------------- */


  /**
   * Apply a certain amount of damage or healing to the health pool for Actor
   * @param damages     Damages to apply.
   * @param options  Damage application options.
   * @returns                      A Promise which resolves once the damage has been applied.
   */
  applyDamage(
    damages: Actor5e.DamageDescription[] | number,
    options?: Actor5e.DamageApplicationOptions
  ): Promise<this>

  /* -------------------------------------------- */

  /**
   * Calculate the damage that will be applied to this actor.
   * @param damages            Damages to calculate.
   * @param options  Damage calculation options.
   * @returns             New damage descriptions with changes applied, or `false` if the
   *                                                 calculation was canceled.
   */
  calculateDamage(
    damages: Actor5e.DamageDescription[],
    options?: Actor5e.DamageApplicationOptions
  ): Actor5e.DamageDescription[]
  /* -------------------------------------------- */

  /**
   * Apply a certain amount of temporary hit point, but only if it's more than the actor currently has.
   * @param amount       An amount of temporary hit points to set
   * @returns  A Promise which resolves once the temp HP has been applied
   */
  applyTempHP(amount?: number): Promise<this>

  /* -------------------------------------------- */

  /**
   * Get a color used to represent the current hit points of an Actor.
   * @param current        The current HP value
   * @param max            The maximum HP value
   * @returns                The color used to represent the HP percentage
   */
  static getHPColor(
    current: number,
    max: number
  ): Color

  /* -------------------------------------------- */

  /**
   * Initiate concentration on an item.
   * @param activity                  The activity on which to being concentration.
   * @param effectData                Effect data to merge into the created effect.
   * @returns     A promise that resolves to the created effect.
   */
  beginConcentrating(
    activity: dnd5e.types.Activity.Implementation,
    effectData?: fvttUtils.DeepPartial<ActiveEffect.CreateData>
  ): Promise<ActiveEffect.OfType<'base'> | undefined>

  /* -------------------------------------------- */

  /**
   * End concentration on an item.
   * @param target    An item or effect to end concentration on, or id of an effect.
   *                                                   If not provided, all maintained effects are removed.
   * @returns               A promise that resolves to the deleted effects.
   */
  endConcentration(
    target: Item.Implementation | ActiveEffect.OfType<'base'> | string
  ): Promise<ActiveEffect.OfType<'base'>[]>

  /* -------------------------------------------- */

  /**
   * Create a chat message for this actor with a prompt to challenge concentration.
   * @param options
   * @param options.dc         The target value of the saving throw.
   * @param options.ability    An ability to use instead of the default.
   * @returns     A promise that resolves to the created chat message.
   */
  challengeConcentration(
    options?: {
      dc?: number,
      ability?: dnd5e.types.Ability.TypeKey | null
    }
  ): Promise<ChatMessage.Implementation>

  /* -------------------------------------------- */

  /**
   * Determine whether the provided ability is usable for remarkable athlete.
   * @param ability  Ability type to check.
   * @returns        Whether the actor has the remarkable athlete flag and the ability is physical.
   * @private
   */
  _isRemarkableAthlete(ability: dnd5e.types.Ability.TypeKey): boolean
  /* -------------------------------------------- */
  /*  Rolling                                     */
  /* -------------------------------------------- */

  /**
   * Add the reduction to this roll from exhaustion if using the modern rules.
   * @param parts  Roll parts.
   * @param data     Roll data.
   */
  addRollExhaustion(parts: string[], data: Record<string, number>)

  /* -------------------------------------------- */

  /**
   * Roll an ability check with a skill.
   * @param config  Configuration information for the roll.
   * @param dialog   Configuration for the roll dialog.
   * @param message     Configuration for the roll message.
   * @returns                          A Promise which resolves to the created Roll instance.
   */
  rollSkill(
    config?: Partial<SkillToolRollConfigurationDialog.RollProcessConfiguration>,
    dialog?: Partial<SkillToolRollConfigurationDialog.RollDialogConfiguration>,
    message?: Partial<dnd5e.dice.D20Roll.MessageConfiguration>
  ): Promise<dnd5e.dice.D20Roll[] | null>

  /* -------------------------------------------- */

  /**
   * Roll an ability check with a tool.
   * @param config  Configuration information for the roll.
   * @param dialog   Configuration for the roll dialog.
   * @param message     Configuration for the roll message.
   * @returns                           A Promise which resolves to the created Roll instance.
   */
  rollToolCheck(
    config?: Partial<SkillToolRollConfigurationDialog.RollProcessConfiguration>,
    dialog?: Partial<SkillToolRollConfigurationDialog.RollDialogConfiguration>,
    message?: Partial<dnd5e.dice.D20Roll.MessageConfiguration>
  ): Promise<dnd5e.dice.D20Roll[] | null>

  /* -------------------------------------------- */


  /**
   * Shared rolling functionality between skill & tool checks.
   * @param type                                Type of roll.
   * @param config  Configuration information for the roll.
   * @param dialog   Configuration for the roll dialog.
   * @param message     Configuration for the roll message.
   * @returns                           A Promise which resolves to the created Roll instance.
   */
  #rollSkillTool(
    type: 'skill' | 'tool',
    config?: Partial<SkillToolRollConfigurationDialog.RollProcessConfiguration>,
    dialog?: Partial<SkillToolRollConfigurationDialog.RollDialogConfiguration>,
    message?: Partial<dnd5e.dice.D20Roll.MessageConfiguration>
  ): Promise<dnd5e.dice.D20Roll[] | null>

  /* -------------------------------------------- */

  /**
   * Configure a roll config for each roll performed as part of the skill or tool check process. Will be called once
   * per roll in the process each time an option is changed in the roll configuration interface.
   * @param type                          Type of roll.
   * @param process          Configuration for the entire rolling process.
   * @param config                  Configuration for a specific roll.
   * @param formData                  Any data entered into the rolling prompt.
   * @param index                                 Index of the roll within all rolls being prepared.
   */
  _buildSkillToolConfig(
    type: "skill" | "tool",
    process: dnd5e.dice.D20Roll.ProcessConfiguration,
    config: dnd5e.dice.D20Roll.Configuration,
    formData: foundry.applications.ux.FormDataExtended | null | undefined,
    index: number
  )

  /* -------------------------------------------- */

  /**
   * Roll a generic ability test or saving throw.
   * Prompt the user for input on which variety of roll they want to do.
   * @param config  Configuration information for the roll.
   * @param dialog     Configuration for the roll dialog.
   * @param message   Configuration for the roll message.
   */
  rollAbility(
    config?: Partial<Actor5e.AbilityRollProcessConfiguration>,
    dialog?: Partial<dnd5e.dice.BasicRoll.DialogConfiguration>,
    message?: Partial<dnd5e.dice.BasicRoll.MessageConfiguration>
  )
  /* -------------------------------------------- */

  /**
   * Roll an Ability Check.
   * @param config  Configuration information for the roll.
   * @param dialog     Configuration for the roll dialog.
   * @param message   Configuration for the roll message.
   * @returns                         A Promise which resolves to the created Roll instance.
   */
  rollAbilityCheck(
    config?: Partial<Actor5e.AbilityRollProcessConfiguration>,
    dialog?: Partial<dnd5e.dice.BasicRoll.DialogConfiguration>,
    message?: Partial<dnd5e.dice.BasicRoll.MessageConfiguration>
  ): Promise<dnd5e.dice.D20Roll[] | null>

  /* -------------------------------------------- */

  /**
   * Roll a Saving Throw.
   * @param config  Configuration information for the roll.
   * @param dialog     Configuration for the roll dialog.
   * @param message   Configuration for the roll message.
   * @returns                        A Promise which resolves to the created Roll instances.
   */
  rollSavingThrow(
    config?: Partial<Actor5e.AbilityRollProcessConfiguration>,
    dialog?: Partial<dnd5e.dice.BasicRoll.DialogConfiguration>,
    message?: Partial<dnd5e.dice.BasicRoll.MessageConfiguration>
  ): Promise<dnd5e.dice.D20Roll[] | null>

  /* -------------------------------------------- */

  /**
   * @typedef {D20RollProcessConfiguration} AbilityRollProcessConfiguration
   * @property {string} [ability]  ID of the ability to roll as found in `CONFIG.DND5E.abilities`.
   */

  /**
   * Shared rolling functionality between ability checks & saving throws.
   * @param type                     D20 test type.
   * @param config  Configuration information for the roll.
   * @param dialog     Configuration for the roll dialog.
   * @param message   Configuration for the roll message.
   * @returns              A Promise which resolves to the created Roll instance.
   */
  #rollD20Test(
    type: "check" | "save",
    config?: Partial<Actor5e.AbilityRollProcessConfiguration>,
    dialog?: Partial<dnd5e.dice.BasicRoll.DialogConfiguration>,
    message?: Partial<dnd5e.dice.BasicRoll.MessageConfiguration>
  ): Promise<dnd5e.dice.D20Roll[] | null>

  /* -------------------------------------------- */

  /**
   * Perform a death saving throw, rolling a d20 plus any global save bonuses.
   * @param config     Configuration information for the roll.
   * @param dialog    Configuration for the roll dialog.
   * @param message  Configuration for the roll message.
   * @returns                      A Promise which resolves to the Roll instance.
   */
  rollDeathSave(
    config?: Partial<dnd5e.dice.D20Roll.ProcessConfiguration>,
    dialog?: Partial<dnd5e.dice.BasicRoll.DialogConfiguration>,
    message?: Partial<dnd5e.dice.BasicRoll.MessageConfiguration>
  ): Promise<dnd5e.dice.D20Roll[] | null>

  /* -------------------------------------------- */

  /**
   * Perform a saving throw to maintain concentration.
   * @param {Partial<AbilityRollProcessConfiguration>} config  Configuration information for the roll.
   * @param {Partial<BasicRollDialogConfiguration>} dialog     Configuration for the roll dialog.
   * @param {Partial<BasicRollMessageConfiguration>} message   Configuration for the roll message.
   * @returns {Promise<D20Roll[]|null>}                        A Promise which resolves to the created Roll instance.
   */
  rollConcentration(
    config?: Partial<Actor5e.AbilityRollProcessConfiguration>,
    dialog?: Partial<dnd5e.dice.BasicRoll.DialogConfiguration>,
    message?: Partial<dnd5e.dice.BasicRoll.MessageConfiguration>
  ): Promise<dnd5e.dice.D20Roll[] | null>

  /* -------------------------------------------- */

  /**
   * Get an un-evaluated D20Roll instance used to roll initiative for this Actor.
   * @param  options  Configuration information for the roll.
   * @returns                           The constructed but unevaluated D20Roll.
   */
  getInitiativeRoll(
    options?: Partial<Actor5e.InitiativeRollOptions>
  ): dnd5e.dice.D20Roll | null

  /* -------------------------------------------- */

  /**
   * Get an un-evaluated D20Roll instance used to roll initiative for this Actor.
   * @param options  Configuration information for the roll.
   * @returns             Roll configuration.
   */
  getInitiativeRollConfig(
    options?: Partial<Actor5e.InitiativeRollOptions>
  ): dnd5e.dice.D20Roll.Configuration | null

  /* -------------------------------------------- */

  /**
   * Roll initiative for this Actor with a dialog that provides an opportunity to elect advantage or other bonuses.
   * @param rollOptions Options forwarded to the Actor#getInitiativeRoll method.
   * @returns           A promise which resolves once initiative has been rolled for the Actor.
   */
  rollInitiativeDialog(
    rollOptions?: Partial<Actor5e.InitiativeRollOptions>
  ): Promise<void>

  /* -------------------------------------------- */

  /** @inheritDoc */
  rollInitiative(
    options?: Partial<Actor.RollInitiativeOptions>,
    rollOptions?: Partial<Actor5e.InitiativeRollOptions>
  ): Promise<void> // TODO Promise<Combat.Implementation>
  /* -------------------------------------------- */

  /**
   * Roll a hit die of the appropriate type, gaining hit points equal to the die roll plus your CON modifier.
   * @param config  Configuration information for the roll.
   * @param dialog    Configuration for the roll dialog.
   * @param message  Configuration for the roll message.
   * @returns           The created Roll instances, or `null` if no hit die was rolled.
   */
  rollHitDie(
    config?: Actor5e.HitDiceRollProcessConfiguration,
    dialog?: dnd5e.dice.BasicRoll.DialogConfiguration,
    message?: dnd5e.dice.BasicRoll.MessageConfiguration,
  ): Promise<dnd5e.dice.BasicRoll[] | null>

  /* -------------------------------------------- */

  /**
   * Roll hit points for a specific class as part of a level-up workflow.
   * @param item                         The class item whose hit dice to roll.
   * @param options
   * @param options.chatMessage  Display the chat message for this roll.
   * @returns                     The completed roll.
   */
  rollClassHitPoints(
    item: Item.OfType<'class'>,
    options?: { chatMessage?: boolean }
  ): Promise<Roll>

  /* -------------------------------------------- */

  /**
   * Roll hit points for an NPC based on the HP formula.
   * @param options
   * @param options.chatMessage    Display the chat message for this roll.
   * @returns                      The completed roll.
   */
  rollNPCHitPoints(options?: { chatMessage?: boolean }): Promise<Roll>

  /* -------------------------------------------- */
  /*  Resting                                     */
  /* -------------------------------------------- */

  /**
   * Take a short rest, possibly spending hit dice and recovering resources, item uses, and relevant spell slots.
   * @param config  Configuration options for a short rest.
   * @returns       A Promise which resolves once the short rest workflow has completed.
   */
  shortRest(config?: Partial<Actor5e.RestConfiguration>): Promise<
    SubType extends 'vehicle' ? null : Actor5e.RestResult
  >

  /* -------------------------------------------- */

  /**
   * Take a long rest, recovering hit points, hit dice, resources, item uses, and spell slots.
   * @param config  Configuration options for a long rest.
   * @returns       A Promise which resolves once the long rest workflow has completed.
   */
  longRest(config?: Partial<Actor5e.RestConfiguration>): Promise<
    SubType extends 'vehicle' ? null : Actor5e.RestResult
  >

  /* -------------------------------------------- */

  /**
   * Perform all of the changes needed for a short or long rest.
   *
   * @param config  Configuration data for the rest occurring.
   * @param result  Results of the rest operation being built.
   * @returns       Consolidated results of the rest workflow.
   * @private
   */
  _rest(
    config: Actor5e.RestConfiguration,
    result?: Partial<Actor5e.RestResult>
  ): Promise<Actor5e.RestResult>

  /* -------------------------------------------- */

  /**
   * Display a chat message with the result of a rest.
   *
   * @param config  Rest configuration.
   * @param result  Result of the rest operation.
   * @returns       Chat message that was created.
   * @protected
   */
  _displayRestResultMessage(
    config: Actor5e.RestConfiguration,
    result: Actor5e.RestResult
  ): Promise<ChatMessage.Implementation>

  /* -------------------------------------------- */

  /**
   * Automatically spend hit dice to recover hit points up to a certain threshold.
   * @param options
   * @param options.threshold  A number of missing hit points which would trigger an automatic HD roll.
   * @returns                  Number of hit dice spent.
   */
  autoSpendHitDice(options?: { threshold?: number }): Promise<number>

  /* -------------------------------------------- */

  /**
   * Recovers class hit dice during a long rest.
   *
   * @param config
   * @param config.maxHitDice  Maximum number of hit dice to recover.
   * @param config.fraction    Fraction of max hit dice to recover. Used for NPC recovery and for PCs if
   *                                      `maxHitDice` isn't specified.
   * @param result     Rest result being constructed.
   * @protected
   */
  _getRestHitDiceRecovery(
    config?: Partial<{
      maxHitDice?: number,
      fraction?: number
    } & Actor5e.RestConfiguration>,
    result?: Partial<Actor5e.RestResult>
  )

  /* -------------------------------------------- */

  /**
   * Recovers actor hit points and eliminates any temp HP.
   * @param config
   * @param config.recoverTemp     Reset temp HP to zero.
   * @param config.recoverTempMax  Reset temp max HP to zero.
   * @param result                Rest result being constructed.
   * @protected
   */
  _getRestHitPointRecovery(
    config?: Partial<{
      recoverTemp?: boolean,
      recoverTempMax?: boolean
    } & Actor5e.RestConfiguration>,
    result?: Partial<Actor5e.RestResult>
  )

  /* -------------------------------------------- */

  /**
   * Recovers actor resources.
   * @param config
   * @param config.recoverShortRestResources  Recover resources that recharge on a short rest.
   * @param config.recoverLongRestResources   Recover resources that recharge on a long rest.
   * @param result                      Rest result being constructed.
   * @protected
   */
  _getRestResourceRecovery(
    config?: Partial<{
      recoverShortRestResources?: boolean,
      recoverLongRestResources?: boolean
    } & Actor5e.RestConfiguration>,
    result?: Partial<Actor5e.RestResult>
  )

  /* -------------------------------------------- */

  /**
   * Recovers expended spell slots.
   * @param config
   * @param config.recoverShort    Recover slots that return on short rests.
   * @param config.recoverLong     Recover slots that return on long rests.
   * @param result           Rest result being constructed.
   * @protected
   */
  _getRestSpellRecovery(
    config?: Partial<{
      recoverShort?: boolean,
      recoverLong?: boolean
    } & Actor5e.RestConfiguration>,
    result?: Partial<Actor5e.RestResult>
  )

  /* -------------------------------------------- */

  /**
   * Recovers item uses during short or long rests.
   * @param config
   * @param config.recoverShortRestUses  Recover uses for items that recharge after a short rest.
   * @param config.recoverLongRestUse    Recover uses for items that recharge after a long rest.
   * @param config.recoverDailyUses      Recover uses for items that recharge on a new day.
   * @param result                       Rest result being constructed.
   * @protected
   */
  _getRestItemUsesRecovery(
    config?: Partial<{
      recoverShortRestUses?: boolean,
      recoverLongRestUses?: boolean,
      recoverDailyUses?: boolean
    } & Actor5e.RestConfiguration>,
    result?: Partial<Actor5e.RestResult>
  ): Promise<void>

  /* -------------------------------------------- */
  /*  Property Attribution                        */
  /* -------------------------------------------- */

  /**
   * Format an HTML breakdown for a given property.
   * @param attribution      The property.
   * @param options
   * @param options.title  A title for the breakdown.
   * @returns 
   */
  getAttributionData(
    attribution: string, options?: { title?: string }
  ): Promise<string>

  /* -------------------------------------------- */

  /**
   * Prepare a movement breakdown.
   * @protected
   */
  _prepareMovementAttribution(): string

  /* -------------------------------------------- */

  /**
   * Prepare an AC breakdown.
   * @param options
   * @param options.title  A title for the breakdown.
   * @protected
   */
  _prepareArmorClassAttribution(options?: { title?: string }): Promise<string>

  /* -------------------------------------------- */

  /**
   * Break down all of the Active Effects affecting a given target property.
   * @param target               The data property being targeted.
   * @returns Any active effects that modify that property.
   * @protected
   */
  _prepareActiveEffectAttributions(target: string): AttributionDescription[]

  /* -------------------------------------------- */
  /*  Conversion & Transformation                 */
  /* -------------------------------------------- */

  /**
   * Fetch stats from the original actor for data preparation.
   */
  getOriginalStats(): {
    originalSaves: dnd5e.types.GetTypeFromPath<Actor.Implementation, 'system.abilities'> | null,
    originalSkills: dnd5e.types.GetTypeFromPath<Actor.Implementation, 'system.skills'> | null
  }

  /* -------------------------------------------- */



  /**
   * Transform this Actor into another one.
   *
   * @param source                       The actor being transformed into.
   * @param settings     Options that determine how the transformation is performed.
   * @param options
   * @param options.renderSheet        Render the sheet of the transformed actor after the polymorph.
   * @returns {Promise<Array<Token>>|null}         Updated token if the transformation was performed.
   */
  transformInto(
    source: Actor.Implementation, 
    settings?: TransformationSetting, 
    options?: { renderSheet?: boolean }
  ): Promise<Token.Implementation[] | null>

  /* -------------------------------------------- */

  /**
   * If this actor was transformed with transformTokens enabled, then its
   * active tokens need to be returned to their original state. If not, then
   * we can safely just delete this actor.
   * @param options
   * @param options.renderSheet  Render Sheet after revert the transformation.
   * @returns   Original actor if it was reverted.
   */
  revertOriginalForm(
    sheetOptions?: { renderSheet?: boolean }
  ): Promise<Actor.Implementation> | null

  /* -------------------------------------------- */

  /**
   * Add additional system-specific sidebar directory context menu options for Actor documents
   * @param app   The application being displayed.
   * @param entryOptions  The default array of context menu options
   */
  static addDirectoryContextOptions(
    app: foundry.applications.api.ApplicationV2,
    entryOptions: foundry.applications.ux.ContextMenu.Entry<HTMLElement>[]
  )

  /* -------------------------------------------- */

  /**
   * Add class to actor entry representing the primary group.
   */
  static onRenderActorDirectory(html: HTMLElement): void

  /* -------------------------------------------- */

  /**
   * Format a type object into a string.
   */
  static formatCreatureType(typeData: string | CreatureTypeField.InitializedType<{}>): string

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Flash ring & display changes to health as scrolling combat text.
   * @param changes          Object of changes to hit points.
   * @param changes.hp       Changes to `hp.value`.
   * @param changes.temp     The change to `hp.temp`.
   * @param changes.total    The total change to hit points.
   * @protected
   */
  _displayTokenEffect(changes: {
    hp: number,
    temp: number,
    total: number
  })

  /* -------------------------------------------- */

  /**
   * TODO: Perform this as part of Actor._preUpdateOperation instead when it becomes available in v12.
   * Handle syncing the Actor's exhaustion level with the ActiveEffect.
   * @param data                          The Actor's update delta.
   * @param options  Additional options supplied with the update.
   * @protected
   */
  _onUpdateExhaustion(
    data: object,
    options: object
  ): Promise<ActiveEffect.OfType<'base'> | void>
  /* -------------------------------------------- */

  /**
   * Handle applying/removing the bloodied status.
   * @param options  Additional options supplied with the update.
   */
  updateBloodied(
    options: object
  ): Promise<ActiveEffect.OfType<'base'> | void>

  /* -------------------------------------------- */

  /**
   * Handle applying/removing encumbrance statuses.
   * @param options  Additional options supplied with the update.
   */
  updateEncumbrance(
    options: object
  ): Promise<ActiveEffect.OfType<'base'> | void>

  /* -------------------------------------------- */

  /**
   * Handle clearing favorited entries that were deleted.
   * @param documents  The deleted Documents.
   * @protected
   */
  _clearFavorites(
    documents: foundry.abstract.Document.Any[]
  ): (
      dnd5e.types.GetKey<Actor.Implementation['system'], 'favorites'> extends never ?
      void :
      Promise<Actor.Implementation>
    )
}

declare namespace Actor5e {
  type Implementation<Type extends Actor.ConfiguredSubTypes = Actor.ConfiguredSubTypes> = ActorMap[Type]
  type ActorMap = {
    [K in Actor.ConfiguredSubTypes]: Actor.OfType<K>
  }

  type RollData<This extends Actor5e> = fvttUtils.InterfaceToObject<(
    dnd5e.types.GetKeyReturn<This['system'], 'getRollData'> extends never ?
    ReturnType<Actor['getRollData']> :
    dnd5e.types.GetKeyReturn<This['system'], 'getRollData'>
  ) & {
    flags: This['flags']
    name: This['name']
    statuses: {
      [K in dnd5e.types.Condition.TypeKey]: number
    } & {
      [k: string]: number
    }
  }>

  interface SpellProgresionPrep {
    slot: number,
    pact: number
  }

  /**
   * Description of a source of damage.
   */
  interface DamageDescription {
    value: number;
    type: dnd5e.types.Damage.TypeKey | dnd5e.types.Healing.TypeKey;
    properties: Set<dnd5e.types.Damage.Bypass>;
    active?: {
      multiplier?: number;
      modification?: boolean;
      resistance?: boolean;
      vulnerability?: boolean;
      immunity?: boolean;
    };
  }

  /**
   * Options for damage application.
   */
  interface DamageApplicationOptions {
    downgrade?: boolean | Set<dnd5e.types.Damage.TypeKey>;
    multiplier?: number;
    ignore?: boolean | Record<'immunity' | 'resistance' | 'vulnerability' | 'modification', boolean | Set<dnd5e.types.Damage.TypeKey | dnd5e.types.Healing.TypeKey>>;
    immunity?: boolean | Set<dnd5e.types.Damage.TypeKey>;
    resistance?: boolean | Set<dnd5e.types.Damage.TypeKey>;
    vulnerability?: boolean | Set<dnd5e.types.Damage.TypeKey>;
    modification?: boolean | Set<dnd5e.types.Damage.TypeKey>;
    invertHealing?: boolean;
    only?: keyof DamageApplicationRestriction;
  }

  interface DamageApplicationRestriction {
    damage: true,
    healing: true
  }

  interface AbilityRollProcessConfiguration extends dnd5e.dice.D20Roll.ProcessConfiguration {
    ability: dnd5e.types.Ability.TypeKey
  }

  interface InitiativeRollOptions extends dnd5e.dice.D20Roll.Options {
    advantageMode: dnd5e.dice.D20Roll.AdvantageMode
    fixed: string,
    flavor: string
  }

  interface HitDiceRollProcessConfiguration extends dnd5e.dice.BasicRoll.ProcessConfiguration {
    denomination?: string
    modifyHitDice?: boolean,
    modifyHitPoints?: boolean
  }
  /**
   * Configuration options for a rest.
   */
  interface RestConfiguration {
    type: string;
    dialog: boolean;
    chat: boolean;
    duration: number;
    newDay: boolean;
    advanceBastionTurn?: boolean;
    advanceTime?: boolean;
    autoHD?: boolean;
    autoHDThreshold?: number;
  }

  /**
   * Results from a rest operation.
   */
  interface RestResult {
    type: string;
    clone: Actor.Implementation;
    deltas: {
      hitPoints: number;
      hitDice: number;
    };
    newDay: boolean;
    rolls: Roll[];
    updateData: object;
    updateItems: object[];
  }

  /**
   * Options that determine what properties of the original actor are kept and which are replaced with
   * the target actor.
   */
  interface TransformationOptions {
    keepPhysical?: boolean;
    keepMental?: boolean;
    keepSaves?: boolean;
    keepSkills?: boolean;
    mergeSaves?: boolean;
    mergeSkills?: boolean;
    keepClass?: boolean;
    keepFeats?: boolean;
    keepSpells?: boolean;
    keepItems?: boolean;
    keepBio?: boolean;
    keepVision?: boolean;
    keepSelf?: boolean;
    keepAE?: boolean;
    keepOriginAE?: boolean;
    keepOtherOriginAE?: boolean;
    keepSpellAE?: boolean;
    keepFeatAE?: boolean;
    keepEquipmentAE?: boolean;
    keepClassAE?: boolean;
    keepBackgroundAE?: boolean;
    keepHP?: boolean;
    keepType?: boolean;
    addTemp?: boolean;
    transformTokens?: boolean;
    preset?: string;
  }

  interface DND5eFlags {
  }

  interface DND5eFlags extends fvttUtils.Identity<{
    [K in dnd5e.types.CharacterFlags.Keys]?: dnd5e.types.CharacterFlags.Flags[K]
  } & {
    [K in dnd5e.types.CharacterFlags.AllowedKeys]?: dnd5e.types.CharacterFlags.AllowedFlags[K]
  }> {}
}


export default Actor5e

declare global {
  namespace dnd5e.types {
    namespace CharacterFlags {
      interface DefaultFlags extends Record<string, boolean | number | string> {
        diamondSoul: boolean
        enhancedDualWielding: boolean
        elvenAccuracy: boolean
        halflingLucky: boolean
        initiativeAdv: boolean
        initiativeAlert: boolean
        jackOfAllTrades: boolean
        observantFeat: boolean
        tavernBrawlerFeat: boolean
        powerfulBuild: boolean
        reliableTalent: boolean
        remarkableAthlete: boolean
        weaponCriticalThreshold: number
        spellCriticalThreshold: number
        meleeCriticalDamageDice: number
      }

      /**
       * Override interface for declaration merging.
       * Add custom spell levels (e.g., for epic levels) here.
       * @example
       * declare global {
       * namespace dnd5e.types.Spellcasting.School {
       * interface OverrideTypes {
       * 'psionics': true
       * }
       * }
       * }
       */
      interface OverrideFlags extends Record<string, boolean | number | string | never> { }

      // --- Derived Types ---
      type Flags = dnd5e.types.MergeOverrideDefinition<
        DefaultFlags,
        OverrideFlags
      >;
      type Keys = dnd5e.types.ExtractKeys<Flags>;

      interface DefaultAllowedFlags extends Record<string, any> {
        isPolymorphed: boolean
        originalActor: Actor.Implementation
      }

      /**
       * Override interface for declaration merging.
       * Add custom spell levels (e.g., for epic levels) here.
       * @example
       * declare global {
       * namespace dnd5e.types.Spellcasting.School {
       * interface OverrideTypes {
       * 'psionics': true
       * }
       * }
       * }
       */
      interface OverrideAllowedFlags extends Record<string, any | never> { }

      // --- Derived Types ---
      type AllowedFlags = dnd5e.types.MergeOverrideDefinition<
        DefaultAllowedFlags,
        OverrideAllowedFlags
      >;
      type AllowedKeys = dnd5e.types.ExtractKeys<AllowedFlags>;


      /* -------------------------------------------- */
      interface CharacterFlagConfig<Type extends boolean | string | number> {
        name: string;
        hint: string;
        section: string;
        type: Type extends boolean ? typeof Boolean : Type extends string ? typeof String : Type extends number ? typeof Number : unknown;
        placeholder?: Type;
        abilities?: dnd5e.types.Ability.TypeKey[];
        choices?: Record<string, string>;
        skills?: dnd5e.types.Skill.TypeKey[];
      }

    }

    interface DND5EConfig {
      /**
       * Special character flags.
       */
      characterFlags: {
        [K in CharacterFlags.Keys]: CharacterFlags.CharacterFlagConfig<CharacterFlags.Flags[K]>
      }

      /**
       * Flags allowed on actors. Any flags not in the list may be deleted during a migration.
       */
      allowedActorFlags: (CharacterFlags.AllowedKeys | CharacterFlags.Keys)[]
    }
  }

}

declare module "fvtt-types/configuration" {
  namespace Actor.Database {
    interface UpdateOperation {
      isRest?: boolean
    }
  } 
  interface DocumentClassConfig {
    Actor: typeof Actor5e<Actor.SubType>
  }

  interface ConfiguredActor<SubType extends Actor.SubType> {
    document: SubType extends unknown ? Actor5e<SubType> : never;
  }

  namespace FlagConfig {
    interface Actor {
      dnd5e: Actor5e.DND5eFlags
    }
  }

  interface FlagConfig {
    Actor: FlagConfig.Actor
  }
}

/* -------------------------------------------- */

/**
 * @extends {Map<string, Set<Item5e>>}
 */
declare class SourcedItemsMap extends Map<string, Actor.Implementation> {
  /** @inheritDoc */
  // @ts-expect-error
  override get(
    key: null | undefined,
    options?: {
      remap?: boolean,
    }
  ): Promise<undefined>
  // @ts-expect-error
  override get(
    key: string | null | undefined,
    options?: {
      remap?: boolean,
    }
  ): Promise<Actor.Implementation | undefined>

  /* -------------------------------------------- */

  /**
   * Adjust keys once compendium UUID redirects have been initialized.
   */
  _redirectKeys()
}