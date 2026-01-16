import { Link } from "react-router-dom";
import { images } from "../../constants";
import { ICONS } from "../../icons";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/database.types";

type ProfileData = Database['public']['Tables']['profiles']['Row'];

export function Profile() {
    const { user, loading: authLoading } = useAuth();
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;

            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (error) throw error;
                setProfile(data);
            } catch (err) {
                console.error("Error fetching profile:", err);
            } finally {
                setLoading(false);
            }
        };

        if (!authLoading) {
            fetchProfile();
        }
    }, [user, authLoading]);

    if (authLoading || loading) {
        return (
            <div className="flex items-center justify-center h-hero">
                <p>Loading profile...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center h-hero">
                <p>Please log in to view your profile.</p>
            </div>
        );
    }

    const joinDate = profile?.created_at
        ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : 'N/A';

    return (
        <section className="h-hero min-h-hero max-w-180 mx-auto relative flex flex-col items-center justify-center w-full mt-8">

            <div className="absolute right-full w-full h-[calc(100svh-24rem)] md:h-[calc(100svh-22rem)] border border-muted/20 rounded-4xl mask-l-to-transparent mask-l-to-30% overflow-hidden"></div>

            <div className="relative w-full h-full px-4 py-4 md:px-8 md:py-8">
                <div className="absolute top-0 left-0 w-full h-full border border-muted/15 rounded-4xl bg-surface/75 -z-10 mask-b-to-transparent mask-b-to-100%"></div>
                <div className="absolute top-20 md:top-35 left-0 w-full border-b border-b-muted/15 -z-10"></div>

                <div className="flex flex-col gap-8 max-md:flex-col">

                    <div className="flex flex-col items-center gap-2">
                        {/* Profile Image */}
                        <div className="w-fit h-25 md:h-40 p-1 md:p-2 aspect-square border border-muted/15 rounded-full bg-background overflow-hidden">
                            <img src={images[7]} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                        </div>

                        <div className="flex flex-col text-center">
                            <h4 className="font-semibold text-lg"> {profile?.full_name || 'Anonymous'} </h4>
                            <p className="text-2xs md:text-xs"> Joined at {joinDate} </p>
                        </div>
                    </div>

                    {/* User Information */}

                    <div className="space-y-8">

                        <div className="flex items-center gap-4">
                            <h3 className="font-semibold text-2xs md:text-xs text-foreground/75 min-w-max"> Personal Information </h3>
                            <hr className="w-full border-0 border-b border-muted/15" />
                            <Link to={'/profile-edit'} className="p-2 border border-muted/15 bg-surface/75 rounded-lg"> {ICONS.pencilSquare({})} </Link>
                        </div>
                        <ul className="flex flex-col gap-8 w-full">

                            <li className="flex w-full gap-4">
                                <div className="h-full aspect-square p-2 border border-muted/15 bg-surface rounded-lg">
                                    {ICONS.envelope({ className: "size-6" })}
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="email-info" className="font-medium text-xs"> Email </label>
                                    <p id="email-info" className="text-xs text-foreground"> {user.email} </p>
                                </div>
                            </li>

                            <li className="flex w-full gap-4">
                                <div className="h-full aspect-square p-2 border border-muted/15 bg-surface rounded-lg">
                                    {ICONS.phone({ className: "size-6" })}
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="phone-info" className="font-medium text-xs"> Phone </label>
                                    <p id="phone-info" className="text-xs text-foreground"> {profile?.phone || 'Not provided'} </p>
                                </div>
                            </li>

                            <li className="flex w-full gap-4">
                                <div className="h-full aspect-square p-2 border border-muted/15 bg-surface rounded-lg">
                                    {ICONS.userCircle({ className: "size-6" })}
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="role-info" className="font-medium text-xs"> Role </label>
                                    <p id="role-info" className="text-xs text-foreground capitalize"> {profile?.role || 'Customer'} </p>
                                </div>
                            </li>

                        </ul>
                    </div>

                </div>

            </div>

            <div className="absolute left-full w-full h-[calc(100svh-24rem)] md:h-[calc(100svh-22rem)] border border-muted/20 rounded-4xl mask-r-to-transparent mask-r-to-30% overflow-hidden"></div>
        </section>
    );
}