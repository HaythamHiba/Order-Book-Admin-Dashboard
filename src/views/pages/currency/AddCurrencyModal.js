import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import { useAddCurrency } from "api/currency";
import { Formik, Form } from "formik";

import {
    getInitialValues,
  validationSchema,
} from "./formUtils";
import CurrencyForm from "./CurrencyForm";

const AddCurrencyModal = ({ isOpen, setIsOpen }) => {
  const t = useTranslation();
  const { mutate: addCurrency, isSuccess, isLoading } = useAddCurrency();

  const handleSubmit = (values) => {

    addCurrency(values)
  };

  React.useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    
    }
  }, [isSuccess, setIsOpen]);

  return (
    <Modal centered isOpen={isOpen} size="lg">
      <ModalHeader toggle={() => setIsOpen((v) => !v)}>
        {t("add_currency")}
      </ModalHeader>
      <Formik
        onSubmit={handleSubmit}
        initialValues={getInitialValues()}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            <ModalBody>
              <CurrencyForm/>
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

export default AddCurrencyModal;
