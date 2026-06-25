/**
 * A specialized subclass of Tabs that handles tabs which exist outside an Application's inner HTML.
 */
declare class Tabs5e extends foundry.applications.ux.Tabs {
  override bind(html: HTMLElement): void;
}

declare namespace Tabs5e {
  interface Any extends Tabs5e {}
  interface AnyConstructor extends fvttUtils.Identity<typeof Tabs5e> {}
}

export default Tabs5e;
