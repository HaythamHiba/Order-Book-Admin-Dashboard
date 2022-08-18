import { LoadingButton } from 'components/input';
import { StatusCard } from 'components/StatusCard';
import { getLanguageAttr } from 'helpers/language';
import { useImagePreview } from 'hooks';
import React from 'react'
import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap';
import { useBackendLanguageCode, useTranslation } from 'utility/language';
import { Formik, Form } from "formik";
import OneMapTablesForm from './OneMapTablesForm';
import { ImageURL } from 'api/config';
import { useGetSingleMap,useUpdateMap } from 'api/maps';
import useMapsOptions from 'utility/selectionOptions/useMapsOptions';
import Select from "react-select";
import useVendorsOptions from 'utility/selectionOptions/useVendorsOptions';
import { MapInitialValues } from './formUtils';
import StatusBadge from 'components/StatusBadge';


export default function OneTableChartPage() {
    const [selectedMap,setSelectedMap]=React.useState("");
    const [selectedVendor,setSelectedVendor]=React.useState("");
    const {data,isLoading,isSuccess}=useGetSingleMap(selectedVendor,selectedMap);
    const lang=useBackendLanguageCode();
    const t=useTranslation();
    const mapsOptions=useMapsOptions(false,selectedVendor)
    const vendorOptions=useVendorsOptions(false)

    const mutation=useUpdateMap(selectedVendor,selectedMap);
    
 
    const mapData=data?data:{};
    const chartImage = mapData?.image;
    const { preview,setPreview } =
      useImagePreview(chartImage);

      React.useEffect(() => {
        if (isSuccess) {
          setPreview(`${ImageURL}${chartImage}`);
        }
      }, [isSuccess, setPreview, chartImage]);
    const  handleSubmit=(values)=>{
           
      mutation.mutate(values)
           
           
        
      }




    let content=<>
    <div style={{marginTop:"20px",textAlign:"center"}}>
        <h1>{t("please_selcet_vandor_and_map")}</h1>

    </div>
    </>;
    if(isLoading){
      content=<StatusCard isLoading={isLoading}/>
    }
    if(isSuccess){
      content=<>
           <Card>
        <CardHeader>
    <h1>{getLanguageAttr(mapData.name,lang)}</h1>

        <StatusBadge status={mapData?.status}/>
            
        </CardHeader>
       
        <Formik
        onSubmit={handleSubmit}
        initialValues={MapInitialValues(mapData)}
        
      >
        {(formik) => (
          <Form>
           <CardBody>
              <OneMapTablesForm
                preview={preview}
                marks={mapData?.markers}
                
              />
           </CardBody>
            <CardFooter>
        
              <LoadingButton
                type="submit"
                color="primary"
               isLoading={mutation.isLoading}
              >
                {t("save")}
              </LoadingButton>
            </CardFooter>
          </Form>
        )}
      </Formik>

       

    </Card>

      </>
    }




  return (
    <>

<h1>{t("vendor_maps")}</h1>
      <div className="d-flex align-items-center mb-1 justify-content-between">
        
      <div style={{ width: "15rem" }} className="mr-1">
           
           <Select
        
             placeholder={t("vendors")}
             options={vendorOptions}
             name="vendor_id"
             onChange={(opt) => {
               setSelectedVendor(opt.value ?? "");
               setSelectedMap("")
             }}
           />
           
         </div>
         <div style={{ width: "15rem" }} className="mr-1">
           
           <Select
        
             placeholder={t("maps")}
             options={mapsOptions}
             name="map_id"
             onChange={(opt) => {
               setSelectedMap(opt.value ?? "");
             }}
           />
           
         </div>
         </div>
        

             {content}
 
   
  </>
  )
}
