import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import ProgressBarExercise from "./progress_bar_exercise/ProgressBarExercise";

test("ProgressBar idle state", async () => {
  render(<ProgressBarExercise />);

  // ProgressBar should have the expected classes
  expect(screen.getByTestId("progress-bar--container")).toHaveClass(
    "spiff-progress-bar--container"
  );
  expect(screen.getByTestId("progress-bar--bar")).toHaveClass(
    "spiff-progress-bar--bar"
  );

  // Buttons should be enabled/disabled accordingly
  expect(screen.getByTestId("start-request-button")).toBeEnabled();
  expect(screen.getByTestId("finish-request-button")).toBeDisabled();
});

test("ProgressBar when start is clicked", async () => {
  render(<ProgressBarExercise />);

  await userEvent.click(screen.getByTestId("start-request-button"));

  // ProgressBar should have the expected classes
  expect(screen.getByTestId("progress-bar--container")).toHaveClass(
    "spiff-progress-bar--container"
  );
  expect(screen.getByTestId("progress-bar--bar")).toHaveClass(
    "spiff-progress-bar--bar bar-loading"
  );

  // Buttons should be enabled/disabled accordingly
  expect(screen.getByTestId("start-request-button")).toBeDisabled();
  expect(screen.getByTestId("finish-request-button")).toBeEnabled();
});

test("ProgressBar when finish is clicked", async () => {
  render(<ProgressBarExercise />);

  await userEvent.click(screen.getByTestId("start-request-button"));
  await userEvent.click(screen.getByTestId("finish-request-button"));

  // ProgressBar should have the expected classes
  expect(screen.getByTestId("progress-bar--container")).toHaveClass(
    "spiff-progress-bar--container"
  );
  expect(screen.getByTestId("progress-bar--bar")).toHaveClass(
    "spiff-progress-bar--bar bar-complete"
  );

  // Buttons should be enabled/disabled accordingly
  expect(screen.getByTestId("start-request-button")).toBeDisabled();
  expect(screen.getByTestId("finish-request-button")).toBeDisabled();
});
