import UserSystemFlags from "../data/user/user-system-flags.mjs";
import SystemFlagsMixin from "./mixins/flags.mjs";

/**
 * Extend the basic User implementation.
 */
export default class User5e extends SystemFlagsMixin(User) {
  /** @inheritDoc */
  get _systemFlagsDataModel(): typeof UserSystemFlags
}

declare module "fvtt-types/configuration" {
  interface DocumentClassConfig {
    User: typeof User5e
  }
}

