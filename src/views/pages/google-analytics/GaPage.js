import React from "react";
import { useAccessToken } from "extensions/google-analytics/AccessTokenProvider";

import Analytics from "./Analytics";
import OAuth2 from "./OAuth2";

import { useTranslation } from "utility/language";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import Spinner from "components/@vuexy/spinner/Fallback-spinner";

import GoToGaDashboardButton from "./GoToGaDashboardButton";

const GaPage = () => {
  const t = useTranslation();
  const { isLoading, isSuccess, error } = useAccessToken();

  if (isLoading) {
    return <Spinner />;
  }
  if (isSuccess) {
    return <Analytics />;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>{t("google_analytics")}</h2>
        </CardTitle>
      </CardHeader>
      <CardBody>
        {" "}
        <h4>{t("google_analytics_instructions")}</h4>
        <div
          className="mt-2 d-flex align-items-center flex-wrap"
          style={{ gap: "1.5em" }}
        >
          <OAuth2 />
          <GoToGaDashboardButton />
        </div>
        {error && (
          <h5 className="mt-2" style={{ color: "red" }}>
            {t("err_occured")}
          </h5>
        )}
      </CardBody>
    </Card>
  );
};
export default GaPage;
