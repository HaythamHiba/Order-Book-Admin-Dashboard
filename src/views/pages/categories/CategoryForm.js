import React from "react";
import { ValidatedField } from "components/input/ValidatedField";
import { useTranslation } from "utility/language";
import { useFormikContext } from "formik";
import ImagePreview from "components/ImagePreview";
import { Row, Col } from "reactstrap";
import { Check } from "react-feather";
import Checkbox from "components/@vuexy/checkbox/CheckboxesVuexy";

const CategoryForm = ({ preview, editMode = false }) => {
  const t = useTranslation();
  const formik = useFormikContext();

  return (
    <Row xs={1} sm={1} md={1} lg={2} xl={2}>
      <Col>
        <ValidatedField
          dir="ltr"
          name="name[en]"
          label={`${t("category_name")} (${t("en")})`}
          placeholder={`${t("category_name")} (${t("en")})`}
          readOnly
        />
        <ValidatedField
          dir="rtl"
          name="name[ar]"
          label={`${t("category_name")} (${t("ar")})`}
          placeholder={`${t("category_name")} (${t("ar")})`}
          readOnly

        />
                
        
        <ValidatedField
          dir="rtl"
          name="name[ar]"
          label={`${t("category_name")} (${t("ar")})`}
          placeholder={`${t("category_name")} (${t("ar")})`}
          readOnly

        />
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
        
   
      </Col>
      <Col>
        <ValidatedField
          id="image"
          type="file"
          label={t("category_image")}
          name="image"
          accept="image/*"
          readOnly
        />
        <ImagePreview preview={preview} />
      </Col>
    </Row>
  );
};

export default CategoryForm;
