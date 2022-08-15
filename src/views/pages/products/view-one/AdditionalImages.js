import React from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import { useTranslation } from "utility/language";
import AdditionalImagesForm from "../common/forms/AdditionalImagesForm";
import { Formik, Form } from "formik";
import { ExistingImage } from "./ExistingImage";
import { LoadingButton } from "components/input/LoadingButton";
import { useUpdateImages } from "api/products";
import { buildFormData } from "api/helpers";
import { useIsAuthorized } from "redux/hooks/auth";

const AdditionalImages = ({ product }) => {
  const t = useTranslation();
  const [deletedImages, setDeletedImages] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const mutation = useUpdateImages();
  const resetRef = React.useRef(null);
  const isAuthorized = useIsAuthorized();

  React.useEffect(() => {
    if (mutation.isSuccess) {
      resetRef.current.click();
      setDeletedImages([]);
      setImages([]);
    }
  }, [mutation.isSuccess]);

  const handleSubmit = (values) => {
    const delete_additional_images = {};
    deletedImages.forEach((id, index) => {
      delete_additional_images[index + 1] = {
        image_id: id,
      };
    });

    const dataToSend = {
      ...values,
      product_id: product.id,
      delete_additional_images,
    };

    const formData = new FormData();
    buildFormData(formData, dataToSend);
    mutation.mutate(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("additional_images")}</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="d-flex flex-wrap">
          {product.images.length === 0 && (
            <div
              className="d-flex w-100 align-items-center justify-content-center"
              style={{ height: "10rem" }}
            >
              <h3>{t("no_images")}</h3>
            </div>
          )}
          {product.images.map((img) => (
            <ExistingImage
              key={img.id}
              image={img}
              deletedImages={deletedImages}
              onDelete={() => setDeletedImages((arr) => [...arr, img.id])}
            />
          ))}
        </div>
        <hr />
        {isAuthorized && (
          <Formik
            onSubmit={handleSubmit}
            initialValues={{ product_additional_images: [] }}
          >
            {(formik) => (
              <Form>
                <h4>{t("add_new_images")}</h4>
                <AdditionalImagesForm images={images} setImages={setImages} />
                <button
                  ref={resetRef}
                  type="reset"
                  style={{ display: "none" }}
                ></button>
                <LoadingButton
                  color="primary"
                  isLoading={mutation.isLoading}
                  type="submit"
                >
                  {t("save")}
                </LoadingButton>
              </Form>
            )}
          </Formik>
        )}
      </CardBody>
    </Card>
  );
};

export default AdditionalImages;
