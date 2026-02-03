
export const PATHS = {
    ROOT: "/",
    ABOUT: "/about-us",

    SERVICE_LIST: "/service-list",
    GALLERY_PORTFOLIO_LIST: "/gallery/portfolio/list",

    PROJECT_LIST: "/project-list",
    PROJECT_DETAIL: "/projects/:slug",   // pattern for router
    projectDetail: (slug: string) => `/projects/${encodeURIComponent(slug)}/`, // generator for links
    // projectType: (slug: string) => `/projects/${encodeURIComponent(slug)}`, // generator for links

    CONTACT: "/contact",

    LOGIN: "/login",
    SIGNUP: "/signup",

    VERIFY_OTP: "/verify-otp",

    PASSWORD_RESET: "/password/reset",
    PASSWORD_SENT: "/password/sent",

    CLIENT: {
        ROOT: "/",

        ACCOUNT_PROFILE: "/profile",
        ACCOUNT_SETTINGS: "/settings",

        REQUEST_SERVICE_LIST: "/request-service/list",
        REQUEST_SERVICE: "/request-service", // helper for dynamic links

        CHAT: "/client/chat/",
        CHAT_ROOM: "/client/chat/:id/",
        chatRoom: (id: string) => `/client/chat/${encodeURIComponent(id)}/`,

        VERIFY_PHONE: "/",

        PASSWORD_SET: "/password/set", // Set password in case of 3rd party sign up
        PASSWORD_CHANGE: "/password/change",
        PASSWORD_DONE: "/password/done", // After password has been changed or set up
    },

    ADMIN: {
        ROOT: "/admin/",
        ANALYTICS: "/admin/analytics",

        CHAT: "/admin/chat",
        CHAT_ROOM: "/admin/chat/:id",
        chatRoom: (id: string) => `/admin/chat/${encodeURIComponent(id)}/`,

        USERS: "/admin/user/list",
        USER_DETAIL: "/admin/user/:id",
        userDetail: (id: string) => `/admin/user/${encodeURIComponent(id)}/`,

        SERVICE_LIST: "/admin/service/list",
        SERVICE_CREATE: "/admin/service/create",
        SERVICE_UPDATE: "/admin/service/:id/edit",
        serviceUpdate: (id: string) => `/admin/service/${encodeURIComponent(id)}/edit`,
        SERVICE_SPACE_LIST: "/admin/service-space/list",
        serviceSpaceListItem: (id: string) => `/admin/service-space/list#${encodeURIComponent(id)}`,
        SERVICE_SPACE_CREATE: "/admin/service-space/create",
        SERVICE_SPACE_UPDATE: "/admin/service-space/:id/edit",

        PROJECT_LIST: "/admin/project/list",
        PROJECT_CREATE: "/admin/project/create",
        PROJECT_UPDATE: "/admin/project/:slug/edit",
        projectUpdate: (slug: string) => `/admin/project/${encodeURIComponent(slug)}/edit`, // generator for links

        REQUEST_SERVICE_LIST: "/admin/service-request/list",
        REQUEST_SERVICE_DETAIL: "/admin/service-request/:id/",
        requestServiceDetail: (id: string) => `/admin/service-request/${encodeURIComponent(id)}/`,

        GALLERY_PORTFOLIO_LIST: "/admin/gallery/portfolio/list",
        GALLERY_PORTFOLIO_CREATE: "/admin/gallery/portfolio/:slug/",
        GALLERY_PORTFOLIO_UPDATE: "/admin/gallery/portfolio/:slug/edit",
        galleryPortfolioUpdate: (id: string) => `/admin/gallery/portfolio/${encodeURIComponent(id)}/edit`,

        SETTINGS: "/admin/settings",
    },
} as const;
