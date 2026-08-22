export type Course = {
  id: string;
  courseName: string;
  lecturerName: string;
  classDayLabel: string;
  timeRange: string;
  colorValue: string;
  classDayValue?: string;
  startTimeValue?: string;
  endTimeValue?: string;
  colorKey?: string;
};

export type CourseOption = {
  id: string;
  courseName: string;
};
