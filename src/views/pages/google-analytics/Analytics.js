import React from "react";
import { useAccessToken } from "extensions/google-analytics/AccessTokenProvider";
import { useAnalyticsApi } from "react-use-analytics-api";
import {
  AuthorizeButton,
  SessionsByDateChart,
  ActiveUsersChart,
  SessionsGeoChart,
  SessionsBySourceChart,
  BounceRateChart,
  PageViewsPerPathChart,
  PagesPerSessionChart,
  SessionDurationChart,
  SessionsByDeviceCategoryChart,
  SessionsByHourChart,
  SessionsByUserTypeChart,
} from "react-analytics-charts";

import Spinner from "components/@vuexy/spinner/Fallback-spinner";
import { useTranslation } from "utility/language";
import { Card, CardBody, Row, Col } from "reactstrap";

import GoToGaDashboardButton from "./GoToGaDashboardButton";

import { gaConfigs } from "extensions/google-analytics/configs";
const { viewId } = gaConfigs;

const Element = ({ children }) => (
  <Card>
    <CardBody>{children}</CardBody>
  </Card>
);
const CustomRow = ({ children, ...props }) => (
  <Row xs={1} sm={1} md={1} lg={2} xl={2} {...props}>
    {children?.map((child, index) => (
      <Col key={index}>
        <Element>{child}</Element>
      </Col>
    ))}
  </Row>
);

const Analytics = () => {
  const t = useTranslation();
  const { accessToken } = useAccessToken();
  const { ready, gapi, authorized, error } = useAnalyticsApi();

  if (!ready) {
    return <Spinner />;
  }
  if (error) {
    return (
      <h5 className="mt-2" style={{ color: "red" }}>
        {t("err_occured")}
      </h5>
    );
  }
  if (!authorized) {
    return (
      <AuthorizeButton
        gapi={gapi}
        authOptions={{ serverAuth: { access_token: accessToken } }}
      />
    );
  }
  return (
    <>
      <div className="mb-2 d-flex justify-content-between align-items-center flex-wrap">
        <h1>{t("google_analytics")}</h1>
        <GoToGaDashboardButton />
      </div>
      <div dir="ltr">
        <Element>
          <PageViewsPerPathChart gapi={gapi} viewId={viewId} days={28} />
        </Element>

        <CustomRow>
          <ActiveUsersChart
            gapi={gapi}
            viewId={viewId}
            days={28}
            activeUserDays={7}
          />
          <SessionsGeoChart gapi={gapi} viewId={viewId} showPageViews />
        </CustomRow>

        <CustomRow lg={3} xl={3}>
          <SessionsByDeviceCategoryChart
            gapi={gapi}
            viewId={viewId}
            days={28}
          />
          <SessionsByUserTypeChart gapi={gapi} viewId={viewId} days={28} />
          <SessionsBySourceChart gapi={gapi} viewId={viewId} />
        </CustomRow>

        <CustomRow>
          <BounceRateChart gapi={gapi} viewId={viewId} days={28} />
          <SessionDurationChart gapi={gapi} viewId={viewId} days={28} />
        </CustomRow>

        <Element>
          <SessionsByHourChart gapi={gapi} viewId={viewId} days={28} />
        </Element>

        <CustomRow>
          <PagesPerSessionChart gapi={gapi} viewId={viewId} days={28} />
          <SessionsByDateChart
            gapi={gapi}
            viewId={viewId}
            days={28}
            showPageViews
            showUsers
          />
        </CustomRow>
      </div>
    </>
  );
};

export default Analytics;

// =====================================================

/* <AnalyticsDashboard
  authOptions={{ serverAuth: { access_token: "access_token" } }}
  renderCharts={(gapi, viewId) => {
    return (
      <div>
        <SessionsByDateChart
          gapi={gapi}
          viewId={viewId}
          showPageViews
          showUsers
        />
        <SessionsGeoChart gapi={gapi} viewId={viewId} showPageViews />
      </div>
    );
  }}
/> */
