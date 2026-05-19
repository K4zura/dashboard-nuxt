<template>
   <aside-bar />
   <panel />
   <main class="[grid-area:main] my-3 mx-3 px-6 py-4 rounded-xl shadow-md shadow-zinc-950 overflow-auto bg-gray-700">
      <slot />
   </main>
   <div class="absolute -z-50 w-full h-full bg-gradient-to-r from-gray-300 via-gray-500 to-gray-700"></div>
</template>

<script lang="ts" setup>
import AsideBar from '~/components/AsideBar.vue';
import Panel from '~/components/Panel.vue';


</script>

<style>

</style>