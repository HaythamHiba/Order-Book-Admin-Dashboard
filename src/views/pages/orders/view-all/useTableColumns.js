import React, { useMemo } from "react";
import { useTranslation } from "utility/language";
import { history } from "../../../../history";
import { GrView } from "react-icons/gr";
import OrderStatus from "components/OrderStatus";
import PaymentStatus from "components/PaymentStatus";
import { useDeleteOrder } from "api/orders";
import Actions from "components/table/TableActions";
import { AuthComponent } from "AuthComponent";

const useTableColumns = () => {
    const t = useTranslation();
    const deleteMutation = useDeleteOrder();
    return useMemo(() => [
        {
            name: t("order_code"),
            selector: "order_code",
            sortable: true,
            center: true,

        },
        {
            name: t("customer_name"),
            selector: "customer_name",
            sortable: false,
            center: true,
        },
        {
            name: t("customer_phone_number"),
            selector: "customer_phone_number",
            sortable: false,
            center: true,
        },
        {
            name: t("order_status"),

            sortable: false,
            center: true,
            cell: (row) => <OrderStatus order_status={row.order_status} />
        },
        {
            name: t("payment_status"),

            sortable: false,
            center: true,
            cell: (row) => <PaymentStatus payment_status={row.payment_status} />
        },
        {
            name: t("order_total"),
            sortable: true,
            center: true,
            cell: (row) => <p>{row.order_total.toFixed(2)}</p>
        },

        {
            name: "#",
            selector: "action",
            sortable: false,
            center: true,
            cell: (row) => (
                <div className="d-flex" style={{ gap: "10px" }}>
                    <GrView
                        onClick={() => history.push(`/order/${row.id}`)}
                        size={22}
                        style={{ cursor: "pointer" }}
                    />
                    <AuthComponent>

                        <Actions
                            onDelete={() => deleteMutation.mutate({ order_id: row.id })}
                            showEdit={false}
                        />
                    </AuthComponent>
                </div>

            ),
        },


    ], [t, deleteMutation])
}
export default useTableColumns;
