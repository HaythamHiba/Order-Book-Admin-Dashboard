import * as Yup from "yup";
import { getLanguageAttr } from "helpers/language";

export const getInitialValues = (objectToEdit = null) => {
  if (!objectToEdit) {
    return {
      name: {
        ar:"",
        en:""
      },
      image:"",
      status:"",
      admin_note:"",
      
    };
  }

  return {
    name: {
      ar:getLanguageAttr(objectToEdit.name,1) || "",
      en:getLanguageAttr(objectToEdit.name,0)|| ""
    },
    image: "",
    status:objectToEdit?.status||"",
    admin_note:objectToEdit?.admin_note|| ""

  };
};

export const getValidationSchema = (editMode = false) => {
  return Yup.object().shape({
    name: Yup.object({
      ar:Yup.string().required("required"),
      en:Yup.string().required("required")
    }),

    ...(!editMode && {
      image: Yup.mixed().required("required"),
    }),
  });
};

export const getDataToSend = (values) => {
  const data = { ...values };
    delete data["image"];
    delete data["name"];
    if(values.status){
      delete data["admin_note"]
    }
    return data;

};
