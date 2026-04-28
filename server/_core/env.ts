export const ENV = {
  appId: process.env.VITE_APP_ID ?? "local-admin-app",
  cookieSecret: process.env.JWT_SECRET ?? "school-secret-key-change-in-production",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  adminPassword: process.env.ADMIN_PASSWORD ?? "admin123",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
};
