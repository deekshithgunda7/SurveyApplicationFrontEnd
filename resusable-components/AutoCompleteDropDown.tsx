import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

interface AutoCompleteProps{
    options:any,
    value:string,
    handleChange: (event: React.ChangeEvent<{}>,newValue,index?:number) => void,
    width:string,
    labelName:string
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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

        },
        endAdornment: {
            display: 'none'
        },
        clearIndicator:{
            paddingRight:"5px"
        },
        clear: {
            "& .MuiAutocomplete-clearIndicator": {
                display: 'none',

            },
            '&& [class*="MuiOutlinedInput-root"] ': {
                paddingRight: "5px"
            },

            // "&&& $input": {
            //     padding: "1px"
            // }
            // "& .MuiAutocomplete-endAdornment":{
            //     paddingRight:"5px"
            // }
            // "& .MuiInput-root":{
            //     paddingRight:"0px"
            // }

            // "& .MuiAutocomplete-hasClearIcon":{
            //     "& .MuiAutocomplete-inputRoot": {
            //         paddingRight: "5px"
            //     }
            // }
            // "& .MuiOutlinedInput-root" :{
            //     paddingRight: "5px"
            // }
            // '&&[class*="MuiOutlinedInput-root"] $input': {
            //     padding: "5px"
            // },
            //       "& .MuiAutocomplete-hasClearIcon .MuiAutocomplete-inputRoot":{
            //           padding: "5px"
            // }
            //       '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
            //           // Default left padding is 6px
            //           paddingLeft: 26
            //       },
            // "& .MuiAutocomplete-clearIndicator":{
            //
        // }
        }
        }
    ));

const AutoCompleteDropDown:React.FC<AutoCompleteProps>= ({options,value,handleChange,width,labelName})=> {
    const classes=useStyles();
    const [inputValue, setInputValue] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    console.log(value,"value")
        console.log(loading,"loading")
    React.useEffect(() => {
        if (inputValue !== ""&&!value) {
            setLoading(true)
            console.log(inputValue,"if-----")
        }
        else{
            console.log(inputValue,"else----------")
            setLoading(false)
        }
    }, [inputValue])
    return (
        <Autocomplete
            noOptionsText={"No options"}
            id="accounts-id"
            options={options}
            value={value}
            //clearOnEscape
           //disableClearable
            //forcePopupIcon={loading}
            //filterOptions={(x) => x}
            disablePortal
            autoSelect
           freeSolo={loading}
            className={classes.clear}
            classes={{option: classes.option}}
             //popupIcon={loading&&<SearchIcon />}
            onChange={
                (event,newValue)=> {handleChange(event,newValue)
                setLoading(false);

                }
                // setRegion('')
            }
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            style={{ width: width }}
            renderInput={(params) => <TextField {...params} size={"small"} label={labelName} variant="outlined"
                                                InputProps={{...params.InputProps,
                                                    endAdornment: (
                                                        <React.Fragment>
                                                            {loading? <SearchIcon/>
                                                                : null}
                                                            {params.InputProps.endAdornment}
                                                        </React.Fragment>)
                                                }}
            />}
        />

    )
}
export default AutoCompleteDropDown