import React from "react";
import { Card, CardHeader, CardTitle, CardBody, Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { Formik, Form } from "formik";
import Tabs from "components/Tabs";
import { getDataToSend, getInitialValues, getValidationSchema } from "./utils/formSchema";
import { history } from "../../../../history";

import { buildFormData } from "api/helpers";
import { LoadingButton } from "components/input/LoadingButton";

import useFormTabs from "./utils/useFormTabs";

import PropTypes from "prop-types";


const navigateToAllProducts = () => {
 

    history.push(`/items/view-all`);
  
};

const AddItemPage = ({ mutation }) => {
  const t = useTranslation();
  const {
    mutate: addItem,
    isLoading,
    isSuccess,
  } = mutation;

  React.useEffect(() => {
    if (isSuccess) {
      navigateToAllProducts();
    }
  }, [isSuccess]);

  const tabs = useFormTabs();

  const handleSubmit = (values) => {
    const data={...values}
   const new_data= getDataToSend(data)
    const formData = new FormData();
    buildFormData(formData, new_data);
    addItem( formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t("add_item")} 
        </CardTitle>
        <Button
          color="primary"
          onClick={() => navigateToAllProducts()}
          disabled={isLoading}
        >
          {t("back")}
        </Button>
      </CardHeader>
      <CardBody>
        <Formik
          onSubmit={handleSubmit}
          initialValues={getInitialValues()}
          validationSchema={getValidationSchema()}
        >
          {(formik) => (
            <Form>
              <Tabs tabs={tabs} />

           
              <div className="d-flex justify-content-center align-items-center">
                <LoadingButton
                  type="submit"
                  color="primary"
                  isLoading={isLoading}
                >
                  {t("add")}
                </LoadingButton>
              </div>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

AddItemPage.propTypes = {
  mutation: PropTypes.object.isRequired,
};

export default AddItemPage;
