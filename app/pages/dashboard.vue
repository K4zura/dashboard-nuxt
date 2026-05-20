<template>
  <div>
    <PageTitle>Dashboard</PageTitle>
    <div class="bg-gray-700 p-4 rounded relative">
      <p>Balance: {{ balance }}</p>
    </div>
  </div>
</template>

<script setup>
import PageTitle from "~/components/PageTitle.vue";
const supabase = useSupabaseClient();
const balance = ref(0);

definePageMeta({
  middleware: ["auth"],
});

const getBalance = async () => {
  const [
    { data: incomes, error: incomesError },
    { data: expenses, error: expensesError },
  ] = await Promise.all([
    supabase.from("incomes").select("mount"),

    supabase.from("expenses").select("mount"),
  ]);

  if (incomesError || expensesError) {
    console.log(incomesError || expensesError);
    return 0;
  }

  const totalIncomes = incomes.reduce(
    (acc, income) => acc + Number(income.mount),
    0,
  );

  const totalExpenses = expenses.reduce(
    (acc, expense) => acc + Number(expense.mount),
    0,
  );
  balance.value = totalIncomes - totalExpenses;
};
onMounted(() => {
  getBalance();
});
</script>

<style></style>
