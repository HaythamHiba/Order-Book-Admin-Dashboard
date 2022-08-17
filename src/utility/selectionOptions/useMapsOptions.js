import React from "react";
import { useBackendLanguageCode } from "utility/language/useLanguageCode";
import { getLanguageAttr } from "helpers/language";
import { useTranslation } from "utility/language";
import { useGetMaps } from "api/maps";

const useMapsOptions = ({ withAllOption = false } = {},vendor_id) => {
  const languageCode = useBackendLanguageCode();
  const { data } = useGetMaps(vendor_id);
  const t = useTranslation();

  return React.useMemo(() => {
    let options = [];
    if (data && data && Array.isArray(data)) {
      options = data.map((map) => ({
        value: map.id,
        label: getLanguageAttr(map.name,languageCode)
      }));
    }

    if (withAllOption) {
      return [{ label: t("all"), value: null }, ...options];
    }
    return options;
  }, [data, languageCode, withAllOption, t]);
};

export default useMapsOptions;
