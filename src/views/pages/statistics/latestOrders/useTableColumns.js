import React, { useMemo } from "react";
import { useTranslation } from "utility/language";

import OrderStatus from "components/OrderStatus";
import { GrView } from "react-icons/gr";
import {history} from '../../../../history'

const useTableColumns = () => {
    const t = useTranslation();

    return useMemo(
        () => [
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
                name: t("order_total"),
                sortable: true,
                center: true,

                cell: (row) => (
                    <p>{row.order_total.toFixed(2)}</p>
                ),
            },
            {
                name: t("order_status"),
                sortable: false,
                center: true,
                cell: (row) => (
                    <OrderStatus order_status={row.order_status} />
                ),
            },
            {
                name: "#",
                selector: "action",
                sortable: false,
                center: true,
                cell: (row) => (
                    <GrView
                        onClick={() => history.push(`/order/${row.id}`)}
                        size={22}
                        style={{ cursor: "pointer" }}
                    />
                ),
            },


        ],
        [t]
    );
};

export default useTableColumns;
