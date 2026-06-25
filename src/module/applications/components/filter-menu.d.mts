declare class FilterMenu extends foundry.applications.ux.ContextMenu {
  /** @inheritDoc */
  override render(target: HTMLElement, options?: foundry.applications.ux.ContextMenu.RenderOptions): Promise<void>;
}

declare namespace FilterMenu {
  interface Any extends FilterMenu {}
  interface AnyConstructor extends fvttUtils.Identity<typeof FilterMenu> {}
}

export default FilterMenu;
