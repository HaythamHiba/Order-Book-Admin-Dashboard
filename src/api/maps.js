import {
    useGetQuery,
    
    useUpdateMutation,
  
  } from "./helpers";
  
  const API = {
    GET:(vendor_id)=> `/vendors/${vendor_id}/maps`,
    GET_SINGLE:(vendor_id,map_id)=> `/vendors/${vendor_id}/maps/${map_id}`,
  
    UPDATE:(vendor_id,map_id)=> `/vendors/${vendor_id}/maps/${map_id}/updateStatus`,
  };
  
  const KEY = "MAPS";
  export const useGetMaps = (vendor_id) => useGetQuery(KEY, API.GET(vendor_id),{},{enabled:!!vendor_id},{vendor_id});
  
  export const useGetSingleMap = (vendor_id,map_id) => useGetQuery("SINGLE_MAP", API.GET_SINGLE(vendor_id,map_id),{},{enabled:!!vendor_id&&!!map_id},{vendor_id,map_id});
  
  export const useUpdateMap = (vendor_id,map_id) => useUpdateMutation(KEY, API.UPDATE(vendor_id,map_id));
  
  