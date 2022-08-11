import React from "react";

import { useParams } from "react-router-dom";
import {  useGetSingleVendor } from "api/vendors";

import { Card, CardBody, Spinner } from "reactstrap";
import CustomCard from "views/components/CustomCard";
import { useTranslation } from "utility/language";

import ShopDetailsContent from "./ShopDetailsContent";
import ShopProducts from "./ShopProducts";
import {
  ProductTypeProvider,
  TYPE,
} from "views/pages/products/common/useProductType";

const PageContent = () => {
  const t = useTranslation();
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess } = useGetSingleVendor(id);
  const notFound = (isSuccess && data?.shop?.length === 0) ?? false;
  const shop = data?.shop ?? {};

  if (isLoading) {
    return (
      <CustomCard>
        <Spinner color="primary" size="lg" />
      </CustomCard>
    );
  }
  if (isError) {
    return (
      <CustomCard>
        <h3 className="mb-0">{t("an_error_occured")}</h3>
      </CustomCard>
    );
  }
  if (notFound) {
    return (
      <CustomCard>
        <h3 className="mb-0">{t("_not_found.shop")}</h3>
      </CustomCard>
    );
  }
  return (
    <Card>
      <CardBody>
        <ShopDetailsContent shop={shop} />
        <hr />
        <ShopProducts shop_id={shop.id} />
      </CardBody>
    </Card>
  );
};

export default function ShopDetailsPage() {
  return (
    <ProductTypeProvider productType={TYPE.SHOP_PRODUCT}>
      <PageContent />
    </ProductTypeProvider>
  );
}
