import { useGetQuery,useUpdateMutation } from "./helpers";
const KEYS={
    ORDERS:"ORDERS",
    SINGLE_ORDER:"SINGLE_ORDER"
}
const API={
    GET_ORDERS:`/api/admin/orders`,
    SINGLE_ORDER:`/api/admin/order`,
    ACCEPT:`/api/admin/order/accept`,
    CANCLE:`/api/admin/order/cancel`,
    DELIVERING:`/api/admin/order/delivering`,
    DELIVERED:`/api/admin/order/delivered`,
    DELETE:`/api/admin/order/delete`
}
export const useGetOrders=(params)=>useGetQuery(KEYS.ORDERS,API.GET_ORDERS,params);
export const useGetSingleOrder=(params)=>useGetQuery(KEYS.SINGLE_ORDER,API.SINGLE_ORDER,params);
export const useAcceptOrder=()=>useUpdateMutation(KEYS.SINGLE_ORDER,API.ACCEPT);
export const useCancelOrder=()=>useUpdateMutation(KEYS.SINGLE_ORDER,API.CANCLE);
export const useDeliverOrder=()=>useUpdateMutation(KEYS.SINGLE_ORDER,API.DELIVERING);
export const useDeliveredOrder=()=>useUpdateMutation(KEYS.SINGLE_ORDER,API.DELIVERED);
export const useDeleteOrder=()=>useUpdateMutation(KEYS.SINGLE_ORDER,API.DELETE);