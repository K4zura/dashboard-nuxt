<template>
  <aside class="[grid-area:aside] flex flex-col justify-start">
    <div
      class="flex items-center justify-center gap-2 font-extrabold text-2xl mt-4 text-gray-700"
    >
      <Icon class="text-shadow-lg text-emerald-600" name="mdi:wall-fire" />
      <h1 class="text-shadow-lg text-gray-700">Hackeboard</h1>
    </div>
    <nav class="pl-5 py-3" aria-label="Navegación principal">
      <ul class="flex flex-col justify-center gap-1">
        <NavLink href="">Dashboard</NavLink>
        <NavButton
          v-for="menu in menus"
          :key="menu.label"
          :label="menu.label"
          :icon="menu.icon"
          :submenus="menu.submenus"
        >
          {{ menu.label }}
        </NavButton>
      </ul>
    </nav>
  </aside>
  <button v-if="user" @click="signOut">Sign Out</button>
</template>

<script setup>
const menus = [
  {
    label: "Finanzas",
    icon: "material-symbols:money-bag-rounded",
    submenus: [
      { href: "income", title: "Ingresos" },
      { href: "expense", title: "Gastos" },
      { href: "saving", title: "Ahorrros" },
      { href: "debt", title: "Deudas" },
    ],
  },
  {
    label: "Proyectos",
    icon: "material-symbols:view-kanban-rounded",
    submenus: [
      { href: "timeline", title: "Timeline" },
      { href: "list", title: "List" },
      { href: "resources", title: "Resources" },
    ],
  },
  {
    label: "Daily",
    icon: "material-symbols:clear-day-rounded",
    submenus: [
      { href: "routine", title: "Rutina" },
      { href: "diet", title: "Dieta" },
      { href: "exercise", title: "Ejercicios" },
    ],
  },
  {
    label: "Ideas",
    icon: "material-symbols:lightbulb",
    submenus: [
      { href: "movies", title: "Peliculas & Series" },
      { href: "programming", title: "Programacion" },
      { href: "study", title: "Estudio" },
    ],
  },
  {
    label: "Trabajo",
    icon: "material-symbols:work",
    submenus: [
      { href: "bot", title: "Bot" },
      { href: "tickets", title: "Tickets" },
      { href: "calendar", title: "Calendar" },
      { href: "documentation", title: "Documentacion" },
    ],
  },
];
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.log(error);
  navigateTo("/");
};
</script>

<style></style>
