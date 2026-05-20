<script setup>
const supabase = useSupabaseClient();

definePageMeta({
  middleware: ["auth"],
});

const signInWithOAuth = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/confirm",
    },
  });
  if (error) console.log(error);
};
</script>

<template>
  <!-- <form class="row flex-center flex" @submit.prevent="signInWithOtp"> -->
  <div>
    <button
      class="flex justify-center items-center gap-2 bg-gray-100 text-gray-800 rounded-lg font-bold px-4 py-1"
      @click="signInWithOAuth"
    >
      <span>Iniciar sesión con</span>
      <Icon name="logos:google-icon" class="size-5" />
    </button>
  </div>
  <!-- </form> -->
</template>
