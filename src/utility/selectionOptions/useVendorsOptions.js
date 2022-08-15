import React from "react";
import { useBackendLanguageCode } from "utility/language/useLanguageCode";
import { getLanguageAttr } from "helpers/language";
import {  useGetVendors } from "api/vendors";
import { useTranslation } from "utility/language";

const useVendorsOptions = ({ withAllOption = false } = {}) => {
  const languageCode = useBackendLanguageCode();
  const { data } = useGetVendors();  
  const t = useTranslation();
  

  return React.useMemo(() => {
    let options = [];
    if (data && data && Array.isArray(data)) {
      options = data.map((vendor) => ({
        value: vendor.id,
        label:getLanguageAttr(vendor.name,languageCode)
      }));
    }

    if (withAllOption) {
      return [{ label: t("all"), value: null }, ...options];
    }
    return options;
  }, [data, languageCode, withAllOption, t]);
};

export default useVendorsOptions;
