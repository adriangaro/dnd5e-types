import Application5e from "./api/application.mjs";

/**
 * Description for a single part of a property attribution.
 */
interface _AttributionDescription {
  label: string;
  mode: number;
  value: number;
  document?: ActiveEffect.Implementation;
}
export {
  _AttributionDescription as AttributionDescription
}
/**
 * Interface for viewing what factors went into determining a specific property.
 *
 */
declare class PropertyAttribution extends Application5e<{
  caption: string,
  sources: {
    negative?: boolean,
    value: number,
    label: string,
    mode: number
  }[],
  total: number
}, {

}, {
  title: string
}> {
  attributions: {
    value: number,
    label: string,
    mode: number
  }[]

  constructor(
    object: foundry.abstract.Document.Any, 
    attributions: PropertyAttribution['attributions'], 
    property: string, 
    options?: PropertyAttribution['__Configuration']
  )

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /**
   * Prepare tooltip contents.
   */
  renderTooltip(): Promise<string>


  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Produce a human-readable and localized name for the provided property.
   */
  getPropertyLabel(property: string): string
}

declare namespace PropertyAttribution {
  type AttributionDescription = _AttributionDescription
}

export default PropertyAttribution