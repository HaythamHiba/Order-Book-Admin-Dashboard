import React, { useMemo } from "react";
import {  useDeleteVendor,  useUpdateVendorStatus } from "api/vendors";
import { useBackendLanguageCode, useLanguageCode, useTranslation } from "utility/language";
import Actions from "components/table/TableActions";
import { history } from "../../../history";
import { getLanguageAttr } from "helpers/language";
import { ToggleStatus } from "components/ToggleStatus";
import HovarableImage from "components/HovarableImage";
import {  ImageURL } from "api/config";

import { GrView } from "react-icons/gr";

const useTableColumns = (setEditModal, setObjectToEdit) => {
  const t = useTranslation();
  const deleteMutation = useDeleteVendor();
  const toggleMutation = useUpdateVendorStatus();
  const langCode=useBackendLanguageCode();
  const langAtr=useLanguageCode();

  return useMemo(
    () => [
  
      {
        name: t("logo"),
        sortable: false,
        center: true,
        cell: (row) => (
          <HovarableImage
            id={`vendor_image_${row.id}`}
            src={`${ImageURL}${row.logo}`}
            width="35"
          />
        ),
      },
      {
        name: `${t("name")} (${t(langAtr)})`,
        sortable: false,
        center: true,
        cell: (row) =>
        getLanguageAttr(row.name, langCode),
      },
      {
        name: `${t("username")}`,
        sortable: false,
        center: true,
        cell:(row)=><>{row.username}</>
      },
      {
        name: `${t("password")}`,
        sortable: false,
        center: true,
        cell:(row)=><>{row.password}</>
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
                history.push(`/restaurant-details/${row.id}`);
              }}
              className="cursor-pointer mr-1"
              size={22}
            />
            <Actions
              onEdit={() => {
                setEditModal(true);
                setObjectToEdit(row);
              }}
              onDelete={() => deleteMutation.mutate({ 
                vendors:row.id
               })}
            />
          </>
        ),
      },
    ],
    [t, deleteMutation, toggleMutation, setEditModal, setObjectToEdit,langAtr,langCode]
  );
};

export default useTableColumns;
