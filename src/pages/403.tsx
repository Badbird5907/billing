import React from "react";

import {InferGetServerSidePropsType} from "next";
import {logtoClient} from "@/libraries/logto";
import {ensureValueNotUndefined} from "@/util/util";
import Link from "next/link";
import {Button} from "@nextui-org/react";

const UnauthorizedPage = ({user}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            <div className="flex flex-col h-screen items-center justify-center">
                <h1 className={"text-4xl font-bold"}>403 - Unauthorized</h1>
                <span className={"text-2xl"}>You don{"'"}t have permission to access this page!</span>
                {!user.isAuthenticated && (
                    <>
                        <span className={"text-xl"}>
                            Maybe you need to <Link href={"/api/logto/sign-in"} className={"text-primary-500"}>sign in</Link>?
                        </span>
                    </>
                )}
                {user.isAuthenticated && (
                    <>
                        <span className={"text-xl mt-4"}>
                            <Link href={"/api/logto/sign-out"}>
                                <Button color={"primary"}>Sign Out</Button>
                            </Link>
                        </span>
                    </>
                )}
            </div>
        </>
    );
};

export default UnauthorizedPage;

export const getServerSideProps = logtoClient.withLogtoSsr(async function ({req, res,}) {
    res.statusCode = 403
    const {user} = req
    return {
        props: {
            user: ensureValueNotUndefined(user)
        },
    }
})
