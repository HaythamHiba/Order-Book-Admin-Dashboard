export const useGetConfirmIsAddress=(data)=>{
    

    if(!data?.customer_address_country){
        
        return false; 

    }
    if(!data?.customer_address_city){
        
        return;
        
    }
    if(!data?.customer_address_street){
       
        return false;

    }
    if(!data?.customer_address_building_number){
       
        return false;

    }


    return true;

}