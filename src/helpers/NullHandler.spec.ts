import NullHandler from "./NullHandler";

describe("NullHandler", () => {
  it("should handle no argument", () => {
    expect(NullHandler()).toBe("- - -");
  });

  it("should handle null", () => {
    expect(NullHandler(null)).toBe("- - -");
  });

  it("should handle undefined", () => {
    expect(NullHandler(undefined)).toBe("- - -");
  });

  it("should handle empty string", () => {
    expect(NullHandler("")).toBe("- - -");
  });

  it("should handle empty array", () => {
    expect(NullHandler([])).toBe("- - -");
  });

  it("should handle valid value", () => {
    expect(NullHandler("Hello")).toBe("Hello");
  });
});
