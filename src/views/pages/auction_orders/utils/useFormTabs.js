import React from "react";
import DetailsForm from "../forms/DetailsForm";
import BusinessIcon from '@mui/icons-material/Business';
import { BsInfoCircle } from "react-icons/bs";
import { useTranslation } from "utility/language";
import CustomerInfoForm from "../forms/CustomerInfoForm";
import CustomerAddressForm from "../forms/CustomerAddressForm";
import PersonIcon from '@mui/icons-material/Person';

const useFormTabs = (editMode = false,auction={}) => {
  const t = useTranslation();

  return React.useMemo(() => {
    const tabs = [
      {
        title: (
          <>
            <BsInfoCircle size={20} /> {t("auction_order_details")}
          </>
        ),
        content: <DetailsForm auction={auction} editMode={editMode} />,
      },

      {
        title: (
          <>
            <PersonIcon size={20} /> {t("customer_info")}
          </>
        ),
        content: <CustomerInfoForm auction={auction} editMode={editMode} />,
      },
    

 



    ];
    if(editMode){
      tabs.push(  {
        title: (
          <>
            <BusinessIcon size={20} /> {t("customer_address")}
          </>
        ),
        content: <CustomerAddressForm auction={auction} editMode={editMode} />,
      },)
    }
    
   
    return tabs;
  }, [t, editMode,auction]);
};

export default useFormTabs;
