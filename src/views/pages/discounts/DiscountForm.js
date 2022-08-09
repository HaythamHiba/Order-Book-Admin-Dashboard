import React from 'react'
import { ValidatedField } from 'components/input'
import { useTranslation } from 'utility/language'
import CheckBoxesVuexy from 'components/@vuexy/checkbox/CheckboxesVuexy';
import { useFormikContext } from 'formik';
import { Check } from 'react-feather';
export default function DiscountForm() {
    const t = useTranslation();
    const formik = useFormikContext();
    return (
        <>
            <ValidatedField
                dir="ltr"
                name="translated_fields[1][discount_name]"
                label={`${t("discount_name")} (${t("en")})`}
                placeholder={`${t("discount_name")} (${t("en")})`}
            />
            <ValidatedField
                dir="rtl"
                name="translated_fields[2][discount_name]"
                label={`${t("discount_name")} (${t("ar")})`}
                placeholder={`${t("discount_name")} (${t("ar")})`}
            />
            <ValidatedField

                name="discount_rate"
                label={t("discount_rate")}
                placeholder={t("discount_rate")}
            />
            {formik.values.is_discount_date_active === true ?
                <>
                    <ValidatedField

                        name="start_at"
                        label={t("start_at")}
                        placeholder={t("start_at")}
                        type="datetime-local"
                    />
                    <ValidatedField

                        name="end_at"
                        label={t("end_at")}
                        placeholder={t("end_at")}
                        type="datetime-local"
                    />
                </> : null}
            <CheckBoxesVuexy
                color="primary"
                icon={<Check className="vx-icon" size={16} />}
                label={t("is_discount_date_active")}
                checked={formik.values.is_discount_date_active}
                onChange={() => {
                    formik.setFieldValue("is_discount_date_active", !formik.values.is_discount_date_active)
                }
                }
            />

        </>
    )
}
