import React from "react";
import {makeStyles, createStyles, Theme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {useMsal} from "@azure/msal-react";
import {AccountsSVG} from "../../assets/svg/icons";
import HomeCard from "../../resusable-components/HomeCard";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: "122px",
        },
        paper: {
            paddingLeft: "53px",
            paddingTop: "30px",
            paddingRight: "61px",
            paddingBottom: "50px"
        },
        heading: {
            textAlign: "left",
            fontSize: "34px",
            color: "#0072ED",
            fontWeight: "bold"
        },
        flexContainer: {
            display: "flex",
            marginTop: "30px",
            justifyContent: "space-between"
        }
    })
);



const HomePage = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div>
                <Paper elevation={3} className={classes.paper}>
                    <Typography gutterBottom className={classes.heading}>
                        Hello
                    </Typography>
                    <Typography gutterBottom>
                        Manage your Survey.
                    </Typography>
                </Paper>
            </div>
            <div className={classes.flexContainer}>
                
                <HomeCard
                    cardDescription={"Manage your Survey.\n"}
                    cardName={"Survey"}
                    CustomSvgIcon={AccountsSVG}
                    fill={"white"}
                    fontSize={"110px"}
                    stroke={"black"}
                    url={"/survey"}
                />
            </div>
        </div>
    );
}

export default HomePage;