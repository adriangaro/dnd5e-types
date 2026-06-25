/**
 * `DetectionModeBlindsight` — blindsight detection mode (`module/canvas/detection-modes/blindsight.mjs`).
 * `_canDetect`/`_testLOS` are behavioral overrides of the base `foundry.canvas.perception.DetectionMode`
 * (same signatures → inherited).
 */

declare class DetectionModeBlindsight extends foundry.canvas.perception.DetectionMode {
  /** @override */
  static getDetectionFilter(): PIXI.Filter | undefined;
}

declare namespace DetectionModeBlindsight {
  interface Any extends DetectionModeBlindsight {}
  type AnyConstructor = typeof DetectionModeBlindsight;
}

export default DetectionModeBlindsight;
