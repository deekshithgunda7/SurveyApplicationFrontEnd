import useSWR, {mutate, trigger} from "swr";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import Link from "next/link";
import React from "react";
import {createStyles, lighten, makeStyles, Theme,} from "@material-ui/core/styles";
import {useSnackbar} from "notistack";
import {useMsal} from "@azure/msal-react";

const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
            fontSize: 20,
            backgroundColor: "Gainsboro",
            fontWeight: "bold",
        },
        highlight:
            theme.palette.type === "light"
                ? {
                    color: theme.palette.secondary.main,
                    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                }
                : {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.secondary.dark,
                },
        title: {
            flex: "1 1 100%",
        },
        toolBar: {
            alignContent: "flex-start",
        },
    })
);

interface EnhancedTableToolbarProps {
    numSelected: number;
    //selected: string[];
    selected: any[];
    setSelected: any;
    url: string;
    toolBarIcons?: IToolbarIcons[];
    category?: string;
    tableName?: string;
    groupName?: string;
    groupId?: string;
    appId?: string;
    appName?: string;
    roleId?: string;
    roleName?: string;
}

export interface IToolbarIcons {
    targetUrl: string;
    toolTip: string;
    iconComponent: React.ReactFragment;
}

export const ToolbarIcons = (props: IToolbarIcons) => {
    const {targetUrl, toolTip, iconComponent} = props;

    return (
        <Link href={targetUrl}>
            <Tooltip title={toolTip}>
        <span>
          <IconButton aria-label={toolTip}>{iconComponent} </IconButton>
        </span>
            </Tooltip>
        </Link>
    );
};

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const classes = useToolbarStyles();
    const {
        url,
        numSelected,
        setSelected,
        selected,
        toolBarIcons,
        category,
        tableName,
        groupName,
        groupId,
        appId,
        appName,
        roleId,
        roleName,
    } = props;
    const {data} = useSWR(url);
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const {accounts} = useMsal();
    if (!data) {
        return <h1>Loading...</h1>;
    }

    const rows = data.value || [];

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div>
                {numSelected > 0 ? (
                    <Typography
                        className={classes.title}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography
                        className={classes.title}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        {category}
                    </Typography>
                )}

                {toolBarIcons.map((toolbar) => {
                    return (
                        <ToolbarIcons
                            key={toolbar.targetUrl}
                            targetUrl={toolbar.targetUrl}
                            toolTip={toolbar.toolTip}
                            iconComponent={toolbar.iconComponent}
                        />
                    );
                })}
                {numSelected > -1 ? (
                    <Tooltip title="Delete">
            <span>
              <IconButton
                  aria-label="delete"
                  onClick={
                      // Initiate the async function to delete the list of users selected. Run through each user and delete.
                      async () => {
                          selected.map(async (selectedItem) => {
                              const deleteUrl = url + "/" + selectedItem.id;
                              mutate(
                                  url,
                                  rows.filter((c) => c.id !== selectedItem),
                                  false
                              );
                              try {
                                  const resp = await axios.delete(deleteUrl);
                                  enqueueSnackbar("Deleted Successfully...", {
                                      variant: "success",
                                  });

                                  if (resp.status === 200) {
                                      const urlData = url.split("/");
                                      let actionType = null;
                                      // if (urlData[1] == "group") {
                                      //     if (urlData[3] == "owners") {
                                      //         actionType = "Deleted Owner"
                                      //     } else if (urlData[3] == "members") {
                                      //         actionType = "Deleted Member"
                                      //     } else {
                                      //         actionType = "Deleted Group"
                                      //     }
                                      // }
                                      if (urlData[1] == "application") {
                                          if (urlData[2] == "role") {
                                              actionType = "Deleted Role";
                                          }
                                          if (urlData[2] == "assignedgroups") {
                                              actionType = "Deleted Group";
                                          }
                                      }
                                      let group_name = null;
                                      let group_id = null;
                                      let owner_id = null;
                                      let owner_name = null;
                                      let member_id = null;
                                      let member_name = null;
                                      let app_id = null;
                                      let app_name = null;
                                      let role_id = null;
                                      let role_name = null;
                                      let module = null;

                                      if (tableName === "Group") {
                                          group_name = selectedItem.id;
                                          group_id = selectedItem.name;
                                          actionType = "Deleted Group";
                                          module = "Group";
                                      }
                                      if (tableName === "Owners") {
                                          group_name = groupName;
                                          group_id = groupId;
                                          owner_id = selectedItem.id;
                                          owner_name = selectedItem.name;
                                          actionType = "Deleted Owner";
                                          module = "Group";
                                      }
                                      if (tableName === "Members") {
                                          group_name = groupName;
                                          group_id = groupId;
                                          member_id = selectedItem.id;
                                          member_name = selectedItem.name;
                                          actionType = "Deleted Member";
                                          module = "Group";
                                      }
                                      if (tableName === "Roles") {
                                          app_id = appId;
                                          app_name = appName;
                                          role_id = selectedItem.id;
                                          role_name = selectedItem.name;
                                          actionType = "Deleted Role";
                                          module = "App";
                                      }
                                      if (tableName === "Role Group") {
                                          app_id = appId;
                                          app_name = appName;
                                          role_id = roleId;
                                          role_name = roleName;
                                          group_name = selectedItem.name;
                                          group_id = selectedItem.id;
                                          actionType = "Deleted Group";
                                          module = "App";
                                      }

                                      axios.post("/audit", {
                                          user_name: accounts[0]["name"],
                                          user_id: accounts[0]["localAccountId"],
                                          timestamp: Date.now(),
                                          module: module,
                                          group_name: group_name,
                                          group_id: group_id,
                                          app_name: app_name,
                                          app_id: app_id,
                                          owner_id: owner_id,
                                          owner_name: owner_name,
                                          member_id: member_id,
                                          member_name: member_name,
                                          role_id: role_id,
                                          role_name: role_name,
                                          action: actionType,
                                      });
                                  }
                              } catch (error) {
                                  enqueueSnackbar("Unable to delete.." + error, {
                                      variant: "error",
                                  });
                              }

                              trigger(url);
                          });

                          // Once all selected users are deleted, we need to call back the Hook to reset the selected user count
                          // to re-render the table.
                          setSelected([]);
                      }
                  }
              >
                <DeleteIcon/>
              </IconButton>
              Delete
            </span>
                    </Tooltip>
                ) : (
                    <></>
                )}
                {/*Displaying additional Toolbar icons which are optional..*/}
            </div>
        </Toolbar>
    );
};

export default EnhancedTableToolbar;
