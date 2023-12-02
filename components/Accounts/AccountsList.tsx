import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CreateAccount from "./CreateAccount";
import useSWR, {mutate, trigger} from "swr";
import EnhancedTableHead, {getComparator, HeadRow, Order, sortRows,} from "../common/EnhancedTableHead";
import {useSnackbar} from "notistack";
import {AddSVG, DeleteSVG} from "../../assets/svg/icons";
import {useRouter} from "next/router";
import axios from "axios";
import sendMessage from "../common/SnackBar";
import Link from "next/link";
import Confirmation from "../common/Confirmation";
import SearchInput from "../../resusable-components/SearchInput";

const headRows: HeadRow[] = [
    {
        id: "checkbox",
        disablePadding: true,
        label: "",
    },
    {
        id: "time",
        disablePadding: true,
        label: "time",
        align: "left",
    },
    {
        id: "computers",
        disablePadding: true,
        label: "computers",
        align: "left",
    },
    {
        id: "studycarols",
        disablePadding: true,
        label: "studycarols",
        align: "left",
    },
    {
        id: "softseating",
        disablePadding: true,
        label: "softseating",
        align: "left",
    },
    {
        id: "tables",
        disablePadding: true,
        label: "tables",
        align: "left",
    },
    {
        id: "others",
        disablePadding: true,
        label: "others",
        align: "left",
    },
    {
        id: "floor",
        disablePadding: true,
        label: "floor",
        align: "left",
    },
    {
        id: "edit",
        disablePadding: true,
        label: "Edit",
        align: "left",

    },
];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            width: "100%",
            backgroundColor: "white",
        },
        tableCell: {
            maxWidth: "200px",
            padding: 0,
            margin: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        },
        searchRow: {
            display: "flex",
            marginBottom: "10px",
            justifyContent: "center",
            alignItems: "center"
        },
        disable: {
            pointerEvents: "none",
            opacity: 0.5
        },
        searchInput: {
            marginLeft: "auto"
        },
        chart: {
            marginLeft: "28px"
        },
        add: {
          
            marginRight: "28px"
        },
           
        filterIcon: {
            padding: "5px",
            marginLeft: "5px"
        },
        div: {
            width:"100%",
            // padding: "40px",
        },
    })
);


const Accounts: React.FC = () => {
    const classes = useStyles();
    const baseUrl = "/survey";
    const {data} = useSWR(baseUrl);
    console.log(data,"...")
    const [accountNames, setAccountNames] = React.useState([]);
    const [staticAccountNames, setStaticAccountNames] = React.useState([]);
    const cloudProvider='azure'

    return (
        <div className={classes.root} id="accounts">
            <EnhancedTable setAccountNames={setAccountNames} setStaticAccountNames={setStaticAccountNames}/>
            {/* <div className={classes.div}>
                <LineChart cloudProvider={cloudProvider} accountNames={accountNames} staticAccountNames={staticAccountNames}/>
            </div> */}
        </div>
    );
}

