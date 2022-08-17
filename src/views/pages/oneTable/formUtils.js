
export const getInitialValues = (objectToEdit = null,marker=null) => {
  if (!objectToEdit) {
    return {
        max:"",
        min:"",
      table_image:"",
      top:marker?.top || "",
      left:marker?.left||"",
      qrCode:"",
      table_number:"",
      
    };
  }

  return {
    max:objectToEdit?.max || "",
        min:objectToEdit?.min || "",
        top:objectToEdit?.top || "",
        left:objectToEdit?.left||"",
        table_image:"",
        image_toView:objectToEdit?.table_image || "",
        qrCode:objectToEdit?.qrCode || "",
        table_number:objectToEdit?.table_number||"",
  };
};

export const MapInitialValues=(objectToEdit)=>{
  if (!objectToEdit) {
    return {
          status:"",
          admin_note:"",
      
    };
  }

  return{
    status:objectToEdit?.status,
    admin_note:objectToEdit?.status
  }

}