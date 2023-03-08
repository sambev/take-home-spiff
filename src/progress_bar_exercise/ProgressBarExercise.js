import React, { useState } from "react";
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
const Solution = () => {
  const [isRequestActive, setIsRequestActive] = useState(false);

  return (
    <div>
      {isRequestActive ? (
        <SpiffButton
          onClick={() => setIsRequestActive(false)}
          variant="destroy"
        >
          FINISH REQUEST
        </SpiffButton>
      ) : (
        <SpiffButton onClick={() => setIsRequestActive(true)}>
          START REQUEST
        </SpiffButton>
      )}
    </div>
  );
};
