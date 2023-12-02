import { makeStyles} from "@material-ui/core/styles";

const taggedResourcesStyles = makeStyles((theme) => ({

       table:{
           width:"100%",
       },
        heading: {
            fontSize: theme.typography.pxToRem(15),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 175,

        },
        accordionButtonAws: {
            margin: "10px",
            marginTop:"5px",
            width: "200px",
            height: "38px",
            borderRadius: "0px",
            fontSize: "0.75rem",
            "&.MuiButton-contained": {
                backgroundColor: "#0072ED",
                color:"white"
            },
            textTransform:"none"
        },
    accordionButtonAzure: {
        margin: "10px",
        width: "200px",
        height: "38px",
        borderRadius: "0px",
        fontSize: "0.75rem",
        "&.MuiButton-contained": {
            backgroundColor: "#0072ED",
            color:"white"
        },
        textTransform:"none"
    },
        selectField: {
            marginBottom: "5px",

            "&  .MuiInputAdornment-root": {
                marginRight: "0px"
            },
            height: "38px"
        },
        selectRegion: {
            background: "#FFFFFF",

        },
        textFieldRegions: {
            background: "#eeeeee",
        },
       tableCell: {
             whiteSpace: "nowrap",
            overflow:"hidden",
            textOverflow: "ellipsis",
             maxWidth:"700px",
        },
       errorMessages: {
        color: "red",
        paddingTop: "0px",
        paddingLeft: "6px",
        fontSize: "15px",
        marginRight: "0px"
     },
    span:{
          marginLeft:"7px"
    }
    })
);
export default taggedResourcesStyles;