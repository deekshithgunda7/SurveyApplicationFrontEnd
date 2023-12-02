import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Link from "next/link";
import FormHelperText from "@material-ui/core/FormHelperText";
import globalUseStyles from "../common/GlobalStyles";
import {
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormGroup,
    FormLabel,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
} from "@material-ui/core";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {mutate, trigger} from "swr";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useSnackbar} from "notistack";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import sendMessage from "../common/SnackBar";
import Box from "@material-ui/core/Box";
import {array, object, string} from "yup";
import MinimizeIcon from '@material-ui/icons/Minimize';


export interface AccountDetails {
    time: string;
    computers: number;
    studyCarols: number;
    softSeating: number;
    tables: number;
    others: number;
    floor: [];
}

export interface CreateAccountProps {
    open: boolean;
    setOpen: (value: boolean) => void
    subscriptionData: any
}

let initialValues: AccountDetails = {
    time: "",
    computers: 0,
    studyCarols: 0,
    softSeating: 0,
    tables: 0,
    others:0,
    floor: []
};
// const regionList = [
//     '1',
//     '2',
//     '3',
//     '4'
// ];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        errorMessages: {
            color: "red",
            // paddingTop: "5px"
        },
        multiSelect: {
            marginBottom: "10px",
            "&  .MuiInputAdornment-root": {
                marginRight: "0px"
            },
            background: "#FFFFFF",
        },
        select: {
            marginLeft: "10%",
            height: "40px",
            width: "90%",
            alignItems: "center"
        },
        addButton: {
            width: "50%",
            borderRadius: "0px",
            textTransform:"none",
             height:"47px",
             color: '#0072ED'

        },
        cancelButton:{
            width: "50%",
            borderRadius: "0px",
            textTransform:"none",
            height:"47px"

        },
        menu:{ height: 300},
        textField: {
            marginBottom: "5px",
            "&  .MuiInputAdornment-root": {
                marginRight: "0px"
            }
        },
        inputLabels: {
            fontSize: "15px",
            '& .MuiFormLabel-asterisk': {
                color: 'red'
            },
            marginBottom: "5px",
        },
        dialog: {
            // padding: "",
            paddingLeft: "25px",
            paddingRight: "25px",
        },
        dialogTitle: {
            flex: "1 1 auto",
            padding: "14px 24px 6px 15px"
        },
        field: {
            width: "400px",
            paddingRight: "15px",
            paddingBottom: "0px",
            paddingLeft: "15px",
        },

    })
);
const createAccount: React.FC<CreateAccountProps> = ({open, setOpen, subscriptionData}) => {
    const classes = useStyles();
    const globalClasses = globalUseStyles();
    // const [regions, setRegions] = React.useState<string[]>([]);
    const [floor, setFloor] = React.useState("");
    const [time, setTime] = React.useState("");
    const [openSelect, setOpenSelect] = React.useState(false);
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const baseUrl = "/survey";


    const handleClose = () => {
        setOpen(false);
    };


    const handleSelectClose = () => {
        setOpenSelect(false);
    };

    const handleOpen = () => {
        setOpenSelect(true);
    };
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFloor(event.target.value as string);
      };
    const handleTimeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setTime(event.target.value as string);
      };  
    // const filteredRegions = regions?.filter((item) => item)
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                PaperProps={{
                    style: {
                        borderRadius: 0,
                    }
                }}
            >
                <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
                    Create Survey
                </DialogTitle>
                <DialogContent className={classes.dialog}>
                    <div>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={async (values, formikHelpers) => {
                                try {
                                    handleClose();
                                    await sendMessage(enqueueSnackbar, "In progress.", "success", closeSnackbar);
                                    let resp = await axios.post('/survey', {
                                        floor: floor,
                                        time: time,
                                        computers: values.computers,
                                        studyCarols: values.studyCarols,
                                        softSeating: values.softSeating,
                                        tables: values.tables,
                                        others:values.others,

                                    },);
                                    if (resp.status === 200) {
                                        await mutate(baseUrl, [...subscriptionData,
                                            {
                                        floor: floor,
                                        time: time,
                                        computers: values.computers,
                                        studyCarols: values.studyCarols,
                                        softSeating: values.softSeating,
                                        tables: values.tables,
                                        others:values.others,


                                            }], false);
                                    }
                                    await sendMessage(enqueueSnackbar, "Survey successfully created.", "success", closeSnackbar);
                                } catch (error) {
                                    await sendMessage(enqueueSnackbar, error.response.data.message, "error", closeSnackbar);
                                    setOpen(false);
                                }
                                formikHelpers.resetForm();
                                await trigger(baseUrl);


                            }}

                            // validationSchema={object({
                            // time: string()
                            //     .required("Required")
                            //     .min(2)
                            //     .max(100),
                            // computers: string()
                            //     .required("Required")
                            //     .min(2)
                            //     .max(100),
                            // studyCarols: string()
                            //     .required("Required")
                            //     .min(2)
                            //     .max(100),
                            // softSeating: string()
                            //     .required("Required")
                            //     .min(2)
                            //     .max(100),
                            // tables: string()
                            //     .required("Required")
                            //     .min(2)
                            //     .max(100),
                            // others: string()
                            //     .required("Required")
                            //     .min(2)
                            //     .max(100),    
                            // floor: array().min(1, "Required"),
                            // })}


                        >
                            {({setFieldValue}) => (
                                <Form>
                         {/* <FormGroup>
                            <FormHelperText required className={classes.inputLabels}>
                                Time
                            </FormHelperText>
                            <Field
                                as={OutlinedInput}
                                id="time"
                                type="string"
                                name="time"
                                // disabled={true}
                                className={classes.textField}
                            />
                            <div className={classes.errorMessages}>
                                <ErrorMessage name="time"/>
                            </div>
                        </FormGroup> */}
                          <FormGroup>
                           <FormControl variant="outlined" className={classes.multiSelect}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Time
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={time}
                  onChange={handleTimeChange}
                  label="time"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"10:00AM"}>10:00AM </MenuItem>
                  <MenuItem value={"11:00AM"}>11:00AM</MenuItem>
                  <MenuItem value={"12:00PM"}>12:00PM</MenuItem>
                  <MenuItem value={"1:00PM"}>1:00PM</MenuItem>
                  <MenuItem value={"2:00PM"}>2:00PM </MenuItem>
                  <MenuItem value={"3:00PM"}>3:00PM</MenuItem>
                  <MenuItem value={"4:00PM"}>4:00PM</MenuItem>
                  <MenuItem value={"5:00PM"}>5:00PM</MenuItem>
                </Select>
                           </FormControl>
                         </FormGroup>
                        
                        <FormGroup>
                            <FormHelperText required className={classes.inputLabels}>
                                computers
                            </FormHelperText>
                            <Field
                                as={OutlinedInput}
                                id="computers"
                                type="number"
                                name="computers"
                                className={classes.multiSelect}
                            />
                            <div className={classes.errorMessages}>
                                <ErrorMessage name="computers"/>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <FormHelperText className={classes.inputLabels}>
                                studyCarols
                            </FormHelperText>
                            <Field
                                as={OutlinedInput}
                                id="studyCarols"
                                type="number"
                                name="studyCarols"
                                className={ classes.multiSelect }
                            />
                            <div className={classes.errorMessages}>
                                <ErrorMessage name="studyCarols"/>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <FormHelperText className={classes.inputLabels}>
                                softSeating
                            </FormHelperText>
                            <Field
                                as={OutlinedInput}
                                id="softSeating"
                                type="number"
                                name="softSeating"
                                className={classes.multiSelect }
                            />
                            <div className={classes.errorMessages}>
                                <ErrorMessage name="softSeating"/>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <FormHelperText className={classes.inputLabels}>
                               Tables
                            </FormHelperText>
                            <Field
                                as={OutlinedInput}
                                id="tables"
                                type="number"
                                name="tables"
                                className={classes.multiSelect}
                            />
                            <div className={classes.errorMessages}>
                                <ErrorMessage name="tables"/>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <FormHelperText className={classes.inputLabels}>
                               others
                            </FormHelperText>
                            <Field
                                as={OutlinedInput}
                                id="others"
                                type="number"
                                name="others"
                                className={classes.multiSelect}
                            />
                            <div className={classes.errorMessages}>
                                <ErrorMessage name="others"/>
                            </div>
                        </FormGroup>
                        <FormGroup>
            {/* <FormHelperText required className={classes.inputLabels}>
                Floor
              </FormHelperText> */}
              <FormControl variant="outlined" className={classes.multiSelect}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Floor
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={floor}
                  onChange={handleChange}
                  label="floor"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>First </MenuItem>
                  <MenuItem value={2}>Second</MenuItem>
                  <MenuItem value={3}>Third</MenuItem>
                  <MenuItem value={4}>Fourth</MenuItem>
                </Select>
              </FormControl>
                        </FormGroup>
                        {/* <FormGroup>
                            <FormHelperText id="outlined-weight-helper-text"
                                            className={classes.inputLabels}>Floor</FormHelperText>
                            <Select
                                MenuProps={{
                                    className: classes.menu,
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "left"
                                    },
                                    transformOrigin: {
                                        vertical: "top",
                                        horizontal: "left"
                                    },
                                    getContentAnchorEl: null
                                }}
                                labelId="mutiple-select-label"
                                open={openSelect}
                                onOpen={handleOpen}
                                multiple
                                id="floor"
                                value={regions ? regions : []}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                    setRegions(event.target.value as string[]);
                                    setFieldValue("floor", event.target.value != "" ? event.target.value as string[] : []);
                                }}
                                input={<OutlinedInput/>}
                                renderValue={(selected) => {
                                    if ((selected as string[]).filter((item: any) => item).length === 0) {
                                        return <>Select</>;
                                    }
                                    return (selected as string[]).filter((item: any) => item).join(',')
                                }}
                            
                                className={classes.multiSelect}
                                fullWidth
                                name="floor"
                                variant="outlined"
                                displayEmpty
                            >
                                <MenuItem style={{marginBottom: "10px", backgroundColor: 'transparent', opacity: 0.5}}
                                          value="">
                                    <Box style={{position: "absolute", right: 10}}>
                                        <MinimizeIcon onClick={handleSelectClose}/>
                                    </Box>
                                </MenuItem>
                                {regionList.map((app) => (
                                    <MenuItem key={app} value={app}>
                                        <Checkbox checked={regions?.indexOf(app) > -1}/>
                                        <ListItemText primary={app}/>
                                    </MenuItem>
                                ))}
                            </Select>
                            <div className={classes.errorMessages}>
                                <ErrorMessage name="floor"/>
                            </div>
                        </FormGroup> */}

                            
                            <Button type="submit" variant="contained" className={classes.addButton}>
                                Save
                            </Button>
                            <Link href="/">
                                <Button type="submit" variant="contained"  className={classes.cancelButton}>
                                    Cancel
                                </Button>
                            </Link>
                            
                                </Form>
                            )}
                        </Formik>
                    </div>
                </DialogContent>

            </Dialog>
        </div>
    );
}
export default createAccount;