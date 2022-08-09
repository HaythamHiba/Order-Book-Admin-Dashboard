import * as Yup from "yup";
import { mapTranslatedProperties } from "helpers/language";


export const getInitialValues = ( objectToEdit = null) => {
  if (!objectToEdit) {
   
    return {
      //Language Based Fields
      translated_fields: {
        1: {
          auction_name: "",
         auction_mobile_description: "",
        },
        2: {
          auction_name: "",
          auction_mobile_description: "",
        },
      },


      //Details
      
      auction_main_image: "",
      customer_id:"",
      customer_phone_number:"",
      customer_name:"",
      auction_order_total:"",
      customer_address_country:"",
      customer_address_city:"",
      customer_address_street:"",
      customer_address_building_number:"",
      customer_address_additional_information:"",
      payment_method:"",
      payment_code:"",
      payment_status:"",



    };
  }


  return {
    //Language Based Fields
    translated_fields: {
      1: {
        auction_name:
          mapTranslatedProperties(
            objectToEdit.auction_items,
            "auction_name",
            1
          ) || "",

        auction_mobile_description:
          mapTranslatedProperties(
            objectToEdit.auction_items,
            "auction_mobile_description",
            1
          ) || "",
      },
      2: {
        auction_name:
          mapTranslatedProperties(
            objectToEdit.auction_items,
            "auction_name",
            2
          ) || "",


        auction_mobile_description:
          mapTranslatedProperties(
            objectToEdit.auction_items,
            "auction_mobile_description",
            2
          ) || "",
      },
    },



    customer_id:objectToEdit?.customer_id||"",
    customer_phone_number:objectToEdit?.customer_phone_number||"",
      customer_name:objectToEdit?.customer_name|| "",
      auction_order_total:objectToEdit.auction_order_total||"",
    customer_address_country:objectToEdit?.customer_address_country ||"",
    customer_address_city:objectToEdit?.customer_address_city || "",
    customer_address_street:objectToEdit?.customer_address_street || "",
    customer_address_building_number:objectToEdit?.customer_address_building_number || "",
    customer_address_additional_information:objectToEdit?.customer_address_additional_information || "",
    payment_method:objectToEdit?.payment_method||"",
    payment_code:objectToEdit?.payment_code||"",
    payment_status:objectToEdit?.payment_status|| ""
  };
};

export const getValidationSchema = ( editMode = false,auction_order_status="") =>
  Yup.object().shape({
    translated_fields: Yup.object({
      1: Yup.object({
       auction_name: Yup.string().required("required"),
      }),
      2: Yup.object({
       auction_name: Yup.string().required("required"),
      }),
    }),
    ...(editMode &&auction_order_status!=="pending_payment"&& {
      customer_address_country:Yup.string().required('required'),
      customer_address_city:Yup.string().required('required'),
      
      customer_address_street :Yup.string().required('required'),
      customer_address_building_number:Yup.string().required("required"),
    }),
    customer_id:Yup.number().required("required"),

    auction_order_total:Yup.number().required("required"),

    customer_name:Yup.string().required("required"),
    customer_phone_number:Yup.number().required("required"),
 
  });
