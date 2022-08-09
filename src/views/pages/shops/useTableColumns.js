import React, { useMemo } from "react";
import { useDeleteShop, useUpdateShopStatus } from "api/shops";
import { useTranslation } from "utility/language";
import Actions from "components/table/TableActions";
import { history } from "../../../history";
import { mapTranslatedProperties } from "helpers/language";
import { ToggleStatus } from "components/ToggleStatus";
import HovarableImage from "components/HovarableImage";
import { baseURL } from "api/config";

import { GrView } from "react-icons/gr";

const useTableColumns = (setEditModal, setObjectToEdit) => {
  const t = useTranslation();
  const deleteMutation = useDeleteShop();
  const toggleMutation = useUpdateShopStatus();

  return useMemo(
    () => [
      {
        name: t("sort"),
        selector: "shop_sort",
        sortable: true,
        center: true,
      },
      {
        name: t("image"),
        sortable: false,
        center: true,
        cell: (row) => (
          <HovarableImage
            id={`shop_image_${row.id}`}
            src={`${baseURL}${row.shop_image}`}
            width="35"
          />
        ),
      },
      {
        name: `${t("name")} (${t("en")})`,
        sortable: false,
        center: true,
        cell: (row) =>
          mapTranslatedProperties(row.shop_details, "shop_name", 1),
      },
      {
        name: `${t("name")} (${t("ar")})`,
        sortable: false,
        center: true,
        cell: (row) =>
          mapTranslatedProperties(row.shop_details, "shop_name", 2),
      },
      {
        name: t("products_count"),
        selector: "products_count",
        sortable: true,
        center: true,
      },
      {
        name: t("status"),
        sortable: false,
        center: true,
        cell: (row) => (
          <ToggleStatus object={row} toggleMutation={toggleMutation} />
        ),
      },
      {
        name: "#",
        sortable: false,
        center: true,
        cell: (row) => (
          <>
            <GrView
              onClick={() => {
                history.push(`/shop-details/${row.id}`);
              }}
              className="cursor-pointer mr-1"
              size={22}
            />
            <Actions
              onEdit={() => {
                setEditModal(true);
                setObjectToEdit(row);
              }}
              onDelete={() => deleteMutation.mutate({ id: row.id })}
            />
          </>
        ),
      },
    ],
    [t, deleteMutation, toggleMutation, setEditModal, setObjectToEdit]
  );
};

export default useTableColumns;
