import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const REQUEST_STATES = {
  IDLE: "idle",
  LOADING: "loading",
  COMPLETE: "complete",
};

/**
 * Core ProgressBar component.
 *
 * to acheive breakpoint v2 functionality, I:
 *
 * - Create an array of 'progress points' to animate to based off the
 *   breakpoints. Items in the array represent the width and transition
 *   time for the animation
 *
 * - Track the current progress point's index in state
 *
 * - Set a timeout based on the current progress points transition time to
 *   schedule incrementing to the next progress point after the current
 *   point is done animating
 *
 * - If there are no breakpoints, just have point that is to 90% at 15s
 */
export const ProgressBar = ({ breakPoints, requestState }) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [currentProgressPoint, setCurrentProgressPoint] = useState(0);

  const progressPoints = getProgressPoints(breakPoints);
  const currentProgress = progressPoints[currentProgressPoint];

  /**
   * Set a timeout based on the current progress points transition time, when
   * that is up, I assume the transition is done and move onto the next point
   */
  useEffect(() => {
    let timeoutID = null;

    if (requestState === REQUEST_STATES.LOADING) {
      // set a time out based on the transition duration to incrememt to the
      // next progress point
      timeoutID = setTimeout(() => {
        if (currentProgressPoint < progressPoints.length - 1) {
          setCurrentProgressPoint(currentProgressPoint + 1);
        }
      }, currentProgress.transition * 1000);
    }

    return () => clearTimeout(timeoutID);
  }, [
    currentProgress.transition,
    currentProgressPoint,
    progressPoints,
    requestState,
  ]);

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

  // set the bar animation based on the current progress point
  let barStyle = {
    width: `${currentProgress.width}%`,
    transition: `width ${currentProgress.transition}s ease-in-out`,
  };

  // if we are completed, ignore the current point and just go to 100%
  if (requestState === REQUEST_STATES.COMPLETE) {
    barStyle = {
      width: "100%",
      transition: "width 1s ease-in-out",
    };
  }

  return (
    <div
      data-testid="progress-bar--container"
      className={`spiff-progress-bar--container ${
        isDismissed ? "bar-dismissed" : ""
      }`}
    >
      <div
        className="spiff-progress-bar--bar"
        data-testid="progress-bar--bar"
        style={requestState === REQUEST_STATES.IDLE ? {} : barStyle}
      />
    </div>
  );
};

ProgressBar.propTypes = {
  breakPoints: PropTypes.arrayOf(PropTypes.number),
  requestState: PropTypes.oneOf(Object.values(REQUEST_STATES)).isRequired,
};

/**
 * Determine all of the progress points to animate to based on the breakpoints
 * if no breakpoints are provided, just return a single point at 90% at 15s
 *
 * NOTE: this wont work if the breakpoints are within 6 of each other, not
 *       entirely sure how I'd overcome arbitray breakpoints with this approach
 *
 * Example:
 * Given breakpoints of [10, 20, 30]:
 *
 * Returns:
 * [{ width: 8, transition: 1 },  // go to 8% in 1s
 *  { width: 12, transition: 3 }, // go to 12% and slow down around 10 for 3s
 *  { width: 18, transition: 1 }, // speed back up to 18% in 1s
 *  { width: 22, transition: 3 }, // repeat
 *  { width: 28, transition: 1 },
 *  { width: 32, transition: 3 },
 *  { width: 90, transition: 1 }] // allways go to 90 at the end and hang
 */
export function getProgressPoints(breakpoints = []) {
  // If there are no breakpoints, just return a single point, 90 at 15s
  if (breakpoints == null || breakpoints.length === 0) {
    return [{ width: 90, transition: 15 }];
  }

  const points = [...breakpoints.sort()].reduce((acc, breakpoint) => {
    return acc.concat(
      { width: breakpoint - 3, transition: 1 },
      { width: breakpoint + 3, transition: 3 }
    );
  }, []);

  return points.concat({ width: 90, transition: 1 });
}
