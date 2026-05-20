<template>
  <div id="app" class="relative h-screen text-white">
    <aside-bar />
    <PanelNav />
    <main
      class="[grid-area:main] my-3 mx-3 px-6 py-4 rounded-xl shadow-md shadow-zinc-950 overflow-auto bg-gray-700"
    >
      <slot />
    </main>
    <div
      class="absolute -z-50 w-full h-full bg-gradient-to-r from-gray-300 via-gray-500 to-gray-700"
    />
  </div>
</template>

<script setup></script>

<style>
#app {
  display: grid;
  grid-template-rows: 1fr;
  font-family: "Inter", sans-serif;
  grid-template-areas: "aside panel main";
  grid-template-columns: 200px auto 1fr;
  grid-template-rows: 1fr;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  box-sizing: border-box;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
  /* translate: -200px; */
}
</style>
