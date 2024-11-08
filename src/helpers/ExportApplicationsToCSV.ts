import { IApplicationSalary } from "models/application";

function ObjectToCSV(data: Array<{ [key: string]: any }>) {
  if (data.length === 0) throw new Error("No data to export");

  const headers = Object.keys(data[0]).map((key) => key);
  const rows = data.map((row) =>
    headers
      .map((header) => {
        if (header === "salaries" && Array.isArray(row[header])) {
          return row[header].map((salary: IApplicationSalary) => `${salary.min} - ${salary.max} (${salary.employment_form})`).join(", ");
        }
        const originalKey = Object.keys(row).find((key) => key === header);
        return row[originalKey ?? ""] ?? "";
      })
      .join(";")
  );
  const csv = [headers.join(";"), ...rows].join("\n");
  return csv;
}

export default function ExportCSV(data: any, filename: string) {
  try {
    const csv = ObjectToCSV(data);
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
