import { useMemo } from "react";
import { useTranslation } from "utility/language";



const useTableColumns = () => {
    const t = useTranslation();

    return useMemo(
        () => [
            {
                name: t("full_name"),
                selector: "full_name",
                sortable: false,
                center: true,
            },
            {
                name: t("phone"),
                selector: "phone",
                sortable: true,
                center: true,

            },



        ],
        [t]
    );
};

export default useTableColumns;
