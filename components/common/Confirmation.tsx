import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    createStyles,
    makeStyles,
    Theme,
    Divider
} from "@material-ui/core";
import React from "react";

export interface DialogProps {
    content: string;
    onSubmit: () => void;
    open: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        addButton: {
            float: "right",
            marginLeft: "8px",
            width: "50%",
        },
        commonLine: {
            padding: "0",
            margin: "0",
            width: "100%",
        },
        button: {
            padding: "0",
            margin: "0",
            paddingBottom: "1px",
            width: "50%",
            height: '47px',
            color: '#212121',
            borderRadius: '0',
            textTransform:"none"

        }

    })
);


const Confirmation = (props) => {
    const {open, setOpen, onConfirm, content} = props;
    const classes = useStyles();
    return (
        <div>
            <Dialog
                PaperProps={{
                    style: {borderRadius: 0}
                }}
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the {content} ?
                    </DialogContentText>
                </DialogContent>
                <Divider/>
                <DialogActions style={{padding: "0"}}>

                    <Button type="submit"
                            variant="text"
                            className={classes.button}
                            style={{marginLeft: "0",color:"#0072ED"}}
                            onClick={() => {
                                setOpen(false);
                                onConfirm();
                            }} autoFocus>
                        Yes
                    </Button>
                    <Divider orientation="vertical" variant="inset" flexItem style={{
                        padding: "0",
                        margin: "0"
                    }}/>
                    <Button type="submit"
                            variant="text"
                            className={classes.button}
                            onClick={() => {
                                setOpen(false);
                            }}>No</Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

export default Confirmation;
