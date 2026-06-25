/**
 * Extends the base `User` through {@link SystemFlagsMixin} (so `flags.dnd5e` is typed by the
 * system-provided `UserSystemFlags` data model) and is registered into fvtt-types'
 * `DocumentClassConfig` by the document funnel, so `User.Implementation` everywhere resolves to
 * this class.
 *
 * EXPANDABILITY: the class is merged with a same-name `interface User5e` — downstream packages add
 * document-level methods/getters by augmenting that interface (the document analogue of the
 * data-model Seam-D override interfaces). The `_systemFlagsDataModel` return is intentionally loose
 * (`DataModel.AnyConstructor`) pending the port of the `data/user/user-system-flags` model, and is
 * tightened as that lands.
 */

import type SystemFlagsMixin from "./mixins/flags.mjs";

declare const User5e_base: ReturnType<typeof SystemFlagsMixin<typeof User>>;

declare class User5e extends User5e_base {
  /** The `DataModel` definition for this User's `flags.dnd5e` system flags. */
  get _systemFlagsDataModel(): typeof import("../module/data/user/user-system-flags.mjs").default;
}

interface User5e {}

declare namespace User5e {}

export default User5e;
