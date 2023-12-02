import {makeStyles} from "@material-ui/core/styles";

const autoScalingGroupSettingsStyles = makeStyles((theme) => (
    {
        textField: {
            background: "white",
            maxWidth: '46px',
            maxHeight: '36px',
            minWidth: '46px',
            minHeight: '36px',
            borderRadius: '0px',
            textAlign: 'center',
            '&:hover': {
                borderColor: "#0072ED"
            }
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            //  "fontWeight": theme.typography.fontWeightRegular,
        },
        counterButton: {
            maxWidth: '33px', maxHeight: '36px', minWidth: '33px', minHeight: '36px', borderRadius: '0px',
            '&:hover': {
                borderColor: "#0072ED"
            }
        },
        greenSquare: {
            width: "30px",
            height: "30px",
            display: "inline-block",
            verticalAlign: "middle",
            backgroundColor: "#80CE4D",
            marginBottom: "10px",
        },
        redSquare: {
            width: "30px",
            height: "30px",
            display: "inline-block",
            verticalAlign: "middle",
            backgroundColor: "#f44336",
            marginBottom: "10px"
        },
        text: {
            fontSize: "24px"
        },
        boxDisplay:{
            display: "flex", flexDirection: "row"
        },
        inputFieldStyle:{
            textAlign: 'center'
        },
        errorMessages: {
            color: "red",
            paddingTop: "5px",
            fontSize: "15px",
            marginRight: "0px"
        }
    }));
export default autoScalingGroupSettingsStyles;