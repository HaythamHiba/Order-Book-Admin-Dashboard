import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import OneTableForm from "./OneTableForm";
import { Formik, Form } from "formik";
import { useImagePreview } from "hooks";
import {  ImageURL } from "api/config";

import {
  getInitialValues,
  
} from "./formUtils";

const EditOneTableModal = ({ isOpen, setIsOpen, objectToEdit,  }) => {
  const t = useTranslation();



  const image = objectToEdit?.table_image;

  const { preview, handleImageChange, setPreview } =
    useImagePreview(image);



  React.useEffect(() => {
    if (isOpen) {
      setPreview(`${ImageURL}${image}`);
    }
  }, [isOpen, setPreview, image]);


  return (
    <Modal centered isOpen={isOpen} size="md">
      <ModalHeader toggle={() => setIsOpen((v) => !v)}>
        {t("table")}
      </ModalHeader>
      {objectToEdit && (
        <Formik
          initialValues={getInitialValues(objectToEdit)}
        >
          {(formik) => (
            <Form>
              <ModalBody>
                <OneTableForm
                  editMode={true}
                  preview={preview}
                  handleImageChange={handleImageChange}
                />
              </ModalBody>
              <ModalFooter>
      
                <Button
                  
                  onClick={() => setIsOpen(false)}
                  color="danger"
                >
                  {t("cancel")}
                </Button>
       
                
              </ModalFooter>
            </Form>
          )}
        </Formik>
      )}
    </Modal>
  );
};

export default EditOneTableModal;
