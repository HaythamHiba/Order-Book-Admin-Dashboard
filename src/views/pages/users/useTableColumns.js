import { useUpdateUser } from "api/users";
import { ToggleStatus } from "components/ToggleStatus";
import React, { useMemo } from "react";
import { useTranslation } from "utility/language";


const useTableColumns = () => {
  const t = useTranslation();
  const toggleMutation=useUpdateUser();
 

  return useMemo(
    () => [
     
      {
        name: t("name"),
        selector: "name",
        sortable: true,
        center: true,
        cell: (row) => <>{row.name}</>,
      },
      {
        name: t("phone"),
        selector: "phone_number",
        sortable: true,
        center: true,
        cell: (row) => <>{row.phone_number}</>,
      },
      {
        name: t("blocked"),
      
        sortable: true,
        center: true,
        cell: (row) => <><ToggleStatus object={row} toggleMutation={toggleMutation} /> </>,
      },
    
    
      
    ],
    [t,toggleMutation]
  );
};

export default useTableColumns;
