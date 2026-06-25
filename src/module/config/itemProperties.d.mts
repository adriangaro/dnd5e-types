/**
 * Item property config domain (Seam A). `CONFIG.DND5E.itemProperties`.
 */

declare global {
  namespace dnd5e.types {
    namespace ItemProperty {
      /** Core item properties shared across item types. */
      interface DefaultTypes {
        ada: true;
        amm: true;
        concentration: true;
        fin: true;
        fir: true;
        foc: true;
        gear: true;
        hvy: true;
        lgt: true;
        lod: true;
        material: true;
        mgc: true;
        rch: true;
        rel: true;
        ret: true;
        ritual: true;
        sidekick: true;
        sil: true;
        somatic: true;
        spc: true;
        stealthDisadvantage: true;
        thr: true;
        trait: true;
        two: true;
        ver: true;
        vocal: true;
        weightlessContents: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.itemProperties[key]` entry. */
      interface Config {
        /** Localized label. */
        label: string;
        /** Localized abbreviation. */
        abbreviation?: string;
        /** Icon that can be used in certain places to represent this property. */
        icon?: string;
        /** Reference to a rule page describing this property. */
        reference?: string;
        /** Is this property one that can cause damage resistance bypasses? */
        isPhysical?: boolean;
        /** Is this spell property a tag, rather than a component? */
        isTag?: boolean;
      }
    }

    interface DND5EConfig {
      itemProperties: { [K in dnd5e.types.ItemProperty.TypeKey]: dnd5e.types.ItemProperty.Config };
    }
  }
}

export {};
