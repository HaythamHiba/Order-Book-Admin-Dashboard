import React from "react";
import useTableColumns from "./useTableColumns";
import { useTranslation } from "utility/language";
import DataTable from "components/table/DataTable";
import { Card, CardBody } from "reactstrap";
import { SearchInput } from "components/input/SearchInput";
import { useGetShops } from "api/shops";
import { filterShopsBasedOnSearch } from "./filters";
import { AddButton } from "components/AddButton";
import AddShopModal from "./AddShopModal";
import EditshopModal from "./EditShopModal";
import { useIsAuthorized } from "redux/hooks/auth";

const ShopsPage = () => {
  const t = useTranslation();
  const isAuthorized = useIsAuthorized();

  //Data Manipulation -- Add + Edit
  const [addModal, setAddModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [objectToEdit, setObjectToEdit] = React.useState(null);

  //Table Content -- Data + Columns
  const { data, isLoading } = useGetShops();
  const shops = data?.shops || [];
  const columns = useTableColumns(setEditModal, setObjectToEdit);

  //Data Filters
  const [searchText, setSearchText] = React.useState("");
  const [filteredData, setFilteredData] = React.useState([]);

  React.useEffect(() => {
    if (Array.isArray(data?.shops)) {
      if (searchText) {
        setFilteredData(filterShopsBasedOnSearch(data.shops, searchText));
      } else {
        setFilteredData(data.shops);
      }
    }
  }, [searchText, data]);

  return (
    <>
      <h1>{t("shops")}</h1>
      <div className="d-flex align-items-center mb-1 justify-content-between">
        <div className="d-flex">
          {isAuthorized && <AddButton onClick={() => setAddModal(true)} />}
        </div>
        <SearchInput onChange={setSearchText} placeholder={t("_search.shop")} />
      </div>
      <Card>
        <CardBody className="p-1">
          <DataTable
            columns={columns}
            data={searchText ? filteredData : shops}
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
    </>
  );
};

export default ShopsPage;
