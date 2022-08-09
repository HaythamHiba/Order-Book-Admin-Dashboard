import React from 'react'
import { useGetStatistics } from 'api/statistics'
import { Col, Row } from 'reactstrap';
import StatisticsCards from 'components/@vuexy/statisticsCard/StatisticsCard';
import CategoryIcon from '@mui/icons-material/Category';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { BsShop } from "react-icons/bs";

import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useTranslation } from 'utility/language';
import { history } from "../../../history";
import SpinnerComponent from 'components/@vuexy/spinner/Fallback-spinner';
import Tabels from './Tabels'
export default function StatisticsPage() {
    const { data: statistics, isLoading } = useGetStatistics();
    const t = useTranslation();
    if (isLoading) {
        return <SpinnerComponent />
    }
    return (
        <>
            <Row xs={1} sm={1} md={1} lg={2} xl={2} >
                <Col style={{ padding:"0.5rem" }} onClick={() => history.push('/categories')}>
                <div style={{ cursor: "pointer" }}>
                    <StatisticsCards
                        icon={<CategoryIcon className="warning" size={24} />}
                        stat={`${statistics?.active_categories_count}`}
                        statTitle={t("_active.categories_count")}
                        hideChart
                        iconLeft
                    />
                    </div>
                </Col>
                <Col  style={{padding:"0.5rem"}} onClick={() => history.push('/owner-products/view-all')}>
                    <div style={{ cursor: "pointer" }}>

                    <StatisticsCards
                        icon={<ShoppingBagIcon className="warning" size={24} />}
                        stat={`${statistics?.active_products_count}`}
                        statTitle={t("_active.products_count")}
                        hideChart
                        iconLeft
                    />
                    </div>
                </Col>
            </Row>
            <Row xs={1} sm={1} md={1} lg={2} xl={2} >
                <Col style={{padding:"0.5rem"}} onClick={() => history.push('/all-orders')}>
                    <div style={{ cursor: "pointer" }} >

                    <StatisticsCards
                        icon={<ReceiptIcon className='warning' size={24} />}
                        stat={`${statistics?.orders_count}`}
                        statTitle={t("_active.orders_count")}
                        hideChart
                        iconLeft
                    />
                    </div>
                </Col>
                <Col style={{padding:"0.5rem"}} onClick={() => history.push('/shops')}>
                    <div style={{ cursor: "pointer" }} >

                    <StatisticsCards
                        icon={<BsShop className="warning" size={24} />}
                        stat={`${statistics?.shops_count}`}
                        statTitle={t("_active.shops_count")}
                        hideChart
                        iconLeft
                    />
                    </div>
                </Col>
            </Row>
            <Tabels latest_orders={statistics?.latest_orders} latest_users={statistics?.latest_users} />
        </>
    )
}
