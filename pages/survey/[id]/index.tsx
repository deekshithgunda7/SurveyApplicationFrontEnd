import {useRouter} from "next/router";
import AccountsTab from "../../../components/Accounts/AccountsTab";

const ManageAccount = () => {
    const router = useRouter();
    const {id} = router.query;
    return (
        <div>
                <AccountsTab
                    selectedTab={0}
                    id={"" + id}
                />
        </div>
    );
};

export default ManageAccount;
