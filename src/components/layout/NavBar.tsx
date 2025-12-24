
import { Link } from "react-router-dom"

import { useState } from "react"

import Logo from "/public/vite.svg"
import { ICONS } from "../../icons"
import { userIsAuthenticated } from "../../constants"

import { navItems } from "../../constants"
import { MenuCard } from "../ui/MenuCard"


export function NavLogo () {
    return (
        <div className="flex items-center gap-2 md:gap-4 min-w-max">
            <div className="content-center w-8 md:w-10 aspect-square">
                <img src={Logo} alt="logo" height="40" width="40" className="w-full object-cover rounded-lg" loading="lazy" />
            </div>
            <div className="flex flex-col">
                <h3 className="text-sm md:text-base font-medium"> Deco Right </h3>
                <span className="text-3xs md:text-2xs text-muted hover:text-foreground" title="Decor agency">
                    Decor agency
                </span>
            </div>
        </div>
    )
}

export function NavLinks () {
    return (
        <ul className="hidden md:flex justify-center gap-4 w-full">
            {navItems.map((item, index) => (
                <li key={index}>
                    <Link to={item.path} className="font-medium text-sm p-2"> {item.label} </Link>
                </li>
            ))}

        </ul>
    )
}

export function AuthenticatedUserActins({chatOpen, setChatOpen, notifOpen, setNotifOpen}:any){
    return (
        <>
            {/* Chat Overlay Trigger */}
            <button type="button" title="Chat" className="content-center p-2" onClick={() => setChatOpen(!chatOpen)}>
                { ICONS.chat({className:'size-6'}) }
            </button>

            {/* Notification Overlay Trigger */}
            <button type="button" title="Notifications" className="content-center p-2" onClick={() => setNotifOpen(!notifOpen)}>
                { ICONS.bell({className:'size-6'}) }
            </button>

            {/* User Profile Nav */}
            <Link to='/profile' title="My Profile" className="max-md:hidden content-center p-2">
                { ICONS.user({className:'size-6'}) }
            </Link>

        </>
    )
}

export function AnonymousUserActins(){
    return (
        <>
            {/* Login */}
            <Link to='/login' title="Login" className="max-md:hidden text-center font-medium text-sm text-muted h-fit min-w-max px-3 py-1.5 border-2 border-primary rounded-full">
                Login
            </Link>

            {/* Sign Up */}
            <Link to='/signup' title="Sign Up" className="text-center font-medium text-xs md:text-sm text-white/95 h-fit min-w-max px-2.5 py-1 md:px-3 md:py-1.5 border-2 border-primary bg-primary rounded-full">
                Sign Up
            </Link>

        </>
    )
}



export function NavMenuItemList () {
    return (

        <ul className="flex flex-col w-full h-full gap-2 border border-muted/15 p-2 rounded-lg overflow-auto">
            {navItems.map((item, index) => (
                <li key={index} className="w-full">
                    <Link to={item.path} className="flex flex-col gap-1 w-full h-full p-2 border-b border-muted/15">
                        <div className="flex content-center gap-2">
                            {/* Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>
                            {/* Label */}
                            <h3 className="font-medium text-sm"> {item.label} </h3>
                        </div>

                        {/* Context */}
                        <div className="w-full">
                            <p className="text-2xs"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus culpa  </p>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export function NavActions () {

    const [chatOpen, setChatOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [navMenuOpen, setNavMenuOpen] = useState(false);

    return (

        <>
            <div className="flex items-center gap-2 md:gap-4">

                {userIsAuthenticated
                ? <AuthenticatedUserActins chatOpen={chatOpen} setChatOpen={setChatOpen} notifOpen={notifOpen} setNotifOpen={setNotifOpen}  />
                : <AnonymousUserActins/>}

                {/* Menu Trigger */}
                <button type="button" title="Menu" className="md:hidden content-center p-2" onClick={() => setNavMenuOpen(!navMenuOpen)}>
                    { ICONS.menu({className:'size-5'}) }
                </button>
            </div>

            {/* Chats Menu Card Overlay */}
            {chatOpen &&
                <MenuCard title={'Chats'} open={chatOpen} setOpen={setChatOpen}>
                    {/* Menu items */}
                    <NavMenuItemList/>
                </MenuCard>
            }


            {/* Notifications Menu Card Overlay */}
            {notifOpen &&
                <MenuCard title={'Notifications'} open={notifOpen} setOpen={setNotifOpen}>
                    {/* Menu items */}
                    <NavMenuItemList/>
                </MenuCard>
            }


            {/* Mobile Nav Menu Card Overlay */}
            {navMenuOpen &&
                <MenuCard title={'Menu'} open={navMenuOpen} setOpen={setNavMenuOpen}>
                    {/* Nav Menu items */}
                    <NavMenuItemList/>
                </MenuCard>
            }

        </>
    )
}

export function NavBar () {

    return (

        <div className="navbar-height content-container flex justify-between gap-2 md:gap-4 w-full ">
            <NavLogo/>
            <div className="flex items-center md:w-full w-fit">
                <NavLinks/>
                <NavActions/>
            </div>
        </div>


    )
}




