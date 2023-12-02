import {useRouter} from "next/router";
import AccountsTab from "../../../components/Accounts/AccountsTab";

import {AuthenticatedTemplate} from "@azure/msal-react";
// import LoginToContinue from "../../../../components/common/LoginToContinue";


const ManageAccount = () => {
    const router = useRouter();
    const {id, tab} = router.query;
    return (
        <div>
            {/* <AuthenticatedTemplate> */}
                <AccountsTab
                    selectedTab={0}
                    id={"" + id}
                />
                {/* <AccountList/> */}
            {/* </AuthenticatedTemplate> */}
            {/* <LoginToContinue/> */}
        </div>
    );
};

export default ManageAccount;
