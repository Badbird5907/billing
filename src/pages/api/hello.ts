import {ensureValueNotUndefined} from "@/util/util";
import {authenticatedApi} from "@/util/authenticated";

export default authenticatedApi(async (request, response) => {
    if (!request.user.isAuthenticated) {
        response.status(401).json({message: 'Unauthorized', u: ensureValueNotUndefined(request.user)})
        return
    }
    response.json({
        data: 'this_is_protected_resource',
        u: ensureValueNotUndefined(request.user)
    })
});
