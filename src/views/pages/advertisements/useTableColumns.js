import React, { useMemo } from "react";
import {
    useDeleteCustomWithoutBtnAd,
    useToggleCustomWithoutBtnAdStatus,
} from "api/advertisements";
import { useTranslation } from "utility/language";
import Actions from "components/table/TableActions";
import HovarableImage from "components/HovarableImage";
import { baseURL } from "api/config";
import { mapTranslatedProperties } from "helpers/language";
import { ToggleStatus } from "components/ToggleStatus";
const useTableColumns = (setEditModal, setObjectToEdit) => {
    const t = useTranslation();
    const deleteMutation = useDeleteCustomWithoutBtnAd();
    const toggleMutation = useToggleCustomWithoutBtnAdStatus();
    return useMemo(() => [
        {
            name: t("sort"),
            selector: "slider_sort",
            sortable: true,
            center: true,
        },
        {
            name: t("link"),
            selector: "slider_link",
            sortable: false,
            center: true,
            cell: (row) => (
                <a
                    href={row.slider_link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {row.slider_link}
                </a>
            ),
        },
        {
            name: `${t('title')} (${t('en')})`,
            sortable: true,
            center: true,
            cell: (row) => mapTranslatedProperties(
                row.slider_details,
                "slider_title",
                1
            )
        },
        {
            name: `${t('title')} (${t('ar')})`,
            sortable: true,
            center: true,
            cell: (row) => mapTranslatedProperties(
                row.slider_details,
                "slider_title",
                2
            )
        },
        {
            name: `${t("image")} (${t("en")})`,
            sortable: false,
            center: true,
            cell: (row) => {
                const imgSource = mapTranslatedProperties(
                    row.slider_details,
                    "slider_image",
                    1
                );
                return (
                    <HovarableImage
                        id={`custom_ad_image_en_${row.id}`}
                        src={`${baseURL}${imgSource}`}
                        width="35"
                    />
                );
            },
        },
        {
            name: `${t("image")} (${t("ar")})`,
            sortable: false,
            center: true,
            cell: (row) => {
                const imgSource = mapTranslatedProperties(
                    row.slider_details,
                    "slider_image",
                    2
                );
                return (
                    <HovarableImage
                        id={`custom_ad_image_ar_${row.id}`}
                        src={`${baseURL}${imgSource}`}
                        width="35"
                    />
                );
            },
        },
      
        {
            name: t("status"),
            sortable: false,
            center: true,
            cell: (row) => (
                <ToggleStatus object={row} toggleMutation={toggleMutation} />
            ),
        },
        {
            name: "#",
            sortable: false,
            center: true,
            cell: (row) => (
                <Actions
                    onEdit={() => {
                        setEditModal(true);
                        setObjectToEdit(row);
                    }}
                    onDelete={() => deleteMutation.mutate({ id: row.id })}
                />
            ),
        },
    ], [toggleMutation, deleteMutation, setObjectToEdit, setEditModal, t]);
}
export default useTableColumns;