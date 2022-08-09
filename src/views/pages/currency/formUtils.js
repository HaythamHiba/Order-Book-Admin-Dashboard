import { mapTranslatedProperties } from "helpers/language";
import * as Yup from 'yup';
export const getInitialValues = (objectToEdit) => {
    const initialValues = {
        translated_fields: {
            1: {
                currency_name: "",
                currency_code: ""
            },
            2: {
                currency_name: "",
                currency_code: ""
            }
        },
       currency_rate: 1,
        is_active:true,
        is_default:false,

    }
    if (!objectToEdit)
        return initialValues;
    return {
        translated_fields: {
            1: {
                currency_name: mapTranslatedProperties(objectToEdit?.currency_details, "currency_name", 1) || "",
                currency_code: mapTranslatedProperties(objectToEdit?.currency_details, "currency_code", 1) || ""
            },
            2: {
                currency_name: mapTranslatedProperties(objectToEdit?.currency_details, "currency_name", 2) || "",
                currency_code: mapTranslatedProperties(objectToEdit?.currency_details, "currency_code", 2) || ""

            }
        },
     
        currency_rate: objectToEdit?.currency_rate || 0,
        is_active:objectToEdit?.is_active,
        is_default:objectToEdit?.is_default,
    }
}
export const validationSchema = Yup.object({
    translated_fields: Yup.object({
        1: Yup.object({
            currency_name: Yup.string().required("_required.currency_name"),
            currency_code: Yup.string().required("_required.currency_code")
        }),
        2: Yup.object({
            currency_name: Yup.string().required("_required.currency_name"),
            currency_code: Yup.string().required("_required.currency_code")
        })
    }),
    currency_rate: Yup.number().required("_required.currency_rate"),
   
})