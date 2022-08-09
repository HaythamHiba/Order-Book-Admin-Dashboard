import React from "react";
import useTableColumns from "./useTableColumns";
import { useGetCurrencies } from "api/currency";
import { useTranslation } from "utility/language";
import { Card, CardBody } from "reactstrap";
import DataTable from "react-data-table-component";
import AddDiscountModal from "./AddCurrencyModal";
import EditDiscountModal from "./EditCurrencyModal";
import { TableSpinner } from "views/components/TableSpinner";
import { AddButton } from "components/AddButton";
import AuthComponent from "components/AuthComponent";

export default function CurrencyPage() {
  const t = useTranslation();

  //Data Manipulation -- Add + Edit
  const [addModal, setAddModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [objectToEdit, setObjectToEdit] = React.useState(null);

  const { data, isLoading } = useGetCurrencies();
  const currencies = data?.currencies;

  const columns = useTableColumns(setEditModal, setObjectToEdit);
  return (
    <>
      <div className="d-flex align-items-center mb-1 justify-content-between">
        <h1>{t("currencies")}</h1>
        <div className="d-flex">
          <AuthComponent>
            <AddButton onClick={() => setAddModal(true)} />
          </AuthComponent>
        </div>
      </div>
      <Card>
        <CardBody className="p-1">
          <DataTable
            columns={columns}
            data={currencies}
            progressPending={isLoading}
            progressComponent={<TableSpinner />}
            noDataComponent={<h6 className="my-4">{t("no_records")}</h6>}
            noHeader
            pagination
          />
        </CardBody>
      </Card>
      <AddDiscountModal isOpen={addModal} setIsOpen={setAddModal} />
      <EditDiscountModal
        isOpen={editModal}
        setIsOpen={setEditModal}
        objectToEdit={objectToEdit}
        setObjectToEdit={setObjectToEdit}
      />
    </>
  );
}
