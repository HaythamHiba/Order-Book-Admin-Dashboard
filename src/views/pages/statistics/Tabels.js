import React from 'react'
import { Col, Row } from 'reactstrap'
import LatestOrdersTable from './latestOrders/LatestOrdersTable'
import LatestUsersTable from './latestUsers/LatestUsersTable'

export default function Tabels({latest_users,latest_orders}) {
  return (
    <Row xs={1} sm={1} md={1} lg={2} xl={2}>
        <Col>
            <LatestOrdersTable latest_Orders={latest_orders}/>
        </Col>
        <Col>
        <LatestUsersTable latest_users={latest_users}/>
        </Col>
    </Row>
  )
}
