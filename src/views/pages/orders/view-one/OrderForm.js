import React from 'react'
import { Row, Col } from 'reactstrap'
import { useTranslation } from 'utility/language'
import classes from './OrderForm.module.scss';
export default function OrderForm({ order }) {
    const t = useTranslation();
    return (
        <>
            <Row xs={1} sm={1} md={1} lg={2} xl={2}>
                <Col className={classes.test} >
                    <p >{t("customer_name")}{" : "}{order.customer_name}</p>
                    <p >{t("customer_phone_number")}{" : "}{order.customer_phone_number}</p>
                    <p >{t("customer_email")}{" : "}{order.customer_email}</p>
                    <p >{t("payment_method")}{" : "}{order.payment_method}</p>
                    <p >{t("payment_status")}{" : "}{order.payment_status}</p>
                    <p >{t("payment_code")}{" : "}{order.payment_code}</p>
                </Col>
                <Col className={classes.test} >
                    <p >{t("customer_address_country")}{" : "}{order.customer_address_country}</p>
                    <p >{t("customer_address_city")}{" : "}{order.customer_address_city}</p>
                    <p >{t("customer_address_street")}{" : "}{order.customer_address_street}</p>
                    <p >{t("customer_address_building_number")}{" : "}{order.customer_address_building_number}</p>
                    {

                        order.customer_address_additional_information &&
                        <p >{t("customer_address_additional_information")}{" : "}{order.customer_address_additional_information}</p>
                    }

                </Col>
            </Row>
            <Row className={classes.Wrapper}>
              
                    <div className={classes.totalsForm}>

                        <h1 >{t("totals")}</h1>
                        <p >{t("sub_total")}{" : "}{order["totals"].sub_total.toFixed(2)}</p>
                        <p >{t("tax_total")}{" : "}{order["totals"].tax_total.toFixed(2)}</p>
                        <p >{t("overall_total")}{" : "}{order["totals"].overall_total.toFixed(2)}</p>
                    </div>
         
            </Row>
        </>
    )
}
