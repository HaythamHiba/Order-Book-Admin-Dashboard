import React from 'react'
import { Col, Row } from 'reactstrap';
import StatisticsCards from 'components/@vuexy/statisticsCard/StatisticsCard';
import CategoryIcon from '@mui/icons-material/Category';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { BsShop } from "react-icons/bs";

import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useTranslation } from 'utility/language';
import { history } from "../../../history";

export default function StatisticsPage() {
    const t = useTranslation();

    return (
        <>
            <Row xs={1} sm={1} md={1} lg={2} xl={2} >
                <Col style={{ padding:"0.5rem" }} onClick={() => history.push('/vendor_categories')}>
                <div style={{ cursor: "pointer" }}>
                    <StatisticsCards
                        icon={<CategoryIcon className="warning" size={24} />}
                        stat={20}
                        statTitle={t("_active.categories_count")}
                        hideChart
                        iconLeft
                    />
                    </div>
                </Col>
                <Col  style={{padding:"0.5rem"}} onClick={() => history.push('/vendors')}>
                    <div style={{ cursor: "pointer" }}>

                    <StatisticsCards
                        icon={<ShoppingBagIcon className="warning" size={24} />}
                        stat={3}
                        statTitle={t("_active.vendors_count")}
                        hideChart
                        iconLeft
                    />
                    </div>
                </Col>
            </Row>
            <Row xs={1} sm={1} md={1} lg={2} xl={2} >
                <Col style={{padding:"0.5rem"}} onClick={() => history.push('/vendor_subcategories')}>
                    <div style={{ cursor: "pointer" }} >

                    <StatisticsCards
                        icon={<ReceiptIcon className='warning' size={24} />}
                        stat={8}
                        statTitle={t("_active.subcategories_count")}
                        hideChart
                        iconLeft
                    />
                    </div>
                </Col>
                <Col style={{padding:"0.5rem"}} onClick={() => history.push('/vendor_items')}>
                    <div style={{ cursor: "pointer" }} >

                    <StatisticsCards
                        icon={<BsShop className="warning" size={24} />}
                        stat={40}
                        statTitle={t("_active.items_count")}
                        hideChart
                        iconLeft
                    />
                    </div>
                </Col>
            </Row>
        </>
    )
}
