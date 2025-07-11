type AnyApplication = Application | foundry.applications.api.ApplicationV2

declare class PseudoDocument {
  /** @privateRemarks All mixin classses should accept anything for its constructor. */
  constructor(...args: any[]);

  static _apps: Map<string, Set<AnyApplication>>
  static _sheets: Map<
    [PseudoDocument, typeof foundry.applications.api.ApplicationV2],
    foundry.applications.api.ApplicationV2
  >

  get metadata(): PseudoDocument.Metadata;
  static metadata: PseudoDocument.Metadata;

  get documentConfig(): object;
  static get documentConfig(): object;

  get documentName(): string;
  static get documentName(): string;

  get id(): string;
  get relativeID(): string;
  get uuid(): string;

  get item(): Item.OfType<Item.SubType>;
  get actor(): Actor.OfType<Actor.SubType> | null;

  // this.constructor.metadata.sheetClass ?? this.constructor.metadata.apps?.config;
  get sheet(): dnd5e.types.GetTypeFromPath<this, 'metadata.sheetClass'> extends never
  ? (
   dnd5e.types.GetTypeFromPath<this, 'metadata.apps.config'> extends never
   ? any
   : ( 
     dnd5e.types.GetTypeFromPath<this, 'metadata.apps.config'> extends foundry.applications.api.ApplicationV2.AnyConstructor 
     ? InstanceType<dnd5e.types.GetTypeFromPath<this, 'metadata.apps.config'>>
     : any
   )
 ) : (
   dnd5e.types.GetTypeFromPath<this, 'metadata.sheetClass'> extends foundry.applications.api.ApplicationV2.AnyConstructor 
   ? InstanceType<dnd5e.types.GetTypeFromPath<this, 'metadata.sheetClass'> >
   : any
 )
  render(options: foundry.applications.api.ApplicationV2.RenderOptions);

  static _registerApp(doc: PseudoDocument, app: AnyApplication)
  static _unregisterApp(doc: PseudoDocument, app: AnyApplication)

  update(updates: object, options?: object): Promise<this>

  delete(options?: object): Promise<this>
  deleteDialog(options?: object): Promise<this>

  toDragData(): PseudoDocument.DragData<this>

  createDialog(
    data: fvttUtils.DeepPartial<dnd5e.types.GetKey<this, "_source">>,
    context: {
      parent: Item.Implementation,
      types: string[]
    }
  ): Promise<Item.Implementation | null>
}

declare namespace PseudoDocument {
  interface Metadata {
    name: string,
    label: string
  }

  type DragData<This> = {
    type: dnd5e.types.GetKey<This, "documentName">,
    data: dnd5e.types.GetKey<This, "_source">,
    uuid?: string;
  }
}

declare function PseudoDocumentMixin<
  T extends fvttUtils.AnyConstructor,
>(
  BaseClass: T
): typeof PseudoDocument & T;

declare namespace PseudoDocumentMixin {
  export import MixinClass = PseudoDocument;
}

export default PseudoDocumentMixin;

type d = typeof dnd5e.applications.activity.SummonSheet extends foundry.applications.api.ApplicationV2.AnyConstructor ? true : false