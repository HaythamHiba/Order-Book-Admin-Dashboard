import { formatFromBackend } from "helpers/date";
import { mapTranslatedProperties } from "helpers/language";
import * as Yup from 'yup';
export const getInitialValues = (objectToEdit) => {
    const initialValues = {
        translated_fields: {
            1: {
                discount_name: ""
            },
            2: {
                discount_name: ""
            }
        },
        start_at: "",
        end_at: "",
        discount_rate: 1,
        is_discount_date_active: true

    }
    if (!objectToEdit)
        return initialValues;
    return {
        translated_fields: {
            1: {
                discount_name: mapTranslatedProperties(objectToEdit?.discount_details, "discount_name", 1) || ""
            },
            2: {
                discount_name: mapTranslatedProperties(objectToEdit?.discount_details, "discount_name", 2) || ""

            }
        },
        start_at: objectToEdit.start_at !== null ? formatFromBackend(objectToEdit?.start_at) : "",
        end_at: objectToEdit.end_at !== null ? formatFromBackend(objectToEdit?.end_at) : "",
        discount_rate: objectToEdit?.discount_rate || 0,
        is_discount_date_active: objectToEdit?.is_discount_date_active

    }
}
export const validationSchema = Yup.object({
    translated_fields: Yup.object({
        1: Yup.object({
            discount_name: Yup.string().required("_required.discount_name")
        }),
        2: Yup.object({
            discount_name: Yup.string().required("_required.discount_name")
        })
    }),
    discount_rate: Yup.number().required("_required.discount_rate").min(1, "validation.min_number").max(100, "validation.max_number"),
    start_at: Yup.date(),
    end_at: Yup.date().min(
        Yup.ref('start_at'),
        "validation.end_at"
    ),
    is_discount_date_active: Yup.string().required("_required.is_discount_date_active")
})