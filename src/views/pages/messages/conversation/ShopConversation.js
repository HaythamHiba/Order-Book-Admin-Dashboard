import React from 'react'
import { useAuth } from 'redux/hooks/auth'
import { useTranslation } from 'utility/language';
import classes from './Style.module.scss';
import ChatWidget from 'components/@vuexy/chatWidget/ChatWidget';
export default function ShopConversation({data,selectedShop,isLoading=false,clicked}) {
    const {user}=useAuth();
    const t=useTranslation();
    
    if(!selectedShop){
        return(<>
           <div className={classes.selectContainer}>
            <h1 className={classes.title}>
                {t("please_select_shop")}
            </h1>
            </div> 
        </>)
    }
  return (
        <ChatWidget conversation={data} owner_id={user.id}  send={clicked}/>
  )
}
