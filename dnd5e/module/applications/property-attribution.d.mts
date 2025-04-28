import Application5e from "./api/application.mjs";

/**
 * Description for a single part of a property attribution.
 */
interface AttributionDescription {
  label: string;
  mode: number;
  value: number;
  document?: ActiveEffect.Implementation;
}

/**
 * Interface for viewing what factors went into determining a specific property.
 *
 * @param {Document} object                        The Document that owns the property being attributed.
 * @param {AttributionDescription[]} attributions  An array of all the attribution data.
 * @param {string} property                        Dot separated path to the property.
 * @param {object} [options={}]                    Application rendering options.
 */
export default class PropertyAttribution extends Application5e<{
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
