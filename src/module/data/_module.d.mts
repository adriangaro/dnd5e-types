import "./abstract/_module.mjs";
import "./active-effect/_module.mjs";
import "./activity/_module.mjs";
import "./actor/_module.mjs";
import "./advancement/_module.mjs";
import "./calendar/_module.mjs";
import "./chat-message/_module.mjs";
import "./collection/_module.mjs";
import "./fields/_module.mjs";
import "./item/_module.mjs";
import "./journal/_module.mjs";
import "./region-behavior/_module.mjs";
import "./settings/_module.mjs";
import "./shared/_module.mjs";
import "./spellcasting/_module.mjs";
import "./user/_module.mjs";

declare global {
  namespace dnd5e.dataModels {
    const TerrainData5e: typeof import("./terrain-data.mjs").default;
    type TerrainData5e = import("./terrain-data.mjs").default;
  }
}

export {};
