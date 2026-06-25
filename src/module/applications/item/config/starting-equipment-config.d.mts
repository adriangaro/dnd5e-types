/** Configuration application for Starting Equipment. */

import { EquipmentEntryData } from "../../../data/item/templates/starting-equipment.mjs";
import DocumentSheet5e from "../../api/document-sheet.mjs";

declare class StartingEquipmentConfig<
  Document extends foundry.abstract.Document.Any = Item.OfType<'class'>,
  RenderContext extends object = StartingEquipmentConfig.RenderContext<Document>,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<Document> = StartingEquipmentConfig.Configuration<Document>,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = StartingEquipmentConfig.RenderOptions,
> extends DocumentSheet5e<Document, RenderContext, Configuration, RenderOptions> {
  /** @override */
  static override DEFAULT_OPTIONS: foundry.applications.api.ApplicationV2.Configuration;

  /** @override */
  static override PARTS: Record<string, foundry.applications.api.HandlebarsApplicationMixin.HandlebarsTemplatePart>;

  /** @override */
  get title(): string;

  /** @inheritDoc */
  protected _prepareContext(options: fvttUtils.DeepPartial<RenderOptions> & { isFirstRender: boolean }): Promise<RenderContext>;

  /** @inheritDoc */
  protected _onRender(context: fvttUtils.DeepPartial<RenderContext>, options: fvttUtils.DeepPartial<RenderOptions>): Promise<void>;

  /**
   * Handle an action.
   * @param element - The element on which the action is being performed.
   * @param options - Action options.
   */
  _onAction(element: HTMLElement, options?: {
    action?: string;
    depth?: number;
    entryId?: string;
  }): void;

  /** @override */
  protected _onClickAction(event: Event, target: HTMLElement): void;

  /** @override */
  _prepareSubmitData(
    event: Event | SubmitEvent,
    form: HTMLFormElement,
    formData: foundry.applications.ux.FormDataExtended,
    updateData?: object
  ): object;

  /** @inheritDoc */
  protected _processSubmitData(event: Event | SubmitEvent, form: HTMLFormElement, submitData: object): Promise<void>;

  /** @inheritDoc */
  protected _onDragStart(event: DragEvent): void;

  /** @inheritDoc */
  protected _onDrop(event: DragEvent): Promise<void | null>;

  /**
   * Sort an entry on drop.
   * @param event - Triggering drop event.
   * @param data - Drag event data.
   */
  _onSortEntry(event: DragEvent, data: object): void;
}

declare namespace StartingEquipmentConfig {
  interface Any extends StartingEquipmentConfig<any, any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof StartingEquipmentConfig<any, any, any, any>> {}

  interface EquipmentEntryContext {
    id: string;
    entry: InstanceType<typeof EquipmentEntryData>;
    depth: number;
    groupType: boolean;
    validTypes: Partial<Record<"OR" | "AND" | "armor" | "tool" | "weapon" | "focus" | "currency" | "linked", string>>;
    children?: EquipmentEntryContext[];
    linked?: Item.Implementation;
    showRequireProficiency?: boolean;
  }

  interface RenderContext<Document extends foundry.abstract.Document.Any = Item.OfType<'class'>>
    extends DocumentSheet5e.RenderContext<Document> {
    entries: EquipmentEntryContext[];
  }
  interface Configuration<Document extends foundry.abstract.Document.Any = Item.OfType<'class'>>
    extends DocumentSheet5e.Configuration<Document> {}
  interface RenderOptions extends DocumentSheet5e.RenderOptions {}
}

export default StartingEquipmentConfig;
