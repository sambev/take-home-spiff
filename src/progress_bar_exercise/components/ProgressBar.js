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
 *
 * The css/classes are getting a little messy. If I had more time I'd probably
 * write a helper or use a library to manage the classes.
 */
export const ProgressBar = ({ requestState }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  let barClassMap = {
    [REQUEST_STATES.IDLE]: "",
    [REQUEST_STATES.LOADING]: "bar-loading",
    [REQUEST_STATES.COMPLETE]: "bar-complete",
  };

  /**
   * This makes the component go away visually but it is still in the dom.
   * If I had more time I think I'd make a callback to the parent component
   * so it could take it out of the DOM when the animation is done.
   */
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
  requestState: PropTypes.oneOf(Object.values(REQUEST_STATES)).isRequired,
};
