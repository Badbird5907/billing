/*

    Object.keys(user).forEach((key) => {
        if ((user as any)[key] === undefined) {
            (user as any)[key] = null
        }
    });
 */
export function ensureValueNotUndefined<T>(value: T | undefined): T {
    if (value === undefined) {
        throw new Error("value is undefined")
    }
    Object.keys(value as any).forEach((key) => {
        if ((value as any)[key] === undefined) {
            (value as any)[key] = null
        }
    });
    return value as T;
}
