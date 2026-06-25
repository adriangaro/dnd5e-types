/**
 * User system flags: after `prepareData` the system replaces `flags.dnd5e` with a
 * {@link UserSystemFlags} instance, so `user.flags.dnd5e` exposes the model's fields.
 */

import type { Expect, Extends } from "./_assert.ts";

declare const user: User.Implementation;

{
  const flags = user.flags.dnd5e!;
  // creation.scrollExplanation default ("reference") → string
  type _scroll = Expect<Extends<NonNullable<typeof flags.creation>["scrollExplanation"], string>>;
  // sheetPrefs is a keyed mapping of per-sheet preference objects
  type _prefs = Expect<Extends<keyof NonNullable<typeof flags.sheetPrefs>, string>>;
  // model carries the GM-request scratch flag too
  type _request = Expect<Extends<typeof flags.requestResult, object | undefined>>;
}
