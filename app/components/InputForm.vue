<template>
  <div class="relative flex flex-col items-center justify-center gap-2">
    <!-- prettier-ignore -->
    <input
      v-if="type !== 'select'"
      :id="label"
      :type="type === 'number' ? 'text' : type"
      :inputmode="type === 'number' ? 'numeric' : undefined"
      :name="label"
      placeholder=" "
      :value="
        type === 'number' ? formatNumber(String(modelValue || '')) : modelValue
      "
      class="bg-transparent rounded border-2 border-gray-200 px-3 py-1 w-full outline-none ring-0 peer text-gray-100"
      @input="handleInput"
    >

    <select
      v-if="type === 'select'"
      :id="label"
      :name="label"
      :value="modelValue"
      class="bg-transparent rounded border-2 border-gray-200 px-3 py-2 w-full outline-none ring-0 peer text-gray-100"
      @change="
        emit('update:modelValue', ($event.target as HTMLSelectElement).value)
      "
    >
      <option value="" selected disabled>Selecciona una opcion</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <label
      :for="label"
      class="absolute left-4 font-medium flex items-center px-2 text-gray-400 bg-gray-700 peer-focus:-translate-y-[18px] peer-focus:-translate-x-2 peer-focus:text-sm peer-[:not(:placeholder-shown)]:-translate-x-2 peer-[:not(:placeholder-shown)]:-translate-y-[18px] peer-[:not(:placeholder-shown)]:text-sm transition-all duration-300"
      >{{ label }}</label
    >
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: { type: String, default: "" },
  label: { type: String, default: "" },
  type: { type: String, default: "" },
  options: {
    type: Array<{
      label: string;
      value: string;
    }>,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const formatNumber = (value: string | number) => {
  if (!value) return "";

  return Number(value).toLocaleString("es-CO");
};

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement;

  if (props.type !== "number") {
    emit("update:modelValue", input.value);
    return;
  }

  let rawValue = input.value.replace(/\D/g, "");
  rawValue = rawValue.replace(/^0+/, "");
  emit("update:modelValue", rawValue);
  input.value = formatNumber(rawValue);
};
</script>

<style scope></style>
