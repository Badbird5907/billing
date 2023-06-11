import {logtoClient} from "@/libraries/logto";
import {GetServerSidePropsContext, GetServerSidePropsResult, NextApiHandler} from "next";
import {LogtoContext} from "@logto/next";
import {ensureValueNotUndefined} from "@/util/util";

export const authenticatedApi = (handler: NextApiHandler, scopes: string[] = []) => {
    return logtoClient.withLogtoApiRoute(async (request, response) => {
        if (!request.user.isAuthenticated) {
            response.status(401).json({message: 'Unauthorized'})
            return
        }
        const defaultScopes = (process.env.LOGTO_API_SCOPE?.split(",") || []) as string[]
        // add default scopes, removing duplicates
        const scopesSet = new Set([...scopes, ...defaultScopes])
        const newScopes = Array.from(scopesSet)
        if (newScopes.length > 0) {
            const {user} = request;
            const userScopes = user.scopes;
            if (!userScopes) {
                response.status(403).json({message: 'Forbidden'})
                return
            }
            const hasScope = newScopes.every(scope => userScopes.includes(scope))
            if (!hasScope) {
                response.status(403).json({message: 'Forbidden'})
                return
            }
        }
        return handler(request, response)
    }, {
        resource: process.env.LOGTO_API_RESOURCE,
        getAccessToken: true
    })
}

export const authenticated = <P extends Record<string, unknown> = Record<string, unknown>>(handler: (context: GetServerSidePropsContext, user: LogtoContext) => GetServerSidePropsResult<P>, scopes: string[] = []) => {
    return logtoClient.withLogtoSsr((context) => {
        const {user} = context.req;
        const {res} = context;
        if (!user.isAuthenticated) {
            res.setHeader('location', '/api/logto/sign-in');
            res.statusCode = 302;
            res.end();
        }
        // check scopes
        const defaultScopes = (process.env.LOGTO_API_SCOPE?.split(",") || []) as string[]
        // add default scopes, removing duplicates
        const scopesSet = new Set([...scopes, ...defaultScopes])
        const newScopes = Array.from(scopesSet)
        if (newScopes.length > 0) {
            const userScopes = user.scopes;
            if (!userScopes) {
                res.setHeader('location', '/403');
                res.statusCode = 302;
                res.end();
            }
            const hasScope = newScopes.every(scope => userScopes?.includes(scope))
            if (!hasScope) {
                res.setHeader('location', '/403');
                res.statusCode = 302;
                res.end();
            }
        }
        return handler(context, ensureValueNotUndefined(user));
    }, {
        resource: process.env.LOGTO_API_RESOURCE,
        getAccessToken: true
    });
}
