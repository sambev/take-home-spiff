import React from "react";
import PropTypes from "prop-types";

/**
 * Very simple button component that wraps a plain button, with just some code
 * for assigning classes based on the variant.
 */
export const SpiffButton = ({ children, variant = "primary", ...rest }) => {
  const className = `spiff-button spiff-button--${variant}`;

  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
};

SpiffButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "destroy"]),
};
