import Navbar from "./Navbar";
import AccountTabs from "./AccountTabs";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <div className="account-container">
                <AccountTabs />
                <div className="account-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AccountLayout;