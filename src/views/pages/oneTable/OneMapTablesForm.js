import React from 'react'
import ImageMarker from "react-image-marker";
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { Check } from "react-feather";
import Checkbox from "components/@vuexy/checkbox/CheckboxesVuexy";
import EditOneTableModal from "./EditOneTableModal";
import { useTranslation } from 'utility/language';
import { useFormikContext } from 'formik';
import { ValidatedField } from 'components/input';
export default function OneMapTablesForm({preview,marks}) {

    const [markers,setMarkers]=React.useState(marks);
    const [editModal, setEditModal] = React.useState(false);
    const [objectToEdit,setObjectToEdit]=React.useState({});
      const t=useTranslation();
      const formik=useFormikContext();

    const CustomMarker = (props) => {
  
        return (
          <>
      
           <div onClick={()=>{setEditModal(true);setObjectToEdit(props)}} 
            style={{display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
          <TableRestaurantIcon htmlColor="#FF7314" size={25}/>
           
           </div>
          </>
      
        );
      };
    

  return (
    <>
    {
          preview&& <ImageMarker
          src={preview}
          markers={markers}
          markerComponent={CustomMarker}
          
        />
        }
         <Checkbox
            color="primary"
            icon={<Check className="vx-icon" size={16} />}
            label={t("active")}
            checked={formik.values.status}
            onChange={() =>
              formik.setFieldValue("status", !formik.values.status)
            }
          />
          {
            !formik.values.status&& <ValidatedField
            dir="rtl"
            name="admin_note"
            label={`${t("admin_note")}`}
            placeholder={`${t("admin_note")}`}
            as="textarea"
          />
          }
        
    

        <EditOneTableModal isOpen={editModal} 
        setIsOpen={setEditModal} 
        objectToEdit={objectToEdit} 
        setMarkers={setMarkers}
         markers={markers}
     
         />
    </>
  )
}
