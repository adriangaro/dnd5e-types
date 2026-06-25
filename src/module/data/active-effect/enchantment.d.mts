/**
 * System data model for enchantment active effects.
 *
 * The dnd5e "enchantment" active-effect subtype (subtype "enchantment" of ActiveEffect).
 * Mirrors the simple document-subtype data-model pattern:
 *  - `extends ActiveEffectDataModel<Schema, Base, Derived>` (the abstract base pins the parent),
 *  - Seam-D `OverrideSchema`/`OverrideBase`/`OverrideDerived` folded at a single point,
 *  - Seam-C registration on `dnd5e.types.DataModelConfig.ActiveEffect` (read by the funnel).
 *
 * The runtime `defineSchema()` spreads `super.defineSchema()` (empty in the abstract base) and adds a
 * single `magical` BooleanField. `_applyLegacy` params/returns are typed loosely (depends on unported
 * activity/damage/change-data deps).
 */

import ActiveEffectDataModel from "../abstract/active-effect-data-model.mjs";

declare global {
  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the `enchantment` active-effect subtype on the interface the funnel reads. */
    interface ActiveEffect {
      enchantment: typeof import("./enchantment.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.ActiveEffect.enchantment {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

declare class EnchantmentData extends ActiveEffectDataModel<
  EnchantmentData.Schema,
  EnchantmentData.Base,
  EnchantmentData.Derived
> {
  static override LOCALIZATION_PREFIXES: string[];

  static override defineSchema(): EnchantmentData.Schema;

  /** @override */
  override get applicableType(): string;

  /** Has this enchantment been applied by another item, or was it directly created. */
  get isApplied(): boolean;

  /** Item containing this enchantment. */
  override get item(): Item.Implementation | void;

  /** @inheritDoc */
  prepareDerivedData(): void;

  /** Handle enchantment-specific changes to the item. */
  _applyLegacy(item: Item.Implementation, change: ActiveEffect.ChangeData, changes: Record<string, unknown>): boolean | void;

  /** @override */
  override onRenderActiveEffectConfig(app: foundry.applications.sheets.ActiveEffectConfig.Any, html: HTMLElement, context: foundry.applications.sheets.ActiveEffectConfig.RenderContext): void;

  /** @inheritDoc */
  protected override _preCreate(data: object, options: object, user: User.Implementation): Promise<boolean | void>;

  /** @inheritDoc */
  protected override _onCreate(data: object, options: object, userId: string): Promise<void>;

  /** @inheritDoc */
  protected override _onDelete(options: object, userId: string): void;

  /**
   * Can an active effect of this type be added to the provided document?
   * @param doc  Candidate document to which the active effect might be added.
   * @returns    Should this active effect be available?
   */
  static availableForItem(doc: Actor.Implementation | Item.Implementation): boolean;
}

declare namespace EnchantmentData {
  /** Pre-Seam-D source schema (enchantment.mjs `defineSchema`). */
  type BaseSchema = {
    magical: foundry.data.fields.BooleanField;
  };

  type Schema = dnd5e.types.MergeSchemas<
    BaseSchema,
    dnd5e.types.DataModelConfig.ActiveEffect.enchantment.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.ActiveEffect.enchantment.OverrideBase
  >;
  type Derived = dnd5e.types.MergeData<
    fvttUtils.EmptyObject,
    dnd5e.types.DataModelConfig.ActiveEffect.enchantment.OverrideDerived
  >;
}

export default EnchantmentData;
