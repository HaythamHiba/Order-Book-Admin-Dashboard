import {
    useGetQuery,
    useUpdateMutation,
  } from "./helpers";
  
  const API = {
   
      GET_ALL:(vendor_id,category_id)=> `/vendors/${vendor_id}/categories/${category_id}/items`,
    GET_SINGLE_PRODUCT:(vendor_id,category_id,item_id)=> `/vendors/${vendor_id}/categories/${category_id}/items/${item_id}`,
    UPDATE_DETAILS:(vendor_id,category_id,item_id)=> `/vendors/${vendor_id}/categories/${category_id}/items/${item_id}/updateStatus`,
  
  };
  
  const KEY = "ITEMS";
  export const useGetItems = (vendor_id,category_id) =>
    useGetQuery(KEY, API.GET_ALL(vendor_id,category_id),{}, { enabled: !!vendor_id&&!!category_id},{vendor_id,category_id});

  
  const SINGLE_PRODUCT_KEY = "SINGLE_ITEM";
  const UPDATE_SINGLE_ITEM_KEY="UPDATE_KEY"
  export const useGetSingleItem = (vendor_id,category_id,item_id) =>
    useGetQuery(SINGLE_PRODUCT_KEY, API.GET_SINGLE_PRODUCT(vendor_id,category_id,item_id),null ,{} );
  export const useUpdateDetailsMutation = (vendor_id,category_id,item_id) =>
  useUpdateMutation(UPDATE_SINGLE_ITEM_KEY, API.UPDATE_DETAILS(vendor_id,category_id,item_id));
 