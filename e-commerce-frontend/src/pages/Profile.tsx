import SectionTitle from "@components/common/SectionTitle/SectionTitle";
import { useAppSelector } from "@store/hooks";

const Account = () => {
    const accountInfo = useAppSelector((state) => state.auth.user);

    return (
        <>
            <SectionTitle title="Account Info" />
            <ul>
                <li>First Name: {accountInfo?.firstName}</li>
                <li>Last Name: {accountInfo?.lastName}</li>
                <li>Email: {accountInfo?.email}</li>
            </ul>
        </>
    );
};

export default Account;