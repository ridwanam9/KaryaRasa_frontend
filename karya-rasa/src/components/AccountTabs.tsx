import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const AccountTabs = () => {
    const router = useRouter();
    const currentPath = router.pathname;

    return (
        <div className="tabs">
            <Link href="/account/personal" className={currentPath.includes("personal") ? "active" : ""}>Personal data</Link>
            <Link href="/account/address" className={currentPath.includes("address") ? "active" : ""}>Address list</Link>
            <Link href="/account/bank" className={currentPath.includes("bank") ? "active" : ""}>Bank account</Link>
        </div>
    );
};

export default AccountTabs;