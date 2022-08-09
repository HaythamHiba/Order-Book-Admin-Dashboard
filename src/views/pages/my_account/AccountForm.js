import { ValidatedField } from 'components/input'
import React from 'react'
import { useTranslation } from 'utility/language'
export default function AccountForm() {
    const t = useTranslation();
    return (
        <>
            <ValidatedField
                name="full_name"
                label={t("full_name")}
                placeholder={t("full_name")}
                
            />
            <ValidatedField
                name="email"
                label={t("email")}
                placeholder={t("email")}
                
            />
            <ValidatedField
                name="phone"
                label={t("phone")}
                placeholder={t("phone")}
                
            />
            <ValidatedField
                name="password"
                label={t("new.password")}
                placeholder={t("new.password")}
                type="password"

            />
            <ValidatedField
                name="password_confirmation"
                label={t("new.confirm_password")}
                placeholder={t("new.confirm_password")}
                type="password"
            />
        </>
    )
}
