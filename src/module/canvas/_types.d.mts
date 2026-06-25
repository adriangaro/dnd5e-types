/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/canvas/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.canvas {
      interface BasePlacementConfiguration {
      minimizeWindows?: boolean; // @default true — Minimize windows to reveal the canvas.
      restoreLayer?: boolean; // @default true — Return to original canvas layer after placement.
      }

      interface TemplatePlacementConfiguration extends BasePlacementConfiguration {
      color: number; // Color to use when creating the template.
      origin?: globalThis.TokenDocument.Implementation; // Token that is the origin point of the placement.
      shapes: TemplatePlacementShapeConfiguration[]; // Configuration data for individual placements.
      }

      interface TemplatePlacementShapeConfiguration {
      type: string; // Shape type to use as the basis for the template.
      size: number; // Primary dimension of the template, converted into unit used for scene.
      width?: number; // Width of the shape if relevant to shape type.
      height?: number; // Height of the shape if relevant to shape type.
      }

      interface TemplatePlacementData {
      token?: string; // ID of attached token.
      [key: string]: unknown;
      }

      interface TokenPlacementConfiguration extends BasePlacementConfiguration {
      origin?: globalThis.TokenDocument.Implementation; // Token that is the origin point of the placement.
      tokens: foundry.data.PrototypeToken[]; // Prototype token information for rendering.
      }

      interface TokenPlacementData {
      prototypeToken: foundry.data.PrototypeToken;
      index: {
        total: number; // Index of the placement across all placements.
        unique: number; // Index of the placement across placements with the same original token.
      };
      x: number;
      y: number;
      elevation: number;
      rotation: number;
      }

  }
}

export {};
