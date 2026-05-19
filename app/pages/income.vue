<template>
  <div>
    <div class="flex items-center justify-between">
      <PageTitle>INGRESOS</PageTitle>
      <button
        class="bg-emerald-700 text-white px-2 rounded ml-2 flex items-center justify-center gap-1"
        @click="openModal"
      >
        <span>Add Income</span>
        <Icon
          name="mdi:add"
          class="text-white bg-zinc-700 text-3xl rounded-full p-1 cursor-pointer"
        />
      </button>
    </div>

    <table v-if="incomes" class="w-full max-w-[1000px] rounded overflow-hidden">
      <thead class="grid grid-cols-1 gap-2 bg-emerald-700 p-4">
        <tr class="grid grid-cols-[1fr_1fr_1fr_auto] gap-2">
          <th class="text-left">Name</th>
          <th class="text-left">Mount</th>
          <th class="text-left">Type</th>
        </tr>
      </thead>
      <tbody class="grid grid-cols-1 gap-0">
        <tr
          v-for="(income, index) in incomes"
          :key="income.id"
          class="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 odd:bg-gray-600 even:bg-gray-800 p-4"
        >
          <td class="text-left">{{ income.name }}</td>
          <td class="text-left">{{ income.mount.toLocaleString("es-CO") }}</td>
          <td class="text-left">{{ income.type }}</td>
          <td class="flex gap-2">
            <Icon
              name="mdi:edit"
              class="text-blue-500 size-5 rounded-full p-1 cursor-pointer"
            />
            <Icon
              name="mdi:delete"
              class="text-red-500 size-5 rounded-full p-1 cursor-pointer"
              @click="deleteIncome(income.id, index)"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="modal"
      class="fixed inset-0 bg-black/60 flex items-center justify-center"
    >
      <div class="absolute inset-0" @click="openModal" />
      <div class="bg-gray-700 p-4 rounded relative">
        <h3 class="font-extrabold text-xl mb-3">Add Income</h3>
        <form action="" class="flex flex-col gap-3" @submit.prevent="addIncome">
          <InputForm
            id="incomeToSave"
            v-model="incomeToSave"
            label="Income"
            type="text"
            name="incomeToSave"
          />
          <InputForm
            id="incomeMount"
            v-model="incomeMount"
            label="Mount"
            type="number"
            name="incomeMount"
          />
          <InputForm
            id="incomeType"
            v-model="incomeType"
            label="Type"
            type="select"
            name="incomeType"
            :options="[
              { label: 'Salary', value: 'salary' },
              { label: 'Freelance', value: 'freelance' },
              { label: 'Other', value: 'other' },
            ]"
          />
          <div class="flex justify-end gap-2">
            <button
              type="button"
              class="bg-blue-700 text-white px-2 rounded ml-2"
              @click="openModal"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="bg-blue-700 text-white px-2 rounded ml-2"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PageTitle from "~/components/PageTitle.vue";
import type { Database } from "~/types/database.types";

const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();
const incomeToSave = ref("");
const incomeMount = ref("");
const incomeType = ref("");
const incomes = ref();
const modal = ref(false);

const openModal = () => {
  modal.value = !modal.value;
};

onMounted(() => {
  getIncomes();
  // getRecurrenceTypes()
});

const getIncomes = async () => {
  const { data, error } = await supabase.from("incomes").select("*");
  if (error) {
    console.log(error);
    return;
  }
  incomes.value = data;
};

const addIncome = async () => {
  const { data, error } = await supabase
    .from("incomes")
    .insert({
      user_id: user.value?.sub,
      name: incomeToSave.value,
      mount: incomeMount.value,
      type: incomeType.value,
    })
    .select()
    .single();
  if (error) {
    console.log(error);
    return;
  }
  incomes.value.push(data);
  incomeToSave.value = "";
  incomeMount.value = "";
  incomeType.value = "";
  modal.value = false;
};

const deleteIncome = async (id: number, index: number | string) => {
  const { error } = await supabase.from("incomes").delete().eq("id", id);
  if (error) {
    console.log(error);
    return;
  }
  incomes.value.splice(index, 1);
};
</script>

<style></style>
