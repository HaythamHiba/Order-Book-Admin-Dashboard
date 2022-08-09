import React, { useMemo } from "react";
import { useTranslation } from "utility/language";
import Actions from "components/table/TableActions";
// import { history } from "../../../history";
import { mapTranslatedProperties } from "helpers/language";
import { ToggleStatus } from "components/ToggleStatus";

import { useDeleteShopCategory, useUpdateShopCategoryStatus } from "api/shopCategories";

const useTableColumns = (setEditModal, setObjectToEdit) => {
  const t = useTranslation();
  const deleteMutation = useDeleteShopCategory();
  const toggleMutation = useUpdateShopCategoryStatus();

  return useMemo(
    () => [
      {
        name: t("sort"),
        selector: "shop_category_sort",
        sortable: true,
        center: true,
      },

      {
        name: `${t("name")} (${t("en")})`,
        sortable: false,
        center: true,
        cell: (row) =>
          mapTranslatedProperties(row.shop_category_details, "shop_category_name", 1),
      },
      {
        name: `${t("name")} (${t("ar")})`,
        sortable: false,
        center: true,
        cell: (row) =>
          mapTranslatedProperties(row.shop_category_details, "shop_category_name", 2),
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
          <Actions
            onEdit={() => {
              setEditModal(true);
              setObjectToEdit(row);
            }}
            onDelete={() => deleteMutation.mutate({ id: row.id })}
          />
        ),
      },
    ],
    [t, deleteMutation, toggleMutation, setEditModal, setObjectToEdit]
  );
};

export default useTableColumns;