const EnhancedTable = (props) => {
    const router = useRouter();
    const classes = useStyles();
    const [order, setOrder] = React.useState<Order>("desc");
    const [orderBy, setOrderBy] = React.useState<string>("last_modified_date");
    const [selected, setSelected] = React.useState<{ id: string; name: string }[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false)
    const {searchParam} = router.query;
    const [search, setSearch] = React.useState(searchParam ? searchParam.toString() : "");
    const baseUrl = "/survey";
    const {data} = useSWR(baseUrl);
    let rows = data||[]
    console.log(rows,".....")
    let rowdata=data&&data

    // React.useEffect(()=>{
    //     const getAccountNames=()=>{
    //         let accountArray=[];
    //         rows?.map((item)=>{
    //             accountArray.push({name:item?.subscription_name})
    //         })
    //         return accountArray;
    //     }
    //     props?.setAccountNames(getAccountNames());
    //     props?.setStaticAccountNames(getAccountNames());
    // },[rowdata])


    /***
     * Handling sort of rows.
     * @param event
     * @param property
     */

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    /***
     * Handling selection / deletion and selecting the rows
     * @param event
     * @param id
     * @param name
     */
    const handleClick = (event: React.MouseEvent<unknown>, id: any, name: any) => {
        let newSelected: { id: string; name: string }[] = [];
        let selectedIndex = -1;
        for (let i = 0, len = selected.length; i < len; i++) {
            if (selected[i].id === id && selected[i].name == name) {
                selectedIndex = i;
                break;
            }
        }

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, {id: id, name: name});
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        console.log(newSelected,"newSelected...")
        props?.setAccountNames(newSelected)
        setSelected(newSelected);
    };

    /***
     * Handle pagination for Table.
     * @param event
     * @param newPage
     */
    const handleChangePage = (event: unknown, newPage: number) => {
        document.getElementById('accounts').scrollIntoView()
        setPage(newPage);
    };

    /***
     * Helper for changing pagination.
     * @param event
     */
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    /***
     * Handling opening of Create Group modal.
     */
    const handleClickOpen = () => {
        setOpen(true);
    };


    /***
     * Handling selection of rows.
     * @param id
     * @param name
     */
    const isSelected = (id: any) => {
        let selectedIndex = -1;
        for (let i = 0, len = selected.length; i < len; i++) {
            if (selected[i].id === id) {
                selectedIndex = i;
                break;
            }
        }
        return selectedIndex !== -1;
    };
    // const isSelected = (id: any, name: any) => {
    //     let selectedIndex = -1;
    //     for (let i = 0, len = selected.length; i < len; i++) {
    //         if (selected[i].id === id && selected[i].name == name) {
    //             selectedIndex = i;
    //             break;
    //         }
    //     }
    //     return selectedIndex !== -1;
    // };

    /***
     * Handle deletion of groups.
     * @param selected
     */

    const handleDelete = async (selected) => {
        if (selected.length !== 0) {
            let temp = []
            for (let i = 0, len = rows.length; i < len; i++) {
                let found = false
                for (let j = 0, len = selected.length; j < len; j++) {
                    if (selected[j].id === rows[i].id) {
                        found = true;
                        break
                    }
                }
                if (!found) {
                    temp.push(rows[i])
                }
            }
            await mutate(baseUrl, [...temp], false);
            await sendMessage(enqueueSnackbar, "Delete in progress..", "success", closeSnackbar);
        }
        selected.map(async (selectedItem) => {
            const deleteUrl = baseUrl + "/" + selectedItem.id;
            try {
                const resp = await axios.delete(deleteUrl);
                if (resp.status === 200) {
                    await sendMessage(enqueueSnackbar, "Deleted Successfully...", "success", closeSnackbar);
                    await setSelected([]);
                } else {
                    await trigger(baseUrl);
                    await sendMessage(enqueueSnackbar, "Unable to delete the subscription as you are not owner", "error", closeSnackbar);
                }
            } catch (error) {
                await trigger(baseUrl);
                await sendMessage(enqueueSnackbar, error.response.data.message, "error", closeSnackbar);
            }
        });
    };

    /***
     * Handling Searches
     * @param event
     */

    const handleOnSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setPage(0);
    };

    const normalizedSearch = search.toLowerCase();

    const accountFilter = (accounts, search) => {
        return accounts.subscription_id.toLowerCase().includes(search) || accounts.subscription_name.toLowerCase().includes(search);
    }

    // Filtered rows by taking into consideration of search input.
    let filteredAccounts = normalizedSearch ? rows.filter((accounts) => accountFilter(accounts, normalizedSearch)) : rows

     const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredAccounts.length - page * rowsPerPage);

    const handleClear = () => {
        setSearch("");
        const searchInput: any = document.getElementById("search")
        searchInput.value = ""
    };

    // @ts-ignore
    return (
        <div>
            <div className={classes.searchRow}>
                <div className={classes.add}>
                    <AddSVG onClick={handleClickOpen}/>
                </div>
                <div className={(selected.length === 0) ? classes.disable.toString() : undefined}
                     onClick={() => setConfirmDialogOpen(true)}>
                    <DeleteSVG/>
                </div>

                {/* <div className={classes.searchInput}>
                    <SearchInput  placeHolder={"Search"} onChange={handleOnSearchChange} search={search} onClick={handleClear} height={"35px"}
                                 width={"219px"}/>
                </div> */}

            </div>
            <div>
                <Confirmation
                    content={"Survey"}
                    onConfirm={async () => {
                        await handleDelete(selected);
                    }}
                    open={confirmDialogOpen}
                    setOpen={setConfirmDialogOpen}
                />
            </div>
            <div>
                <CreateAccount
                    open={open}
                    setOpen={setOpen}
                    subscriptionData={rows}
                />
            </div>
            <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size="medium"
                    aria-label="enhanced table">
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        fields={headRows}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {sortRows(filteredAccounts, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const isItemSelected = selected.length === rows.length ? true : isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                let regions: any
                                regions = row.regions
                                // @ts-ignore
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={index}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox" style={{padding: 3.5}}>
                                           <Checkbox
                                                checked={isItemSelected}
                                                 inputProps={{"aria-labelledby": labelId}}
                                                onClick={(event) =>
                                                    handleClick(event, row.id, row.time)
                                                 }
                                             />
                                         </TableCell>
                                         <TableCell align="left">
                                            <div className={classes.tableCell}>
                                                <label title={row.time}>
                                                    {row.time}
                                                </label>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left">
                                            <div className={classes.tableCell}>
                                                <label title={row.computers}>
                                                    {row.computers}
                                                </label>
                                            </div>
                                        </TableCell>
                                        
                                        <TableCell align="left">
                                            <div className={classes.tableCell}>
                                                <label title={row.studycarols}>
                                                    {row.studycarols}
                                                </label>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" key={row.id}>
                                            <div className={classes.tableCell}>
                                                <label title={row.softseating}>
                                                    {row.softseating}
                                                </label>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left">
                                            <div className={classes.tableCell}>
                                                <label title={row.tables}>
                                                    {row.tables}
                                                </label>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left">
                                            <div className={classes.tableCell}>
                                                <label title={row.other}>
                                                    {row.others}
                                                </label>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left">
                                            <div className={classes.tableCell}>
                                                <label title={row.floor}>
                                                    {row.floor}
                                                </label>
                                            </div>
                                        </TableCell>
                                        
                                       

                                        <TableCell align="left">
                                            <Link
                                                href={`/survey/${row.id}`}>
                                                <a style={{color: "#0072ED"}}> <ArrowForwardIcon/> </a>
                                            </Link>

                                        </TableCell>

                                    </TableRow>
                                );
                            })}
                        {(emptyRows > 0 && filteredAccounts.length==0) && (
                            <TableRow style={{height: 53 * emptyRows}}>
                                <TableCell colSpan={6}/>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {filteredAccounts.length>=5?
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredAccounts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                :<div  style={{marginBottom:"52px"}}></div>
            }
        </div>
    );
}

export default Accounts;
