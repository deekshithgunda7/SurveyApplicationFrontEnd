import React from "react";
import Typography from "@material-ui/core/Typography";
import {UnauthenticatedTemplate} from "@azure/msal-react";
import {settings} from "../../config/settings";

const LoginToContinue: React.FC = () => {
    return (
        <UnauthenticatedTemplate>
            <Typography variant="h6">
                {settings.loginToContinue.message}
            </Typography>
        </UnauthenticatedTemplate>
    )
}

export default LoginToContinue;