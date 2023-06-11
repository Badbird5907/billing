import {InferGetServerSidePropsType} from "next";
import {useRouter} from "next/router";
import {authenticated} from "@/util/authenticated";
import {AppWrapper} from "@/components/app";


const Profile = ({user}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { push } = useRouter();
    return (
        <AppWrapper>
            <div>User ID: {user.claims?.sub}</div>
            <button onClick={() => push('/api/logto/sign-out')}>Sign Out</button>
        </AppWrapper>
    );
};

export default Profile;

export const getServerSideProps = authenticated((context, user) => {
    return {
        props: {
            user,
        },
    };
})
