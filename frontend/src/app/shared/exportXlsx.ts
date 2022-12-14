import * as XLSX from "xlsx";

export const exportToXlsx = (filename: string, data: unknown[], sheetName?: string, write: boolean = true): void => {
  const workSheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, workSheet, sheetName ? sheetName : filename);
  let date = new Date();
  let dateString = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '_' + date.getHours() + '-' + date.getMinutes();
  if (write) XLSX.writeFile(workbook, filename + '_' + dateString + ".xlsx", {});
}
