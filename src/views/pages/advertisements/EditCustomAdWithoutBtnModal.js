import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik, Form } from 'formik'
import { baseURL } from 'api/config';
import { useTranslation } from 'utility/language';
import CustomAdWithoutBtnForm from './CustomAdWithoutBtnForm';
import { useUpdateCustomWithoutBtnAd } from 'api/advertisements';
import { useImagePreview } from 'hooks';
import { mapTranslatedProperties } from 'helpers/language';
import { LoadingButton } from 'components/input';
import { buildFormData } from 'api/helpers';
import { Button } from 'reactstrap';
import { linkValidation } from 'helpers/valdation/link';
import * as Yup from "yup"
const getInitialValues = (objectToEdit) => ({
    translated_fields: {
        1: {
            slider_image: " ",
            slider_mobile_image: " ",
            slider_title: mapTranslatedProperties(
                objectToEdit.slider_details,
                "slider_title",
                1
            ),
     
        },
        2: {
            slider_image: " ",
            slider_mobile_image: " ",
            slider_title: mapTranslatedProperties(
                objectToEdit.slider_details,
                "slider_title",
                2
            ),
 
        }

    },
    slider_link: objectToEdit?.slider_link || " ",
    slider_sort: objectToEdit?.slider_sort || 1,
    slider_type: objectToEdit.slider_type,


})
const EditCustomAdWithoutBtnModal = ({
    isOpen,
    setIsOpen,
    objectToEdit,
    setObjectToEdit
}
) => {
    const t = useTranslation();

    const ar_image = mapTranslatedProperties(
        objectToEdit?.slider_details,
        "slider_image",
        2
    )
    const en_image = mapTranslatedProperties(
        objectToEdit?.slider_details,
        "slider_image",
        1
    )
    const en_mobile_image = mapTranslatedProperties(
        objectToEdit?.slider_details,
        "slider_mobile_image",
        1
    )
    const ar_mobile_image = mapTranslatedProperties(
        objectToEdit?.slider_details,
        "slider_mobile_image",
        2
    )
    const {
        preview: ar_preview,
        setPreview: ar_setPreview,
        handleImageChange: ar_handleImageChange,
    } = useImagePreview(ar_image);
    const {
        preview: en_preview,
        handleImageChange: en_handleImageChange,
        setPreview: en_setPreview,
    } = useImagePreview(en_image);
    const {
        preview: ar_mobile_preview,
        setPreview: ar_mobile_setPreview,
        handleImageChange: ar_mobile_handleImageChange,
    } = useImagePreview(ar_mobile_image);
    const {
        preview: en_mobile_preview,
        handleImageChange: en_mobile_handleImageChange,
        setPreview: en_mobile_setPreview,
    } = useImagePreview(en_mobile_image)
    const updateMutation = useUpdateCustomWithoutBtnAd();

    React.useEffect(() => {
        if (updateMutation.isSuccess) {
            setIsOpen(false);
        }
    }, [updateMutation.isSuccess, setIsOpen])
    React.useEffect(() => {
        if (isOpen) {
            en_setPreview(`${baseURL}${en_image}`)
            ar_setPreview(`${baseURL}${ar_image}`)
            en_mobile_setPreview(`${baseURL}${en_mobile_image}`)
            ar_mobile_setPreview(`${baseURL}${ar_mobile_image}`)
        }
    }, [ar_image, en_image, isOpen, en_setPreview, ar_setPreview, ar_mobile_image, en_mobile_image, en_mobile_setPreview, ar_mobile_setPreview])
    const validationSchema = Yup.object().shape({
        slider_link: linkValidation
    })
    const handleSubmit = (values) => {
        const data = { ...values, slider_id: objectToEdit.id ,slider_type:"custom_without_btn"};
        const enImageEmpty = values.translated_fields[1].slider_image === "";
        const arImageEmpty = values.translated_fields[2].slider_image === "";
        const enMobileImageEmpty = values.translated_fields[1].slider_mobile_image === "";
        const arMobileImageEmpty = values.translated_fields[2].slider_mobile_image === "";
        if (enImageEmpty) {
            delete data["translated_fields"][1]["slider_image"];
        }
        if (arImageEmpty) {
            delete data["translated_fields"][2]["slider_image"];
        }
        if (enMobileImageEmpty) {
            delete data["translated_fields"][1]["slider_mobile_image"]
        }
        if (arMobileImageEmpty) {
            delete data["translated_fields"][2]["slider_mobile_image"]
        }

        const formData = new FormData();
        buildFormData(formData, data);
        updateMutation.mutate(formData);
    }
    return <Modal centered isOpen={isOpen} size="lg">
        <ModalHeader toggle={() => setIsOpen((v) => !v)}>
            {t('edit_ad')}
        </ModalHeader>
        {objectToEdit &&
            <Formik onSubmit={handleSubmit} initialValues={getInitialValues(objectToEdit)} validationSchema={validationSchema}>
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
                                editMode={true}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                disabled={updateMutation.isLoading}
                                color='danger'
                                onClick={() => setIsOpen(false)}
                            >
                                {t('cancel')}
                            </Button>
                            <LoadingButton
                                type="submit"
                                color="primary"
                                isLoading={updateMutation.isLoading}
                            >
                                {t('edit')}
                            </LoadingButton>
                        </ModalFooter>
                    </Form>
                )}
            </Formik>
        }


    </Modal>
}
export default EditCustomAdWithoutBtnModal;