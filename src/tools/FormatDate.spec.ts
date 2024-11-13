import { FormatDate } from "./FormatDate";

describe("FormatDate", () => {
  it("should format date correctly", () => {
    const date = new Date("2021-05-01");
    expect(FormatDate(date)).toBe("01-05-2021");
  });

  it("should format date with month correctly", () => {
    const date = new Date("2021-05-01");
    expect(FormatDate(date, true)).toBe("1 May 2021");
  });
});
