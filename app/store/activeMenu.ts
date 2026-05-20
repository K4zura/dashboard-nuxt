export const activeMenu = ref<string | null>(null);

export function setMenu(menu: string) {
  activeMenu.value = activeMenu.value === menu ? null : menu;
}
