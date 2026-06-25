/**
 * Bastion facilities configuration (composite, not a flat Seam-A record).
 * `CONFIG.DND5E.facilities`.
 *
 * A single nested object describing free-facility advancement, issuable orders, size
 * categories, and the facility type/subtype taxonomy. The inner `orders`, `sizes`, and
 * `types` maps are Seam-A expandable via their own namespaces below.
 */

declare global {
  namespace dnd5e.types {
    namespace Facility {
      /* ---- Orders ---- */
      namespace Order {
        interface DefaultTypes {
          build: true;
          change: true;
          craft: true;
          empower: true;
          enlarge: true;
          harvest: true;
          maintain: true;
          recruit: true;
          repair: true;
          research: true;
          trade: true;
        }
        interface OverrideTypes extends Record<string, boolean | never> {}
        type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }

      /** Shape of each `facilities.orders[key]` entry. */
      interface OrderConfig {
        /** Localized name of the order. */
        label: string;
        /** SVG icon path for the order. */
        icon: string;
        /** Whether this order can be issued to basic facilities. */
        basic?: boolean;
        /** Time taken to complete the order if different from a normal bastion turn. */
        duration?: number;
        /** This order is not normally available for execution. */
        hidden?: boolean;
      }

      /* ---- Sizes ---- */
      namespace Size {
        interface DefaultTypes {
          cramped: true;
          roomy: true;
          vast: true;
        }
        interface OverrideTypes extends Record<string, boolean | never> {}
        type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }

      /** Shape of each `facilities.sizes[key]` entry. */
      interface SizeConfig {
        /** Localized name of the size category. */
        label: string;
        /** Number of days to build the facility. */
        days: number;
        /** Maximum area (squares) the facility may occupy in the bastion plan. */
        squares: number;
        /** Cost in gold pieces to build the facility. */
        value: number;
      }

      /* ---- Types (basic / special) ---- */
      namespace Type {
        interface DefaultTypes {
          basic: true;
          special: true;
        }
        interface OverrideTypes extends Record<string, boolean | never> {}
        type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }

      /** Shape of each `facilities.types[key]` entry (SubtypeTypeConfiguration). */
      interface TypeConfig {
        /** Localized label for this facility type. */
        label: string;
        /** Localized labels for subtypes, keyed by subtype id. */
        subtypes?: Partial<Record<dnd5e.types.Facility.Subtype.TypeKey, string>>;
      }

      /** Shape of `CONFIG.DND5E.facilities` (FacilityConfiguration). */
      interface Config {
        /** Free facilities of a given type awarded at certain character levels. */
        advancement: Partial<Record<dnd5e.types.Facility.Type.TypeKey, Record<number, number>>>;
        /** Orders that can be issued to a facility. */
        orders: { [K in dnd5e.types.Facility.Order.TypeKey]: dnd5e.types.Facility.OrderConfig };
        /** Facility size categories. */
        sizes: { [K in dnd5e.types.Facility.Size.TypeKey]: dnd5e.types.Facility.SizeConfig };
        /** Facility types and their subtypes. */
        types: { [K in dnd5e.types.Facility.Type.TypeKey]: dnd5e.types.Facility.TypeConfig };
      }
    }

    interface DND5EConfig {
      facilities: dnd5e.types.Facility.Config;
    }
  }
}

export {};
