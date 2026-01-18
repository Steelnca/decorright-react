
import React from 'react';
import { Link } from 'react-router-dom';
import type { ClientContact as Contact } from "@/types/chat";



export default function ChatHeader({
    selected,
    isAdmin = false,
    backTo,
    rightActions,
}: {
    selected: Contact | null;
    isAdmin?: boolean;
    backTo?: string; // optional route for the back button
    rightActions?: React.ReactNode;
}) {
    const profile = selected?.service_requests?.profiles;
    const requestCode = selected?.service_requests?.request_code;

    return (
        <div className="flex items-center gap-3 w-full p-2 pb-4 border-b border-muted/15">
            <nav className="w-fit h-fit">
                {backTo ? (
                    <Link to={backTo} className="flex p-2 border border-muted/15 bg-surface/25 rounded-full">
                        {/** reuse your ICONS.arrowLeft in the parent scope when importing this file */}
                        {typeof window !== 'undefined' ? (null as any) : null}
                    </Link>
                ) : null}
            </nav>


            <div className="flex items-center gap-2 w-full h-full">
                {/* Avatar */}
                <div className="w-12 aspect-square rounded-full border border-muted/45 overflow-hidden">
                    <img
                        src="/user.png"
                        alt="User Profile"
                        className="w-full h-full object-cover rounded-full"
                    />
                </div>

                {/* Context */}
                <div className="flex flex-col w-full h-fit">
                    <h3 className="font-semibold text-sm">
                        {profile?.full_name || 'Chat Room'}
                        {isAdmin && requestCode ? <span className="text-3xs text-primary ml-2 uppercase">({requestCode})</span> : null}
                    </h3>
                    <span className="text-2xs text-muted">
                        {isAdmin ? (
                            <div className="flex items-center gap-1">
                                <span>Client Profile</span>
                                {selected?.request_id && (
                                    <Link
                                        to={`/admin/request-service/list/`}
                                        className="text-primary hover:underline ml-1 font-medium"
                                    >
                                        • Manage Request
                                    </Link>
                                )}
                            </div>
                        ) : (selected?.service_requests?.status || 'Active')}
                    </span>
                </div>


                {/* Right actions slot */}
                <div className="ml-auto flex items-center gap-2">{rightActions}</div>
            </div>
        </div>
    );
}