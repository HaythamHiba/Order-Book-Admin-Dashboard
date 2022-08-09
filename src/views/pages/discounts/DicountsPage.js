import React from "react";
import useTableColumns from "./useTableColumns";
import { useGetDiscounts } from "api/discounts";
import { useTranslation } from "utility/language";
import { Card, CardBody } from "reactstrap";
import DataTable from "react-data-table-component";
import AddDiscountModal from "./AddDiscountModal";
import EditDiscountModal from "./EditDiscountModal";
import { TableSpinner } from "views/components/TableSpinner";
import { AddButton } from "components/AddButton";
import AuthComponent from "components/AuthComponent";

export default function DicountPage() {
  const t = useTranslation();

  //Data Manipulation -- Add + Edit
  const [addModal, setAddModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [objectToEdit, setObjectToEdit] = React.useState(null);

  const { data, isLoading } = useGetDiscounts();
  const discounts = data?.discounts;

  const columns = useTableColumns(setEditModal, setObjectToEdit);
  return (
    <>
      <div className="d-flex align-items-center mb-1 justify-content-between">
        <h1>{t("discounts")}</h1>
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
            data={discounts}
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
