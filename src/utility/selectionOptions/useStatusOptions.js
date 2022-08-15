import { useTranslation } from "utility/language"

export const useStatusOptions = () => {
    const t = useTranslation();
    let options = [{
        value: "",
        label: t("all")
    },
    {
        value: true,
        label: t("active")
    },
    {
        value: false,
        label: t("inactive")
    },
   ];
    return options;
}