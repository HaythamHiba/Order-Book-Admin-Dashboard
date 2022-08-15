import React from "react";
import { useBackendLanguageCode } from "utility/language/useLanguageCode";
import { getLanguageAttr } from "helpers/language";
import { useGetCategories } from "api/categories";
import { useTranslation } from "utility/language";

const useCategoryOptions = ({ withAllOption = false } = {},vendor_id) => {
  const languageCode = useBackendLanguageCode();
  const { data } = useGetCategories(vendor_id);
  const t = useTranslation();

  return React.useMemo(() => {
    let options = [];
    if (data && data && Array.isArray(data)) {
      options = data.map((category) => ({
        value: category.id,
        label: getLanguageAttr(category.name,languageCode)
      }));
    }

    if (withAllOption) {
      return [{ label: t("all"), value: null }, ...options];
    }
    return options;
  }, [data, languageCode, withAllOption, t]);
};

export default useCategoryOptions;
