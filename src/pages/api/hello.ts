import {logtoClient} from "@/libraries/logto";
import {ensureValueNotUndefined} from "@/util/util";

export default logtoClient.withLogtoApiRoute(async(request, response) => {
    if (!request.user.isAuthenticated) {
        response.status(401).json({message: 'Unauthorized', u: ensureValueNotUndefined(request.user)})
        return
    }
    response.json({
        data: 'this_is_protected_resource',
        u: ensureValueNotUndefined(request.user)
    })
}, {
    resource: process.env.LOGTO_API_RESOURCE,
    getAccessToken: true
})
