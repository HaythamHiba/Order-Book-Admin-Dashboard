import * as Yup from "yup";
import { mapTranslatedProperties } from "helpers/language";

export const getInitialValues = (objectToEdit = null) => {
  if (!objectToEdit) {
    return {
      translated_fields: {
        1: {
          shop_category_name: "",
        },
        2: {
          shop_category_name: "",
        },
      },
      shop_category_sort: 1,
      shop_id:""
    };
  }

  return {
    translated_fields: {
      1: {
        shop_category_name:
          mapTranslatedProperties(
            objectToEdit?.shop_category_details,
            "shop_category_name",
            1
          ) || "",
      },
      2: {
        shop_category_name:
          mapTranslatedProperties(
            objectToEdit?.shop_category_details,
            "shop_category_name",
            2
          ) || "",
      },
    },
    shop_id:objectToEdit?.shop_id||"",
    shop_category_sort: objectToEdit.shop_category_sort ?? 1,
  };
};

export const getValidationSchema = (editMode = false) => {
  return Yup.object().shape({
    translated_fields: Yup.object({
      1: Yup.object({
        shop_category_name: Yup.string().required("required"),
      }),
      2: Yup.object({
        shop_category_name: Yup.string().required("required"),
      }),
    }),
    shop_id:Yup.number().required("required"),


  });
};

export const getDataToSend = (values) => {

  return values;
};
