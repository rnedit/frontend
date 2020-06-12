import { Column } from 'material-table';
import { Row } from "./Row";

export interface TableState {
    columns: Array<Column<Row>>;
    data: Row[];
}
