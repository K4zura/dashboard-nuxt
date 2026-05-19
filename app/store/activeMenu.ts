export const activeMenu = ref(null)

/* trunk-ignore(eslint/@typescript-eslint/no-explicit-any) */
export function setMenu(menu: any) {
    activeMenu.value = activeMenu.value === menu ? null : menu
}