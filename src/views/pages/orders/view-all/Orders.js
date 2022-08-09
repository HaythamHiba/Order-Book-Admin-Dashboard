import React from 'react'
import useTableColumns from './useTableColumns'
import { useGetOrders } from 'api/orders'
import { usePaginationWithURL } from 'hooks';
import { usePagination } from 'hooks/dataTable/usePagination';
import { Card, CardBody } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { SearchInput } from 'components/input';
import Select from "react-select";
import { useStatusOptions } from 'utility/selectionOptions/useStatusOptions';
import { useTranslation } from 'utility/language';
import { useSorting } from 'hooks/dataTable/useSorting';
import PerPageDropdown from 'components/PerPageDropdown';
import { TableSpinner } from 'views/components/TableSpinner';
import { ChevronLeft, ChevronRight } from 'react-feather';
import ReactPaginate from 'react-paginate';
import "assets/scss/plugins/extensions/react-paginate.scss";


export default function Orders(props) {
  const t = useTranslation();
  const columns = useTableColumns();
  //pagination
  const { page, per_page, handlePageChange, handlePerPageChange } =
    usePaginationWithURL(props.location);
  const filterPagination = usePagination();
  //filter
  const [selectedStatus, setSelectedStatus] = React.useState("");
  const statusOptions = useStatusOptions();
  const [search, setSearchText] = React.useState("");
  const { order_by, order_type, handleSort } = useSorting();
  const filterIsApplied = search !== "";

  React.useEffect(() => {
    if (filterIsApplied) {
      filterPagination.handlePageChange(0);
    }
    //eslint-disable-next-line
  }, [search, filterIsApplied]);

  //data
  const { data, isLoading } = useGetOrders({
    page: filterIsApplied ? filterPagination.page : page,
    per_page,
    search,
    order_by,
    order_type,
    order_status: selectedStatus
  });
  const orders = data?.data || [];
  const totalRows = data?.total || 0;

  return (
    <>
      <h1>{t("orders")}</h1>
      <div className="d-flex align-items-center mb-1 justify-content-between flex-wrap">
        <div className="d-flex">

        </div>
        <div className="d-flex align-items-center">
          <PerPageDropdown
            className="custom-dropdown mr-1"
            per_page={per_page}
            handlePerPage={(v) => {
              handlePerPageChange(v);
              filterPagination.handlePerPageChange(v);
            }}
          />
          <div style={{ width: "15rem" }} className="mr-1">

            <Select
              placeholder={t("status")}
              options={statusOptions}
              name="status"
              onChange={(opt) => {
                setSelectedStatus(opt.value);
              }}
            />
          </div>
          <SearchInput
            onChange={setSearchText}
            placeholder={t("_search.order")}
          />
        </div>
      </div>
      <Card>
        <CardBody className="p-1">
          <DataTable
            columns={columns}
            data={orders}
            progressPending={isLoading}

            progressComponent={<TableSpinner />}
            noDataComponent={<h6 className="my-4">{t("no_records")}</h6>}
            noHeader
            pagination
            paginationServer
            paginationComponent={() => (
              <ReactPaginate
                previousLabel={<ChevronLeft size={15} />}
                nextLabel={<ChevronRight size={15} />}
                breakLabel="..."
                breakClassName="break-me"
                pageCount={totalRows / per_page}
                containerClassName="vx-pagination separated-pagination pagination-center pagination-sm mb-0 mt-2"
                activeClassName="active"
                forcePage={
                  filterIsApplied ? filterPagination.page - 1 : page - 1
                }
                onPageChange={(v) => {
                  if (filterIsApplied) {
                    filterPagination.handlePageChange(v);
                  } else {
                    handlePageChange(v);
                  }
                }}
              />
            )}
            onSort={handleSort}
            sortServer

          />
        </CardBody>
      </Card>
    </>
  )
}
