import React from "react";
import useTableColumns from "./useTableColumns";
import { useTranslation } from "utility/language";
import DataTable from "components/table/DataTable";
import { Card, CardBody } from "reactstrap";
import { SearchInput } from "components/input/SearchInput";
import { useGetItems } from "api/items";
import { filterItemsBasedOnSearch } from "../common/filters";
import Select from "react-select";
import useCategoryOptions from "utility/selectionOptions/useCategoryOptions";
import useVendorsOptions from "utility/selectionOptions/useVendorsOptions";


export default function ViewAllShopProductsPage() {
  const t = useTranslation();

  const [category,setCategory]=React.useState("");
  const [vendor,setVendor]=React.useState("");
  
  //Table Content -- Data + Columns
  const { data, isLoading } = useGetItems(vendor,category);
  const products = data?data:  [];
  const columns = useTableColumns();
  
  //Data Filters
  const [searchText, setSearchText] = React.useState("");
  const [filteredData, setFilteredData] = React.useState([]);
  const vendorsOptions=useVendorsOptions();
  const categoriesOptions=useCategoryOptions({},vendor);


  React.useEffect(() => {
    if (data && Array.isArray(data)) {
      const products = data;
      if (searchText) {
        setFilteredData(filterItemsBasedOnSearch(products, searchText));
      } else {
        setFilteredData(products);
      }
    }
  }, [searchText, data]);

  return (
    <>
      <h1>{t("items")}</h1>
      <div className="d-flex align-items-center mb-1 justify-content-between flex-wrap">
      <div style={{ width: "15rem" }} className="mr-1">
           
           <Select
        
             placeholder={t("vendors")}
             options={vendorsOptions}
             name="vendor_id"
             onChange={(opt) => {
               setVendor(opt.value ?? "");
             }}
           />
           
         </div>
        <div style={{ width: "15rem" }} className="mr-1">
        <Select
        
        placeholder={t("category")}
        options={categoriesOptions}
        name="category_id"
        onChange={(opt) => {
          setCategory(opt.value ?? "");
        }}
      />
      
    </div>

        
        <div className="d-flex align-items-center">

          <SearchInput
            onChange={setSearchText}
            placeholder={t("_search.item")}
          />
        </div>
      </div>
      <Card>
        <CardBody className="p-1">
          <DataTable
            columns={columns}
            data={searchText ? filteredData : products}
            progressPending={isLoading}
            noHeader
            pagination
            noDataComponent={
              <h6 className="my-4">

                <>{vendor?category? t("no_records"):t("please_select_a_category"):t("please_select_a_vendor")}</>


              </h6>
            }
          />
        </CardBody>
      </Card>
    </>
  );
};

