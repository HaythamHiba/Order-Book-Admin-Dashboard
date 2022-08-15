import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { useTranslation } from "utility/language";
import { useAxios } from "./useAxios";
import { validateSession } from "./validateSession";

export const useGetQuery = (key, url, params = null, options = {},keys) => {
  const axios = useAxios();
  const t = useTranslation();
  const currKeys=keys?[key,keys]:key;

  return useQuery(
    params ? [currKeys, params] : currKeys,
    async () => {
      const { data } = await axios.get(url, { params });
      return data.data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (err) => {
        const message = err?.response?.data?.message || t("failed_to_get_data");
        toast.error(message);
        validateSession(err.response);
      },
      ...options,
    }
  );
};
