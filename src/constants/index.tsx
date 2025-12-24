
import image1 from "/public/s1.jpg"
import image2 from "/public/s2.jpg"
import image3 from "/public/s3.jpg"
import image4 from "/public/s4.jpg"
import image5 from "/public/s5.jpg"
import image6 from "/public/s6.jpg"
import imgRoom1 from "/public/r1.svg"

export const images = {
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    imgRoom1,
}

export const userIsAuthenticated = false;

export const navItems = [
    {label: 'Home', path: '/'},
    {label: 'Projects', path: '/projects'},
    {label: 'Services', path: '/services'},
    {label: 'Contact', path: '/contact'},

]

export const categories = [
    {
        label: 'Residential', value: 'residential', primaryDisplay: true,
        images: [image6, image2, image3, image4],
        checklist: [
            'Customized interior design solutions',
            'Expert space planning and layout optimization',
            'Selection of furniture and decor',
            'Comprehensive project management',
        ]
    },
    {
        label: 'Commercial Customized interior design solutions', value: 'commercial', primaryDisplay: false,
        images: [image6, image2, 'image3', image4],
        checklist: [
            'Customized interior design solutions',
            'Expert space planning and layout optimization',
            'Selection of furniture and decor',
            'Comprehensive project management',
        ]
    },
    {
        label: 'Office Customized interior design solutions', value: 'office', primaryDisplay: false,
        images: [image6, image2, 'image3', image4],
        checklist: [
            'Customized interior design solutions',
            'Selection of furniture and decor',
        ]
    },
    {
        label: 'Hospitality', value: 'hospitality', primaryDisplay: false,
        images: [image6, image2, 'image3', image4],
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
    {label: 'Interior Design', value: 'interior-design', imgSrc: image1},
    {label: 'Space Planning', value: 'space-planning', imgSrc: image2},
    {label: 'Furniture Selection', value: 'furniture-selection', imgSrc: image3},
    {label: 'Color Consultation', value: 'color-consultation', imgSrc: image4},
    {label: 'Project Management', value: 'project-management', imgSrc: image5},
    {label: 'Redesign', value: 'redesign', imgSrc: image6},
]

export const LegalLinks = [
    {label: 'Terms & Conditions', path:'/terms'},
    {label: 'Privacy Policy', path:'/privacy-policy'},
]