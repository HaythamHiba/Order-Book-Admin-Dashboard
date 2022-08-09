import React from "react";

import OAuth2Login from "react-simple-oauth2-login";
import { useAccessToken } from "extensions/google-analytics/AccessTokenProvider";
import { OAuth2Configs } from "extensions/google-analytics/configs";

import { useTranslation } from "utility/language";
import { Button } from "reactstrap";
import { FaGoogle } from "react-icons/fa";

const OAuth2 = () => {
  const t = useTranslation();
  const { setAccessToken, setError } = useAccessToken();

  const onSuccess = (response) => {
    console.log(response);
    setAccessToken(response.access_token);
    setError(null);
  };

  const onFailure = (err) => {
    console.log(err);
    setError(err);
  };

  return (
    <OAuth2Login
      {...OAuth2Configs}
      responseType="token"
      onSuccess={onSuccess}
      onFailure={onFailure}
      render={({ onClick }) => (
        <Button
          color="primary"
          onClick={onClick}
          className="px-2 py-1 d-flex align-items-center"
        >
          <FaGoogle color="#fff" size={16} className="mr-1" />{" "}
          {t("signin_via_google")}
        </Button>
      )}
    />
  );
};

export default OAuth2;
