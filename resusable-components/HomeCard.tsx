import React from "react";
import Typography from "@material-ui/core/Typography";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {AppsSVG} from "../assets/svg/icons";
import Link from "next/link";

interface CustomCardProps {
    CustomSvgIcon?: typeof AppsSVG;
    cardName: string;
    cardDescription: string;
    fill?: string;
    fontSize?: string;
    stroke?:string;
    url: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            root: {
                marginTop: 122,
            },
            paragraph: {
                fontSize: 16
            },
            tiles: {
                padding: "60px",
                alignContent: "center",
                cursor: "pointer",
                textAlign: "center",
                boxSizing: "border-box",
                boxShadow: "0px 0px 6px 0px rgb(50 50 50 /23%)",
                flexBasis: "49%",
                backgroundColor: "#ffffff"
            },
        }
    ));

const HomeCard: React.FC<CustomCardProps> = ({url, fontSize, fill, CustomSvgIcon, cardName, cardDescription,stroke}) => {
    const classes = useStyles();
    return (
        <Link href={url}>
            <div className={classes.tiles}>
                <CustomSvgIcon fontSize={fontSize} fill={fill} stroke={stroke}/>
                <Typography variant="h5" gutterBottom>
                    {cardName}
                </Typography>
                <p className={classes.paragraph}>
                    {cardDescription}
                </p>
            </div>
        </Link>
    )
}

export default HomeCard;