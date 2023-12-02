import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navigator from "../components/common/Navigator";
import axios from 'axios';
import {SWRConfig} from 'swr';
import {SnackbarProvider} from 'notistack';
// import {MsalProvider} from "@azure/msal-react";
// import {PublicClientApplication} from "@azure/msal-browser";
import {msalConfig} from "../config/authConfig";
import LightTheme from '../components/themes/soho/LightTheme';
import {settings} from "../config/settings";

// const msalInstance = new PublicClientApplication(msalConfig);
axios.defaults.baseURL = settings.apiEndPoint;


export default function MyApp(props) {
    const {Component, pageProps} = props;

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Hanover</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            </Head>
            <ThemeProvider theme={LightTheme}>
                <CssBaseline/>
                <SnackbarProvider maxSnack={1}>
                    {/* <MsalProvider instance={msalInstance}> */}
                        <Navigator>
                            <SWRConfig value={{fetcher: (url: string) => axios(url).then(r => r.data)}}>
                                <Component {...pageProps} />
                            </SWRConfig>
                        </Navigator>
                 {/* </MsalProvider> */}
                </SnackbarProvider>
            </ThemeProvider>
        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
