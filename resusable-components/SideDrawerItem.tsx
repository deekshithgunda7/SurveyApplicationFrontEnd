import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {AppsSVG} from "../assets/svg/icons";
import Link from "next/link";
import AssignmentIcon from '@material-ui/icons/Assignment';


interface CustomSideDrawerItemProps {
    CustomSvgIcon?: typeof AppsSVG;
    MaterialUISvgIcon?: typeof AssignmentIcon;
    isActive: boolean;
    url: string;
    name: string;
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            active: {
                backgroundColor:"#47474C",
                color: "#ffffff",
                paddingLeft:"5px",
                fontWeight:1000,
               border:"1px solid #0072ED",
                borderRadius:"6px",
                marginBottom: "5px",
                "&:hover":{
                    backgroundColor:"#47474C",
                    color: "#ffffff",
                    border:"1px solid #0072ED",
                    borderRadius:"6px",
                }
            },
            inActive: {
                color:"#D7D7D8",
                marginBottom: "5px",
                "&:hover":{
                    backgroundColor:"#47474C",
                    color: "#ffffff",
                    border:"1px solid transparent",
                    borderRadius:"6px",
                }
            },
        }
    ));

const SideDrawerItem: React.FC<CustomSideDrawerItemProps> = (
    {
        MaterialUISvgIcon,
        CustomSvgIcon,
        name,
        url,
        isActive
    }) => {
    const classes = useStyles();
    let svgIcon;
    if (MaterialUISvgIcon) {
        svgIcon = isActive ? <MaterialUISvgIcon style={{color: "#ffffff"}}/> :
            <MaterialUISvgIcon/>
    } else {
        svgIcon = isActive ? <CustomSvgIcon fontSize={"18px"} /> :
            <CustomSvgIcon fontSize={"18px"}/>
    }

    return (
        <Link href={url} key={url}>
            <ListItem button key={name} className={isActive ? classes.active : classes.inActive}>
                <ListItemIcon>
                    {svgIcon}
                </ListItemIcon>
                <ListItemText primary={name}/>
            </ListItem>
        </Link>
    )
}

export default SideDrawerItem;