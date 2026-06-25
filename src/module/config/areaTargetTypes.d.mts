/**
 * Area-of-effect targeting types (Seam A). `CONFIG.DND5E.areaTargetTypes`.
 */

declare global {
  namespace dnd5e.types {
    namespace AreaTargetType {
      /** The standard area target templates. */
      interface DefaultTypes {
        circle: true;
        cone: true;
        cube: true;
        cylinder: true;
        line: true;
        radius: true;
        ring: true;
        sphere: true;
        square: true;
        wall: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.areaTargetTypes[key]` entry. */
      interface Config {
        /** Localized label for this type. */
        label: string;
        /** Localization path for counted plural forms. */
        counted: string;
        /** Type of `MeasuredTemplate` created for this target type. */
        template: string;
        /** Reference to a rule page describing this area of effect. */
        reference?: string;
        /**
         * Available sizes for this template. Chosen from
         * `"radius" | "width" | "height" | "length" | "thickness"` (max 3).
         */
        sizes?: Array<"radius" | "width" | "height" | "length" | "thickness">;
        /** Is this a standard area of effect as defined explicitly by the rules? */
        standard?: boolean;
      }
    }

    interface DND5EConfig {
      areaTargetTypes: { [K in dnd5e.types.AreaTargetType.TypeKey]: dnd5e.types.AreaTargetType.Config };
    }
  }
}

export {};
