import React from "react";
import useTableColumns from "./useTableColumns";
import { useTranslation } from "utility/language";
import DataTable from "components/table/DataTable";
import { Card, CardBody } from "reactstrap";
import { SearchInput } from "components/input/SearchInput";
import { useGetProducts } from "api/owner_products";
import {
  filterProductsBasedOnSearch,
  filterProductsBasedOnSubcategoryId,
} from "../common/utils/filters";
import { AddButton } from "components/AddButton";
import { history } from "../../../../history";
import { useIsAuthorized } from "redux/hooks/auth";

import Select from "react-select";
import useSubCategoryOptions from "utility/selectionOptions/useSubCategoryOptions";
import { ProductTypeProvider, TYPE } from "../common/useProductType";

const PageContent = () => {
  const t = useTranslation();
  const isAuthorized = useIsAuthorized();

  //Table Content -- Data + Columns
  const { data, isLoading } = useGetProducts();
  const products = data?.products || [];
  const columns = useTableColumns();

  //Data Filters
  const [searchText, setSearchText] = React.useState("");
  const [filteredData, setFilteredData] = React.useState([]);
  const subCategoryOptions = useSubCategoryOptions({ withAllOption: true });
  const [selectedSubCategory, setSelectedSubCategory] = React.useState(null);

  React.useEffect(() => {
    if (data && Array.isArray(data?.products)) {
      const products = data.products;

      const filteredOnSubcategory = filterProductsBasedOnSubcategoryId(
        products,
        selectedSubCategory
      );
      if (searchText) {
        setFilteredData(
          filterProductsBasedOnSearch(filteredOnSubcategory, searchText)
        );
      } else {
        setFilteredData(filteredOnSubcategory);
      }
    }
  }, [searchText, selectedSubCategory, data]);

  return (
    <>
      <h1>{t("owner_products")}</h1>
      <div className="d-flex align-items-center mb-1 justify-content-between flex-wrap">
        <div className="d-flex">
          {isAuthorized && (
            <AddButton onClick={() => history.push(`/owner-products/add`)} />
          )}
        </div>
        <div className="d-flex align-items-center">
          <div style={{ width: "15rem" }} className="mr-1">
            <Select
              placeholder={t("subcategory")}
              options={subCategoryOptions}
              name="subcategory_id"
              onChange={(opt) => {
                setSelectedSubCategory(opt.value);
              }}
            />
          </div>
          <SearchInput
            onChange={setSearchText}
            placeholder={t("_search.product")}
          />
        </div>
      </div>
      <Card>
        <CardBody className="p-1">
          <DataTable
            columns={columns}
            data={
              searchText || selectedSubCategory !== null
                ? filteredData
                : products
            }
            progressPending={isLoading}
            noHeader
            pagination
          />
        </CardBody>
      </Card>
    </>
  );
};

export default function ViewAllOwnerProductsPage() {
  return (
    <ProductTypeProvider productType={TYPE.OWNER_PRODUCT}>
      <PageContent />
    </ProductTypeProvider>
  );
}
