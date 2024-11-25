import { calculateDueDate } from "../src/index";

describe("calculateDueDate", () => {
  it("should be a function", () => {
    expect(typeof calculateDueDate).toBe("function");
  });

  it("should accept two arguments", () => {
    expect(calculateDueDate.length).toBe(2);
  });

  it("should return a Date object", () => {
    const result = calculateDueDate(new Date("2024-11-26T14:12"), 1);
    expect(result).toBeInstanceOf(Date);
  });

  it("should throw an error when called with a negative turnaround time", () => {
    expect(() => calculateDueDate(new Date(), -1)).toThrow(
      "Turnaround time must be a positive number"
    );
  });

  it("should throw an error when the submitDateTime is outside of the working hours", () => {
    const submitDateTime = new Date("2024-11-26T18:00");
    const turnaroundTimeInHours = 1;
    expect(() =>
      calculateDueDate(submitDateTime, turnaroundTimeInHours)
    ).toThrow(
      "Submit date time must be within working hours (9AM-5PM Monday to Friday)"
    );
  });

  it("should throw an error when the submitDateTime is outside of the working days", () => {
    const submitDateTime = new Date("2024-11-24T14:12");
    const turnaroundTimeInHours = 1;
    expect(() =>
      calculateDueDate(submitDateTime, turnaroundTimeInHours)
    ).toThrow(
      "Submit date time must be within working hours (9AM-5PM Monday to Friday)"
    );
  });

  it("should return a Date object representing 2024-11-28 at 2:12PM when called with 2024-11-26 at 2:12PM and 16 hours turnaround time", () => {
    const submitDateTime = new Date("2024-11-26T14:12");
    const turnaroundTimeInHours = 16;
    const result = calculateDueDate(submitDateTime, turnaroundTimeInHours);
    expect(result.getDate()).toBe(28);
    expect(result.getMonth()).toBe(10);
    expect(result.getFullYear()).toBe(2024);
    expect(result.getHours()).toBe(14);
    expect(result.getMinutes()).toBe(12);
  });

  it("should return a Date object representing 2024-11-29 at 9:00AM when called with 2024-11-28 at 15:00PM and 2 hours turnaround time", () => {
    const submitDateTime = new Date("2024-11-28T15:00");
    const turnaroundTimeInHours = 2;
    const result = calculateDueDate(submitDateTime, turnaroundTimeInHours);
    expect(result.getDate()).toBe(29);
    expect(result.getMonth()).toBe(10);
    expect(result.getFullYear()).toBe(2024);
    expect(result.getHours()).toBe(9);
    expect(result.getMinutes()).toBe(0);
  });

  it("should return a Date object representing 2024-12-02 at 10:00AM when called with 2024-11-29 at 15:00PM and 3 hours turnaround time", () => {
    const submitDateTime = new Date("2024-11-29T15:00");
    const turnaroundTimeInHours = 3;
    const result = calculateDueDate(submitDateTime, turnaroundTimeInHours);
    expect(result.getDate()).toBe(2);
    expect(result.getMonth()).toBe(11);
    expect(result.getFullYear()).toBe(2024);
    expect(result.getHours()).toBe(10);
    expect(result.getMinutes()).toBe(0);
  });
});
