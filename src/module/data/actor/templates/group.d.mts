/**
 * A template for all actors that contain collections of other actors.
 *
 * Like CommonTemplate, the schema is composed from the mixed-in `CurrencyTemplate` (via
 * `GetSchema`, i.e. its mirrored `defineSchema()` return) plus this template's own
 * `description` SchemaField, then has the Seam-D `OverrideSchema` folded in. The template is
 * abstract (the `getMembers`/`getPlaceableMembers` methods are abstract at runtime) and is the
 * shared parent of the concrete `group` and `encounter` actor subtypes.
 */

import ActorDataModel from "../../abstract/actor-data-model.mjs";
import CurrencyTemplate from "../../shared/currency.mjs";

declare global {
  namespace dnd5e.types.Actor.Group {
    /** Pre-Seam-D source schema: mixed currency + own `description`. */
    type BaseSchema = dnd5e.types.MergeSchemas<
      dnd5e.types.GetSchema<typeof CurrencyTemplate>,
      {
        description: foundry.data.fields.SchemaField<{
          full: foundry.data.fields.HTMLField;
          summary: foundry.data.fields.HTMLField;
        }>;
      }
    >;
  }

  namespace dnd5e.types.DataModelConfig.Actor.group_template {
    /** Seam D: downstream merges SOURCE fields here. */
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    /** Seam D: downstream merges prepareBaseData-derived props here. */
    interface OverrideBase extends fvttUtils.AnyObject {}
    /** Seam D: downstream merges prepareDerivedData-derived props here. */
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

/**
 * A template for all actors that contain collections of other actors.
 * @mixes CurrencyTemplate
 * @mixin
 */
export declare class GroupTemplate<
  Schema extends foundry.data.fields.DataSchema = GroupTemplate.Schema,
  BaseData extends fvttUtils.AnyObject = GroupTemplate.BaseData,
  DerivedData extends fvttUtils.AnyObject = GroupTemplate.DerivedData,
> extends ActorDataModel<Schema, BaseData, DerivedData> {
  static override defineSchema(): GroupTemplate.Schema;

  /** Whether this Actor type represents a collection of multiple creatures. */
  get isGroup(): true;

  /** Resolve the actors in this group and return them alongside any associated data. */
  getMembers(): Promise<Array<{ actor: Actor.Implementation; [p: string]: any }>>;
  /** Resolve actors in this group so that they may be placed on the canvas. */
  getPlaceableMembers(): Promise<Array<{ actor: Actor.Implementation; [p: string]: any }>>;
  /** Place all members in the group on the current scene and return the associated token documents. */
  placeMembers(): Promise<TokenDocument.Implementation[]>;
}

export declare namespace GroupTemplate {
  type Schema = dnd5e.types.MergeSchemas<
    dnd5e.types.Actor.Group.BaseSchema,
    dnd5e.types.DataModelConfig.Actor.group_template.OverrideSchema
  >;
  type BaseData = dnd5e.types.DataModelConfig.Actor.group_template.OverrideBase;
  type DerivedData = dnd5e.types.DataModelConfig.Actor.group_template.OverrideDerived;
}
