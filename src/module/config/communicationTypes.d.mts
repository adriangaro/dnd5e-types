/**
 * Communication types config domain (Seam A). `CONFIG.DND5E.communicationTypes`.
 *
 * Communication modes that take ranges, such as telepathy.
 *
 * Downstream modules add a type in one line:
 *   declare global { namespace dnd5e.types.CommunicationType { interface OverrideTypes { myMode: true } } }
 */

declare global {
  namespace dnd5e.types {
    namespace CommunicationType {
      /** Core communication types. */
      interface DefaultTypes {
        telepathy: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.communicationTypes[key]` entry. */
      interface Config {
        /** Localized label. */
        label: string;
      }
    }

    interface DND5EConfig {
      communicationTypes: { [K in dnd5e.types.CommunicationType.TypeKey]: dnd5e.types.CommunicationType.Config };
    }
  }
}

export {};
