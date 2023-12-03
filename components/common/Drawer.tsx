import React from "react";
import {Drawer as MUIDrawer, List} from "@material-ui/core";
import clsx from "clsx";
import {useRouter} from "next/router";
import {makeStyles} from "@material-ui/core/styles";
import {HomeSVG, AccountsSVG} from "../../assets/svg/icons";
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
                <SideDrawerItem CustomSvgIcon={AccountsSVG} url={"/survey"}
                                isActive={router.pathname.includes("/survey")}
                                name={"Survey"}/>
              

            </List>
           
        </MUIDrawer>
    );
};

export default Drawer;
