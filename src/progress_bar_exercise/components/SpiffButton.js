import React from "react";

export const SpiffButton = ({ children, ...rest }) => {
  return (
    <button className="spiff-button" {...rest}>
      {children}
    </button>
  );
};
