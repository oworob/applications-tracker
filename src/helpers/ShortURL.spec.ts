import ShortURL from "./ShortURL";

describe("ShortURL", () => {
  it("should return the URL without https", () => {
    expect(ShortURL("https://www.google.com")).toBe("www.google.com");
  });

  it("should return the URL without http", () => {
    expect(ShortURL("http://www.google.com")).toBe("www.google.com");
  });

  it("should return the domain of a URL without the protocol and path", () => {
    expect(ShortURL("http://www.google.com/search")).toBe("www.google.com");
  });
});
