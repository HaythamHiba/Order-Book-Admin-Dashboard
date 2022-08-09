import React from "react";
import useTableColumns from "./useTableColumns";
import { useTranslation } from "utility/language";
import DataTable from "react-data-table-component";
import "assets/scss/plugins/extensions/react-paginate.scss";
import { Card, CardBody } from "reactstrap";
import { useGetCustomWithoutBtnAds } from "api/advertisements";
import { AddButton } from "components/AddButton";
import AddCustomAdModal from "./AddCustomAdWithoutBtnModal";
import EditCustomAdModal from "./EditCustomAdWithoutBtnModal";
import { TableSpinner } from "views/components/TableSpinner";
import AuthComponent from "components/AuthComponent";

export default function CustomAdsPageWithoutBtn() {
  const t = useTranslation();
  const { data, isLoading } = useGetCustomWithoutBtnAds();
  //Add----Edit//
  const [addModal, setAddModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [objectToEdit, setObjectToEdit] = React.useState(null);

  const customAds = data?.sliders || [];
  const columns = useTableColumns(setEditModal, setObjectToEdit);

  return (
    <>
      <div className="d-flex align-items-center mb-1">
        <h1 className="mb-0 mr-1">{`${t("advertisements")}`}</h1>
        <AuthComponent>
          <AddButton onClick={() => setAddModal(true)} />
        </AuthComponent>
      </div>
      <Card>
        <CardBody>
          <DataTable
            columns={columns}
            data={customAds}
            progressPending={isLoading}
            progressComponent={<TableSpinner />}
            noDataComponent={<h6 className="my-4">{t("no_records")}</h6>}
            noHeader
            pagination
          />
        </CardBody>
      </Card>
      <AddCustomAdModal isOpen={addModal} setIsOpen={setAddModal} />
      <EditCustomAdModal
        objectToEdit={objectToEdit}
        setObjectToEdit={setObjectToEdit}
        isOpen={editModal}
        setIsOpen={setEditModal}
      />
    </>
  );
}
