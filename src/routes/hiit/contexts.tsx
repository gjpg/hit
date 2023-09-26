import { createContextId, useContext } from '@builder.io/qwik';

export function useHIITContext() {
  const ctx = useContext(InputContext);
  const { radius, warmupDuration, cooldownDuration, restDuration, sprintDuration, svgWidth, svgHeight } = ctx;
  const labelSize = 0.3;
  const workoutDuration =
    warmupDuration + cooldownDuration + restDuration.reduce((tally, current) => tally + current + sprintDuration, 0);
  const exerciseProgramAngle = (1 - labelSize) * 360;
  const degreesPerSecond = exerciseProgramAngle / workoutDuration;
  const centreWidth = svgWidth / 2;
  const centreHeight = svgHeight / 2;
  const labelStartAngle = 90 - (labelSize / 2) * 360;
  const warmupStartAngle = 90 + (labelSize / 2) * 360;

  return {
    ...ctx,
    labelSize,
    circumference: radius * Math.PI * 2,
    workoutDuration,
    degreesPerSecond,
    centreWidth,
    centreHeight,
    labelStartAngle,
    warmupStartAngle, // a.k.a. programStartAngle
  };
}

export interface IntervalContext {
  restColour: string;
  sprintColour: string;
  labelColour: string;
  radius: number;
  restDuration: number[];
  sprintDuration: number;
  warmupDuration: number;
  cooldownDuration: number;
  svgWidth: number;
  svgHeight: number;
  strokeWidth: number;
  cx: string;
  cy: string;
  now: number;
}
export const InputContext = createContextId<IntervalContext>('docs.theme-context');

export const TimeContext = createContextId<TimerStore>('time.stuff');

export interface TimerStore {
  timer?: NodeJS.Timeout;
}