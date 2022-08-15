import React from "react";
import { ValidatedField } from "components/input/ValidatedField";
import { Row, Col } from "reactstrap";
import { useTranslation } from "utility/language";

const SingleLanguage = ({ langID, langCode }) => {
  const t = useTranslation();
  const lang = ` (${t(langCode)})`;

  return (
    <>
      <ValidatedField
        name={`name[${langCode}]`}
        label={t("item_name") + lang}
        placeholder={t("item_name") + lang}
        isRequired
        readOnly
      />
      <ValidatedField
        name={`description[${langCode}]`}
        label={t("item_description") + lang}
        placeholder={t("item_description") + lang}
        as="textarea"
        readOnly
      />

    </>
  );
};

const LanguageBasedForm = () => {
  return (
    <Row xs={1} sm={1} md={1} lg={2} xl={2}>
      <Col dir="ltr">
        <SingleLanguage langID={0} langCode="en" />
      </Col>
      <Col dir="rtl">
        <SingleLanguage langID={1} langCode="ar" />
      </Col>
    </Row>
  );
};

export default LanguageBasedForm;
