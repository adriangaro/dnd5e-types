import AdoptedStyleSheetMixin from "./adopted-stylesheet-mixin.mjs";
import CheckboxElement from "./checkbox.mjs";
import CopyableTextElement from "./copyable-text.mjs";
import DamageApplicationElement from "./damage-application.mjs";
import EffectApplicationElement from "./effect-application.mjs";
import EffectsElement from "./effects.mjs";
import EnchantmentApplicationElement from "./enchantment-application.mjs";
import FiligreeBoxElement from "./filigree-box.mjs";
import FilterStateElement from "./filter-state.mjs";
import IconElement from "./icon.mjs";
import InventoryElement from "./inventory.mjs";
import ItemListControlsElement from "./item-list-controls.mjs";
import ProficiencyCycleElement from "./proficiency-cycle.mjs";
import SlideToggleElement from "./slide-toggle.mjs";

declare global {
  interface HTMLElementTagNameMap {
    "copyable-text": CopyableTextElement;
    "damage-application": DamageApplicationElement;
    "dnd5e-checkbox": CheckboxElement;
    "dnd5e-effects": EffectsElement;
    "dnd5e-icon": IconElement;
    "dnd5e-inventory": InventoryElement;
    "effect-application": EffectApplicationElement;
    "enchantment-application": EnchantmentApplicationElement;
    "filigree-box": FiligreeBoxElement;
    "filter-state": FilterStateElement;
    "item-list-controls": ItemListControlsElement;
    "proficiency-cycle": ProficiencyCycleElement;
    "slide-toggle": SlideToggleElement;
  }
}


export {
  AdoptedStyleSheetMixin, CopyableTextElement, CheckboxElement, DamageApplicationElement, EffectApplicationElement,
  EffectsElement, EnchantmentApplicationElement, FiligreeBoxElement, FilterStateElement, IconElement,
  InventoryElement, ItemListControlsElement, ProficiencyCycleElement, SlideToggleElement
};
