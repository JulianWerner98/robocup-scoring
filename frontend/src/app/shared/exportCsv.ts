import {SendFileToUser} from "./sendFileToUser";

export const exportToCsv = (filename: string, rows: object[], headers?: string[]): void => {
  let date = new Date();
  let dateString = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '_' + date.getHours() + '-' + date.getMinutes();
  filename = filename + "_" + dateString;
  if (!rows || !rows.length) {
    return;
  }
  const separator: string = ";";

  const keys: string[] = Object.keys(rows[0]);

  let columHeaders: string[];

  if (headers) {
    columHeaders = headers;
  } else {
    columHeaders = keys;
  }

  const csvContent =
    columHeaders.join(separator) +
    '\n' +
    rows.map((row: any) => {
      return keys.map(k => {
        let cell = row[k] === null || row[k] === undefined ? '' : row[k];

        cell = cell instanceof Date
          ? cell.toLocaleString()
          : cell.toString().replace(/"/g, '""');

        if (cell.search(/("|,|\n)/g) >= 0) {
          cell = `"${cell}"`;
        }
        return cell;
      }).join(separator);
    }).join('\n');

  const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
  SendFileToUser.send(blob, filename + '.csv');
}
