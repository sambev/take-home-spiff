import React, { useEffect, useState } from "react";
import Exercise from "../exercise/Exercise";
import { SpiffButton } from "./components/SpiffButton";

const ProgressBarExercise = () => {
  return (
    <div className="progress-bar-exercise">
      <Exercise
        solution={<Solution />}
        specsUrl="https://github.com/SpiffInc/spiff_react_exercises/issues/1"
        title="Progress Bar Exercise"
      />
    </div>
  );
};

export default ProgressBarExercise;

// ----------------------------------------------------------------------------------
const REQUEST_STATES = {
  IDLE: "idle",
  LOADING: "loading",
  COMPLETE: "complete",
};

const ProgressBar = ({ requestState }) => {
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
      className={`spiff-progress-bar--container ${
        isDismissed ? "bar-dismissed" : ""
      }`}
    >
      <div className={`spiff-progress-bar--bar ${barClassMap[requestState]}`} />
    </div>
  );
};

const Solution = () => {
  const [requestState, setRequestState] = useState(REQUEST_STATES.IDLE);

  return (
    <div>
      <ProgressBar requestState={requestState} />
      <SpiffButton
        disabled={requestState !== REQUEST_STATES.IDLE}
        onClick={() => setRequestState(REQUEST_STATES.LOADING)}
      >
        {requestState === REQUEST_STATES.LOADING
          ? "Loading..."
          : "Start Request"}
      </SpiffButton>
      <SpiffButton
        disabled={requestState !== REQUEST_STATES.LOADING}
        onClick={() => setRequestState(REQUEST_STATES.COMPLETE)}
        variant="destroy"
      >
        Finish Request
      </SpiffButton>
    </div>
  );
};
