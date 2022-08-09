import { mapTranslatedProperties } from "helpers/language";

export const getInitialValues = (privacy) => ({
  translated_fields: {
    1: {
      privacy_description:
        mapTranslatedProperties(privacy, "privacy_description", 1) || "",
    },
    2: {
      privacy_description:
        mapTranslatedProperties(privacy, "privacy_description", 2) || "",
    },
  },
});
