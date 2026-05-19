<script setup>
const user = useSupabaseUser()

const gridStyles = computed(() => {
  if (user) {
    return {
      gridTemplateAreas: `"aside panel main"`,
      gridTemplateColumns: "200px auto 1fr",
    }
  }

  return {
    gridTemplateAreas: `"main"`,
    gridTemplateColumns: "1fr",
  }
})
</script>

<template>
  <div id="app" class="relative h-screen text-white" :style="gridStyles">
    <NuxtLayout :name="user ? 'default' : 'auth'">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@import url("~/assets/css/main.css");

#app {
  display: grid;
  grid-template-rows: 1fr;
  font-family: 'Inter', sans-serif;
}

.page-enter-active,
.page-leave-active {
  transition: all .3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
  /* translate: -200px; */
}
</style>
