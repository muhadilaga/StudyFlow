export type Goal = {
  id: string;
  title: string;
  targetValue: number;
  currentValue: number;
  progress: number;
  weekStartValue?: string;
};
