import {Column} from "material-table";
import {Row} from "./Row";

export interface NewUserA {
    names: Array<Column<Row>>;
    data: Row[];
}