import React from "react";
import Typography from "@material-ui/core/Typography";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {AppsSVG} from "../assets/svg/icons";
import {Box} from "@material-ui/core";

interface CustomCardProps {
    CustomSvgIcon?: typeof AppsSVG;
    cardName?: string;
    cardDescription?: string;
    fill?: string;
    fontSize?: string;
    url?: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            root: {
                marginTop: 52,
            },
            paragraph: {
                fontSize: 20,
                textAlign: "center",
            },
            redCard: {
                margin: '15px',
                color: "#8B0000"
            },
            card: {
                margin: '15px',

            },
            tiles: {
                padding: "0px",
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

const Card: React.FC<CustomCardProps> = ({url, fontSize, fill, CustomSvgIcon, cardName, cardDescription}) => {
    const classes = useStyles();
    return (
        <div className={classes.tiles}>
            <Typography variant="h5" gutterBottom>
                <Box style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <div className={classes.paragraph} style={{margin: '15px'}}>{cardDescription}</div>
                    <div className={parseInt(cardName) < 30 ? classes.redCard : classes.card}>{cardName}%</div>
                </Box>
            </Typography>
        </div>
    )
}

export default Card;