import React from "react";
import useTableColumns from "./useTableColumns";
import { useTranslation } from "utility/language";
import DataTable from "react-data-table-component";
import "assets/scss/plugins/extensions/react-paginate.scss";
import { Card, CardBody } from "reactstrap";
import { SearchInput } from "components/input/SearchInput";
import { useGetCategories } from "api/categories";
import { filterCategoriesBasedOnSearch,filterCategoriesBasedOnStatus } from "./filters";
import EditCatModal from "./EditCatModal";
import { TableSpinner } from "views/components/TableSpinner";
import Select from "react-select";
import useVendorsOptions from "utility/selectionOptions/useVendorsOptions";
import { useStatusOptions } from "utility/selectionOptions/useStatusOptions";

const CategoriesPage = () => {
  const t = useTranslation();
  
  const [selectedVendor,setSelectedVendor]=React.useState("");
  
  //Data Manipulation -- Add + Edit

  const [editModal, setEditModal] = React.useState(false);
  const [objectToEdit, setObjectToEdit] = React.useState(null);

  //Table Content -- Data + Columns
  const { data, isLoading } = useGetCategories(selectedVendor);

  const columns = useTableColumns(setEditModal, setObjectToEdit);
  
  //Data Filters
  const [searchText, setSearchText] = React.useState("");
  const [filteredData, setFilteredData] = React.useState([]);
  const [selectedStatus,setSelectedStatus]=React.useState("");

  const vendorsOptions=useVendorsOptions();
  const statusOptions=useStatusOptions();
  

 

  React.useEffect(() => {
    if (data&&Array.isArray(data)) {
      const idFiltered = filterCategoriesBasedOnStatus(data, selectedStatus);
      if (searchText) {
        setFilteredData(filterCategoriesBasedOnSearch(idFiltered, searchText));
      } else {
        setFilteredData(idFiltered);
      }
    }
  }, [searchText, selectedStatus, data]);
 

  return (
    <>
      <h1>{t("vendor_categories")}</h1>
      <div className="d-flex align-items-center mb-1 justify-content-between">
        
      <div style={{ width: "15rem" }} className="mr-1">
           
           <Select
        
             placeholder={t("vendors")}
             options={vendorsOptions}
             name="vendor_id"
             onChange={(opt) => {
               setSelectedVendor(opt.value ?? "");
             }}
           />
           
         </div>
         <div style={{ width: "15rem" }} className="mr-1">
           
           <Select
        
             placeholder={t("status")}
             options={statusOptions}
             name="status"
             onChange={(opt) => {
               setSelectedStatus(opt.value ?? "");
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
            data={filteredData}
            progressPending={isLoading}
            progressComponent={<TableSpinner />}
            noDataComponent={<h6 className="my-4">{selectedVendor? t("no_records"):t("please_select_a_vendor")}</h6>}
            noHeader
            pagination
          />
        </CardBody>
      </Card>
    
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
