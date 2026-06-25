/**
 * Rule reference config domain (Seam A). `CONFIG.DND5E.rules`.
 *
 * Maps rule keys to journal-entry-page UUIDs referenced from the `&Reference` enricher.
 */

declare global {
  namespace dnd5e.types {
    namespace Rule {
      /** The core rule references. */
      interface DefaultTypes {
        inspiration: true;
        carryingcapacity: true;
        push: true;
        lift: true;
        drag: true;
        encumbrance: true;
        hiding: true;
        passiveperception: true;
        time: true;
        speed: true;
        travelpace: true;
        forcedmarch: true;
        difficultterrainpace: true;
        climbing: true;
        swimming: true;
        longjump: true;
        highjump: true;
        falling: true;
        suffocating: true;
        vision: true;
        light: true;
        lightlyobscured: true;
        heavilyobscured: true;
        brightlight: true;
        dimlight: true;
        darkness: true;
        blindsight: true;
        darkvision: true;
        tremorsense: true;
        truesight: true;
        food: true;
        water: true;
        resting: true;
        shortrest: true;
        longrest: true;
        surprise: true;
        initiative: true;
        bonusaction: true;
        reaction: true;
        difficultterrain: true;
        beingprone: true;
        droppingprone: true;
        standingup: true;
        crawling: true;
        movingaroundothercreatures: true;
        flying: true;
        size: true;
        space: true;
        squeezing: true;
        attack: true;
        castaspell: true;
        dash: true;
        disengage: true;
        dodge: true;
        help: true;
        hide: true;
        ready: true;
        search: true;
        useanobject: true;
        attackrolls: true;
        unseenattackers: true;
        unseentargets: true;
        rangedattacks: true;
        range: true;
        rangedattacksinclosecombat: true;
        meleeattacks: true;
        reach: true;
        unarmedstrike: true;
        opportunityattacks: true;
        twoweaponfighting: true;
        grappling: true;
        escapingagrapple: true;
        movingagrappledcreature: true;
        shoving: true;
        cover: true;
        halfcover: true;
        threequarterscover: true;
        totalcover: true;
        hitpoints: true;
        damagerolls: true;
        criticalhits: true;
        damagetypes: true;
        damageresistance: true;
        damagevulnerability: true;
        healing: true;
        instantdeath: true;
        deathsavingthrows: true;
        deathsaves: true;
        stabilizing: true;
        knockingacreatureout: true;
        temporaryhitpoints: true;
        temphp: true;
        mounting: true;
        dismounting: true;
        controllingamount: true;
        underwatercombat: true;
        spelllevel: true;
        knownspells: true;
        preparedspells: true;
        spellslots: true;
        castingatahigherlevel: true;
        upcasting: true;
        castinginarmor: true;
        cantrips: true;
        rituals: true;
        castingtime: true;
        bonusactioncasting: true;
        reactioncasting: true;
        longercastingtimes: true;
        spellrange: true;
        components: true;
        verbal: true;
        spellduration: true;
        instantaneous: true;
        concentrating: true;
        spelltargets: true;
        areaofeffect: true;
        pointoforigin: true;
        spellsavingthrows: true;
        spellattackrolls: true;
        combiningmagicaleffects: true;
        schoolsofmagic: true;
        detectingtraps: true;
        disablingtraps: true;
        curingmadness: true;
        damagethreshold: true;
        poisontypes: true;
        contactpoison: true;
        ingestedpoison: true;
        inhaledpoison: true;
        injurypoison: true;
        attunement: true;
        wearingitems: true;
        wieldingitems: true;
        multipleitemsofthesamekind: true;
        paireditems: true;
        commandword: true;
        consumables: true;
        itemspells: true;
        charges: true;
        spellscroll: true;
        creaturetags: true;
        telepathy: true;
        legendaryactions: true;
        lairactions: true;
        regionaleffects: true;
        disease: true;
        d20test: true;
        advantage: true;
        disadvantage: true;
        difficultyclass: true;
        armorclass: true;
        abilitycheck: true;
        savingthrow: true;
        challengerating: true;
        expertise: true;
        influence: true;
        magic: true;
        study: true;
        utilize: true;
        friendly: true;
        indifferent: true;
        hostile: true;
        breakingobjects: true;
        hazards: true;
        bloodied: true;
        jumping: true;
        resistance: true;
        stable: true;
        dead: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      rules: { [K in dnd5e.types.Rule.TypeKey]: string };
    }
  }
}

export {};
