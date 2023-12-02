import React from "react";
// import {AuthenticatedTemplate} from "@azure/msal-react";
import LoginToContinue from "../components/common/LoginToContinue";
import HomePage from "../components/HomePage/HomePage";

export default function Home() {
    return (
        <div>
            {/* <AuthenticatedTemplate> */}
                <HomePage/>
            {/* </AuthenticatedTemplate> */}
            <LoginToContinue/>
        </div>
    );
}
