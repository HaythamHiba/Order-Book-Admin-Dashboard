import { VENDOR } from "configs/Roles";
import {
  useGetQuery,
  useAddMutation,
  useUpdateMutation,
  useDeleteMutation,
  buildFormData,
} from "./helpers";

const API = {
  GET: `/api/admin/accounts`,
  ADD: `/api/admin/account/add`,
  UPDATE: `/api/admin/account/update`,
  DELETE: `/api/admin/account/delete`,
  UPDATE_MY_ACCOUNT:`/api/admin/account/update_my_account`
};

const KEY = "ADMINS";
const MY_ACCOUNT="MY_ACCOUNT";
export const useGetAccounts = () => useGetQuery(KEY, API.GET);
export const useAddAccount = () => useAddMutation(KEY, API.ADD);
export const useUpdateAccount = () => useUpdateMutation(KEY, API.UPDATE);
export const useDeleteAccount = () =>
  useDeleteMutation(KEY, API.DELETE, "account_id");

export const getDataToSend = (values, editMode, objectToEdit) => {
  const formData = new FormData();
  const objectToSend = {
    ...values,
    ...(editMode && { account_id: objectToEdit.id }),
  };
  if (editMode) {
    delete objectToSend["password"];
    delete objectToSend["password_confirmation"];
  }
  if(values.role!==VENDOR){
    delete objectToSend["shop_id"]
  }

  buildFormData(formData, objectToSend);
  return formData;
};
export const useUpdateMyAccount=()=>useUpdateMutation(MY_ACCOUNT,API.UPDATE_MY_ACCOUNT)