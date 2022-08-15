import React from "react";
import { Form, Formik } from "formik";
import { ValidatedField } from "components/input/ValidatedField";
import { Row, Col } from "reactstrap";
import { Phone } from "react-feather";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Roles, VENDOR} from "configs/Roles";
import { RadioInput } from "components/input/RadioInput";
import { useTranslation } from "utility/language";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import * as Yup from "yup";
import "./index.css";
import PropTypes from "prop-types";
import { LoadingButton } from "components/input/LoadingButton";
import useShopsOptions from "utility/selectionOptions/useVendorsOptions";
import { getDataToSend } from "api/accounts";
import { SelectField } from "components/input";

export const RegisterForm = ({ mutation, editMode, objectToEdit }) => {
  const t = useTranslation();
  const shopsOptions=useShopsOptions();
  const rolesOptions = React.useMemo(
    () =>
      Roles.map((role) => ({
        label: t(role),
        value: role,
      })),
    [t]
  );

  const handleSubmit = (values) => {
    const dataToSend = getDataToSend(values, editMode, objectToEdit);
    mutation.mutate(dataToSend);
  };

  return (
    <Formik
      initialValues={getInitialValues(editMode, objectToEdit)}
      validationSchema={getValidationSchema(editMode)}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form>
          <ValidatedField
            name="full_name"
            label={t("full_name")}
            placeholder={t("full_name")}
            icon={PersonOutlineOutlinedIcon}
            isRequired
          />
          <Row xs={1} sm={1} md={2} lg={2} xl={2}>
            <Col>
              <ValidatedField
                name="email"
                label={t("email")}
                placeholder={t("email")}
                type="email"
                icon={MailOutlineIcon}
                autoComplete="new-password"
                isRequired
              />
            </Col>
            <Col>
              <ValidatedField
                name="phone"
                label={t("phone")}
                placeholder={t("phone")}
                icon={Phone}
                isRequired
              />
            </Col>
            {!editMode && (
              <>
                <Col>
                  <ValidatedField
                    name="password"
                    label={t("password")}
                    placeholder={t("password")}
                    type="password"
                    autoComplete="new-password"
                    icon={LockOutlinedIcon}
                    isRequired
                  />
                </Col>
                <Col>
                  <ValidatedField
                    name="password_confirmation"
                    label={t("confirm_password")}
                    placeholder={t("confirm_password")}
                    type="password"
                    autoComplete="new-password"
                    icon={LockOutlinedIcon}
                    isRequired
                  />
                </Col>
              </>
            )}
          </Row>
          <Row xs={1} sm={1} md={2} lg={2} xl={2}>
            <Col md={3} lg={3} xl={3}>
              <h5 className="ml-1">{t("role")}</h5>
              <RadioInput className="m-2" name="role" options={rolesOptions} />
            </Col>
            <Col md={9} lg={9} xl={9}>
           
              {formik.values.role === VENDOR && (
                 <SelectField
                 label={t("shop")}
                 options={shopsOptions}
                 name="shop_id"
                 onChange={(opt) => {
                   formik.setFieldValue("shop_id", opt.value);
                 }}
                 
               />
              )}
                 <h5>
                <ErrorOutlineOutlinedIcon /> {t("permissions")}
                {" - "}
                {t(formik.values.role)}
              </h5>
              <pre className="permissions-section">
                {t(`_permissions.${formik.values.role}`)}
              </pre>
              
            </Col>
          </Row>
          
          <LoadingButton
            isLoading={mutation.isLoading}
            className="mt-1 float-right"
            color="primary"
            type="submit"
          >
            {!editMode ? t("add") : t("save")}
          </LoadingButton>
        </Form>
      )}
    </Formik>
  );
};
RegisterForm.propTypes = {
  editMode: PropTypes.bool,
  objectToEdit: PropTypes.object,
};
RegisterForm.defaultProps = {
  editMode: false,
  objectToEdit: {},
};

function getInitialValues(editMode, objectToEdit) {
  if (editMode) {

    return {
      full_name: objectToEdit.full_name,
      email: objectToEdit.email,
      phone: objectToEdit.phone,
      role: objectToEdit.role_type,
      password: "",
      password_confirmation: "",

      shop_id:objectToEdit.shop_id || ""
      
    };
  }
  return {
    full_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    role: Roles[0],
 
    shop_id:""
  };
}

function getValidationSchema(editMode) {
  return Yup.object().shape({
    full_name: Yup.string().required("required"),
    email: Yup.string().email("validation.invalid_email").required("required"),
    phone: Yup.string().required("required"),
    role:Yup.string().required("required"),
     shop_id:Yup.string().notRequired()
     .when("role",{is:val=>val==="vendor",then:Yup.string().required("required"),otherwise:Yup.string().notRequired()}),
    ...(!editMode && {
      password: Yup.string().required("required"),
      password_confirmation: Yup.string()
        .required("required")
        .oneOf([Yup.ref("password"), null], "validation.password_match"),
    }),
  });
}
