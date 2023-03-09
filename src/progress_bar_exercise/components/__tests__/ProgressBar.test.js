import { getProgressPoints } from "../ProgressBar";

test("getProgressPoints returns 90% at 15s if no breakpoints are passed", () => {
  expect(getProgressPoints()).toEqual([{ width: 90, transition: 15 }]);
});

test("getProgressPoints [10, 20, 30]", () => {
  expect(getProgressPoints([10, 20, 30])).toEqual([
    { width: 7, transition: 1 },
    { width: 13, transition: 3 },
    { width: 17, transition: 1 },
    { width: 23, transition: 3 },
    { width: 27, transition: 1 },
    { width: 33, transition: 3 },
    { width: 90, transition: 1 },
  ]);
});
