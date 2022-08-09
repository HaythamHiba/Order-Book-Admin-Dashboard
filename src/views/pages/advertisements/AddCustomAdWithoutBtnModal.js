import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import { useAddCustomWithoutBtnAd } from "api/advertisements";
import CustomAdWithoutBtnForm from "./CustomAdWithoutBtnForm";
import { Formik, Form } from "formik";
import { buildFormData } from "api/helpers";
import { useImagePreview } from "hooks";
import { linkValidation } from "helpers/valdation/link";
import * as Yup from 'yup';
const initialValues = {
    translated_fields: {
        1: {
            slider_image: "",

            slider_title: "",
            slider_mobile_image: ""
        },
        2: {
            slider_image: "",
            slider_title: "",
            slider_mobile_image: ""
        },
    },
    slider_link: "",
    slider_sort: 1,
};
export default function AddCustomAdWithoutBtnModal({ isOpen, setIsOpen }) {
    const t = useTranslation();
    const addMutation = useAddCustomWithoutBtnAd();
    const validationSchema = Yup.object().shape({
        slider_link: linkValidation
    })
    const {
        preview: en_preview,
        handleImageChange: en_handleImageChange,
        setPreview: en_setPreview
    } = useImagePreview(null);
    const {
        preview: ar_preview,
        handleImageChange: ar_handleImageChange,
        setPreview: ar_setPreview
    } = useImagePreview(null);
    const {
        preview: en_mobile_preview,
        handleImageChange: en_mobile_handleImageChange,
        setPreview: en_mobile_setPreview
    } = useImagePreview(null);
    const {
        preview: ar_mobile_preview,
        handleImageChange: ar_mobile_handleImageChange,
        setPreview: ar_mobile_setPreview
    } = useImagePreview(null);

    React.useEffect(() => {
        if (addMutation.isSuccess) {
            setIsOpen(false);
            en_setPreview(null);
            ar_setPreview(null);
            en_mobile_setPreview(null);
            ar_mobile_setPreview(null);
        }
    }, [addMutation.isSuccess, en_mobile_setPreview, ar_mobile_setPreview, ar_setPreview, en_setPreview, setIsOpen])
    const handleSubmit = (values) => {
        const valuesWithType = { ...values, slider_type: "custom_without_btn" }
        const formdata = new FormData();
        buildFormData(formdata, valuesWithType)
        addMutation.mutate(formdata);
    }

    return <Modal centered isOpen={isOpen} size="lg">
        <ModalHeader toggle={() => setIsOpen((v) => !v)}>
            {t('add_ad')}
        </ModalHeader>
        <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
            {(formik) => (
                <Form>
                    <ModalBody>
                        <CustomAdWithoutBtnForm
                            en_preview={en_preview}
                            ar_preview={ar_preview}
                            ar_handleImageChange={ar_handleImageChange}
                            en_handleImageChange={en_handleImageChange}
                            en_mobile_preview={en_mobile_preview}
                            ar_mobile_preview={ar_mobile_preview}
                            ar_mobile_handleImageChange={ar_mobile_handleImageChange}
                            en_mobile_handleImageChange={en_mobile_handleImageChange}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            disabled={addMutation.isLoading}
                            onClick={() => setIsOpen(false)}
                            color="danger"
                        >
                            {t("cancel")}
                        </Button>
                        <LoadingButton
                            type="submit"
                            isLoading={addMutation.isLoading}
                            color="primary"
                        >
                            {t('add')}
                        </LoadingButton>
                    </ModalFooter>
                </Form>
            )}
        </Formik>
    </Modal>

}
