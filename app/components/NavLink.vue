<template>
  <li class="relative flex items-center justify-start gap-2">
    <NuxtLink :to="`/${href}`"
      :class="`flex-1 flex items-center gap-2 py-1.5 px-4 font-medium hover:text-gray-200 hover:bg-emerald-600 rounded-lg ${submenu ? 'text-sm' : 'mr-3'}`"
      active-class="text-gray-200 bg-emerald-600 rounded-lg"
    >
      <Icon v-if="!submenu" :name="icon || `material-symbols:dashboard-rounded`" />
      <slot />
    </NuxtLink>
  </li>
</template>

<script lang="ts" setup>
defineProps({
  href: String,
  submenu: Boolean,
  icon: String,
})
</script>

<style scope>
a:not(.router-link-exact-active) {
  color: theme('colors.gray.700');
}

</style>
