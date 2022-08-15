import React from "react";
import { Card, CardHeader, CardTitle, CardBody, Badge } from "reactstrap";
import { useTranslation } from "utility/language";
import { Formik, Form } from "formik";
import { ExistingImage } from "./ExistingImage";
import { LoadingButton } from "components/input/LoadingButton";
import StatusImagesForm from "./StatusImagesForm";
import { getInitialValues } from "./formUtils";





const AdditionalImages = ({ data, mutation }) => {
  const t = useTranslation();





  const handleSubmit = (values) => {
    mutation.mutate(values)



  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("additional_images")}</CardTitle>

      {
        
        data[0].status!==null&&<Badge color={data[0].status?"success":"danger"}>
         {data[0].status?t("shown"):t("hidden")}
         </Badge>
       
      }
      </CardHeader>
      <CardBody>
        <div className="d-flex flex-wrap">
          {data.length === 0 && (
            <div
              className="d-flex w-100 align-items-center justify-content-center"
              style={{ height: "10rem" }}
            >
              <h3>{t("no_images")}</h3>
            </div>
          )}
          {data.map((img) => (
            <ExistingImage
              key={img.id}
              image={img}
           
            />
          ))}
        </div>
        <hr />
      
          <Formik
            onSubmit={handleSubmit}
            initialValues={getInitialValues(data)}
          >
            {(formik) => (
              <Form>
                <StatusImagesForm/>
           
                <div className="d-flex justify-content-center align-items-center">
                  <LoadingButton
                    type="submit"
                    color="primary"
                    isLoading={mutation.isLoading}
                  >
                    {t("save")}
                  </LoadingButton>
                </div>
              </Form>
            )}
          </Formik>
       
      </CardBody>
    </Card>
  );
};

export default AdditionalImages;
