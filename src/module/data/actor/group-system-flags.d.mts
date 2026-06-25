/**
 * A custom model to validate system flags on Group Actors.
 */

declare global {
  namespace dnd5e.types.Actor.Group {
    type GroupSystemFlagsSchema = {
      awardDestinations: foundry.data.fields.SetField<
        foundry.data.fields.DocumentIdField,
        { required: false }
      >;
      inventorySource: foundry.data.fields.StringField<{ blank: false }>;
      restSettings: foundry.data.fields.SchemaField<
        {
          autoRest: foundry.data.fields.BooleanField;
          targets: foundry.data.fields.SetField<foundry.data.fields.DocumentIdField>;
        },
        { required: false; nullable: true; initial: null }
      >;
      showTokenPortrait: foundry.data.fields.BooleanField;
    };
  }
}

/**
 * A custom model to validate system flags on Group Actors.
 *
 * @property {Set<string>} awardDestinations       Saved targets from previous use of award button.
 * @property {object} [restSettings]
 * @property {boolean} [restSettings.autoRest]     Saved Auto Rest setting from previous group rest.
 * @property {Set<string>} [restSettings.targets]  Saved targets form previous group rest.
 */
declare class GroupSystemFlags extends foundry.abstract.DataModel<
  dnd5e.types.Actor.Group.GroupSystemFlagsSchema,
  foundry.abstract.DataModel.Any
> {
  static override defineSchema(): dnd5e.types.Actor.Group.GroupSystemFlagsSchema;
}

export default GroupSystemFlags;
