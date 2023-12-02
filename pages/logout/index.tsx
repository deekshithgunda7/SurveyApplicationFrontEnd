import React from "react";
import Typography from "@material-ui/core/Typography";
import {UnauthenticatedTemplate} from "@azure/msal-react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            padding: "100px 200px",
            marginTop: theme.spacing(-3)
        }
    })
);


const LogOut:React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {/* <UnauthenticatedTemplate> */}
                <Typography variant="h6">
                    You have successfully logged out of the application. Please close your browser.
                </Typography>
            {/* </UnauthenticatedTemplate> */}
        </div>
    );
}

export default LogOut;