import { ColumnEntity } from './../column/column.entity';
export interface Column {
    id?: number;
    tagname?: string;
    isDelete?: string;
    column: ColumnEntity;
}