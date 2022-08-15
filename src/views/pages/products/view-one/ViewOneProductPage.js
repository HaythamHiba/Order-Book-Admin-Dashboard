import React from "react";
import { useParams } from "react-router-dom";
import {  useGetSingleItem } from "api/items";
import { Spinner } from "reactstrap";
import CustomCard from "views/components/CustomCard";
import { useTranslation } from "utility/language";
import ProductDetails from "./ProductDetails";
// import AdditionalImages from "./AdditionalImages";
// import ProductTabs from "./ProductTabs";


const ViewOneProductPage = () => {
  const t = useTranslation();
  const { id,category_id,vendor_id } = useParams();
  const { data, isLoading } = useGetSingleItem(vendor_id,category_id,id);


  const product = data?data:  {};

  if (isLoading) {
    return (
      <CustomCard>
        <Spinner color="primary" size="lg" />
      </CustomCard>
    );
  }
  if (!data) {
    return (
      <CustomCard>
        <h3 className="mb-0">{t("product_not_found")}</h3>
      </CustomCard>
    );
  }
  return (
    <>
      <ProductDetails

         product={product} />
      {/* <AdditionalImages product={product} /> */}
      {/* <ProductTabs
        commentQuery={commentQuery}
        reviewsQuery={reviewsQuery}
        commentMuation={commentMuation}
        reviewsMutation={reviewsMutation}

      /> */}
    </>
  );
};

export default ViewOneProductPage;
