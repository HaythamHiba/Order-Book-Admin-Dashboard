import React from "react";
import { ValidatedField } from "components/input/ValidatedField";
import { useTranslation } from "utility/language";
import { useFormikContext } from "formik";
import ImagePreview from "components/ImagePreview";
import { Row, Col } from "reactstrap";

const SingleLangForm = ({ langCode }) => {
  const t = useTranslation();

  const langKey = `lang_${langCode}`;
  const langLabel = `(${t(langKey)})`;
  const dir = langCode === 1 ? "ltr" : "rtl";
  return (
    <>
      <ValidatedField
        dir={dir}
        name={`translated_fields[${langCode}][shop_name]`}
        label={`${t("shop_name")} ${langLabel}`}
        placeholder={`${t("shop_name")} ${langLabel}`}
      />
      <ValidatedField
        dir={dir}
        name={`translated_fields[${langCode}][shop_description]`}
        label={`${t("shop_description")} ${langLabel}`}
        placeholder={`${t("shop_description")} ${langLabel}`}
        as="textarea"
        rows="5"
      />
      <ValidatedField
        dir={dir}
        name={`translated_fields[${langCode}][shop_mobile_description]`}
        label={`${t("shop_mobile_description")} ${langLabel}`}
        placeholder={`${t("shop_mobile_description")} ${langLabel}`}
        as="textarea"
        rows="3"
      />
    </>
  );
};

const CategoryForm = ({ preview, handleImageChange, editMode = false }) => {
  const t = useTranslation();
  const formik = useFormikContext();

  return (
    <Row xs={1} sm={1} md={1} lg={2} xl={3}>
      <Col>
        <SingleLangForm langCode={1} />
      </Col>
      <Col>
        <SingleLangForm langCode={2} />
      </Col>
      <Col>
        <ValidatedField
          name="shop_sort"
          label={t("sort")}
          placeholder={t("sort")}
          type="number"
        />
        <ValidatedField
          id="shop_image"
          type="file"
          label={t("shop_image")}
          name="shop_image"
          accept="image/*"
          onChange={(e) => {
            handleImageChange(e);
            formik.setFieldValue("shop_image", e.target.files[0]);
          }}
        />
        <ImagePreview preview={preview} />
      </Col>
    </Row>
  );
};

export default CategoryForm;
