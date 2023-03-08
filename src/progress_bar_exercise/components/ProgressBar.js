import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const REQUEST_STATES = {
  IDLE: "idle",
  LOADING: "loading",
  COMPLETE: "complete",
};

/**
 * Core ProgressBar component. Renders a progress bar that uses css to manage
 * width and time animation. Look to the css for more details.
 */
export const ProgressBar = ({ requestState }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  let barClassMap = {
    [REQUEST_STATES.IDLE]: "",
    [REQUEST_STATES.LOADING]: "bar-loading",
    [REQUEST_STATES.COMPLETE]: "bar-complete",
  };

  useEffect(() => {
    let timeoutID = null;

    if (requestState === REQUEST_STATES.COMPLETE) {
      timeoutID = setTimeout(() => {
        setIsDismissed(true);
      }, 3000);
    }

    return () => clearTimeout(timeoutID);
  }, [requestState]);

  return (
    <div
      data-testid="progress-bar--container"
      className={`spiff-progress-bar--container ${
        isDismissed ? "bar-dismissed" : ""
      }`}
    >
      <div
        data-testid="progress-bar--bar"
        className={`spiff-progress-bar--bar ${barClassMap[requestState]}`}
      />
    </div>
  );
};

ProgressBar.propTypes = {
  requestState: PropTypes.object.isRequired,
};
