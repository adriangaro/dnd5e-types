/**
 * Abstract base class to add some shared functionality to all of the system's custom active effect types.
 *
 * The runtime extends
 * `foundry.data.ActiveEffectTypeDataModel`, which the current fvtt-types does not expose, so we model
 * it on `foundry.abstract.TypeDataModel` with the parent pinned to the configured `ActiveEffect`
 * document (each concrete effect subtype is its document's registered `.system`).
 *
 * Author-facing generic order is `<Schema, BaseData, DerivedData>` (Parent is pinned here).
 */

type _DataSchema = foundry.data.fields.DataSchema;

export default class ActiveEffectDataModel<
  Schema extends _DataSchema = fvttUtils.EmptyObject,
  BaseData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  DerivedData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
> extends foundry.abstract.TypeDataModel<Schema, ActiveEffect.Implementation, BaseData, DerivedData> {
  /** Actor within which this effect is embedded, if any. */
  get actor(): Actor.Implementation | void;
  /** Document type to which this active effect should apply its changes. */
  get applicableType(): string;
  /**
   * Should this status effect be hidden from the current user? Concealed effects are still applied, but won't be
   * visible on the actor's token or in the effects list on sheets.
   */
  get isConcealed(): boolean;
  /** Item within which this effect is contained, if any. */
  get item(): Item.Implementation | void;

  /** Add modifications to the core ActiveEffect config. */
  onRenderActiveEffectConfig(app: foundry.applications.sheets.ActiveEffectConfig.Any, html: HTMLElement, context: foundry.applications.sheets.ActiveEffectConfig.RenderContext): void;
}

declare abstract class AnyActiveEffectDataModel extends ActiveEffectDataModel<any, any, any> {
  constructor(...args: any[]);
}

declare namespace ActiveEffectDataModel {
  interface Any extends AnyActiveEffectDataModel {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyActiveEffectDataModel> {}
}
