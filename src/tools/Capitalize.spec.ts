import Capitalize from "./Capitalize";

describe("Capitalize", () => {
  it("should capitalize the first letter of a string", () => {
    expect(Capitalize("hello")).toBe("Hello");
  });

  it("should return an empty string if the input is an empty string", () => {
    expect(Capitalize("")).toBe("");
  });
});
