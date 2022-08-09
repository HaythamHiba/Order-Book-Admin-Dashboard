import { useFormikContext } from "formik";
import React, { useMemo } from "react";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";


const useTableColumns = (setOpen) => {
  const t = useTranslation();
    const formik=useFormikContext();

  return useMemo(
    () => [
    
      {
        name: t("name"),
        selector: "full_name",
        sortable: true,
        center: true,
        cell: (row) => <>{row.full_name}</>,
      },

      {
        name: t("phone"),
        selector: "phone",
        sortable: true,
        center: true,
        cell: (row) => <div dir="ltr">{row.phone}</div>,
      },
      {
        name: "#",
        sortable: false,
        center: true,
        cell: (row) => (
            <Button color="primary" onClick={()=>{
                formik.setFieldValue("customer_name", row.full_name)
                formik.setFieldValue("customer_phone_number", row.phone)
                formik.setFieldValue("customer_id", row.id)
                setOpen(false)
            }}>
              
                {t("select")}
            </Button>
        ),
      },
    ],
    [t,formik,setOpen]
  );
};

export default useTableColumns;
