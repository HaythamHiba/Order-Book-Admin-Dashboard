import React from "react";
import useTableColumns from "./useTableColumns";
import { useTranslation } from "utility/language";
import DataTable from "components/table/DataTable";
import { SearchInput } from "components/input/SearchInput";
import { useGetProducts } from "api/shops_products";
import { filterProductsBasedOnSearch } from "views/pages/products/common/utils/filters";
import { AddButton } from "components/AddButton";
import { history } from "../../../history";
import PropTypes from "prop-types";

import AuthComponent from "components/AuthComponent";

const ShopProducts = ({ shop_id }) => {
  const t = useTranslation();

  //Table Content -- Data + Columns
  const { data, isLoading } = useGetProducts(shop_id);
  const products = data?.products || [];
  const columns = useTableColumns();

  //Data Filters
  const [searchText, setSearchText] = React.useState("");
  const [filteredData, setFilteredData] = React.useState([]);

  React.useEffect(() => {
    if (data && Array.isArray(data?.products)) {
      const products = data.products;
      if (searchText) {
        setFilteredData(filterProductsBasedOnSearch(products, searchText));
      } else {
        setFilteredData(products);
      }
    }
  }, [searchText, data]);

  return (
    <>
      <div className="d-flex align-items-center mb-1 justify-content-between flex-wrap">
        <div className="d-flex">
          <h1>{t("products")}</h1>
        </div>
        <div className="d-flex align-items-center" style={{ gap: "1em" }}>
          <AuthComponent>
            <AddButton
              onClick={() => history.push(`/shops-products/add`, { shop_id })}
            />
          </AuthComponent>
          <SearchInput
            onChange={setSearchText}
            placeholder={t("_search.product")}
          />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={searchText ? filteredData : products}
        progressPending={isLoading}
        noHeader
        pagination
      />
    </>
  );
};

ShopProducts.propTypes = {
  shop_id: PropTypes.number.isRequired,
};

export default ShopProducts;
