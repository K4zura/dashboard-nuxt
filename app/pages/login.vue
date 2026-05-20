<script setup>
const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");

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

const signInWithEmailAndPassword = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
    options: {
      redirectTo: "http://localhost:3000/confirm",
    },
  });
  if (error) console.log(error);
  console.log(data);
};
</script>

<template>
  <div class="flex h-full justify-center items-center">
    <form
      class="relative flex flex-col gap-3 max-w-[1000px] px-4 py-6 rounded-lg shadow-lg shadow-zinc-950"
    >
      <InputForm
        id="email"
        v-model="email"
        label="Email"
        type="email"
        name="email"
      />
      <InputForm
        id="password"
        v-model="password"
        label="Password"
        type="password"
        name="password"
      />
      <button
        class="flex justify-center items-center px-4 py-1 gap-1 ml-auto rounded-full bg-emerald-500 group cursor-pointer"
        @click.prevent="signInWithEmailAndPassword"
      >
        <span
          class="text-sm font-bold transition-all group-hover:text-emerald-800"
        >
          Log In
        </span>
        <Icon
          name="mdi:arrow-right"
          class="size-4 transition-all group-hover:translate-x-1 group-hover:text-emerald-800"
        />
      </button>
      <span
        class="w-full h-1 after:content-[''] after:w-2/6 after:absolute after:h-[1px] after:bg-zinc-300 before:content-[''] before:w-2/6 before:absolute before:h-[1px] before:bg-zinc-300 flex justify-center items-center after:left-5 before:right-5 my-2"
        >O</span
      >
      <button
        class="relative flex justify-center items-center gap-2 bg-gray-100 text-gray-800 rounded-lg font-bold px-4 py-1 overflow-hidden group"
        @click.prevent="signInWithOAuth"
      >
        <span class="z-10">Iniciar sesión con</span>
        <Icon name="logos:google-icon" class="size-5 z-10" />
        <div
          class="absolute inset-0 bg-emerald-400 w-0 h-full transition-all duration-300 group-hover:w-full"
        />
      </button>
    </form>
  </div>
</template>
