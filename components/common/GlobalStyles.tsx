import { makeStyles } from '@material-ui/core/styles';
const globalUseStyles = makeStyles((theme) => ({
    selectBar:{
        marginTop: "-25px",
        // margin: theme.spacing(1),
    },
    menu:{ height: 300},
    cancelButton: {
        marginTop: "50px",
        width: "100px",
        borderRadius: "0px",
        marginLeft: "10px",
        "&.MuiButton-contained": {
            backgroundColor: "#B7B7BA",
            color:"#47474C"
        },
        textTransform:"none"
    },
    saveButton: {
        "&.MuiButton-contained": {
            backgroundColor: "#0072ED",
            color:"white"
        },
        marginTop: "50px",
        width: "100px",
        borderRadius: "0px",
        textTransform:"none"
    },
    root: {
        width: "100%",
    },
    dialog: {
        padding: "0px"
    },
    dialog_table: {
        width: "1000px"

    },
    paper: {minWidth: "500px"},
    dialogTitle: {
        flex: "1 1 auto",
        padding: "14px 24px 8px 15px"
    },
    btnroot: {
        width: "100%",
        paddingTop:"20px"
    },
    savings: {
        width: "100%",
        marginTop: "15px",
    },
    div: {
        width:"100%"
    },
    csv: {
        width: "100%",
        marginTop: "50px",
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
    },
    clickedButton: {
        "&.MuiButton-contained": {
            backgroundColor: "#368ac0",
            color: '#fff',
            opacity:0.5
        },
        width:'150px',
        margin:'0px 10px 0px 0px',
        padding:'10px 15px',
        borderRadius:'0px',
    },
    unClickedButton: {
        backgroundColor: '#368ac0',
        color: '#fff',
        borderRadius:'0px',
        margin:'0px 10px 0px 0px',
        padding:'10px 15px',
        width:'150px',
        '&:hover':{
            backgroundColor:'rgb(29, 95, 138)'
        }
    },
    dragDrop:{
        '& .MuiAutocomplete-inputRoot':
            {
                flexWrap:'nowrap'
            },
        "& .MuiAutocomplete-inputRoot .MuiAutocomplete-input":{
            minWidth: "0px"
        },
        '&& [class*="MuiOutlinedInput-root"] ': {
            paddingRight: "5px"
        }
    },
    csvButtonStyle:{
        backgroundColor: '#368ac0',
        color: '#fff',
        borderRadius:'0px',
        margin:'0px 10px 0px 0px',
        padding:'10px 15px',
        width:'300px',
        '&:hover':{
            backgroundColor:'rgb(29, 95, 138)'
        }
    },
    cardUnClickedButton: {
        color: '#383838',
        height: "47px",
        "&:hover": {
            fontWeight:"900",
            color: "black"
        }

    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 175,
        marginTop:"-25px"
    },
    errorMessages: {
        color: "red",
    },
    multiSelect: {
        marginBottom: "10px",
        "&  .MuiInputAdornment-root": {
            marginRight: "0px"
        },
        background: "#FFFFFF",
    },
    cardClickedButton:
        {
            opacity: 0.5,
            height: "47px"
        },

    option: {
        "&:hover": {
            backgroundColor: "#0072ED",
            color: 'white',
            border: "1px solid white",
        },
        '&[aria-selected="true"]': {
            backgroundColor: "#0072ED",
            color: 'white',
            border: "1px solid white",
        }
    }

}));

export default globalUseStyles