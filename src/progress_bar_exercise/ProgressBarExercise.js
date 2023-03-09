import React, { useState } from "react";
import Exercise from "../exercise/Exercise";
import { SpiffButton } from "./components/SpiffButton";
import { REQUEST_STATES, ProgressBar } from "./components/ProgressBar";

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
const Solution = () => {
  const [requestState, setRequestState] = useState(REQUEST_STATES.IDLE);
  const [useBreakPoints, setUseBreakPoints] = useState(false);
  const breakPoints = useBreakPoints ? [10, 30, 80] : [];

  return (
    <div>
      <ProgressBar breakPoints={breakPoints} requestState={requestState} />
      <SpiffButton
        data-testid="start-request-button"
        disabled={requestState !== REQUEST_STATES.IDLE}
        onClick={() => setRequestState(REQUEST_STATES.LOADING)}
      >
        {requestState === REQUEST_STATES.LOADING
          ? "Loading..."
          : "Start Request"}
      </SpiffButton>
      <SpiffButton
        data-testid="finish-request-button"
        disabled={requestState !== REQUEST_STATES.LOADING}
        onClick={() => setRequestState(REQUEST_STATES.COMPLETE)}
        variant="destroy"
      >
        Finish Request
      </SpiffButton>
      <input
        id="use-break-points"
        name="use-break-points"
        checked={useBreakPoints}
        onChange={() => setUseBreakPoints(!useBreakPoints)}
        type="checkbox"
      />
      <label htmlFor="use-break-points">Use BreakPoints</label>
    </div>
  );
};
