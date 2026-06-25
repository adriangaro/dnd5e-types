/**
 * Seam-A config domains consumed by the actor data-model mirror.
 *
 * Each domain follows the canonical five-name convention (DefaultTypes / OverrideTypes /
 * Types / TypeKey [/ Config]); a downstream module widens a domain in one line:
 *   declare global { namespace dnd5e.types.Damage { interface OverrideTypes { void: true } } }
 *
 * These are intentionally lean for the actor slice — they establish the `TypeKey` unions the
 * fields key off. Full `Config` shapes + `CONFIG.DND5E` entries are layered in per domain later.
 */

declare global {
  namespace dnd5e.types {
    /* --------------------------------------------------------------------- */
    /*  Tool                                                                  */
    /* --------------------------------------------------------------------- */
    namespace Tool {
      interface DefaultTypes extends Record<string, boolean | never> {
        alchemist: true;
        bagpipes: true;
        brewer: true;
        calligrapher: true;
        card: true;
        carpenter: true;
        cartographer: true;
        chess: true;
        cobbler: true;
        cook: true;
        dice: true;
        disg: true;
        drum: true;
        dulcimer: true;
        flute: true;
        forg: true;
        glassblower: true;
        herb: true;
        horn: true;
        jeweler: true;
        leatherworker: true;
        lute: true;
        lyre: true;
        mason: true;
        navg: true;
        painter: true;
        panflute: true;
        pois: true;
        potter: true;
        shawm: true;
        smith: true;
        thief: true;
        tinker: true;
        viol: true;
        weaver: true;
        woodcarver: true;
      }
      interface OverrideTypes extends Record<string, boolean | never> {}
      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    /* --------------------------------------------------------------------- */
    /*  Damage                                                                */
    /* --------------------------------------------------------------------- */
    namespace Damage {
      interface DefaultTypes {
        acid: true;
        bludgeoning: true;
        cold: true;
        fire: true;
        force: true;
        lightning: true;
        necrotic: true;
        piercing: true;
        poison: true;
        psychic: true;
        radiant: true;
        slashing: true;
        thunder: true;
      }
      interface OverrideTypes extends Record<string, boolean | never> {}
      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    /* --------------------------------------------------------------------- */
    /*  Condition                                                             */
    /* --------------------------------------------------------------------- */
    namespace Condition {
      interface DefaultTypes {
        bleeding: true;
        blinded: true;
        burning: true;
        charmed: true;
        cursed: true;
        deafened: true;
        dehydration: true;
        diseased: true;
        exhaustion: true;
        falling: true;
        frightened: true;
        grappled: true;
        incapacitated: true;
        invisible: true;
        malnutrition: true;
        paralyzed: true;
        petrified: true;
        poisoned: true;
        prone: true;
        restrained: true;
        silenced: true;
        stunned: true;
        suffocation: true;
        surprised: true;
        transformed: true;
        unconscious: true;
      }
      interface OverrideTypes extends Record<string, boolean | never> {}
      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    /* --------------------------------------------------------------------- */
    /*  Language (+ communication modes, e.g. telepathy)                      */
    /* --------------------------------------------------------------------- */
    namespace Language {
      interface DefaultTypes {
        // standard
        common: true;
        draconic: true;
        dwarvish: true;
        elvish: true;
        giant: true;
        gnomish: true;
        goblin: true;
        halfling: true;
        orc: true;
        sign: true;
        // exotic
        aarakocra: true;
        abyssal: true;
        cant: true;
        celestial: true;
        deep: true;
        druidic: true;
        gith: true;
        gnoll: true;
        infernal: true;
        primordial: true;
        sylvan: true;
        undercommon: true;
        // primordial dialects
        aquan: true;
        auran: true;
        ignan: true;
        terran: true;
      }
      interface OverrideTypes extends Record<string, boolean | never> {}
      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /**
       * Communication-mode key alias — delegates to `dnd5e.types.CommunicationType` so
       * widening `CommunicationType.OverrideTypes` also widens this key.
       * Single merge point: use `dnd5e.types.CommunicationType.OverrideTypes`.
       */
      type CommunicationTypeKey = dnd5e.types.CommunicationType.TypeKey;
    }

    /* --------------------------------------------------------------------- */
    /*  Currency                                                              */
    /* --------------------------------------------------------------------- */
    namespace Currency {
      interface DefaultTypes {
        pp: true;
        gp: true;
        ep: true;
        sp: true;
        cp: true;
      }
      interface OverrideTypes extends Record<string, boolean | never> {}
      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    /* --------------------------------------------------------------------- */
    /*  Movement types (walk/fly/…)                                           */
    /* --------------------------------------------------------------------- */
    namespace Movement {
      interface DefaultTypes {
        walk: true;
        burrow: true;
        climb: true;
        fly: true;
        jump: true;
        swim: true;
      }
      interface OverrideTypes extends Record<string, boolean | never> {}
      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    /** Advantage mode for a roll: disadvantage (-1), normal (0), advantage (1). */
    type AdvantageMode = -1 | 0 | 1;

    /* --------------------------------------------------------------------- */
    /*  Senses                                                                */
    /* --------------------------------------------------------------------- */
    namespace Senses {
      interface DefaultTypes {
        darkvision: true;
        blindsight: true;
        tremorsense: true;
        truesight: true;
      }
      interface OverrideTypes extends Record<string, boolean | never> {}
      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    /* --------------------------------------------------------------------- */
    /*  Creature type (aberration, beast, …)                                  */
    /* --------------------------------------------------------------------- */
    namespace Creature {
      interface DefaultTypes {
        aberration: true;
        beast: true;
        celestial: true;
        construct: true;
        dragon: true;
        elemental: true;
        fey: true;
        fiend: true;
        giant: true;
        humanoid: true;
        monstrosity: true;
        ooze: true;
        plant: true;
        undead: true;
      }
      interface OverrideTypes extends Record<string, boolean | never> {}
      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    /* --------------------------------------------------------------------- */
    /*  Actor size                                                            */
    /* --------------------------------------------------------------------- */
    namespace ActorSize {
      interface DefaultTypes {
        tiny: true;
        sm: true;
        med: true;
        lg: true;
        huge: true;
        grg: true;
      }
      interface OverrideTypes extends Record<string, boolean | never> {}
      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    /* --------------------------------------------------------------------- */
    /*  Weapon / armor proficiency categories                                 */
    /* --------------------------------------------------------------------- */
    namespace WeaponProficiency {
      interface DefaultTypes {
        sim: true;
        mar: true;
      }
      interface OverrideTypes extends Record<string, boolean | never> {}
      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    namespace ArmorProficiency {
      interface DefaultTypes {
        lgt: true;
        med: true;
        hvy: true;
        shl: true;
      }
      interface OverrideTypes extends Record<string, boolean | never> {}
      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    /* --------------------------------------------------------------------- */
    /*  Spellcasting spell levels (0–9)                                        */
    /* --------------------------------------------------------------------- */
    /**
     * Spell-level string-key alias for template-literal use (e.g. `spell${Level.TypeKey}`).
     * Delegates to `dnd5e.types.SpellLevel` so widening `SpellLevel.OverrideTypes` also
     * widens this key — a single merge point for both domains.
     */
    namespace Spellcasting {
      namespace Level {
        /** @internal delegated — widen via dnd5e.types.SpellLevel.OverrideTypes instead. */
        type TypeKey = `${dnd5e.types.SpellLevel.TypeKey}`;
      }
    }

    /* --------------------------------------------------------------------- */
    /*  Misc derived/value shapes referenced by the actor models              */
    /* --------------------------------------------------------------------- */

    /** Initialized shape of `details.type` after preparation (creature-type-field). */
    interface CreatureTypeData {
      value: dnd5e.types.Creature.TypeKey | "custom";
      subtype: string;
      swarm: dnd5e.types.ActorSize.TypeKey | "";
      custom: string;
      config?: object;
      label?: string;
    }

    /** A scale value derived from advancements onto `actor.system.scale`. */
    type AdvancementScaleValue = number | string | { [k: string]: unknown };

    /** Compendium-browser filter definition (lean alias for now). */
    type CompendiumBrowserFilterDefinition = Map<string, unknown>;
  }
}

export {};
