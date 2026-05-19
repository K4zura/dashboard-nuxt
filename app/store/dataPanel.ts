import type { SubMenus } from "~/types/types";

const label = ref();
const submenus = ref();

export function setDataPanel( newLabel: string, newSubmenus: SubMenus[] ) {
  label.value = newLabel;
  submenus.value = newSubmenus;
}

export function getLabel() {
  return label;
}

export function getSubmenus() {
  return submenus;
}