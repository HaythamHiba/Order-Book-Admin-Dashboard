import * as Yup from "yup";
import { mapTranslatedProperties } from "helpers/language";
import { baseURL } from "api/config";
import { link_regex } from "helpers/valdation/link";

import { TYPE } from "../useProductType";

export const getInitialValues = (productType, objectToEdit = null) => {
  if (!objectToEdit) {
    let selections = {};
    if (productType === TYPE.OWNER_PRODUCT) {
      selections = {
        category_id: "",
        subcategory_id: "",
      };
    } else if (productType === TYPE.SHOP_PRODUCT) {
      selections = {
        shop_id: "",
        shop_category_id:"",
      };
    }
    return {
      //Language Based Fields
      translated_fields: {
        1: {
          product_name: "",
          product_description: "",
          product_note: "",
          product_mobile_description: "",
        },
        2: {
          product_name: "",
          product_description: "",
          product_note: "",
          product_mobile_description: "",
        },
      },

      ...selections,

      //Details
      discount_id: "",
      product_status_id: 1,
      product_quantity: "",
      product_main_image: "",
      product_sort: 1,
      product_price: "",
      product_video_link: "",
      is_highlight: false,
      is_active: true,

      //Additional Images
      product_additional_images: [],
    };
  }

  let selections = {};
  if (productType === TYPE.OWNER_PRODUCT) {
    selections = {
      category_id: objectToEdit?.subcategory?.category_id || "",
      subcategory_id: objectToEdit?.subcategory_id || "",
    };
  } else if (productType === TYPE.SHOP_PRODUCT) {
    selections = {
      shop_id: objectToEdit?.shop_id || "",
      shop_category_id:objectToEdit?.shop_category_id || "",
    };
  }
  return {
    //Language Based Fields
    translated_fields: {
      1: {
        product_name:
          mapTranslatedProperties(
            objectToEdit.product_details,
            "product_name",
            1
          ) || "",
        product_description:
          mapTranslatedProperties(
            objectToEdit.product_details,
            "product_description",
            1
          ) || "",
        product_note:
          mapTranslatedProperties(
            objectToEdit.product_details,
            "product_note",
            1
          ) || "",
        product_mobile_description:
          mapTranslatedProperties(
            objectToEdit.product_details,
            "product_mobile_description",
            1
          ) || "",
      },
      2: {
        product_name:
          mapTranslatedProperties(
            objectToEdit.product_details,
            "product_name",
            2
          ) || "",
        product_description:
          mapTranslatedProperties(
            objectToEdit.product_details,
            "product_description",
            2
          ) || "",
        product_note:
          mapTranslatedProperties(
            objectToEdit.product_details,
            "product_note",
            2
          ) || "",
        product_mobile_description:
          mapTranslatedProperties(
            objectToEdit.product_details,
            "product_mobile_description",
            2
          ) || "",
      },
    },

    ...selections,

    //Details
    discount_id: objectToEdit.discount_id ?? "",
    product_status_id: objectToEdit.product_status_id ?? "",
    product_quantity: objectToEdit.product_quantity ?? "",
    product_main_image: "",
    product_sort: objectToEdit.product_sort ?? 1,
    product_price: objectToEdit.product_price ?? 0,
    product_video_link: objectToEdit.product_video_link || "",
    is_highlight: objectToEdit.is_highlight ?? false,
    is_active: objectToEdit.is_active ?? false,

    product_main_image_preview: `${baseURL}${objectToEdit.product_main_image}`,
  };
};

export const getValidationSchema = (productType, editMode = false) =>
  Yup.object().shape({
    translated_fields: Yup.object({
      1: Yup.object({
        product_name: Yup.string().required("required"),
      }),
      2: Yup.object({
        product_name: Yup.string().required("required"),
      }),
    }),
    product_status_id: Yup.number().required("required"),
    product_price: Yup.number().required("required"),
    product_quantity: Yup.number().required("required"),

    ...(productType === TYPE.OWNER_PRODUCT && {
      category_id: Yup.number().required("required"),
      subcategory_id: Yup.number().required("required"),
    }),
    ...(productType === TYPE.SHOP_PRODUCT && {
      shop_id: Yup.number().required("required"),
      shop_category_id:Yup.number().required("required"),

    }),

    product_video_link: Yup.string().matches(
      link_regex,
      "validation.invalid_link"
    ),

    ...(!editMode && {
      product_main_image: Yup.mixed().required("required"),
    }),
  });
