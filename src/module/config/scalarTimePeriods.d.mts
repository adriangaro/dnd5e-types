/**
 * Scalar time period config domain. `CONFIG.DND5E.scalarTimePeriods`.
 *
 * A `Proxy` over `CONFIG.DND5E.timeUnits` exposing only the time-unit keys that accept a numeric
 * value (those whose entry does not set `option: false`); each value resolves to the unit's label.
 * Keys are a filtered subset of `TimeUnit.TypeKey` — the core entries with `option: false` are
 * `second` and `week`, so those are excluded from the default key union.
 */

declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      scalarTimePeriods: { [K in Exclude<dnd5e.types.TimeUnit.TypeKey, "second" | "week">]: string };
    }
  }
}

export {};
