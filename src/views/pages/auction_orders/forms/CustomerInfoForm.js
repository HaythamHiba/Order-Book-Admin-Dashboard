import { ValidatedField } from 'components/input';
import React from 'react'
import { useTranslation } from 'utility/language'
import { Button } from 'reactstrap';
import UserSelectForm from './UserSelectModal';


export default function CustomerInfoForm({auction={},editMode=false}) {
  const t=useTranslation();
  const [open,setOpen]=React.useState(false);
  return (
    
    <>
    <div style={{display:"block",margin:"1rem 0"}}>
    {
      !editMode||(editMode&&auction?.auction_order_status==="pending_payment")?<>
      <Button color="primary" onClick={()=>setOpen(true)}>
        {editMode?t("change_user"):t("select_user")}
      </Button>
     <UserSelectForm open={open} setOpen={setOpen}/>

      </>:null
    }
    </div>
      <ValidatedField

name="customer_name"
label={t("customer_name")}
placeholder={t("customer_name")}
type="text"
readOnly={editMode&&auction?.auction_order_status!=="pending_payment"}

/>
<ValidatedField

name="customer_phone_number"
label={t("customer_phone_number")}
placeholder={t("customer_phone_number")}
type="text"
readOnly={editMode&&auction?.auction_order_status!=="pending_payment"}

/>
{
  editMode&&auction?<>

          <ValidatedField

            name="payment_code"
            label={t("payment_code")}
            placeholder={t("payment_code")}
            type="text"
            readOnly={editMode}


          />
          <ValidatedField

          name="payment_method"
          label={t("payment_method")}
          placeholder={t("payment_method")}
          type="text"

          readOnly={editMode}

          />
          <ValidatedField

          name="payment_status"
          label={t("payment_status")}
          placeholder={t("payment_status")}
          type="text"
          readOnly={editMode}


          />
  </>:null
}


    </>
  )
}
