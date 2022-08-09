import React from 'react'

import { ValidatedField } from "components/input/ValidatedField";
import { useTranslation } from "utility/language";

export default function CustomerAddressForm({auction={},editMode=false}) {
    const t=useTranslation();
  return (

    <>
    

         <ValidatedField

        name="customer_address_country"
        label={t("customer_address_country")}
        placeholder={t("customer_address_country")}
        type="text"


        />
        <ValidatedField

        name="customer_address_city"
        label={t("customer_address_city")}
        placeholder={t("customer_address_city")}
        type="text"


        />
        <ValidatedField

        name="customer_address_street"
        label={t("customer_address_street")}
        placeholder={t("customer_address_street")}
        type="text"


        />
        <ValidatedField

        name="customer_address_building_number"
        label={t("customer_address_building_number")}
        placeholder={t("customer_address_building_number")}
        type="text"


        />
        <ValidatedField

        name="customer_address_additional_information"
        label={t("customer_address_additional_information")}
        placeholder={t("customer_address_additional_information")}
        type="text"
        as="textarea"


        />

    </>
  )
}
