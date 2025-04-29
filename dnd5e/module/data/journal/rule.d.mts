/**
 * Data definition for Rule journal entry pages.
 *
 * @property {string} tooltip  Content to display in tooltip in place of page's text content.
 * @property {string} type     Type of rule represented. Should match an entry defined in `CONFIG.DND5E.ruleTypes`.
 */
export default class RuleJournalPageData extends foundry.abstract.TypeDataModel<{
  tooltip: foundry.data.fields.HTMLField<{textSearch: true, label: "DND5E.Rule.Tooltip"}>,
  type: foundry.data.fields.StringField<{blank: false, initial: "rule", label: "DND5E.Rule.Type.Label"}>
}, foundry.abstract.Document.Any> {

  /**
   * Render a rich tooltip for this page.
   * @param {EnrichmentOptions} [enrichmentOptions={}]  Options for text enrichment.
   * @returns {{content: string, classes: string[]}}
   */
  richTooltip(enrichmentOptions?: TextEditor.EnrichmentOptions): Promise<{content: string, classes: string[]}>
}
