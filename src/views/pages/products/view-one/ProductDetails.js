import React from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import { useTranslation } from "utility/language";
import { Formik, Form } from "formik";
import Tabs from "components/Tabs";
import {
  getDataToSend,
  getInitialValues,
  getValidationSchema,
} from "../common/utils/formSchema";
import useFormTabs from "../common/utils/useFormTabs";
import { LoadingButton } from "components/input/LoadingButton";
import { Badge } from "reactstrap";


import { useUpdateDetailsMutation } from "api/items";
import { buildFormData } from "api/helpers";
import { history } from "../../../../history";
import { useIsAuthorized } from "redux/hooks/auth";

const ProductDetails = ({ product }) => {
  const t = useTranslation();
  const tabs = useFormTabs(true);
  const updateDetailsMutation = useUpdateDetailsMutation(product?.id);
 
  const isAuthorized = useIsAuthorized();

  React.useEffect(() => {
    if ( updateDetailsMutation.isSuccess) {
      history.replace(`/items/view-all`);
    }
  }, [updateDetailsMutation.isSuccess]);


  const handleSubmit = (values) => {
    const dataToSend=getDataToSend(values);
    const formData = new FormData();
    buildFormData(formData, { ...dataToSend });
    updateDetailsMutation.mutate(formData);
  };

  return (
    <Card>
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle><h3>{t("item")}</h3>
        
        
      
          
          </CardTitle>
          <Badge color={product.status?"success":"danger"}>
          {product.status?t("shown"):t("hidden")}
          </Badge>
      
      </CardHeader>
      <CardBody>
        <Formik
          validationSchema={getValidationSchema(true)}
          onSubmit={handleSubmit}
          initialValues={getInitialValues(product, true)}
        >
          {(formik) => (
            <Form>
              <Tabs tabs={tabs} />
              <div  className="d-flex   align-items-center  justify-content-between   m-1" style={{ gap: "20px" }}>
              {isAuthorized && (
                <LoadingButton
                  type="submit"
                  color="primary"
                  isLoading={updateDetailsMutation.isLoading }
                >
                  {t("save")}
                </LoadingButton>
              )}
          

              </div>
             
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

export default ProductDetails;
