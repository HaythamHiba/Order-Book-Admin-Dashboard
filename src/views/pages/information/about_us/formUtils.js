import { mapTranslatedProperties } from "helpers/language";
import { buildFormData } from "api/helpers";

export const getInitialValues = (about_us) => ({
  translated_fields: {
    1: {
      about_us_description:
        mapTranslatedProperties(about_us, "about_us_description", 1) || "",
    },
    2: {
      about_us_description:
        mapTranslatedProperties(about_us, "about_us_description", 2) || "",
    },
  },
  about_us_image: "",
});

export const getDataToSend = (values) => {
  const dataToSend = {
    translated_fields: {
      1: {
        about_us_description: values.translated_fields[1].about_us_description,
      },
      2: {
        about_us_description: values.translated_fields[2].about_us_description,
      },
    },
  };

  if (values.about_us_image) {
    dataToSend.about_us_image = values.about_us_image;
  }

  const formData = new FormData();
  buildFormData(formData, dataToSend);
  return formData;
};
