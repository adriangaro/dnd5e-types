import { SubclassValueData } from "../../data/advancement/subclass.mjs";
import Advancement from "./advancement.mjs";

/**
 * Advancement that allows the player to select a subclass for their class. Only allowed on class items
 * and can only be taken once.
 */
export default class SubclassAdvancement extends Advancement<
  never,
  typeof SubclassValueData
> {}
