import React, { useMemo } from "react";
import { useDeleteDiscount, useUpdateDiscountStatus } from "api/discounts";
import { useTranslation } from "utility/language";
import Actions from "components/table/TableActions";
// import { history } from "../../../history";
import { mapTranslatedProperties } from "helpers/language";

import { ToggleStatus } from "components/ToggleStatus";


const useTableColumns = (setEditModal, setObjectToEdit) => {
  const t = useTranslation();
  const deleteMutation = useDeleteDiscount();
  const toggleMutation = useUpdateDiscountStatus()

  return useMemo(
    () => [

      {
        name: `${t("name")} (${t("en")})`,
        sortable: false,
        center: true,
        cell: (row) =>
          mapTranslatedProperties(row.discount_details, "discount_name", 1),
      },
      {
        name: `${t("name")} (${t("ar")})`,
        sortable: false,
        center: true,
        cell: (row) =>
          mapTranslatedProperties(row.discount_details, "discount_name", 2),
      },

      {
        name: t("rate"),
        sortable: true,
        center: true,

        cell:(row)=><div>{row.discount_rate} {" %"}</div>


      },
      {
        name: t("start_at"),
        sortable: true,
        center: true,
        selector: "start_at",
      },
      {
        name: t("end_at"),
        sortable: true,
        center: true,
        selector: "end_at",
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
