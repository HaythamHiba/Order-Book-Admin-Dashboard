import React from 'react'
import { Check } from "react-feather";
import Checkbox from "components/@vuexy/checkbox/CheckboxesVuexy";
import { ValidatedField } from "components/input/ValidatedField";
import { useFormikContext } from "formik";
import { useTranslation } from 'utility/language';


export default function StatusImagesForm() {
    const formik=useFormikContext();
    const t=useTranslation();
  return (
    <>
     <Checkbox
            color="primary"
            icon={<Check className="vx-icon" size={16} />}
            label={t("active")}
            checked={formik.values.status}
            onChange={() =>
              formik.setFieldValue("status", !formik.values.status)
            }
          />
          {
            !formik.values.status&& <ValidatedField
            dir="rtl"
            name="admin_note"
            label={`${t("admin_note")}`}
            placeholder={`${t("admin_note")}`}
            as="textarea"
          />
          }
          </>
  )
}
