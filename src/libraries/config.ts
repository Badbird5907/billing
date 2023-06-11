export const config = {
    endpoint: process.env.LOGTO_ENDPOINT || "",
    appId: process.env.LOGTO_APP_ID || "",
    appSecret: process.env.LOGTO_APP_SECRET || "",
    baseUrl: process.env.BASE_URL || "http://localhost:3000",
    cookieSecret: process.env.LOGTO_COOKIE_SECRET || "logto-cookie-secret",
    cookieSecure: process.env.NODE_ENV === 'production',
}
