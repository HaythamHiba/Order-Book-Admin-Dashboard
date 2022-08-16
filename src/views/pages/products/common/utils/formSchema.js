import * as Yup from "yup";
import { getLanguageAttr } from "helpers/language";
import { ImageURL } from "api/config";


export const getInitialValues = ( objectToEdit = null) => {
  if (!objectToEdit) {
 
    return {
      name: {
        ar:"",
        en:""
      },
      description:{
        ar:"",
        en:""
      },
      image:"",
      category_id:"",
      sub_category_id:"",
      vendor_id:"",
      price:"",
      admin_note:"",
      status:true,
      touched:false,
      

  }}

  return {
    name: {
      ar:getLanguageAttr(objectToEdit.name,1) || "",
      en:getLanguageAttr(objectToEdit.name,0)|| ""
    },
    description: {
      ar:getLanguageAttr(objectToEdit.description,1) || "",
      en:getLanguageAttr(objectToEdit.description,0)|| ""
    },
    category_id:objectToEdit?.category_id || "",
    sub_category_id:objectToEdit?.sub_category_id || "",
    price:objectToEdit?.price || 0,
    vendor_id:objectToEdit?.vendor_id || "",




    image: "",
    image_preview:`${ImageURL}${objectToEdit.image}`,
    admin_note:objectToEdit?.admin_note || '',
    status:objectToEdit?.status || false,
    touched:false,
  };
};

export const getValidationSchema = ( editMode = false) =>
    Yup.object().shape({
    name: Yup.object({
      ar:Yup.string().required("required"),
      en:Yup.string().required("required")
    }),
    description: Yup.object({
      ar:Yup.string().required("required"),
      en:Yup.string().required("required")
    }),
    category_id:Yup.string().required("required"),
    price:Yup.number().required("required"),

    ...(!editMode && {
      image: Yup.mixed().required("required"),
    }),
  });
  export const getDataToSend=(values)=>{
    const data = { ...values };
 
    delete data["image"];
    delete data["sub_category_id"]
    delete data["category_id"]
    delete data["name"]
    delete data["description"];
    delete data["price"];
    delete data["touched"];
  return data

  }