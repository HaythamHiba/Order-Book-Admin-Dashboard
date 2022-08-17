import React from "react";
import { Row, Col } from "reactstrap";
import { ValidatedField } from "components/input/ValidatedField";
import { useTranslation } from "utility/language";
import { useFormikContext } from "formik";
import ImagePreview from "components/ImagePreview";
import { useImagePreview } from "hooks";
import Checkbox from "components/@vuexy/checkbox/CheckboxesVuexy";
import { Check } from "react-feather";
import { SelectField } from "components/input/SelectField";
import useCategoryOptions from "utility/selectionOptions/useCategoryOptions";
import useSubCategoryOptions from "utility/selectionOptions/useSubCategoryOptions";


const DetailsForm = ({ editMode = false }) => {
  const t = useTranslation();
  const formik = useFormikContext();
  const { preview } = useImagePreview(
    formik.values.image_preview || null
  );
  const categoriesOptions=useCategoryOptions(false,formik.values.vendor_id);
  const subcategoriesOptions=useSubCategoryOptions(false,formik.values.vendor_id,formik.values.category_id);


  return (
    <>
      <Row className="mb-1" xs={1} sm={1} md={1} lg={2} xl={2}>
        <Col lg={7} xl={7}>

          
            
              <ValidatedField
                name="price"
                label={t("price")}
                placeholder={t("price")}
                type="number"
                isRequired
                readOnly
              />
              <SelectField
                label={t("category")}
                options={categoriesOptions}
                name="category_id"
                onChange={(opt) => {
                  formik.setFieldValue("category_id", opt.value);
                }}
                required
                readOnly

              />
              {

                subcategoriesOptions.length>0&&
                  <SelectField
                label={t("subcategory")}
                options={subcategoriesOptions}
                name="sub_category_id"
                onChange={(opt) => {
                  formik.setFieldValue("sub_category_id", opt.value);
                }}
                readOnly
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
        
            </Col>
           
    
    
        
        <Col lg={5} xl={5}>

          <ImagePreview height={300} preview={preview} />
        </Col>
      </Row>
    
    </>
  );
};

export default DetailsForm;
