<template>
  <div>
    <div class="flex items-center justify-between">
      <PageTitle>GASTOS</PageTitle>
      <button
        class="bg-emerald-700 text-white px-2 rounded ml-2 flex items-center justify-center gap-1"
        @click="openModal"
      >
        <span>Add Expense</span>
        <Icon
          name="mdi:add"
          class="text-white bg-zinc-700 text-3xl rounded-full p-1 cursor-pointer"
        />
      </button>
    </div>

    <table
      v-if="expenses"
      class="w-full max-w-[1000px] rounded overflow-hidden"
    >
      <thead class="grid grid-cols-1 gap-2 bg-emerald-700 p-4">
        <tr class="grid grid-cols-[1fr_1fr_1fr_auto] gap-2">
          <th class="text-left">Name</th>
          <th class="text-left">Mount</th>
          <th class="text-left">Type</th>
        </tr>
      </thead>
      <tbody class="grid grid-cols-1 gap-0">
        <tr
          v-for="(expense, index) in expenses"
          :key="expense.id"
          class="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 odd:bg-gray-600 even:bg-gray-800 p-4"
        >
          <td class="text-left">{{ expense.name }}</td>
          <td class="text-left">{{ expense.mount.toLocaleString("es-CO") }}</td>
          <td class="text-left">{{ capitalizeFirstLetter(expense.type) }}</td>
          <td class="flex gap-2">
            <Icon
              name="mdi:edit"
              class="text-blue-500 size-5 rounded-full p-1 cursor-pointer"
            />
            <Icon
              name="mdi:delete"
              class="text-red-500 size-5 rounded-full p-1 cursor-pointer"
              @click="deleteExpense(expense.id, index)"
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
        <h3 class="font-extrabold text-xl mb-3">Add Expense</h3>
        <form
          action=""
          class="flex flex-col gap-3"
          @submit.prevent="addExpense"
        >
          <InputForm
            id="expenseName"
            v-model="expenseName"
            label="Expense"
            type="text"
            name="expenseName"
          />
          <InputForm
            id="expenseMount"
            v-model="expenseMount"
            label="Mount"
            type="number"
            name="expenseMount"
          />
          <InputForm
            id="expenseType"
            v-model="expenseType"
            label="Type"
            type="select"
            name="expenseType"
            :options="recurrenceOptions"
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
const expenseName = ref("");
const expenseMount = ref("");
const expenseType = ref("");
const expenses = ref();
const modal = ref(false);
const { getEnumOptions } = useEnums();
const recurrenceOptions = ref();

const openModal = () => {
  modal.value = !modal.value;
};

onMounted(async () => {
  getExpenses();
  recurrenceOptions.value = await getEnumOptions("expense_types");
});

const getExpenses = async () => {
  const { data, error } = await supabase.from("expenses").select("*");
  if (error) {
    console.log(error);
    return;
  }
  expenses.value = data;
};

const addExpense = async () => {
  const { data, error } = await supabase
    .from("expenses")
    .insert({
      user_id: user.value?.sub,
      name: expenseName.value,
      mount: expenseMount.value,
      type: expenseType.value,
    })
    .select()
    .single();
  if (error) {
    console.log(error);
    return;
  }
  expenses.value.push(data);
  expenseName.value = "";
  expenseMount.value = "";
  expenseType.value = "";
  modal.value = false;
};

const deleteExpense = async (id: number, index: number | string) => {
  const { error } = await supabase.from("expenses").delete().eq("id", id);
  if (error) {
    console.log(error);
    return;
  }
  expenses.value.splice(index, 1);
};
</script>

<style></style>
