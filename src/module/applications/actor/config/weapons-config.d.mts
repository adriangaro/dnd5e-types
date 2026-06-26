/** Configuration application for weapon proficiencies and masteries. */

import TraitsConfig from "./traits-config.mjs";

declare class WeaponsConfig<
  Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation,
  RenderContext extends object = WeaponsConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<Document> = WeaponsConfig.Configuration<Document>,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = WeaponsConfig.RenderOptions,
> extends TraitsConfig<Document, RenderContext, Configuration, RenderOptions> {}

declare namespace WeaponsConfig {
  interface Any extends WeaponsConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof WeaponsConfig<any, any, any, any>> {}

  interface RenderContext<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends TraitsConfig.RenderContext<Document> {
    // `trait: "weapon"` is pinned (actorKeyPath → system.traits.weaponProf). `Extract<…, object>`
    // keeps the override assignable to base `data: object` under the generic `Document` constraint.
    data: Extract<dnd5e.types.PathValue<Document, "system._source.traits.weaponProf">, object>;
  }
  interface Configuration<Document extends foundry.abstract.Document.Any = globalThis.Actor.Implementation>
    extends TraitsConfig.Configuration<Document> {}
  interface RenderOptions extends TraitsConfig.RenderOptions {}
}

export default WeaponsConfig;
