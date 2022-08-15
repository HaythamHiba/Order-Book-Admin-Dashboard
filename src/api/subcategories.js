import {
  useGetQuery,
  
  useUpdateMutation,

} from "./helpers";

const API = {
  GET:(vendor_id)=> `/vendors/${vendor_id}/categories`,

  UPDATE:(vendor_id,category_id)=> `/vendors/${vendor_id}/categories/${category_id}/updateStatus`,
};

const KEY = "CATEGORIES";
export const useGetSubCategories = (vendor_id,category_id) => useGetQuery(KEY, API.GET(vendor_id),{parent_id:category_id},{enabled:!!vendor_id&&!!category_id});

export const useUpdateSubCategory = (vendor_id,category_id) => useUpdateMutation(KEY, API.UPDATE(vendor_id,category_id));

