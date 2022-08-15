import React from "react";
import { useBackendLanguageCode } from "utility/language/useLanguageCode";
import { getLanguageAttr } from "helpers/language";
import { useGetSubCategories } from "api/subcategories";
import { useTranslation } from "utility/language";

const useSubCategoryOptions = ({ withAllOption = false } = {}) => {
  const languageCode = useBackendLanguageCode();
  const { data } = useGetSubCategories();
  const t = useTranslation();

  return React.useMemo(() => {
    let options = [];
    if (data && data && Array.isArray(data)) {
      options = data.map((category) => ({
        value: category.id,
        label:getLanguageAttr(category.name,languageCode)
      }));
    }

    if (withAllOption) {
      return [{ label: t("all"), value: null }, ...options];
    }
    return options;
  }, [data, languageCode, withAllOption, t]);
};

export default useSubCategoryOptions;
