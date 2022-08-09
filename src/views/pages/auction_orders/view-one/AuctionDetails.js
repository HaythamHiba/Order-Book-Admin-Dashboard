import React from "react";
import { Card, CardHeader, Button, CardTitle, CardBody } from "reactstrap";
import { useTranslation } from "utility/language";
import { Formik, Form } from "formik";
import Tabs from "components/Tabs";
import { getInitialValues, getValidationSchema } from "../utils/formSchema";
import useFormTabs from "../utils/useFormTabs";
import { LoadingButton } from "components/input/LoadingButton";

import { buildFormData } from "api/helpers";
import confirmAlert from "extensions/confirm-alert";
import { useTranslatedLabels } from "extensions/confirm-alert/useTranslatedLabels";
import {history} from '../../../../history'


import AuthComponent from "components/AuthComponent";
import StatusActionAuctionOrderController from "components/StatusActionAuctionOrderController";

const AuctionDetails = ({ auction, updateDetailsMutation, deleteMutation}) => {
  const t = useTranslation();
  const confirmOptions = useTranslatedLabels();
  const tabs = useFormTabs(true,auction);

  

  React.useEffect(() => {
    if (deleteMutation.isSuccess) {
      history.push('/auctions_orders/all')
    }
  }, [deleteMutation.isSuccess]);

  const handleDelete = () => {
    confirmAlert({
      onConfirm: () => {
        deleteMutation.mutate({
          id: auction.id,
        });
      },
      ...confirmOptions,
    });
  };

  const handleSubmit = (values) => {
    const formData = new FormData();
    buildFormData(formData, {auction_order_id:auction.id, ...values });
    updateDetailsMutation.mutate(formData);
  };
  console.log(auction?.auction_order_status)
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t("edit_auction_order")}
        </CardTitle>
        <div
          className="d-flex align-items-center flex-wrap"
          style={{ gap: "1em" }}
        >
          <Button
            onClick={() =>  history.push('/auctions_orders/all')}
            color="primary"
          >
            {t("back")}
          </Button>
          <AuthComponent>
            <LoadingButton
              color="danger"
              isLoading={deleteMutation.isLoading}
              onClick={handleDelete}
            >
              {t("delete")}
            </LoadingButton>
          </AuthComponent>
       
        </div>
      </CardHeader>
      <CardBody>
            <div style={{display:"block",margin:"1rem 0"}}>

              <AuthComponent>
                  <StatusActionAuctionOrderController auction_order_status={auction?.auction_order_status} auction_order_id={auction?.id}/>
              </AuthComponent>
            </div>
        <Formik
          validationSchema={getValidationSchema( true,auction?.auction_order_status)}
          onSubmit={handleSubmit}
          initialValues={getInitialValues(auction)}
        >
          {(formik) => (
            <Form>
              <Tabs tabs={tabs} />

              <AuthComponent>
        
                <div className="d-flex justify-content-center align-items-center">
                  <LoadingButton
                    type="submit"
                    color="primary"
                    isLoading={updateDetailsMutation.isLoading}
                  >
                    {t("save")}
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

export default AuctionDetails;
