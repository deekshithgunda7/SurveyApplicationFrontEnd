import {useRouter} from "next/router";
import AccountsTab from "../../components/Accounts/AccountsTab";
import AccountList from "../../components/Accounts/AccountsList"
import {AuthenticatedTemplate} from "@azure/msal-react";
// import LoginToContinue from "../../../../components/common/LoginToContinue";


const Account = () => {
    const router = useRouter();
    const {id, tab} = router.query;
    return (
        <div>
                <AccountList/>
        </div>
    );
};

export default Account;
