/*
Wrapper for getServerSideProps

export const getServerSideProps = logtoClient.withLogtoSsr((context) => {
    const {user} = context.req;
    const {res} = context;

    if (!user.isAuthenticated) {
        res.setHeader('location', '/api/logto/sign-in');
        res.statusCode = 302;
        res.end();
    }

    return {
        props: {
            user: JSON.parse(JSON.stringify(user)),
        },
    };
});

 */
import {logtoClient} from "@/libraries/logto";
import {GetServerSidePropsContext, GetServerSidePropsResult} from "next";
import {LogtoContext} from "@logto/next";
import {ensureValueNotUndefined} from "@/util/util";

export const authenticated = <P extends Record<string, unknown> = Record<string, unknown>>(handler: (context: GetServerSidePropsContext, user: LogtoContext) => GetServerSidePropsResult<P>) => {
    return logtoClient.withLogtoSsr((context) => {
        const {user} = context.req;
        const {res} = context;

        if (!user.isAuthenticated) {
            res.setHeader('location', '/api/logto/sign-in');
            res.statusCode = 302;
            res.end();
        }
        return handler(context, ensureValueNotUndefined(user));
    });
}
