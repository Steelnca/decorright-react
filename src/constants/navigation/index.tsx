import { PATHS } from "@/routers/Paths"

// Admin navigation item list for menu
export const adminMenuNav = [
    { id: '1', label: 'Dashboard', path: PATHS.ADMIN.ANALYTICS, icon: null, description: 'Overview metrics, KPIs and site analytics' },
    { id: '3', label: 'Users & Activity', path: PATHS.ADMIN.USERS, icon: null, description: 'View and manage user accounts, roles and activity logs' },
    { id: '4', label: 'Service Requests', path: PATHS.ADMIN.REQUEST_SERVICE_LIST, icon: null, description: 'Browse, filter and update service requests' },
    { id: '5', label: 'Service List', path: PATHS.ADMIN.SERVICE_LIST, icon: null, description: 'Manage published services and their details' },
    { id: '6', label: 'Create Service', path: PATHS.ADMIN.SERVICE_CREATE, icon: null, description: 'Add a new service offering with images and pricing' },
    { id: '7', label: 'Project List', path: PATHS.ADMIN.PROJECT_LIST, icon: null, description: 'View and Manage all projects' },
    { id: '8', label: 'Create a Project ', path: PATHS.ADMIN.PROJECT_CREATE, icon: null, description: 'Create new projects and configure project settings' },
    { id: '9', label: 'Portfolio List', path: PATHS.ADMIN.GALLERY_PORTFOLIO_LIST, icon: null, description: 'Manage gallery entries and categories' },
    { id: '10', label: 'Create a Portfolio', path: PATHS.ADMIN.GALLERY_PORTFOLIO_CREATE, icon: null, description: 'Upload and organize new gallery items' },
    { id: '11', label: 'Settings', path: PATHS.ADMIN.SETTINGS, icon: null, description: 'Application settings, preferences and integrations' },
]

// Admin Navigation Data (with support for nested items)
export const adminSideMenuNav = [
    { id: '1', label: 'Dashboard', path: PATHS.ADMIN.ANALYTICS, icon: null, description: 'Overview metrics, KPIs and site analytics' },

    { id: '3', label: 'Users & Activity', path: PATHS.ADMIN.USERS, icon: null, description: 'View and manage user accounts, roles and activity logs' },

    { id: '4', label: 'Service Request', icon: null, children: [
        { id: '4.1', label: 'Request List', path: PATHS.ADMIN.REQUEST_SERVICE_LIST, icon: null, description: 'Browse, filter and update service requests' },
    ], description: '' },

    { id: '5', label: 'Services', icon: null, children: [
        { id: '5.1', label: 'Service List', path: PATHS.ADMIN.SERVICE_LIST, icon: null, description: 'Manage published services and their details' },
        { id: '5.2', label: 'Create a Service', path: PATHS.ADMIN.SERVICE_CREATE, icon: null, description: 'Add a new service offering with images and pricing' },
    ], description: '' },

    { id: '6', label: 'Projects', icon: null, children:[
        { id: '6.1', label: 'Project List', path: PATHS.ADMIN.PROJECT_LIST, icon: null, description: 'View and manage all your projects.' },
        { id: '6.2', label: 'Create a Project', path: PATHS.ADMIN.PROJECT_CREATE, icon: null, description: 'Create new projects and configure project settings' },
    ], description: '' },

    { id: '7', label: 'Gallery', icon: null, children:[
        { id: '7.1', label: 'Portfolio List', path: PATHS.ADMIN.GALLERY_PORTFOLIO_LIST, icon: null, description: 'Manage gallery entries and categories' },
        { id: '7.2', label: 'Create a Portfolio', path: PATHS.ADMIN.GALLERY_PORTFOLIO_CREATE, icon: null, description: 'Upload and organize new gallery items' },
    ], description: '' },

    { id: '8', label: 'Settings', path: PATHS.ADMIN.SETTINGS, icon: null, description: 'Application settings, preferences and integrations' },
]


export const clientMenuItems = [
    { label: 'Home', path: PATHS.CLIENT.ROOT, icon: null, description: 'Return to the homepage' },

    { label: 'Messages', path: PATHS.CLIENT.CHAT, icon: null, description: 'View and continue your conversations' },

    { label: 'Request Service', path: PATHS.CLIENT.REQUEST_SERVICE, icon: null, description: 'Start a new service request' },
    { label: 'Your Requests', path: PATHS.CLIENT.REQUEST_SERVICE_LIST, icon: null, description: 'See the status of your service requests' },
    { label: 'Portfolio', path: PATHS.GALLERY_PORTFOLIO_LIST, icon: null, description: 'Browse our gallery and past work' },

    { label: 'Projects', path: PATHS.PROJECT_LIST, icon: null, description: 'Explore completed projects and case studies' },
    { label: 'Services', path: PATHS.SERVICE_LIST, icon: null, description: 'Explore services we offer' },
    { label: 'Contact Us', path: PATHS.CONTACT, icon: null, description: 'Get in touch with our team' },
]

export const publicMenuItems = [
    { label: 'Home', path: PATHS.ROOT, icon: null, description: 'Landing page and highlights' },
    { label: 'Projects', path: PATHS.PROJECT_LIST, icon: null, description: 'View public projects and case studies' },
    { label: 'Services', path: PATHS.SERVICE_LIST, icon: null, description: 'Learn about available services' },
    { label: 'Contact Us', path: PATHS.CONTACT, icon: null, description: 'Contact information and form' },
]

export const LegalLinks = [
    { label: 'Terms & Conditions', path: '/terms' },
    { label: 'Privacy Policy', path: '/privacy-policy' },
]
