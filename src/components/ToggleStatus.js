import React from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";


export const ToggleStatus = ({ object, toggleMutation, ...props }) => {
  

  const handleSwitch = () => {
    toggleMutation.mutate({
      id: object.id,
      status: !object.blocked,
    });
  };

  return (

      <div className="p-0">
       
        <Toggle
          {...props}
          className="custom-switch"
          disabled={toggleMutation.isLoading}
          onChange={handleSwitch}
          checked={!object.blocked}
        />
      </div>

  );
};
