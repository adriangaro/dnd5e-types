/**
 * Tool config domain (Seam A; namespace stubbed in _stubs). `CONFIG.DND5E.tools`.
 *
 * The `Tool` namespace (DefaultTypes/OverrideTypes/Types/TypeKey) is declared in
 * `_stubs.d.mts`; this file only adds the `Config` shape and the DND5EConfig funnel.
 */

declare global {
  namespace dnd5e.types {
    namespace Tool {
      /** Shape of each `CONFIG.DND5E.tools[key]` entry (ToolConfiguration). */
      interface Config {
        /** Default ability used for the tool. */
        ability: dnd5e.types.Ability.TypeKey;
        /** UUID of reference tool or ID within pack defined by `DND5E.sourcePacks.ITEMS`. */
        id: string;
      }
    }

    interface DND5EConfig {
      tools: { [K in dnd5e.types.Tool.TypeKey]: dnd5e.types.Tool.Config };
    }
  }
}

export {};
