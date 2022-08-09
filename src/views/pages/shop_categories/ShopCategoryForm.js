import React from "react";
import { ValidatedField } from "components/input/ValidatedField";
import { useTranslation } from "utility/language";

const CategoryForm = ({  editMode = false }) => {
  const t = useTranslation();

  return (
  
     <>
        <ValidatedField
          dir="ltr"
          name="translated_fields[1][shop_category_name]"
          label={`${t("shop_category_name")} (${t("en")})`}
          placeholder={`${t("shop_category_name")} (${t("en")})`}
        />
        <ValidatedField
          dir="rtl"
          name="translated_fields[2][shop_category_name]"
          label={`${t("shop_category_name")} (${t("ar")})`}
          placeholder={`${t("shop_category_name")} (${t("ar")})`}
        />
        <ValidatedField
          name="shop_category_sort"
          label={t("sort")}
          placeholder={t("sort")}
          type="number"
        />
     </>
  );
};

export default CategoryForm;
