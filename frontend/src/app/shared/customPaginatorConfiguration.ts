import {MatPaginatorIntl} from "@angular/material/paginator";

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Elemente pro Seite:';
  customPaginatorIntl.nextPageLabel = "";
  customPaginatorIntl.previousPageLabel = "";
  customPaginatorIntl.lastPageLabel = "";
  customPaginatorIntl.firstPageLabel = "";
  customPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
    const start = page * pageSize + 1;
    const end = (page + 1) * pageSize;
    return `${start} - ${end} von ${length}`;
  };
  customPaginatorIntl.changes.next();


  return customPaginatorIntl;
}
