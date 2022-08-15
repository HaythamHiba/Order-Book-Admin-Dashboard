

export const getInitialValues = ( objectToEdit = null) => {
  if (!objectToEdit) {
   
    return {
    

   
      status:"",
      admin_note:"",
    };
  }
 


  return {
    status:objectToEdit[0]?.status|| "",
    admin_note:objectToEdit[0]?.admin_note || "",

  };
};

