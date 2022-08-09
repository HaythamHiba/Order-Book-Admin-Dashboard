import React from "react";
import useTableColumns from "./useTableColumns";
import { useTranslation } from "utility/language";
import DataTable from "react-data-table-component";
import "assets/scss/plugins/extensions/react-paginate.scss";
import { Card, CardBody } from "reactstrap";
import { SearchInput } from "components/input/SearchInput";
import { filterCategoriesBasedOnSearch } from "./filters";
import { AddButton } from "components/AddButton";
import AddCatModal from "./AddShopCatModal";
import EditCatModal from "./EditShopCatModal";
import { TableSpinner } from "views/components/TableSpinner";
import { useIsAuthorized } from "redux/hooks/auth";
import useShopsOptions from "utility/selectionOptions/useShopsOptions";
import Select from "react-select";
import { useGetShopCategories } from "api/shopCategories";


const CategoriesPage = () => {
  const t = useTranslation();
  const isAuthorized = useIsAuthorized();
  
  const shopOptions=useShopsOptions();

  const [selectedShop,setSelectedShop]=React.useState(null);

  //Data Manipulation -- Add + Edit
  const [addModal, setAddModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [objectToEdit, setObjectToEdit] = React.useState(null);

  //Table Content -- Data + Columns
  const { data, isLoading } = useGetShopCategories({
    shop_id:selectedShop
  });
  const shop_categories = data?.shop_categories || [];
  const columns = useTableColumns(setEditModal, setObjectToEdit);

  //Data Filters
  const [searchText, setSearchText] = React.useState("");
  const [filteredData, setFilteredData] = React.useState([]);


  React.useEffect(() => {
    if (Array.isArray(data?.shop_categories)) {
      if (searchText) {
        setFilteredData(
          filterCategoriesBasedOnSearch(data.shop_categories, searchText)
        );
      } else {
        setFilteredData(data.shop_categories);
      }
    }
  }, [searchText, data]);

  return (
    <>
      <h1>{t("shop_categories")}</h1>
      <div className="d-flex align-items-center mb-1 justify-content-between">
        <div className="d-flex">
          {isAuthorized && <AddButton onClick={() => setAddModal(true)} />}
          </div>
          <div style={{ width: "15rem" }} className="mr-1">
           
            <Select
         
              placeholder={t("shop")}
              options={shopOptions}
              name="shop_id"
              onChange={(opt) => {
                setSelectedShop(opt.value ?? "");
              }}
            />
            
          </div>
      
        <SearchInput
          onChange={setSearchText}
          placeholder={t("_search.category")}
        />
      </div>
      <Card>
        <CardBody className="p-1">
          <DataTable
            columns={columns}
            data={searchText ? filteredData : shop_categories}
            progressPending={isLoading}
            progressComponent={<TableSpinner />}
            noDataComponent={<h6 className="my-4">{!selectedShop?t("please_select_shop_first"):shopOptions.length===0?t("no_shops"): t("no_records")}</h6>}
            noHeader
            pagination
          />
        </CardBody>
      </Card>
      <AddCatModal isOpen={addModal} setIsOpen={setAddModal} />
      <EditCatModal
        isOpen={editModal}
        setIsOpen={setEditModal}
        objectToEdit={objectToEdit}
        setObjectToEdit={setObjectToEdit}
      />
    </>
  );
};

export default CategoriesPage;
