import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import { useUpdateCurrency } from "api/currency";
import { Formik, Form } from "formik";

import {
    getInitialValues,
  validationSchema,
} from "./formUtils";
import DiscountForm from "./CurrencyForm";

const EditCurrencyModal = ({ isOpen, setIsOpen,objectToEdit }) => {
  const t = useTranslation();
  const { mutate: updateCurrency, isSuccess, isLoading } = useUpdateCurrency();

  const handleSubmit = (values) => {
      const data={...values,currency_id:objectToEdit.id}
  

    updateCurrency(data)
  };

  React.useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    
    }
  }, [isSuccess, setIsOpen]);

  return (
    <Modal centered isOpen={isOpen} size="lg">
      <ModalHeader toggle={() => setIsOpen((v) => !v)}>
        {t("update_currency")}
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

export default EditCurrencyModal;
