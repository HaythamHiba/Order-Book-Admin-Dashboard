import React from 'react'
import { useTranslation } from 'utility/language'
import { mapTranslatedProperties } from 'helpers/language';
import HovarableImage from 'components/HovarableImage';
import { baseURL } from 'api/config';
import { useBackendLanguageCode } from 'utility/language';
export default function useTableColumns() {
    const t = useTranslation();
    const langCode = useBackendLanguageCode();
    return React.useMemo(() => [
        {
            name: `${t('name')}`,
            sortable: true,
            center: true,
            cell: (row) => mapTranslatedProperties(
                row.product_details,
                "product_name",
                langCode
            )
        },

        {
            name: `${t("image")}`,
            sortable: false,
            center: true,
            cell: (row) => {
                const imgSource = row.product_main_image
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
            name: `${t('discount_name')}`,
            sortable: true,
            center: true,
            cell: (row) =>row.discount_rate? mapTranslatedProperties(
                row.discount_details,
                "discount_name",
                langCode
            ):t("no_discount")
        },

        {
            name: t("product_quantity"),
            sortable: true,
            center: true,
            selector: "product_quantity"
        },
        {
            name: t("discount_rate"),
            sortable: true,
            center: true,
            cell: (row) => row.discount_rate&&<p>{row.discount_rate}{"%"}</p>
        },
        {
            name: t("price"),
            sortable: true,
            center: true,
            cell: (row) => <>

                {
                    row.product_price_after_discount ? <div className='d-flex' style={{gap:"10px"}}>



                        <p>{row.product_price_after_discount.toFixed(2)}</p>
                        <p style={{ color: "red", textDecoration: "line-through" }}>{row.product_price.toFixed(2)}</p>
                    </div>
                        : <p >{row.product_price.toFixed(2)}</p>
                }
            </>

        },


    ], [t, langCode])
}
