import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import CategoryForm from "./ShopCategoryForm";
import { Formik, Form } from "formik";
import useShopsOptions from "utility/selectionOptions/useShopsOptions";



import {
  getInitialValues,
  getValidationSchema,
  getDataToSend,
} from "./formUtils";
import { SelectField } from "components/input";
import { useUpdateShopCategory } from "api/shopCategories";

const EditCatModal = ({ isOpen, setIsOpen, objectToEdit, setObjectToEdit }) => {
  const t = useTranslation();
  const { mutate: updateCategory, isLoading, isSuccess } = useUpdateShopCategory();
  const shopOptions=useShopsOptions();




  const handleSubmit = (values) => {
    updateCategory(getDataToSend({ ...values, shop_category_id: objectToEdit.id }));
  };

  React.useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess, setIsOpen]);


  return (
    <Modal centered isOpen={isOpen} size="lg">
      <ModalHeader toggle={() => setIsOpen((v) => !v)}>
        {t("edit_category")}
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
                <CategoryForm
                  editMode={true}
            
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

export default EditCatModal;
