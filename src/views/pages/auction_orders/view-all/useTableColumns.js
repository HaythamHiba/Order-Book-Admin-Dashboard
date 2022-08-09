import React, { useMemo } from "react";
import { useTranslation } from "utility/language";
import { history } from "../../../../history";
import { GrView } from "react-icons/gr";
import { useDeleteOrder } from "api/orders";
import Actions from "components/table/TableActions";
import { AuthComponent } from "AuthComponent";
import AuctionOrderStatus from "components/AuctionOrderStatus";

const useTableColumns = () => {
    const t = useTranslation();
    const deleteMutation = useDeleteOrder();
    return useMemo(() => [
        {
            name: t("auction_order_code"),
            selector: "auction_order_code",
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
            name: t("auction_order_status"),

            sortable: false,
            center: true,
            cell: (row) => <AuctionOrderStatus auction_order_status={row.auction_order_status} />
        },
        {
            name: t("auction_order_total"),
            sortable: true,
            center: true,
            cell: (row) => <p>{row.auction_order_total.toFixed(2)}</p>
        },

        {
            name: "#",
            selector: "action",
            sortable: false,
            center: true,
            cell: (row) => (
                <div className="d-flex" style={{ gap: "10px" }}>
                    <GrView
                        onClick={() => history.push(`/auction_order/${row.id}`)}
                        size={22}
                        style={{ cursor: "pointer" }}
                    />
                    <AuthComponent>

                        <Actions
                            onDelete={() => deleteMutation.mutate({ auction_order_id: row.id })}
                            showEdit={false}
                        />
                    </AuthComponent>
                </div>

            ),
        },


    ], [t, deleteMutation])
}
export default useTableColumns;
