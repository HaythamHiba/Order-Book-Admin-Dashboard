import React from "react";
import { Formik, Form } from "formik";
import { Row, Col } from "reactstrap";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import { useUpdateAboutUs } from "api/information";

import { useImagePreview } from "hooks/useImagePreview";
import ImagePreview from "components/ImagePreview";
import { ValidatedField } from "components/input/ValidatedField";
import { mapTranslatedProperties } from "helpers/language";
import { baseURL } from "api/config";

import { getInitialValues, getDataToSend } from "./formUtils";
import SingleLangEditor from "../SingleLangEditor";
import AuthComponent from "components/AuthComponent";

const AboutUsForm = ({ about_us }) => {
  const t = useTranslation();
  const { mutate: updateInfo, isLoading } = useUpdateAboutUs();

  const about_us_image = mapTranslatedProperties(about_us, "about_us_image", 1);
  const { preview, handleImageChange } = useImagePreview(
    about_us_image ? `${baseURL}${about_us_image}` : null
  );

  const handleSubmit = (values) => {
    const dataToSend = getDataToSend(values);
    updateInfo(dataToSend);
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={getInitialValues(about_us)}>
      {(formik) => (
        <Form>
          <Row xs={1} sm={1} md={1} lg={2} xl={2}>
            <Col>
              <SingleLangEditor langCode={1} property="about_us_description" />
              <hr />
              <SingleLangEditor langCode={2} property="about_us_description" />
            </Col>
            <Col>
              <ValidatedField
                id="about_us_image"
                name="about_us_image"
                label={t("about_us_image")}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  handleImageChange(e);
                  formik.setFieldValue("about_us_image", e.target.files[0]);
                }}
              />
              <ImagePreview preview={preview} height={300} />
            </Col>
          </Row>

          <hr />
          <AuthComponent>
            <div className="w-100 d-flex align-items-center justify-content-center">
              <LoadingButton
                color="primary"
                type="submit"
                isLoading={isLoading}
              >
                {t("save")}
              </LoadingButton>
            </div>
          </AuthComponent>
        </Form>
      )}
    </Formik>
  );
};

export default AboutUsForm;
