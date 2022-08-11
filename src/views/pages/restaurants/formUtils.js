import * as Yup from "yup";
import { getLanguageAttr } from "helpers/language";
import { buildFormData } from "api/helpers";

export const getInitialValues = (objectToEdit = null) => {
  if (!objectToEdit) {
    return {
      name: {
        ar:"",
        en:""
      },
      longitude:36.278336,
      latitude:33.510414,
      logo: "",
      
    };
  }


  return {
    name: {
      ar:getLanguageAttr(objectToEdit.name,0) || "",
      en:getLanguageAttr(objectToEdit.name,1) || ""
    },
    longitude:objectToEdit?.longitude || 36.278336,
    latitude:objectToEdit?.latitude || 33.510414,
    logo: "",
  };
};

export const getValidationSchema = (editMode = false) => {
  return Yup.object().shape({
    name: Yup.object({
      ar:Yup.string().required("required"),
      en:Yup.string().required("required")
    }),

    longitude:Yup.number().required("required"),
    latitude:Yup.number().required("required"),

    ...(!editMode && {
      logo: Yup.mixed().required("required"),
    }),
  });
};

export const getDataToSend = (values) => {
  const data = { ...values };
  if (values.logo === "") {
    delete data["logo"];
  }
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
};
