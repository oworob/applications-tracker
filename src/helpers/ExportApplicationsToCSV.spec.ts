import ExportApplicationsToCSV, { ExportApplicationsToCSV_TESTING } from "./ExportApplicationsToCSV";
const { ObjectToCSV, ArrayToCSV } = ExportApplicationsToCSV_TESTING;

const mock_data = [
  {
    id: 1,
    position: "Software Developer",
    skills: ["JavaScript", "React"],
    salaries: [
      { min: 1000, max: 2000, employment_form: "B2B" },
      { min: 2000, max: 3000, employment_form: "Permanent" },
    ],
  },
  {
    id: 2,
    position: "DevOps",
    skills: ["Docker", "Kubernetes"],
    salaries: [
      { min: 1000, max: 2000, employment_form: "B2B" },
      { min: 2000, max: 3000, employment_form: "Permanent" },
    ],
  },
];

describe("ObjectToCSV", () => {
  it("should convert object to CSV", () => {
    const csv = ObjectToCSV(mock_data[0]);
    expect(csv).toBe("1;Software Developer;JavaScript,React;1000 - 2000 (B2B),2000 - 3000 (Permanent)");
  });

  it("should handle null and undefined", () => {
    const csv = ObjectToCSV({ id: null, position: undefined });
    expect(csv).toBe(";");
  });
});

describe("ArrayToCSV", () => {
  it("should convert array of objects to CSV", () => {
    const csv = ArrayToCSV(mock_data);
    expect(csv).toBe(
      "id;position;skills;salaries\n1;Software Developer;JavaScript,React;1000 - 2000 (B2B),2000 - 3000 (Permanent)\n2;DevOps;Docker,Kubernetes;1000 - 2000 (B2B),2000 - 3000 (Permanent)"
    );
  });

  it("should throw an error if no data is provided", () => {
    expect(() => ArrayToCSV([])).toThrow("No data to export");
  });
});

describe("ExportApplicationsToCSV", () => {
  it("should download the CSV file", () => {
    const link = { href: "", click: jest.fn(), download: "", style: { display: "" }, setAttribute: jest.fn() } as any;
    const createElementSpy = jest.spyOn(document, "createElement").mockReturnValueOnce(link);
    global.URL.createObjectURL = jest.fn();
    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();
    ExportApplicationsToCSV(mock_data, "test_name.csv");
    expect(createElementSpy).toBeCalledWith("a");
    expect(document.body.appendChild).toBeCalledWith(link);
    expect(link.click).toBeCalled();
    expect(document.body.removeChild).toBeCalledWith(link);
  });

  it("should log an error if an error occurs", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementationOnce(() => {});
    ExportApplicationsToCSV([], "test_name.csv");
    expect(consoleSpy).toBeCalled();
  });
});
