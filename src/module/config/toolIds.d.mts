/**
 * Tool ID lookup. `CONFIG.DND5E.toolIds`.
 *
 * Runtime is a Proxy over `CONFIG.DND5E.tools` that returns each entry's `id`
 * (or the raw value). Keyed by the same `Tool.TypeKey` union; values are UUID/ID strings.
 */

declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      toolIds: { [K in dnd5e.types.Tool.TypeKey]: string };
    }
  }
}

export {};
