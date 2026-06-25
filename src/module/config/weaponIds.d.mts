/**
 * Basic weapon item UUIDs (Seam A). `CONFIG.DND5E.weaponIds`.
 *
 * Maps a weapon key to a compendium UUID; enables weapon proficiencies and starting
 * equipment. Keys remain expandable; values are UUID strings.
 */

declare global {
  namespace dnd5e.types {
    namespace WeaponId {
      /** The default basic weapon keys. */
      interface DefaultTypes {
        battleaxe: true;
        blowgun: true;
        club: true;
        dagger: true;
        dart: true;
        flail: true;
        glaive: true;
        greataxe: true;
        greatclub: true;
        greatsword: true;
        halberd: true;
        handaxe: true;
        handcrossbow: true;
        heavycrossbow: true;
        javelin: true;
        lance: true;
        lightcrossbow: true;
        lighthammer: true;
        longbow: true;
        longsword: true;
        mace: true;
        maul: true;
        morningstar: true;
        musket: true;
        pike: true;
        pistol: true;
        quarterstaff: true;
        rapier: true;
        scimitar: true;
        shortsword: true;
        sickle: true;
        spear: true;
        shortbow: true;
        sling: true;
        trident: true;
        warpick: true;
        warhammer: true;
        whip: true;
      }

      /** Downstream merge point — add `{ myWeapon: true }` here. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      /** Maps a weapon key to its compendium UUID. */
      weaponIds: { [K in dnd5e.types.WeaponId.TypeKey]: string };
    }
  }
}

export {};
