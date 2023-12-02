import React from "react";
import {Drawer as MUIDrawer, List} from "@material-ui/core";
import clsx from "clsx";
import {useRouter} from "next/router";
import {makeStyles} from "@material-ui/core/styles";
import {HomeSVG, SchedulesSVG, AccountsSVG, InforSVG, GroupsSVG, ReportSVG} from "../../assets/svg/icons";
import SideDrawerItem from "../../resusable-components/SideDrawerItem";


const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiListItemIcon-root": {
            minWidth: "36px",
        },
        "& .MuiListItem-gutters": {
            paddingLeft: "30px",
            paddingRight: "16px"
        },
        marginRight:"8px",
        marginLeft:"8px"
    }
}))

interface DrawerProps {
    classes: any;
    open: boolean
}

const Drawer: React.FC<DrawerProps> = ({classes, open}) => {
    const router = useRouter();
    const styleClasses = useStyles();

    return (
        <MUIDrawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
        >
            <List className={styleClasses.root}>
                <SideDrawerItem CustomSvgIcon={HomeSVG} url={"/"} isActive={router.pathname == "/"}
                                name={"Home"}/>
                {/* <SideDrawerItem CustomSvgIcon={SchedulesSVG} url={"/schedules"}
                                isActive={router.pathname.includes("/schedules")}
                                name={"Schedules"}/> */}
                <SideDrawerItem CustomSvgIcon={AccountsSVG} url={"/survey"}
                                isActive={router.pathname.includes("/survey")}
                                name={"Survey"}/>
                {/* <SideDrawerItem CustomSvgIcon={ReportSVG} url={"/reports"} isActive={router.pathname.includes("/reports")}
                                name={"Savings"}/> */}

            </List>
            <div style={{position:"fixed", bottom:0,left:0,marginBottom:"10px",marginLeft:"10px"}}>
                {open&&<InforSVG />}
            </div>
        </MUIDrawer>
    );
};

export default Drawer;
