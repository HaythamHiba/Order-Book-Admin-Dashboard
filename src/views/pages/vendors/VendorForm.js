import React from "react";
import { ValidatedField } from "components/input/ValidatedField";
import { useTranslation } from "utility/language";
import { useFormikContext } from "formik";
import ImagePreview from "components/ImagePreview";
import { Row, Col } from "reactstrap";
import { MapContainer, TileLayer,Marker,useMapEvents } from 'react-leaflet'
import "leaflet/dist/leaflet.css";

import L from "leaflet";


const VendorForm = ({ preview, handleImageChange, editMode = false }) => {
  const t = useTranslation();
  const formik = useFormikContext();



const LocationIcon = new L.Icon({
  iconUrl: require("../../../assets/img/svg/map-marker.png"),
  iconRetinaUrl: require("../../../assets/img/svg/map-marker.png"),
  iconSize: new L.Point(45, 45),
});
const MapEvents = () => {
  useMapEvents({
    click(e) {
  
      formik.setFieldValue("longitude",e.latlng.lng)
      formik.setFieldValue("latitude",e.latlng.lat)

    },
  });
  return <Marker position={[formik.values.latitude,formik.values.longitude]} icon={LocationIcon}>
 
  </Marker>
  
}

  return (
    <Row xs={1} sm={1} md={1} lg={2} xl={2}>
      <Col>
      <ValidatedField
        dir="ltr"
        name="name[en]"
        label={`${t("vendor_name")} ${t("en")}`}
        placeholder={`${t("vendor_name")} ${t("en")}`}
      />
       <ValidatedField
        dir="rtl"
        name="name[ar]"
        label={`${t("vendor_name")} ${t("ar")}`}
        placeholder={`${t("vendor_name")} ${t("ar")}`}
      />
       <ValidatedField
          id="logo"
          type="file"
          label={t("vendor_image")}
          name="logo"
          accept="image/*"
          onChange={(e) => {
            handleImageChange(e);
            formik.setFieldValue("logo", e.target.files[0]);
          }}
        />
        <ImagePreview preview={preview} />
      </Col>
      
      <Col>

      <div dir="ltr" >
  <MapContainer
      center={[formik.values.latitude,formik.values.longitude]}
      scrollWheelZoom={true}
      zoom={13}
      style={{ width: "100%", height: "30rem",zIndex:"10" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
     
     <MapEvents />

    </MapContainer>

    </div>
       
      </Col>
    </Row>
  );
};

export default VendorForm;
