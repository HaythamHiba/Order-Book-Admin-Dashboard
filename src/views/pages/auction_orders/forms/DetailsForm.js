import React from "react";
import { Row, Col } from "reactstrap";
import { ValidatedField } from "components/input/ValidatedField";
import { useTranslation } from "utility/language";
import { useFormikContext } from "formik";




const DetailsForm = ({auction={}, editMode = false }) => {
  const t = useTranslation();
  const formik = useFormikContext();



  return (
    <>
      <Row className="mb-1" xs={1} sm={1} md={1} lg={2} xl={2}>

        <Col lg={5} xl={5}>
        <ValidatedField

        name="auction_order_total"
        label={t("auction_order_price")}
        placeholder={t("auction_order_price")}
        type="number"
        isRequired={true}
        readOnly={editMode&&auction?.auction_order_status!=="pending_payment"}

        />
    
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",margin:"1rem",flexWrap:"wrap"}}>
              <div>
                <h5>
                  {t("tax_total")} {" : "} { ((formik.values.auction_order_total*5)/100).toFixed(2)}
                </h5>
              </div>

              <div>
                <h5>

              {t("overall_total")} {" : "} { (((formik.values.auction_order_total*5)/100)+formik.values.auction_order_total)}
              </h5>
              </div>

              </div>

        </Col>
        <Col lg={7} xl={7}>
        <ValidatedField
        name={`translated_fields[1][auction_name]`}
        label={t("auction_name") + " " + t("en")}
        placeholder={t("auction_name") +" " +  t("en")}
        isRequired
      />

      <ValidatedField
        name={`translated_fields[1][auction_mobile_description]`}
        label={t("auction_mobile_description") + " " + t("en")}
        placeholder={t("auction_mobile_description") + " " + t("en")}
        as="textarea"
      />
         <ValidatedField
        name={`translated_fields[2][auction_name]`}
        label={t("auction_name") + " " + t("ar")}
        placeholder={t("auction_name") + " " +  t("ar")}
        isRequired
      />

      <ValidatedField
        name={`translated_fields[2][auction_mobile_description]`}
        label={t("auction_mobile_description") + " " + t("ar")}
        placeholder={t("auction_mobile_description") + " " + t("ar")}
        as="textarea"
      />
     



        </Col>
      </Row>
     





    </>
  );
};

export default DetailsForm;
