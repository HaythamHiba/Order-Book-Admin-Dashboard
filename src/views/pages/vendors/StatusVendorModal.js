import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import {  useUpdateVendorStatus } from "api/vendors";
import { Formik, Form } from "formik";


import {
  
  
  
  getStatusInitialValues,
} from "./formUtils";
import StatusForm from "./StatusForm";

const StatusVendorModal = ({
  isOpen,
  setIsOpen,
  objectToEdit,
  setObjectToEdit,
}) => {
  const t = useTranslation();
  const { mutate: updateShopStatus, isLoading, isSuccess } = useUpdateVendorStatus(objectToEdit?.id);


  const handleSubmit = (values) => {
    updateShopStatus(values);
  };

  React.useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess, setIsOpen]);


  return (
    <Modal centered isOpen={isOpen} size="md">
      <ModalHeader toggle={() => setIsOpen((v) => !v)}>
        {t("edit_vendor")}
      </ModalHeader>
      {objectToEdit && (
        <Formik
          onSubmit={handleSubmit}
          initialValues={getStatusInitialValues(objectToEdit)}
    
        >
          {(formik) => (
            <Form>
              <ModalBody>
                <StatusForm
                  editMode={true}

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

export default StatusVendorModal;
