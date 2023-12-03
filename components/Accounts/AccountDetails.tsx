import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import useSWR from "swr";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormHelperText from "@material-ui/core/FormHelperText";
import {
  Button,
  Checkbox,
  FormControl,
  FormGroup,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSnackbar } from "notistack";
import { trigger } from "swr";
import axios from "axios";
import Link from "next/link";
import { array, object, string } from "yup";
import sendMessage from "../common/SnackBar";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useMsal } from "@azure/msal-react";
import { useRouter } from "next/router";
import MinimizeIcon from "@material-ui/icons/Minimize";
import Box from "@material-ui/core/Box";
import globalUseStyles from "../common/GlobalStyles";

export interface UserDetails {
  time: string;
  computers: number;
  studyCarols: number;
  softSeating: number;
  tables: number;
  others: number;
  floor: [];
}

let initialValues: UserDetails = {
  time: "",
  computers: 0,
  studyCarols: 0,
  softSeating: 0,
  tables: 0,
  others: 0,
  floor: [],
};
const floorList = ["1", "2", "3", "4"];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    errorMessages: {
      color: "red",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    multiSelect: {
      marginBottom: "10px",
      "&  .MuiInputAdornment-root": {
        marginRight: "0px",
      },
      background: "#FFFFFF",
    },
    textField: {
      marginBottom: "10px",
      background: "#d8d8d8",
    },
    select: {
      marginLeft: "10%",
      height: "40px",
      width: "90%",
      alignItems: "center",
    },
    inputLabels: {
      fontSize: "15px",
      color: "black",
    },
    descriptionField: {
      marginBottom: "10px",
      background: "white",
      color: "black",
    },
    menu: { height: 300 },
  })
);

interface AccountDetailsProps {
  id: number;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ id }) => {
  const classes = useStyles();
  const globalClasses = globalUseStyles();
  const [age, setAge] = React.useState("");

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const accountInfoUrl = "/survey/" + id;
  const { data } = useSWR(accountInfoUrl);
  const [floor, setFloor] = React.useState("");
  const [time, setTime] = React.useState("");
  const [openSelect, setOpenSelect] = React.useState(false);
  console.log(data, "from surveydetails,,.");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFloor(event.target.value as string);

  };
  const handleTimeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTime(event.target.value as string);
  };  

  // React.useEffect(() => {
  //     setFloor(data?.floor)
  // }, [data])
  
  const handleSelectClose = () => {
    setOpenSelect(false);
  };

  const handleOpen = () => {
    setOpenSelect(true);
  };
  
  if (data) {
    console.log(data, "in data loop");
    initialValues["time"] = data["time"];
    initialValues["computers"] = data["computers"];
    initialValues["studyCarols"] = data["studycarols"];
    initialValues["softSeating"] = data["softseating"];
    initialValues["tables"] = data["tables"];
    initialValues["others"] = data["others"];
    initialValues["floor"] = data["floor"];
  } else {
    return (
      <Backdrop
        style={{ zIndex: 1, background: "Gainsboro", opacity: 0.5 }}
        open={!data}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <div style={{ padding: 0, margin: 0, width: 600 }}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, formikHelpers) => {
          if (id) {
            const putUrl = "/survey/" + id;
            try {
              await axios.put(putUrl, {
                time: time,
                computers: values.computers,
                studyCarols: values.studyCarols,
                softSeating: values.softSeating,
                tables: values.tables,
                others: values.others,
                floor: floor,
              });
              await sendMessage(
                enqueueSnackbar,
                "Updated Successfully...",
                "success",
                closeSnackbar
              );
              // initialValues["time"] = values["time"];
              initialValues["time"] = values["time"];
              initialValues["computers"] = values["computers"];
              initialValues["studyCarols"] = values["studycarols"];
              initialValues["softSeating"] = values["softseating"];
              initialValues["tables"] = values["tables"];
              initialValues["others"] = values["others"];
              initialValues["floor"] = values["floor"];
            } catch (error) {
              await sendMessage(
                enqueueSnackbar,
                error.response.data.message,
                "error",
                closeSnackbar
              );
            }
          }
          formikHelpers.resetForm();
          await trigger("/survey");
          await router.push("/survey");
        }}
        // validationSchema={object({
        //     time: string()
        //         .required("Required")
        //         .min(2)
        //         .max(100),
        //     computers: string()
        //         .required("Required")
        //         .min(2)
        //         .max(100),
        //     studyCarols: string()
        //         .required("Required")
        //         .min(2)
        //         .max(100),
        //     softSeating: string()
        //         .required("Required")
        //         .min(2)
        //         .max(100),
        //     tables: string()
        //         .required("Required")
        //         .min(2)
        //         .max(100),
        //     others: string()
        //         .required("Required")
        //         .min(2)
        //         .max(100),
        //     floor: array().min(1, "Required"),
        // })}
      >
        {({ setFieldValue }) => (
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
                className={classes.multiSelect}
              />
              <div className={classes.errorMessages}>
                <ErrorMessage name="time" />
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
                <ErrorMessage name="computers" />
              </div>
            </FormGroup>
            <FormGroup>
              <FormHelperText className={classes.inputLabels}>
                StudyCarols
              </FormHelperText>
              <Field
                as={OutlinedInput}
                id="studyCarols"
                type="number"
                name="studyCarols"
                className={classes.multiSelect}
              />
              <div className={classes.errorMessages}>
                <ErrorMessage name="studyCarols" />
              </div>
            </FormGroup>
            <FormGroup>
              <FormHelperText className={classes.inputLabels}>
                SoftSeating
              </FormHelperText>
              <Field
                as={OutlinedInput}
                id="softSeating"
                type="number"
                name="softSeating"
                className={classes.multiSelect}
              />
              <div className={classes.errorMessages}>
                <ErrorMessage name="softSeating" />
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
                <ErrorMessage name="tables" />
              </div>
            </FormGroup>
            <FormGroup>
              <FormHelperText className={classes.inputLabels}>
                others
              </FormHelperText>
              <Field
                as={OutlinedInput}
                id="Others"
                type="number"
                name="others"
                className={classes.multiSelect}
              />
              <div className={classes.errorMessages}>
                <ErrorMessage name="others" />
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
                                value={floor ? floor : []}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                    setFloor(event.target.value as string[]);
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
                                {floorList.map((app) => (
                                    <MenuItem key={app} value={app}>
                                        <Checkbox checked={floor?.indexOf(app) > -1}/>
                                        <ListItemText primary={app}/>
                                    </MenuItem>
                                ))}
                            </Select>
                            <div className={classes.errorMessages}>
                                <ErrorMessage name="floor"/>
                            </div>
                        </FormGroup> */}

            <Button
              type="submit"
              variant="contained"
              className={globalClasses.saveButton}
            >
              Save
            </Button>

            <Link href="/survey">
              <Button
                type="submit"
                variant="contained"
                className={globalClasses.cancelButton}
              >
                Cancel
              </Button>
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AccountDetails;
