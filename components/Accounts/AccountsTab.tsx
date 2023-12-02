import React from "react";
import {makeStyles, Theme} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import {Container} from "@material-ui/core";
import Link from "next/link";
import TableDescription from "../../resusable-components/TableDescription";
import AccountDetails from "./AccountDetails";

interface TablePanelProps {
    value: number;
    index: number;
}

const TabPanel: React.FC<TablePanelProps> = ({value, children, index}) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Container disableGutters={true}>
                    <Box p={1} pr={0} pl={4}>{children}</Box>
                </Container>
            )}
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) => ({

    active: {
        color: "#0072ED"
    },
    line: {
        padding: "0",
        margin: "0",
        width: "600px",
    },
    heading: {
        textDecoration: "none",
        color:"#0072ED"
    }
}));

interface AccountTabsProps {
    selectedTab: number;
    id: string;
}

const AccountsTab: React.FC<AccountTabsProps> = ({selectedTab, id}) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(selectedTab);
    const heading = <div><Link href={`/survey`}><a
        className={classes.heading}>Survey</a></Link> &gt; {id} </div>
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div  id="accounts">
            <TableDescription heading={heading} description={"Basic information about Survey."}/>
            <div>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                >
                    <Tab label="Details" className={classes.active}/>
                </Tabs>
                <hr className={classes.line}/>
                <div style={{marginLeft: -32}}>
                    <TabPanel value={value} index={0}>
                        <AccountDetails id={id}/>
                    </TabPanel>

                </div>
            </div>
        </div>
    );
}

export default AccountsTab;
