
export const PATHS = {
    ROOT: "/",
    ABOUT: "/about-us",

    SERVICE_LIST: "/service-list",

    PROJECT_LIST: "/project-list",
    PROJECT_DETAIL: "/projects/:slug",   // pattern for router
    projectDetail: (slug: string) => `/projects/${encodeURIComponent(slug)}`, // generator for links
    projectType: (slug: string) => `/projects/${encodeURIComponent(slug)}`, // generator for links

    CONTACT: "/contact",
    GALLERY: "/gallery",

    LOGIN: "/login",
    SIGNUP: "/signup",
    VERIFY_OTP: "/verify-otp",

    CLIENT: {
        ROOT: "/",
        PROFILE: "/profile",
        PROFILE_EDIT: "/profile/edit",
        REQUEST_SERVICE_LIST: "/request-service/list",
        REQUEST_SERVICE: "/request-service", // helper for dynamic links
        CHAT: "/client/chat/",
        CHAT_ROOM: "/client/chat/:chatId",
        chatRoom: (id: string) => `chat/${encodeURIComponent(id)}`,
        VERIFY_PHONE: "/",
    },

    ADMIN: {
        ROOT: "/admin",
        ANALYTICS: "/admin/analytics",
        CHAT: "/admin/chat/",
        CHAT_ROOM: "/admin/chat/:chatId",
        USERS: "/admin/users/",
        REQUEST_SERVICE_LIST: "/admin/request-service/list",
        PROJECT_CREATE: "/admin/project/create",
        SETTINGS: "/admin/settings",
    },
} as const;
