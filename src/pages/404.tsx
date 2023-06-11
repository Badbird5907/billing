import React from "react";

import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {logtoClient} from "@/libraries/logto";
import {ensureValueNotUndefined} from "@/util/util";
import Link from "next/link";
import {Button} from "@nextui-org/react";

const NotFound = () => {
    return (
        <>
            <div className="flex flex-col h-screen items-center justify-center">
                <h1 className={"text-4xl font-bold"}>404 - Not Found</h1>
                <span className={"text-2xl"}>We could not find this page!</span>
                <Button color={"primary"} className={"mt-4"} onPress={() => {
                    window.history.back()
                }}>Back</Button>
            </div>
        </>
    );
};

export default NotFound;
