import React from "react";
import {Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";


interface TableDescriptionProps {
    heading: any;
    description?: string;
    url?: string
    urlHeading?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            heading: {
                marginBottom: "10px",
            },
            description: {
                marginBottom: "20px"
            },
        }
    ));

const TableDescription: React.FC<TableDescriptionProps> = ({url, urlHeading, heading, description}) => {
    const classes = useStyles();
    return (
        <div>
            <Typography variant="h5" gutterBottom className={classes.heading}>
                {heading}
            </Typography>
            <Typography paragraph gutterBottom className={classes.description}>
                {description}
            </Typography>
        </div>
    )
}

export default TableDescription;