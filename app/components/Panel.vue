<template>
  <nav aria-label="Navegación Panel" :class="`[grid-area:panel] relative flex flex-col items-start justify-start gap-2 my-3 py-6 rounded-lg group bg-gray-400 ${activeMenu === 'menu ' + getLabel().value ? 'w-[180px]' : 'w-0'} transition-all duration-300 overflow-hidden`">
    <h2 class="text-xl font-extrabold pl-8 text-emerald-700">{{ getLabel().value || 'Panel' }}</h2>
    <ul class="flex flex-col w-full px-4 gap-1">
      <LazyNavLink v-for="(item,index) in getSubmenus().value" :key="index" submenu :href="item.href">
        {{ item.title }}
      </LazyNavLink>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { activeMenu } from '~/store/activeMenu';
import { getLabel, getSubmenus } from '~/store/dataPanel';

</script>
