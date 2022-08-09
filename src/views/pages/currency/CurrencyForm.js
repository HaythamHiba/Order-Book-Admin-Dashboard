import React from 'react'
import { ValidatedField } from 'components/input'
import { useTranslation } from 'utility/language'

export default function CurrencyForm() {
    const t = useTranslation();
    return (
        <>
            <ValidatedField
                dir="ltr"
                name="translated_fields[1][currency_name]"
                label={`${t("currency_name")} (${t("en")})`}
                placeholder={`${t("currency_name")} (${t("en")})`}
            />
            <ValidatedField
                dir="rtl"
                name="translated_fields[2][currency_name]"
                label={`${t("currency_name")} (${t("ar")})`}
                placeholder={`${t("currency_name")} (${t("ar")})`}
            />
            <ValidatedField
                dir="ltr"
                name="translated_fields[1][currency_code]"
                label={`${t("currency_code")} (${t("en")})`}
                placeholder={`${t("currency_code")} (${t("en")})`}
            />
            <ValidatedField
                dir="rtl"
                name="translated_fields[2][currency_code]"
                label={`${t("currency_code")} (${t("ar")})`}
                placeholder={`${t("currency_code")} (${t("ar")})`}
            />
            <ValidatedField

                name="currency_rate"
                label={t("currency_rate")}
                placeholder={t("currency_rate")}
            />



        </>
    )
}
