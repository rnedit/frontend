import { Column } from 'material-table';
import { GetInternalsQuery } from '../../generated/graphql';
import { Row } from "./Row";

export interface TableState {
    columns: Array<Column<Row>>;
    data: Array<Row>;
    // data: GetInternalsQuery | undefined;
}
