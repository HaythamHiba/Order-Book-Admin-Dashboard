import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import {  useUpdateVendors } from "api/vendors";
import { Formik, Form } from "formik";
import { useImagePreview } from "hooks";
import { ImageURL  } from "api/config";

import {
  getInitialValues,
  getValidationSchema,
  getDataToSend,
} from "./formUtils";
import VendorForm from "./VendorForm";

const EditShopModal = ({
  isOpen,
  setIsOpen,
  objectToEdit,
  setObjectToEdit,
}) => {
  const t = useTranslation();
  const { mutate: updateShop, isLoading, isSuccess } = useUpdateVendors(objectToEdit?.id);

  const logo = objectToEdit?.logo;
  const { preview, handleImageChange, setPreview } =
    useImagePreview(logo);

  const handleSubmit = (values) => {
    updateShop(getDataToSend({ ...values }));
  };

  React.useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess, setIsOpen]);
  React.useEffect(() => {
    if (isOpen) {
      setPreview(`${ImageURL}${logo}`);
    }
  }, [isOpen, setPreview, logo]);

  return (
    <Modal centered isOpen={isOpen} size="xl">
      <ModalHeader toggle={() => setIsOpen((v) => !v)}>
        {t("edit_vendor")}
      </ModalHeader>
      {objectToEdit && (
        <Formik
          onSubmit={handleSubmit}
          initialValues={getInitialValues(objectToEdit)}
          validationSchema={getValidationSchema(true)}
        >
          {(formik) => (
            <Form>
              <ModalBody>
                <VendorForm
                  editMode={true}
                  preview={preview}
                  handleImageChange={handleImageChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  disabled={isLoading}
                  onClick={() => setIsOpen(false)}
                  color="danger"
                >
                  {t("cancel")}
                </Button>
                <LoadingButton
                  type="submit"
                  color="primary"
                  isLoading={isLoading}
                >
                  {t("save")}
                </LoadingButton>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      )}
    </Modal>
  );
};

export default EditShopModal;
