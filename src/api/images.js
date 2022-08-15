import {
    useGetQuery,
    
    useUpdateMutation,
  
  } from "./helpers";
  
  const API = {
    GET:(vendor_id)=> `/vendors/${vendor_id}/images`,
  
    UPDATE:(vendor_id)=> `/vendors/${vendor_id}/images/updateStatus`,
  };
  
  const KEY = "CATEGORIES";
  export const useGetImages = (vendor_id) => useGetQuery(KEY, API.GET(vendor_id),{},{enabled:!!vendor_id});
  
  export const useUpdateImages = (vendor_id) => useUpdateMutation(KEY, API.UPDATE(vendor_id));
  
  