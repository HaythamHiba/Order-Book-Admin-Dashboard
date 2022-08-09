import React, { useMemo } from "react";
import { useTranslation } from "utility/language";
import Actions from "components/table/TableActions";
import { mapTranslatedProperties } from "helpers/language";
import { useSetDefaultCurrency } from "api/currency";
import { useDeleteCurrency, useUpdateCurrencyStatus } from "api/currency";
import { ToggleStatus } from "components/ToggleStatus";
import DefaultCurrency from "components/DefaultCurrency";
import AuthComponent from "components/AuthComponent";
import { Badge } from "reactstrap";

const useTableColumns = (setEditModal, setObjectToEdit) => {
  const t = useTranslation();
  const deleteMutation = useDeleteCurrency();
  const toggleMutation = useUpdateCurrencyStatus();
  const defaultMutation = useSetDefaultCurrency();

  return useMemo(
    () => [
      {
        name: `${t("name")} (${t("en")})`,
        sortable: false,
        center: true,
        cell: (row) =>
          mapTranslatedProperties(row.currency_details, "currency_name", 1),
      },
      {
        name: `${t("name")} (${t("ar")})`,
        sortable: false,
        center: true,
        cell: (row) =>
          mapTranslatedProperties(row.currency_details, "currency_name", 2),
      },
      {
        name: `${t("code")} (${t("en")})`,
        sortable: false,
        center: true,
        cell: (row) =>
          mapTranslatedProperties(row.currency_details, "currency_code", 1),
      },
      {
        name: `${t("code")} (${t("ar")})`,
        sortable: false,
        center: true,
        cell: (row) =>
          mapTranslatedProperties(row.currency_details, "currency_code", 2),
      },

      {
        name: t("rate"),
        sortable: true,
        center: true,
        selector: "currency_rate",
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
        name: t("default_currency"),
        sortable: false,
        center: true,
        cell: (row) => (
          <AuthComponent
            notAuthRender={() =>
              row.is_default ? (
                <Badge color="success">{t("default_currency")}</Badge>
              ) : null
            }
          >
            <DefaultCurrency defaultMutation={defaultMutation} row={row} />
          </AuthComponent>
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
          ></Actions>
        ),
      },
    ],
    [
      t,
      toggleMutation,
      defaultMutation,
      deleteMutation,
      setEditModal,
      setObjectToEdit,
    ]
  );
};

export default useTableColumns;
