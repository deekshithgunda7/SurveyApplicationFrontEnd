import React from "react";
import Typography from "@material-ui/core/Typography";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {
    Checkbox,
    FormControlLabel,
    FormGroup,

    TextField
} from "@material-ui/core";
import {Form, Formik} from "formik";
import {Autocomplete} from "@material-ui/lab";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import SearchIcon from "@material-ui/icons/Search";

interface CustomMultiSelectProps {
    name: string;
    setCom: any
    list: any;
    values: any;
    tagChecked?: boolean;
}

let initialValues: CustomMultiSelectProps = {
    name: "",
    list: [],
    setCom: [],
    values: [],
};
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            root: {
                marginTop: "-25px",
            },
            tagRoot: {
                marginTop: "-25px",
                opacity: 0.5,
                pointerEvents: "none"
            },
            paragraph: {
                fontSize: 16
            },
            tiles: {
                padding: "60px",
                alignContent: "center",
                cursor: "pointer",
                textAlign: "center",
                boxSizing: "border-box",
                boxShadow: "0px 0px 6px 0px rgb(50 50 50 /23%)",
                flexBasis: "49%",
                backgroundColor: "#ffffff"
            },
            multiSelect: {
                marginBottom: "10px",
                "&  .MuiInputAdornment-root": {
                    marginRight: "0px"
                },
                background: "#FFFFFF",
            },
            textField: {
                marginBottom: "10px",
                background: "#d8d8d8",
            },
            inputLabels: {
                fontSize: "15px",
                color: "black",

            },
            errorMessages: {
                color: "red",
            },
            menu: {height: 300},
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

        }
    ))

const MultiSelectDropDown: React.FC<CustomMultiSelectProps> = ({list, name, setCom, values, tagChecked}) => {
    const classes = useStyles();
    const [isDisabled, setIsDisabled] = React.useState(true);
    const [checked, setChecked] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
    const checkedIcon = <CheckBoxIcon fontSize="small"/>;


    const onCheckboxClick = () => {
        setChecked(!checked);
        if (checked) {
            setCom([])
        }
        return checked ? setIsDisabled(true) : setIsDisabled(false);
    };
    React.useEffect(() => {
        if (inputValue !== "") {
            setLoading(true)
        }
        else{
            setLoading(false)
        }
    }, [inputValue])
    return (
        <div className={tagChecked ? classes.tagRoot : classes.root}>
            <Formik
                initialValues={initialValues}
                onSubmit={() => {
                }}>
                <Form>
                    {/*<FormGroup>*/}
                        <FormControlLabel style={{marginRight: "15px"}}
                                          control={<Checkbox name="checkedC"
                                                             onClick={onCheckboxClick}/>} label={name}/>

                        <Autocomplete
                            multiple
                            id={name}
                            noOptionsText='No Options'
                            options={list || []}
                            freeSolo={loading}
                            disableCloseOnSelect
                             className={classes.dragDrop}
                            value={values ? values : []}
                            onChange={(event, newValue) => {
                                setCom(newValue);
                            }}
                            onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue);
                            }}
                            // disableListWrap={true}
                            disableClearable={true}
                            disabled={isDisabled}
                            renderTags={selected => {
                                let renderTagsValue = (selected as string[]).join(", ");
                                return (
                                    <Typography
                                        style={{maxWidth: "120px"}}
                                        noWrap={true}
                                        color="textPrimary"
                                    >
                                        {renderTagsValue}
                                    </Typography>
                                );
                            }}
                            renderOption={(option, {selected}) => (
                                <React.Fragment>
                                    <Checkbox icon={icon} checkedIcon={checkedIcon}
                                              style={{marginRight: 0, marginLeft: 0, paddingLeft: 0}}
                                              checked={selected}/>
                                    {option}
                                </React.Fragment>
                            )}
                            renderInput={(params) =>
                                <TextField {...params}
                                           variant="outlined"
                                           size="small"
                                           InputLabelProps={{shrink: true}}
                                           InputProps={{...params.InputProps,
                                               endAdornment: (
                                                   <React.Fragment>
                                                       {loading ? <SearchIcon/>
                                                       : null}
                                                       {params.InputProps.endAdornment}
                                                   </React.Fragment>)
                                           }}
                                />}
                            ListboxProps={
                                {
                                    style: {
                                        maxHeight: '200px'
                                    }
                                }
                            }
                        />
                    {/*</FormGroup>*/}
                </Form>
            </Formik>
        </div>

    )
}

export default MultiSelectDropDown;