import { useGetUsers } from 'api/users';
import { SearchInput } from 'components/input';
import React from 'react'
import DataTable from 'react-data-table-component';
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import { useTranslation } from 'utility/language';
import { TableSpinner } from "views/components/TableSpinner";
import useTableColumns from './useTableColumns';

export default function UserSelectModal({open,setOpen}) {
  const t=useTranslation();
  const [search,setSearch]=React.useState("");
  const { data, isLoading } = useGetUsers({
    per_page:5,
    search:search,

  });
  const users = data?.data || [];
  const columns=useTableColumns(setOpen);
  return (
    <>
      <Modal centered isOpen={open} size="lg">
        <ModalHeader toggle={() => setOpen((v) => !v)}>
          <SearchInput onChange={setSearch} placeholder={t("search_for_user")}/>
        </ModalHeader>
        <ModalBody>
        <DataTable
            columns={columns}
            data={ users}
            progressPending={isLoading}
            progressComponent={<TableSpinner />}
            noDataComponent={<h6 className="my-4">{t("no_records")}</h6>}
            noHeader
            
          />

        </ModalBody>
        
      </Modal>
    </>
  )
}
