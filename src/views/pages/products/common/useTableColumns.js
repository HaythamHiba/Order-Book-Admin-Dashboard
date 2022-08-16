import React, { useMemo } from "react";
import { useTranslation } from "utility/language";
import { history } from "../../../../history";

import HovarableImage from "components/HovarableImage";
import { ImageURL } from "api/config";
import { GrView } from "react-icons/gr";
import { getLanguageAttr } from "helpers/language";
import { Badge } from "reactstrap";

const navigateToDetails = (row) => {
   const item_id=row.id;
    const category_id=row?.sub_category_id || row.category_id;
    const vendor_id=row.vendor_id

    history.push(`/vendor_items/${vendor_id}/view-one/${item_id}/category/${category_id}`);
  
};

const useTableColumns = () => {
  const t = useTranslation();

  return useMemo(
    () => [

      {
        name: t("image"),
        sortable: false,
        center: true,
        cell: (row) => (
          <HovarableImage
            id={`itam_image_${row.id}`}
            src={`${ImageURL}${row.image}`}
            width="35"
          />
        ),
      },
      {
        name: `${t("name")} (${t("en")})`,
        sortable: false,
        center: true,
        cell: (row) =>
          getLanguageAttr(row.name, 0),
      },
      {
        name: `${t("name")} (${t("ar")})`,
        sortable: false,
        center: true,
        cell: (row) =>
          getLanguageAttr(row.name, 1),
      },
      {
        name: t("price"),
        selector: "price",
        sortable: true,
        center: true,
      },
      {
        name:`${t("status")}`,
        sortable: false,
        center: true,
        cell: (row) =><Badge color={row.status?"success":"danger"}>
        {row.status?t("shown"):t("hidden")}
        </Badge>
      },
    
    
 
      
      {
        name: "",
        selector: "action",
        sortable: false,
        center: true,
        cell: (row) => (
          <GrView
            onClick={() => navigateToDetails(row)}
            size={22}
            style={{ cursor: "pointer" }}
          />
        ),
      },
    ],
    [t]
  );
};

export default useTableColumns;
