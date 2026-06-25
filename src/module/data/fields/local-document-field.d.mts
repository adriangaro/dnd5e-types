declare global {
  namespace dnd5e.types.fields {
    /**
     * A mirror of ForeignDocumentField that references a Document embedded within this Document.
     *
     * Modeled as a 4-generic `StringField` (its INITIALIZED leaf resolves to the concrete document,
     * the stored id, or null) to avoid `DocumentIdField` arity differences across fvtt-types revisions.
     */
    type LocalDocumentField<Concrete extends foundry.abstract.Document.Any = foundry.abstract.Document.Any> =
      foundry.data.fields.StringField<
        { required: true; nullable: true; blank: false; initial: null },
        string | null,
        Concrete | string | null,
        string | null
      >;
  }
}

/**
 * A mirror of ForeignDocumentField that references a Document embedded within this Document.
 *
 * @param model    The local DataModel class definition which this field should link to.
 * @param options  Options which configure the behavior of the field.
 */
declare class LocalDocumentField<Concrete extends foundry.abstract.Document.Any = foundry.abstract.Document.Any>
  extends foundry.data.fields.StringField<
    { required: true; nullable: true; blank: false; initial: null },
    string | null,
    Concrete | string | null,
    string | null
  > {
  /** The local DataModel class definition which this field links to. */
  model: foundry.abstract.Document.AnyConstructor;
}

export default LocalDocumentField;
