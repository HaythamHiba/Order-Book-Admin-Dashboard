import {
  useGetQuery,
  useAddMutation,
  useUpdateMutation,
  useDeleteMutation,
  useToggleStatus,
} from "./helpers";

const API = {
  GET: `/vendors`,
  GET_SINGLE_SHOP:(id)=> `/vendors/${id}`,
  ADD: `/vendors/create`,
  UPDATE:(id)=> `/vendors/${id}/update`,
  DELETE: `/delete`,
  UPDATE_STATUS: `/api/admin/shops/update_status`,
};

const KEY = "VENDORS";
export const useGetVendors = () => useGetQuery(KEY, API.GET);
export const useAddVendors = () => useAddMutation(KEY, API.ADD);
export const useUpdateVendors = (vendor_id) => useUpdateMutation(KEY, API.UPDATE(vendor_id));
export const useDeleteVendor = () =>
  useDeleteMutation(KEY, API.DELETE, "shop_id", "shops");
export const useUpdateVendorStatus = () =>
  useToggleStatus(KEY, API.UPDATE_STATUS, "shop_id", "shops");

export const useGetSingleVendor = (shop_id) =>
  useGetQuery(
    "SINGLE_VENDOR",
    API.GET_SINGLE_SHOP(shop_id),
    { shop_id },
    { enabled: !!shop_id }
  );
