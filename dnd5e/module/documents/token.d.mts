import SystemFlagsMixin from "./mixins/flags.mjs";

/**
 * Extend the base TokenDocument class to implement system-specific HP bar logic.
 */
export default class TokenDocument5e extends SystemFlagsMixin(TokenDocument) {

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Is the dynamic token ring enabled?
   */
  get hasDynamicRing(): boolean

  /* -------------------------------------------- */

  /**
   * Get an Array of attribute choices which are suitable for being consumed by an item usage.
   * @param data  The actor data.
   */
  static getConsumedAttributes(data: object): string[]

  /* -------------------------------------------- */

  static getTrackedAttributeChoices(attributes?: TokenDocument.TrackedAttributesDescription): TokenDocument.TrackedAttributesChoice[]

  /* -------------------------------------------- */

  static getTrackedAttributeChoicesV12(attributes?: TokenDocument.TrackedAttributesDescription): Record<string, string[]>

  /* -------------------------------------------- */
  /*  Ring Animations                             */
  /* -------------------------------------------- */

  /**
   * Determine if any rings colors should be forced based on current status.
   */
  getRingColors(): {ring?: number, background?: number}

  /* -------------------------------------------- */

  /**
   * Determine what ring effects should be applied on top of any set by flags.
   */
  getRingEffects(): string[]

  /* -------------------------------------------- */

  /**
   * Flash the token ring based on damage, healing, or temp HP.
   * @param type     The key to determine the type of flashing.
   */
  flashRing(type: string)
}

declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      consumableResources: string[]
    }
  }
}


declare module "fvtt-types/configuration" {
  interface DocumentClassConfig {
    TokenDocument: typeof TokenDocument5e
  }
}

