import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import {  changeSentTime, useUpdateDiscount } from "api/discounts";
import { Formik, Form } from "formik";

import {
    getInitialValues,
  validationSchema,
} from "./formUtils";
import DiscountForm from "./DiscountForm";

const EditDiscountModal = ({ isOpen, setIsOpen,objectToEdit }) => {
  const t = useTranslation();
  const { mutate: updateDiscount, isSuccess, isLoading } = useUpdateDiscount();

  const handleSubmit = (values) => {
      
    let data={...values,discount_id:objectToEdit.id}
    if(values.is_discount_date_active)
     data=changeSentTime(data)
    updateDiscount(data)
  };

  React.useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    
    }
  }, [isSuccess, setIsOpen]);

  return (
    <Modal centered isOpen={isOpen} size="lg">
      <ModalHeader toggle={() => setIsOpen((v) => !v)}>
        {t("update_discount")}
      </ModalHeader>
      <Formik
        onSubmit={handleSubmit}
        initialValues={getInitialValues(objectToEdit)}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            <ModalBody>
              <DiscountForm/>
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
    </Modal>
  );
};

export default EditDiscountModal;
