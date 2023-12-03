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

