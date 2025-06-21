import SourceConfig from "./shared/source-config.mjs";

/**
 * Application for configuring the source data on actors and items.
 * @deprecated Use `applications.shared.SourceConfig` instead.
 */
declare class SourceConfigDeprecated extends SourceConfig {
  constructor(...args: any[]);
}

export default SourceConfigDeprecated;