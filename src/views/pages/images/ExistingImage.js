import React from "react";
import { Card, CardImg } from "reactstrap";

import {  ImageURL } from "api/config";

export const ExistingImage = ({ image }) => {


  return (
    <Card
      style={{
        border: "1px solid lightgray",
        height: "275px",
        width: "275px",
      }}
      className="mx-1"
    >
      <CardImg
        alt="slider"
        src={`${ImageURL}${image.image}`}
        top
        style={{
          height: "200px",
          objectFit: "contain",
          maxWidth: "100%",
          padding: "0.5rem",
          paddingTop: "1rem",
        }}
      />
        
    </Card>
  );
};
