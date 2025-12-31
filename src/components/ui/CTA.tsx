
import { Link } from "react-router-dom";


export function CTALink({to, children, className}:{to:string, children:any, className?:string}) {
    return (
        <Link to={to} className={`font-semibold text-center px-2 md:px-3 py-1.5 rounded-full  ${className}`}> {children} </Link>
    )
}

// Primary CTA Link (Primary-CTA-Link)
export function PCTALink({to, children, className}:{to:string, children:any, className?:string}){
    return (
        <CTALink to={to} className={`text-white/96 bg-primary ${className}`}>{children}</CTALink>
    )
}

// Secondary CTA Link (Secondary-CTA-Link)
export function SCTALink({to, children, className}:{to:string, children:any, className?:string}){
    return (
        <CTALink to={to} className={`text-muted border-2 border-primary ${className}`}>{children}</CTALink>
    )
}