import { IApplicationSalary } from "models/application";

function ObjectToCSV(data: { [key: string]: any }): string {
  const headers = Object.keys(data).map((key) => key);
  const rows = headers
    .map((header) => {
      if (header === "salaries" && Array.isArray(data[header])) {
        return data[header].map((salary: IApplicationSalary) => `${salary.min} - ${salary.max} (${salary.employment_form})`).join(",");
      }
      return data[header] ?? "";
    })
    .join(";");
  const csv_row = [rows].join("\n");
  return csv_row;
}

function ArrayToCSV(data: Array<{ [key: string]: any }>): string {
  if (data.length === 0) throw new Error("No data to export");
  const headers = Object.keys(data[0]).map((key) => key);
  const rows = data.map((row) => ObjectToCSV(row)).join("\n");
  const csv = [headers.join(";"), rows].join("\n");
  return csv;
}

export default function ExportApplicationsToCSV(data: Array<{ [key: string]: any }>, filename: string) {
  try {
    const csv = ArrayToCSV(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error exporting CSV:", error);
  }
}

export const ExportApplicationsToCSV_TESTING = {
  ObjectToCSV,
  ArrayToCSV,
};
