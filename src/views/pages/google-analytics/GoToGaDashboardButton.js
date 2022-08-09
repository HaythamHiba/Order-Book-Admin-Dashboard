import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { gaConfigs } from "extensions/google-analytics/configs";
import { Button } from "reactstrap";

import { useTranslation } from "utility/language";

const GoToGaDashboardButton = () => {
  const t = useTranslation();
  return (
    <a href={gaConfigs.dashboardLink} rel="noopener noreferrer" target="_blank">
      <Button color="primary" className="px-2 py-1 d-flex align-items-center">
        {t("open_google_dashboard")}{" "}
        <FiExternalLink color="#fff" size={16} className="ml-1" />
      </Button>
    </a>
  );
};

export default GoToGaDashboardButton;
