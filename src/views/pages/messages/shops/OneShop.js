import React from 'react'
import {useBackendLanguageCode} from 'utility/language/useLanguageCode'
import { mapTranslatedProperties } from 'helpers/language';
import { baseURL } from 'api/config';
import classes from './Style.module.scss';
export default function OneShop({shop,clicked}) {
const code=useBackendLanguageCode();

  return (
    <div className={classes.OneshopContainer}

    onClick={()=>clicked(shop.id)}>
        <img className={classes.image} 
        src={`${baseURL}${shop?.shop_image}`} alt="shop_image"/>
        <p className={classes.title}>{mapTranslatedProperties(shop.shop_details,"shop_name",code)}</p>
    </div>
  )
}
