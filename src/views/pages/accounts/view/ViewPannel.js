import React, { useState } from "react";
import { useGetAccounts } from "api/accounts";
import { useTranslation } from "utility/language";
import useTableColumns from "./useTableColumns";
import DataTable from "react-data-table-component";
import "assets/scss/plugins/extensions/react-paginate.scss";
import { Card, CardBody } from "reactstrap";
import { SearchInput } from "components/input/SearchInput";
import RoleFilter from "./RoleFilter";
import { TableSpinner } from "views/components/TableSpinner";

const ViewPannel = (props) => {
  const t = useTranslation();

  const [searchText, setSearchText] = useState("");
  const [role, setRole] = useState("all");

  const { data, isLoading, isFetched } = useGetAccounts();
  const accounts = data?.accounts || [];
  const columns = useTableColumns();
  const [filteredData, setFilteredData] = React.useState([]);

  React.useEffect(() => {
    if (isFetched) {
      setFilteredData(
        accounts
          .filter((acc) => (role === "all" ? true : role === acc.role_type))
          .filter(
            (acc) =>
              acc.full_name.toLowerCase().includes(searchText.toLowerCase()) ||
              acc.email.toLowerCase().includes(searchText.toLowerCase())
          )
      );
    }
    //eslint-disable-next-line
  }, [role, searchText, isFetched]);



  return (
    <>
      <h3 className="mb-1">{t("accounts")}</h3>
      <div className="d-flex align-items-center mb-1 justify-content-between">
        <div>
          <RoleFilter role={role} setRole={setRole} />
        </div>
        <div className="d-flex">
          <SearchInput onChange={setSearchText} />
        </div>
      </div>
      <Card>
        <CardBody className="p-1">
          <DataTable
            columns={columns}
            data={filteredData}
            progressPending={isLoading}
            progressComponent={<TableSpinner />}
            noDataComponent={<h6 className="my-4">{t("no_records")}</h6>}
            noHeader
            pagination
          />
        </CardBody>
      </Card>
    </>
  );
};

export default ViewPannel;
