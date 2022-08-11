import useLanguageSelector from "./useLanguageSelector";

export const useLanguageCode = () => {
  const { activeLanguage } = useLanguageSelector();

  if (activeLanguage === "ar-SY") return "ar";
  return activeLanguage;
};

export const useBackendLanguageCode = () => {
  const { activeLanguage } = useLanguageSelector();

  if (activeLanguage === "en") return 0;
  if (activeLanguage === "ar-SY") return 1;
  return 3;
};
