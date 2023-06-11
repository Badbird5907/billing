import {InferGetServerSidePropsType} from "next";
import {useRouter} from "next/router";
import {authenticated} from "@/util/authenticated";
import {AppWrapper} from "@/components/app";
import {Button} from "@nextui-org/react";


const Profile = ({user}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { push } = useRouter();
    return (
        <AppWrapper>
            <div>
                <h2>Claims:</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.entries(user.claims || []).map(([key, value]) => (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>{value}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div>
                <h2>Scopes</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {user.scopes?.map((scope) => (
                        <tr key={scope}>
                            <td>{scope}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Button onPress={() => {
                navigator.clipboard.writeText(JSON.stringify(user, null, 2));
            }}>Copy User JSON</Button>
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
