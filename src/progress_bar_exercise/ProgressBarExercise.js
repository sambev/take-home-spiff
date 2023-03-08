import React from "react";
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
  return (
    <div>
      <SpiffButton>START REQUEST</SpiffButton>
    </div>
  );
};
