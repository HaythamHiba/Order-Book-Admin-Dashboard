import { useGetQuery, useToggleStatus } from "./helpers";

const API = {
  GET_USERS: `/users`,
  UPDATE: `/users`,

};

const KEY = "USERS";
export const useGetUsers = (params) => useGetQuery(KEY, API.GET_USERS, params);
export const useUpdateUser = () => useToggleStatus(KEY, API.UPDATE,'status');

