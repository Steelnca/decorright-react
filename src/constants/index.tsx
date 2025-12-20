
export const navItems = [
    {label: 'Home', path: '/'},
    {label: 'Projects', path: '/projects'},
    {label: 'Services', path: '/services'},
    {label: 'Contact', path: '/contact'},

]

export const categories = [
    {
        label: 'Residential', value: 'residential', primaryDisplay: true,
        images: ['/public/s6.jpg', '/public/s2.jpg', '/public/s3.jpg', '/public/s4.jpg'],
        checklist: [
            'Customized interior design solutions',
            'Expert space planning and layout optimization',
            'Selection of furniture and decor',
            'Comprehensive project management',
        ]
    },
    {
        label: 'Commercial Customized interior design solutions', value: 'commercial', primaryDisplay: false,
        images: ['/public/s6.jpg', '/public/s2.jpg', '/public/s3.jpg', '/public/s4.jpg'],
        checklist: [
            'Customized interior design solutions',
            'Expert space planning and layout optimization',
            'Selection of furniture and decor',
            'Comprehensive project management',
        ]
    },
    {
        label: 'Office Customized interior design solutions', value: 'office', primaryDisplay: false,
        images: ['/public/s6.jpg', '/public/s2.jpg', '/public/s3.jpg', '/public/s4.jpg'],
        checklist: [
            'Customized interior design solutions',
            'Selection of furniture and decor',
        ]
    },
    {
        label: 'Hospitality', value: 'hospitality', primaryDisplay: false,
        images: ['/public/s6.jpg', '/public/s2.jpg', '/public/s3.jpg', '/public/s4.jpg'],
        checklist: [
            'Customized interior design solutions',
            'Expert space planning and layout optimization',
            'Comprehensive project management',
        ]
    },
    // { label: 'Retail', value: 'retail', icon: 'retail' },
    // { label: 'Residential', value: 'residential', icon: 'residential' },
    // { label: 'Commercial', value: 'commercial', icon: 'commercial' },
    // { label: 'Office', value: 'office', icon: 'office' },
    // { label: 'Hospitality', value: 'hospitality', icon: 'hospitality' },
    // { label: 'Retail', value: 'retail', icon: 'retail' },
]

export const serviceTypes = [
    {label: 'Interior Design', value: 'interior-design', imgSrc: '/public/s1.jpg'},
    {label: 'Space Planning', value: 'space-planning', imgSrc: '/public/s2.jpg'},
    {label: 'Furniture Selection', value: 'furniture-selection', imgSrc: '/public/s3.jpg'},
    {label: 'Color Consultation', value: 'color-consultation', imgSrc: '/public/s4.jpg'},
    {label: 'Project Management', value: 'project-management', imgSrc: '/public/s5.jpg'},
    {label: 'Redesign', value: 'redesign', imgSrc: '/public/s6.jpg'},
]
