import React from "react";

import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import {logtoClient} from "@/libraries/logto";
import {authenticated} from "@/util/authenticated";
import {AppWrapper} from "@/components/app";

const Invoices = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return <AppWrapper title={"Invoices"}>
  </AppWrapper>;
};

export default Invoices;
export const getServerSideProps = authenticated((context, user) => {
    return {
        props: {
            user,
        },
    };
})
