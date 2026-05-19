import { capitalizeFirstLetter } from "~/utils/string";
import type { Database } from "~/types/database.types";

type EnumValue = {
  value: string;
};

export const useEnums = () => {
  const supabase = useSupabaseClient<Database>();

  const getEnumOptions = async (enumType: string) => {
    const { data, error } = await supabase.rpc("get_enum_values", {
      enum_type: enumType,
    });

    if (error) {
      console.log(error);
      return [];
    }

    return data.map((item: EnumValue) => ({
      label: capitalizeFirstLetter(item.value),
      value: item.value,
    }));
  };

  return {
    getEnumOptions,
  };
};
