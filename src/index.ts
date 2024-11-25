const SCHEDULE = {
  workStartHour: 9,
  workEndHour: 17,
  workStartDayOfWeek: 1,
  workEndDayOfWeek: 5,
} as const;

export const calculateDueDate = (
  submitDateTime: Date,
  turnaroundTimeInHours: number,
  schedule: typeof SCHEDULE = SCHEDULE // I added this optional argument to avoid having the schedule as a part of the function because I think it should live outside of the function
) => {
  if (turnaroundTimeInHours < 0) {
    throw new Error("Turnaround time must be a positive number");
  }

  const { workStartHour, workEndHour, workStartDayOfWeek, workEndDayOfWeek } =
    schedule;

  let dueDayOfWeek = submitDateTime.getDay();
  let dueDay = submitDateTime.getDate();
  let dueHour = submitDateTime.getHours();

  if (
    dueDayOfWeek < workStartDayOfWeek ||
    dueDayOfWeek > workEndDayOfWeek ||
    dueHour < workStartHour ||
    dueHour >= workEndHour
  ) {
    throw new Error(
      "Submit date time must be within working hours (9AM-5PM Monday to Friday)"
    );
  }

  for (let i = 0; i < turnaroundTimeInHours; i++) {
    dueHour += 1;
    if (dueHour === workEndHour) {
      dueHour = workStartHour;
      dueDayOfWeek += 1;
      dueDay += 1;
    }
    if (dueDayOfWeek > workEndDayOfWeek) {
      dueDayOfWeek = workStartDayOfWeek;
      dueDay += 2;
    }
  }

  const result = new Date(submitDateTime);
  result.setDate(dueDay);
  result.setHours(dueHour);
  return result;
};
