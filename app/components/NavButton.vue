<template>
  <li class="relative flex items-center justify-start gap-2 group">
    <button
      :class="`flex-1 flex items-center gap-2 py-1.5 px-4 font-medium hover:text-gray-200 hover:bg-gray-400 transition-all duration-200 ${activeMenu === 'menu ' + label ? 'text-gray-200 bg-gray-400 rounded-l-lg' : 'text-gray-800 rounded-lg mr-3'}`"
      @click="toggleMenu('menu ' + label)"
    >
      <Icon :name="icon || `material-symbols:dashboard-rounded`" />
      <slot />
      <Icon
        name="material-symbols:arrow-back-2-rounded"
        :class="`ml-auto transition-transform duration-300 ${activeMenu === 'menu ' + label ? 'rotate-180' : 'rotate-[270deg] group-hover:rotate-180'}`"
      />
    </button>
    <!-- <input type="radio" v-model="seleccion" class="absolute peer inset-0 w-full h-full"> -->
    <!-- <ul v-if="activeMenu === `menu ${label}`" class="absolute flex flex-col w-full left-full bg-gray-300 rounded shadow-lg shadow-emerald-600 overflow-hidden">
      <NavLink v-for="(item,index) in submenus" :key="index" submenu :href="item.href">
        {{ item.title }}
      </NavLink>
    </ul> -->
  </li>
</template>

<script lang="ts" setup>
import { activeMenu, setMenu } from "~/store/activeMenu";
import { setDataPanel } from "~/store/dataPanel";
import type { SubMenus } from "~/types/types";

const props = defineProps<{
  label: string;
  icon: string;
  submenus: SubMenus[];
}>();

function toggleMenu(menu: string) {
  setDataPanel(props.label, props.submenus);
  setMenu(menu);
}
</script>
