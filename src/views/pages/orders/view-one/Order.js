import React from 'react'
import { useGetSingleOrder } from 'api/orders';
import { useParams } from 'react-router-dom';
import Error404 from 'views/pages/misc/error/404';
import SpinnerComponent from 'components/@vuexy/spinner/Fallback-spinner';
import { Button, Card, CardBody, CardHeader, CardTitle } from 'reactstrap';
import { useTranslation } from 'utility/language';
import StatusActionController from 'components/StatusActionController';
import OrderForm from './OrderForm';
import { history } from "../../../../history";
import DataTable from 'react-data-table-component';
import useTableColumns from './useTableColumns';
import { TableSpinner } from 'views/components/TableSpinner';
import AuthComponent from 'components/AuthComponent';

export default function Order() {
    const { id } = useParams();
    const t = useTranslation();

    const { data, isLoading, notFound } = useGetSingleOrder({ order_id: id })
    const order = data?.order || {};
    const columns = useTableColumns();
    const items = order?.items || [];
    if (notFound) {
        return (<Error404 />)
    }
    if (isLoading) {
        return (<SpinnerComponent />)
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>

                    <p>{t("order_code")} : {order?.order_code}</p>
                </CardTitle>


                <Button
                    onClick={() => history.push('/all-orders')}
                    color="danger"
                >
                    {t("back")}
                </Button>

            </CardHeader>
            <AuthComponent>
                <StatusActionController order_status={order.order_status} order_id={order.id} />
            </AuthComponent>
            <CardBody>

                <OrderForm order={order} />
                <DataTable
                    columns={columns}
                    data={items}
                    progressPending={isLoading}
                    progressComponent={<TableSpinner />}
                    noDataComponent={<h6 className="my-4">{t("no_records")}</h6>}
                    noHeader
                    pagination
                />

            </CardBody>
        </Card>


    )
}
