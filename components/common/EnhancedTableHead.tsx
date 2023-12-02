import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";
import React from "react";
import {
    createStyles,
    makeStyles,
    Theme,
} from "@material-ui/core/styles";

export type Order = "asc" | "desc";

function desc<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (
    a: { [key in Key]: string },
    b: { [key in Key]: string }
) => number {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export function sortRows<T>(array: T[], cmp: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export function getSorting(order: Order, orderBy: string) {
    return order === "desc"
        ? (a, b) => desc(a, b, orderBy)
        : (a, b) => -desc(a, b, orderBy);
}

export interface HeadRow {
    disablePadding: boolean;
    id: string;
    label: string;
    align?: "inherit" | "left" | "center" | "right" | "justify";
    disableSorting?: boolean;
}

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
    order: Order;
    orderBy: string;
    fields: HeadRow[];
    selectAllOptions?: {
        numSelected: number;
        rowCount: number;
        onChange: (checked: boolean) => void;
    };
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            fontWeight: "bold",
            fontSize: 14
        },
    })
);

function EnhancedTableHead(props: EnhancedTableProps) {
    const {fields, order, orderBy, onRequestSort, selectAllOptions} = props;
    const createSortHandler = (property: string) => (
        event: React.MouseEvent<unknown>
    ) => {
        onRequestSort(event, property);
    };
    const onSelectedAllToggled = (
        event: React.ChangeEvent<HTMLInputElement>,
        checked: boolean
    ) => {
        selectAllOptions.onChange(checked);
    };
    const classes = useStyles();
    return (
        <TableHead>
            <TableRow>
                {selectAllOptions && (
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={
                                selectAllOptions.numSelected > 0 &&
                                selectAllOptions.numSelected < selectAllOptions.rowCount
                            }
                            checked={
                                selectAllOptions.rowCount > 0 &&
                                selectAllOptions.numSelected === selectAllOptions.rowCount
                            }
                            inputProps={{"aria-label": "select all"}}
                            onChange={onSelectedAllToggled}
                        />
                    </TableCell>
                )}
                {fields.map((row) => (
                    <TableCell
                        key={row.id}
                        sortDirection={orderBy === row.id ? order : false}
                        className={classes.root}
                    >
                        {!row.disableSorting && (
                            <TableSortLabel
                                active={orderBy === row.id}
                                direction={order}
                                onClick={createSortHandler(row.id)}
                            >
                                {row.label}
                            </TableSortLabel>
                        )}
                        {row.disableSorting && row.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default EnhancedTableHead;