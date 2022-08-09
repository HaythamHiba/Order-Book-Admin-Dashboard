import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import { useAddDiscount,changeSentTime } from "api/discounts";
import { Formik, Form } from "formik";

import {
    getInitialValues,
  validationSchema,
} from "./formUtils";
import DiscountForm from "./DiscountForm";

const AddDiscountModal = ({ isOpen, setIsOpen }) => {
  const t = useTranslation();
  const { mutate: addDiscount, isSuccess, isLoading } = useAddDiscount();

  const handleSubmit = (values) => {
    
    let newValues=values
    if(values.is_discount_date_active)
     newValues=changeSentTime(values)
     
    addDiscount(newValues)
  };

  React.useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    
    }
  }, [isSuccess, setIsOpen]);

  return (
    <Modal centered isOpen={isOpen} size="lg">
      <ModalHeader toggle={() => setIsOpen((v) => !v)}>
        {t("add_discount")}
      </ModalHeader>
      <Formik
        onSubmit={handleSubmit}
        initialValues={getInitialValues()}
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
                {t("add")}
              </LoadingButton>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddDiscountModal;
