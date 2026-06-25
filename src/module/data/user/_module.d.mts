/**
 * Runtime API fragment for `dnd5e.dataModels.user`.
 *
 * Exposed as BOTH a value (`const` → constructor) and a type (`type` → instance), inside an OPEN
 * namespace so a module can declaration-merge its own members in.
 */

declare global {
  namespace dnd5e.dataModels.user {
    const UserSystemFlags: typeof import("./user-system-flags.mjs").default;
    type UserSystemFlags = import("./user-system-flags.mjs").default;
  }
}

export {};
