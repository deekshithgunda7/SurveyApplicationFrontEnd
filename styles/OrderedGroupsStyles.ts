import {makeStyles} from "@material-ui/core/styles";

const orderedGroupsStyles = makeStyles((theme) => ({
        table: {
            width: "100%",
            borderRadius:0
        },
        tableCell: {
            padding: 0,
            margin: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
        },
        add: {
            marginLeft: "10px"
        },
        disable: {
            pointerEvents: "none",
            opacity: 0.5,
            marginLeft: "35px"
        },
        delete: {
            marginLeft: "35px"
        },
        tableTextField: {
            width: 350, borderRadius: 0
        },
        text: {
            fontSize: "15px"
        },
    errorMessages: {
        color: "red",
        paddingTop: "5px",
        fontSize: "15px",
        marginRight: "0px"
    }

    })
)
export default orderedGroupsStyles