import {settings} from "./settings";

// Config object to be passed to Msal on creation
export const msalConfig = {
    auth: {
        clientId: settings.clientId,
        redirectUri: settings.redirectUri,
        postLogoutRedirectUri: settings.postLogoutRedirectUri,
        authority: "https://login.microsoftonline.com/"+settings.authority
    }
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
    scopes: settings.loginRequest.scopes
};

