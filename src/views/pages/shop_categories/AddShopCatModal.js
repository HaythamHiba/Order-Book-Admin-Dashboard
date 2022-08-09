import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import CategoryForm from "./ShopCategoryForm";
import { Formik, Form } from "formik";


import {
  getInitialValues,
  getValidationSchema,
  getDataToSend,
} from "./formUtils";
import useShopsOptions from "utility/selectionOptions/useShopsOptions";
import { useAddShopCategory } from "api/shopCategories";
import { SelectField } from "components/input";

const AddCatModal = ({ isOpen, setIsOpen }) => {
  const t = useTranslation();
  const { mutate: addCategory, isSuccess, isLoading } = useAddShopCategory();
  const shopOptions=useShopsOptions();
  

  const handleSubmit = (values) => {
    addCategory(getDataToSend(values));
  };

  React.useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess, setIsOpen]);

  return (
    <Modal centered isOpen={isOpen} size="lg">
      <ModalHeader toggle={() => setIsOpen((v) => !v)}>
        {t("add_shop_category")}
      </ModalHeader>
      <Formik
        onSubmit={handleSubmit}
        initialValues={getInitialValues()}
        validationSchema={getValidationSchema()}
      >
        {(formik) => (
          <Form>
            <ModalBody>
         
              <CategoryForm
            
              />
                 <SelectField
                    label={t("shop")}
              options={shopOptions}
              name="shop_id"
              onChange={(opt) => {
                formik.setFieldValue("shop_id",opt.value ?? "");
              }}
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

export default AddCatModal;
