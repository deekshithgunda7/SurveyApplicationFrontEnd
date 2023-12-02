import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Drawer from "./Drawer";
import {MsalAuthenticationTemplate, useAccount, useIsAuthenticated, useMsal} from "@azure/msal-react";
import {loginRequest} from "../../config/authConfig";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import {InteractionType} from "@azure/msal-browser";
import {useRouter} from 'next/router';
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    toolbar: {
        paddingRight: "24px", // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: "#0072ED",
        height: 70,
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    content: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    contentShift: {
       // zIndex: theme.zIndex.drawer-1,
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButtonHidden: {
        display: "none",
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: "fixed",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        background:"#2F2F32"
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(0),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(0),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
    fixedHeight: {
        height: "100%",
    },
    mainSection: {
        flex: 1
    },
    main: {
        marginRight: "10%",
        marginLeft: "10%",
        marginTop: "110px"
    },
    add: {
        marginRight: "28px"
    }

}));

const SignInButton = () => {
    const {instance} = useMsal();
    const handleLogin = () => {
        instance.loginRedirect(loginRequest);
    };

    return (
        <div>
            <Button onClick={handleLogin} color="inherit">
                Login
            </Button>
        </div>
    );
};

interface SignOutButtonProps {
    setSignOut: React.Dispatch<React.SetStateAction<boolean>>;

}

const SignOutButton: React.FC<SignOutButtonProps> = ({setSignOut}) => {
    const {instance} = useMsal();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleLogout = () => {
        setAnchorEl(null);
        setSignOut(true);
        instance.logout();
    };

    return (
        <div>
            <IconButton
                onClick={(event) => setAnchorEl(event.currentTarget)}
                color="inherit"
            >
                <AccountCircle/>
            </IconButton>
            <Menu
                getContentAnchorEl={null}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
};

interface SignInSignOutButtonProps {
    signOut: boolean;
    setSignOut: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignInSignOutButton: React.FC<SignInSignOutButtonProps> = ({setSignOut, signOut}) => {
    const isAuthenticated = useIsAuthenticated();
    const {instance, accounts} = useMsal();
    const account = useAccount(accounts[0] || {});

    function requestAccessToken() {
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: account,
            })
            .then((response) => {
                // if user is authenticated setting axios defaults including access token..
                axios.defaults.headers.common["Authorization"] =
                    "Bearer " + response.accessToken;
            });
    }

    if (isAuthenticated) {
        if (!signOut) {
            // Request access token from Azure.
            // This functional component will load everytime a form is clicked.
            // In that we are checking whether user is logged on or not.
            // Only if the is logged in, you need to request token.
            // But if the user clicked Sign Out, it should not request.
            // To prevent the condition, we have used the React hook signOut
            // to determine user logged out or not
            requestAccessToken();
        }
        return <SignOutButton setSignOut={setSignOut}/>;
    } else {
        return <SignInButton/>;
    }
};

const WelcomeName = () => {
    const {accounts} = useMsal();
    const [name, setName] = useState(null);

    useEffect(() => {
        if (accounts.length > 0) {
            // @ts-ignore
            setName(accounts[0].name.split(" ")[0]);
        }
    }, [accounts]);

    if (name) {
        return <Typography variant="h6" style={{fontSize: "1rem"}}>{name}</Typography>;
    } else {
        return null;
    }
};

const ErrorComponent = ({error}) => {
    return <Typography variant="h6">An Error Occurred: {error.errorCode}</Typography>;
}

const Loading = () => {
    return <Typography variant="h6">Authentication in progress...</Typography>
}

const Navigator: React.FC = ({children}) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(true);
    const [signOut, setSignOut] = React.useState(false);
    const router = useRouter();

    const handleDrawer = () => {
        setOpen(!open);
    };


    const authRequest = {
        ...loginRequest
    };

    return (
        <div className={classes.root}>
            <Drawer
                open={open}
                classes={classes}
            />
            <div className={classes.mainSection}>
                <div>
                    <AppBar
                        position="fixed"
                        className={clsx(classes.appBar, open && classes.appBarShift)}>
                        <Toolbar className={classes.toolbar}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawer}>
                                <MenuIcon/>
                            </IconButton>
                            <Typography
                                component="h1"
                                variant="h6"
                                noWrap
                                className={classes.title}>
                                CSU Library Survey
                            </Typography>

                            <WelcomeName/>
                            {!(router.pathname === "/logout") ?
                                <MsalAuthenticationTemplate
                                    interactionType={InteractionType.Redirect}
                                    authenticationRequest={authRequest}
                                    errorComponent={ErrorComponent}
                                    loadingComponent={Loading}>
                                    <SignInSignOutButton signOut={signOut} setSignOut={setSignOut}/>
                                </MsalAuthenticationTemplate>
                                : null}
                        </Toolbar>
                    </AppBar>
                </div>
                <div className={clsx(classes.content, open && classes.contentShift)}>
                    <div className={classes.main}>
                        {children}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Navigator;
