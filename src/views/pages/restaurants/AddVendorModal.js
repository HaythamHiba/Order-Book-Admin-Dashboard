import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import {  useAddVendors } from "api/vendors";
import { Formik, Form } from "formik";
import { useImagePreview } from "hooks";

import {
  getInitialValues,
  getValidationSchema,
  getDataToSend,
} from "./formUtils";
import VendorForm from "./VendorForm";

const AddShopModal = ({ isOpen, setIsOpen }) => {
  const t = useTranslation();
  const { mutate: addShop, isSuccess, isLoading } = useAddVendors();
  const { preview, handleImageChange, setPreview } = useImagePreview(null);

  const handleSubmit = (values) => {
    addShop(getDataToSend(values));
  };

  React.useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
      setPreview(null);
    }
  }, [isSuccess, setPreview, setIsOpen]);

  return (
    <Modal centered isOpen={isOpen} size="xl">
      <ModalHeader toggle={() => setIsOpen((v) => !v)}>
        {t("add_vendor")}
      </ModalHeader>
      <Formik
        onSubmit={handleSubmit}
        initialValues={getInitialValues()}
        validationSchema={getValidationSchema()}
      >
        {(formik) => (
          <Form>
            <ModalBody>
              <VendorForm
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
                {t("add")}
              </LoadingButton>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddShopModal;
