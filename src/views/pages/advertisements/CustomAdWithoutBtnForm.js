import React from "react";
import { Row, Col } from "reactstrap";
import { ValidatedField } from "components/input/ValidatedField";
import { useTranslation } from "utility/language";
import { useFormikContext } from "formik";
import ImagePreview from "components/ImagePreview";

export default function CustomAdWithoutBtnForm
    ({
        en_preview,
        ar_preview,
        en_handleImageChange,
        ar_handleImageChange,
        en_mobile_preview,
        en_mobile_handleImageChange,
        ar_mobile_preview,
        ar_mobile_handleImageChange,
        editMode = false
    }) {
    const t = useTranslation();
    const formik = useFormikContext();


    return <>
        <ValidatedField
            name="slider_link"
            label={t("link")}
            placeholder={t("link")}
        />
        <Row xs={1} sm={1} md={1} lg={2} xl={2}>
            <Col>

                <ValidatedField
                    name="translated_fields[1][slider_title]"
                    label={`${t('title')} (${t('en')})`}
                    placeholder={`${t('title')} (${t('en')})`}

                />
                <ValidatedField
                    id="translated_fields[1][slider_image]"
                    type="file"
                    label={`${t("image")} (${t("en")})`}
                    name="translated_fields[1][slider_image]"
                    accept="image/*"
                    onChange={(e) => {
                        en_handleImageChange(e);
                        formik.setFieldValue(
                            "translated_fields[1][slider_image]",
                            e.target.files[0]
                        );
                    }}
                    required={editMode ? false : true}
                />
                <ImagePreview preview={en_preview} />
                <ValidatedField
                    id="translated_fields[1][slider_mobile_image]"
                    type="file"
                    label={`${t("mobile_image")} (${t("en")})`}
                    name="translated_fields[1][slider_mobile_image]"
                    accept="image/*"
                    onChange={(e) => {
                        en_mobile_handleImageChange(e);
                        formik.setFieldValue(
                            "translated_fields[1][slider_mobile_image]",
                            e.target.files[0]
                        );
                    }}
                    required={editMode ? false : true}
                />
                <ImagePreview preview={en_mobile_preview} />

            </Col>
            <Col>

                <ValidatedField
                    name="translated_fields[2][slider_title]"
                    label={`${t('title')} (${t('ar')})`}
                    placeholder={`${t('title')} (${t('ar')})`}

                />
                <ValidatedField
                    id="translated_fields[2][slider_image]"
                    type="file"
                    label={`${t("image")} (${t("ar")})`}
                    name="translated_fields[2][slider_image]"
                    accept="image/*"
                    onChange={(e) => {
                        ar_handleImageChange(e);
                        formik.setFieldValue(
                            "translated_fields[2][slider_image]",
                            e.target.files[0]
                        );
                    }}
                    required={editMode ? false : true}
                />
                <ImagePreview preview={ar_preview} />
                <ValidatedField
                    id="translated_fields[2][slider_mobile_image]"
                    type="file"
                    label={`${t("mobile_image")} (${t("ar")})`}
                    name="translated_fields[2][slider_mobile_image]"
                    accept="image/*"
                    onChange={(e) => {
                        ar_mobile_handleImageChange(e);
                        formik.setFieldValue(
                            "translated_fields[2][slider_mobile_image]",
                            e.target.files[0]
                        );
                    }}
                    required={editMode ? false : true}
                />
                <ImagePreview preview={ar_mobile_preview} />
            </Col>
        </Row>
        <ValidatedField
            name='slider_sort'
            label={t('sort')}
            placeholder={t('sort')}
            type="number"

        />
    </>;
}
