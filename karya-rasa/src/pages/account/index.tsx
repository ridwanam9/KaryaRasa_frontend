import { useEffect } from "react";
import { useRouter } from "next/router";

const AccountSetting = () => {
    const router = useRouter();

    useEffect(() => {
        router.replace("/account/personal");
    }, [router]);

    return null;
};

export default AccountSetting;