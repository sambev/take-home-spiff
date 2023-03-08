import React from "react";

export const SpiffButton = ({ children, variant = "primary", ...rest }) => {
  const className = `spiff-button spiff-button--${variant}`;

  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
};
