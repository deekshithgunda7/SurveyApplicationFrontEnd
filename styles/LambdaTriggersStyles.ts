import { makeStyles} from "@material-ui/core/styles";

const lambdaTriggersStyles = makeStyles((theme ) =>({

        table: {
            width: "100%",
            backgroundColor: "white",
        },
        tableCell: {
            padding: 0,
            margin: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        },
        searchRow: {
            display: "flex",
            marginBottom: "10px",
            justifyContent: "center",
            alignItems: "center"
        },
        searchInput: {
            marginLeft: "auto",
            marginRight:'4px',
            padding:'0px',
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
        },
        add:{
          marginLeft:"10px"
        },
        disable: {
            pointerEvents: "none",
            opacity: 0.5,
            marginLeft:"35px"
        },
      delete: {
        marginLeft:"35px"
    },
    tableTextField:{
        width: 900,
        borderRadius:0
    },
    errorMessages: {
        color: "red",
        paddingTop: "5px",
        maxWidth: "200px",
        fontSize: "15px",
        marginRight: "0px"
    }
    })
);
export default lambdaTriggersStyles;