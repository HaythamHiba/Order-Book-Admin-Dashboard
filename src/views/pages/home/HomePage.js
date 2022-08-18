import React from "react";
import { useTranslation } from "utility/language";

import StatisticsPage from 'views/pages/statistics/StatisticsPage';
export default function HomePage() {
  const t=useTranslation();
  return (
 <>
 <h1>{t("welcome_to_dashboard")}</h1>
  <StatisticsPage/>
 </>
  );
}
