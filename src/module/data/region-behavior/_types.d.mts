/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/data/region-behavior/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.data.regionBehavior {
      interface ApplyActiveEffectRegionBehaviorSystemData {
      effects: Set<string>; // UUIDs of effects to apply.
      dispositions: Set<number>; // If not empty, only apply effects to tokens with these dispositions.
      sizes: Set<dnd5e.types.ActorSize.TypeKey>; // If not empty, only apply effects to tokens with these sizes.
      types: Set<dnd5e.types.Creature.TypeKey>; // If not empty, only apply effects to tokens with these creature types.
      }

      interface DifficultTerrainRegionBehaviorSystemData {
      magical: boolean; // This difficult terrain is caused by magic.
      types: Set<string>; // Types of difficult terrain represented.
      ignoredDispositions: Set<number>; // Token dispositions that won't be affected by this difficult terrain.
      }

      interface RotateAreaRegionBehaviorSystemData {
      time: {
        value: number; // Amount of time over which rotation occurs.
        mode: RotateAreaSpeedMode; // How the time value corresponds to rotation distance.
      };
      tiles: RotateAreaDocumentLinks; // Tiles that are rotated with the area.
      walls: RotateAreaDocumentLinks & { // Walls that are rotated with the area.
        link: boolean; // Also rotate any walls linked to the explicitly specified walls.
      };
      lights: RotateAreaDocumentLinks; // Ambient lights that are rotated with the area.
      regions: RotateAreaDocumentLinks; // Other regions that are rotated with the area.
      sounds: RotateAreaDocumentLinks; // Ambient sounds that are rotated with the area.
      directionMode: RotateAreaDirectionMode; // Direction to rotate the area when moving to next position.
      positions: RotateAreaPositionData[]; // Pre-defined stopping points for the rotation.
      status: {
        angle: Degrees; // Current angle relative to start position.
        position: number; // Index of the current position.
        rotating: boolean; // Is the region currently rotating?
      };
      }

      type RotateAreaDirectionMode = "cw"|"ccw"|"short"|"long";

      interface RotateAreaDocumentLinks {
      ids: Set<string>; // IDs in the same scene for the linked documents.
      }

      interface RotateAreaPositionData {
      angle: Degrees; // Angle for this position in degrees.
      }

      type RotateAreaSpeedMode = "fixed"|"variable";

      type Degrees = number;

      interface Point {
      x: number;
      y: number;
      }

      type Radians = number;

      interface Size {
      width: number;
      height: number;
      }

  }
}

export {};
