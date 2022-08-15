import React from "react";
import useTableColumns from "./useTableColumns";
import { useTranslation } from "utility/language";
import DataTable from "components/table/DataTable";
import { Card, CardBody } from "reactstrap";
import { SearchInput } from "components/input/SearchInput";
import {  useGetVendors } from "api/vendors";
import { filterVendorsBasedOnSearch } from "./filters";
import { AddButton } from "components/AddButton";
import AddShopModal from "./AddVendorModal";
import EditshopModal from "./EditVendorModal";
import { useIsAuthorized } from "redux/hooks/auth";
import StatusVendorModal from "./StatusVendorModal";

const VendorsPage = () => {
  const t = useTranslation();
  const isAuthorized = useIsAuthorized();

  //Data Manipulation -- Add + Edit
  const [addModal, setAddModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [statusModal,setStatusModal]=React.useState(false)
  const [objectToEdit, setObjectToEdit] = React.useState(null);

  //Table Content -- Data + Columns
  const { data, isLoading } = useGetVendors();
  const vendors = data || [];
  const columns = useTableColumns(setEditModal, setObjectToEdit,setStatusModal);

  //Data Filters
  const [searchText, setSearchText] = React.useState("");
  const [filteredData, setFilteredData] = React.useState([]);

  React.useEffect(() => {
    if (Array.isArray(data)) {
      if (searchText) {
        setFilteredData(filterVendorsBasedOnSearch(data, searchText));
      } else {
        setFilteredData(data);
      }
    }
  }, [searchText, data]);

  return (
    <>
      <h1>{t("vendors")}</h1>
      <div className="d-flex align-items-center mb-1 justify-content-between">
        <div className="d-flex">
          {isAuthorized && <AddButton onClick={() => setAddModal(true)} />}
        </div>
        <SearchInput onChange={setSearchText} placeholder={t("_search.vendor")} />
      </div>
      <Card>
        <CardBody className="p-1">
          <DataTable
            columns={columns}
            data={searchText ? filteredData : vendors}
            progressPending={isLoading}
            noHeader
            pagination
          />
        </CardBody>
      </Card>
      <AddShopModal isOpen={addModal} setIsOpen={setAddModal} />
      <EditshopModal
        isOpen={editModal}
        setIsOpen={setEditModal}
        objectToEdit={objectToEdit}
        setObjectToEdit={setObjectToEdit}
      />
       <StatusVendorModal
        isOpen={statusModal}
        setIsOpen={setStatusModal}
        objectToEdit={objectToEdit}
        setObjectToEdit={setObjectToEdit}
      />
    </>
  );
};

export default VendorsPage;
