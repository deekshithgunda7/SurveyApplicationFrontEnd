// Settings which are common to entire project.

export default class Settings{
    loginToContinue;
    clientId: string;
    redirectUri: string;
    postLogoutRedirectUri: string;
    loginRequest;
    apiEndPoint: string;
    scopes: string;
    authority: string;

    constructor() {
        // Need to be reading from environment variables for section properties.
        this.loginToContinue = {
            message: "Please Login to continue working on the application."
        }
        this.loginRequest = {
            scopes: process.env.NEXT_PUBLIC_SCOPES.split(" ")
        }

        // // // Local Host Set
        // this.redirectUri = "http://localhost:3000";
        // this.postLogoutRedirectUri = "https://localhost:3000";
        // this.apiEndPoint = "http://localhost:8000/v1";
        // this.clientId = "57a39b30-5fbd-41ea-ac15-2b8e32426b6c";

        // // Mumbai Server Set
        // this.redirectUri = "https://cts-auth-service-api.inforcs.net:3000/";
        // this.postLogoutRedirectUri = "https://cts-auth-service-api.inforcs.net:3000/";
        // this.apiEndPoint = "https://cts-auth-service-api.inforcs.net/v1";
        // this.clientId = "57a39b30-5fbd-41ea-ac15-2b8e32426b6c";

        // // CLoudFront Set
        // this.redirectUri = "https://hanover-azure-console-dev.inforcs.net/";
        // this.postLogoutRedirectUri = "https://hanover-azure-console-dev.inforcs.net/";
        // this.apiEndPoint = "https://hanoverazureapi.inforcs.net/v1";
        // this.clientId = "fcea863e-4c93-4d4f-a0e7-19f76daac933";

        // Reading from environment variable.
        this.redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
        this.postLogoutRedirectUri = process.env.NEXT_PUBLIC_POST_REDIRECT_URI;
        this.apiEndPoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
        this.clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
        this.authority = process.env.NEXT_PUBLIC_AUTHORITY;

    }
}

// Initializing the object so that it is singleton to improve over performance.
export const settings = new Settings();

