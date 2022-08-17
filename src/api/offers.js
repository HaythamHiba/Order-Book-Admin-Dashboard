import {
    useGetQuery,
    
    useUpdateMutation,
  
  } from "./helpers";
  
  const API = {
    GET:(vendor_id)=> `/vendors/${vendor_id}/offers`,
  
    UPDATE:(vendor_id,offer_id)=> `/vendors/${vendor_id}/offers/${offer_id}/updateStatus`,
  };
  
  const KEY = "OFFERS";
  export const useGetOffers = (vendor_id) => useGetQuery(KEY, API.GET(vendor_id),{},{enabled:!!vendor_id},{vendor_id});
  
  export const useUpdateOffer = (vendor_id,offer_id) => useUpdateMutation(KEY, API.UPDATE(vendor_id,offer_id));
  
  