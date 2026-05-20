<script setup>
const user = useSupabaseUser();
</script>

<template>
  <NuxtLayout :name="user ? 'default' : 'auth'">
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import url("~/assets/css/main.css");
</style>
