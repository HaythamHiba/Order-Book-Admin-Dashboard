import React from "react";
import { Card, CardHeader, CardTitle, CardBody, Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { Formik, Form } from "formik";
import Tabs from "components/Tabs";
import { getInitialValues, getValidationSchema } from "./utils/formSchema";

import { buildFormData } from "api/helpers";
import { LoadingButton } from "components/input/LoadingButton";

import useFormTabs from "./utils/useFormTabs";
import { history } from "../../../history";


import AuthComponent from "components/AuthComponent";
import { useAddAuctionOrder } from "api/auction_orders";

const AddAuctionPage = () => {
  const t = useTranslation();
  const mutation=useAddAuctionOrder();
  const {
    mutate: addAuction,
    isLoading,
    isSuccess,

  } = mutation;

  React.useEffect(() => {
    if (isSuccess) {
        history.push('/auctions_orders/all')
    }
  }, [isSuccess]);

  const tabs = useFormTabs(false);

  const handleSubmit = (values) => {
      
    const formData = new FormData();
    buildFormData(formData, values);
    addAuction(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t("add_auction_order")}
        </CardTitle>
        <Button
          color="primary"
          onClick={() => history.push('/auctions_orders/all')}
        >
          {t("back")}
        </Button>
      </CardHeader>
      <CardBody>
        <Formik
          onSubmit={handleSubmit}
          initialValues={ getInitialValues()}
          validationSchema={getValidationSchema()}
        >
          {(formik) => (
            <Form>
              <Tabs tabs={tabs} />

              <AuthComponent>
           
                <div className="d-flex justify-content-center align-items-center">
                  <LoadingButton
                    type="submit"
                    color="primary"
                    isLoading={isLoading}
                  >
                    {t("add")}
                  </LoadingButton>
                </div>
              </AuthComponent>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};


export default AddAuctionPage;
