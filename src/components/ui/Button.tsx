
export function Button({type, children, className, ...props}:any) {
    return (
        <button type={type} className={`font-semibold text-sm text-center min-w-max px-3 py-2 rounded-lg ${className}`} {...props}> {children} </button>
    )
}

// Primary CTA Link (Primary-CTA-Link)
export function PButton({type, children, className, ...props}:any){
    return (
        <Button type={type} className={`text-white bg-primary disabled:bg-muted/25 disabled:ring-1 ring-muted/45 disabled:cursor-progress ${className}`} {...props}>{children}</Button>
    )
}

// Secondary CTA Link (Secondary-CTA-Link)
export function SButton({type, children, className, ...props}:any){
    return (
        <Button type={type} className={`text-foreground bg-muted/10 border border-muted/15 ${className}`} {...props}>{children}</Button>
    )
}