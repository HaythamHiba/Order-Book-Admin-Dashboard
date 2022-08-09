import { useGetQuery } from "./helpers";
const API=`/api/admin/statistics`
export const useGetStatistics=()=>useGetQuery("STATISTICS",API);