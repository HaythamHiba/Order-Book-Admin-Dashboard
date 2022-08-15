import React, { useMemo } from "react";
import {  useDeleteVendor } from "api/vendors";
import { useBackendLanguageCode, useLanguageCode, useTranslation } from "utility/language";
import Actions from "components/table/TableActions";
import { history } from "../../../history";
import { getLanguageAttr } from "helpers/language";
import HovarableImage from "components/HovarableImage";
import {  ImageURL } from "api/config";
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import { Badge } from "reactstrap";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';


const useTableColumns = (setEditModal, setObjectToEdit,setStatusModal) => {
  const t = useTranslation();
  const deleteMutation = useDeleteVendor();
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
        name:`${t("status")}`,
        sortable: false,
        center: true,
        cell: (row) =><Badge color={row.status?"success":"danger"}>
        {row.status?t("shown"):t("hidden")}
        </Badge>
      },
    
      {
        name: "#",
        sortable: false,
        center: true,
        cell: (row) => (
          <>
            <PublishedWithChangesIcon
              onClick={() => {
                setStatusModal(true);
                setObjectToEdit(row);
              }}
              className="cursor-pointer mr-1"
              size={22}
            
            />
            
            <CropOriginalIcon
              onClick={() => {
                history.push(`/vendor/${row.id}/images`);
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
    [t, deleteMutation, setEditModal, setObjectToEdit,langAtr,langCode,setStatusModal]
  );
};

export default useTableColumns;
