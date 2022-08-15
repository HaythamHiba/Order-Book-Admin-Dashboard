import { useGetImages,useUpdateImages } from 'api/images';
import { StatusCard } from 'components/StatusCard';
import React from 'react'
import { useParams } from 'react-router-dom';

import AdditionalImages from './AdditionalImages';


export default function ImagesPage() {
  const {vendor_id}=useParams();
    const updateMutation=useUpdateImages(vendor_id);
   const {data :images,isLoading}=useGetImages(vendor_id);
   const data=images?images:[];

   if(isLoading){
    return <StatusCard isLoading={isLoading}/>
   }
  return (
    <>
    
    <AdditionalImages data={data} mutation={updateMutation}/>
    </>
  )
}
