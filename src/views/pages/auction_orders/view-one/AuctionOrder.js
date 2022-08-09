import React from "react";
import { Spinner } from "reactstrap";
import CustomCard from "views/components/CustomCard";
import { useTranslation } from "utility/language";
import AuctionDetails from "./AuctionDetails";
import { useUpdateAuctionOrder} from 'api/auction_orders'
import { useParams } from "react-router-dom";
import { useDeleteAuctionOrder, useGetSingleAuctionOrder } from "api/auction_orders";

const OneAuctionOrderPage = () => {
  const t = useTranslation();
  const {id}=useParams()
  const { data, isLoading, isSuccess, isError } = useGetSingleAuctionOrder({auction_order_id:id});
  const deleteMutation=useDeleteAuctionOrder();
  const notFound = (isSuccess && data?.auction_order?.length === 0) ?? false;
  const auction = data?.auction_order ?? {};
  const updateMutation=useUpdateAuctionOrder(auction?.auction_order_status);

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
        <h3 className="mb-0">{t("_not_found.auction")}</h3>
      </CustomCard>
    );
  }
  return (
    <>
      <AuctionDetails
        auction={auction}
        updateDetailsMutation={updateMutation}
        deleteMutation={deleteMutation}
      
      />
  
    </>
  );
};

export default OneAuctionOrderPage;
