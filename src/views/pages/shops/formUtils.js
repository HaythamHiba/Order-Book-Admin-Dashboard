import * as Yup from "yup";
import { mapTranslatedProperties } from "helpers/language";
import { buildFormData } from "api/helpers";

export const getInitialValues = (objectToEdit = null) => {
  if (!objectToEdit) {
    return {
      translated_fields: {
        1: {
          shop_name: "",
          shop_description: "",
          shop_mobile_description: "",
        },
        2: {
          shop_name: "",
          shop_description: "",
          shop_mobile_description: "",
        },
      },
      shop_image: "",
      shop_sort: 1,
    };
  }

  const en = mapTranslatedProperties(
    objectToEdit?.shop_details,
    ["shop_name", "shop_description", "shop_mobile_description"],
    1
  );
  const ar = mapTranslatedProperties(
    objectToEdit?.shop_details,
    ["shop_name", "shop_description", "shop_mobile_description"],
    2
  );
  return {
    translated_fields: {
      1: {
        shop_name: en?.shop_name || "",
        shop_description: en?.shop_description || "",
        shop_mobile_description: en?.shop_mobile_description || "",
      },
      2: {
        shop_name: ar?.shop_name || "",
        shop_description: ar?.shop_description || "",
        shop_mobile_description: ar?.shop_mobile_description || "",
      },
    },
    shop_image: "",
    shop_sort: objectToEdit.shop_sort ?? 1,
  };
};

export const getValidationSchema = (editMode = false) => {
  return Yup.object().shape({
    translated_fields: Yup.object({
      1: Yup.object({
        shop_name: Yup.string().required("required"),
      }),
      2: Yup.object({
        shop_name: Yup.string().required("required"),
      }),
    }),

    ...(!editMode && {
      shop_image: Yup.mixed().required("required"),
    }),
  });
};

export const getDataToSend = (values) => {
  const data = { ...values };
  if (values.shop_image === "") {
    delete data["shop_image"];
  }
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
};
