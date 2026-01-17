
import { images } from "../../constants";
import { ICONS } from "../../icons";
import { EmailInput, Input, PhoneInput } from "../ui/Input";
import { PButton, SButton } from "../ui/Button";
import { SCTALink } from "../ui/CTA";
import { useEffect, useState } from "react";
import type { Database } from "@/types/database.types";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthProvider";
import { PATHS } from "@/routers/Paths";
import { Navigate, useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";

type ProfileData = Database['public']['Tables']['profiles']['Row'];

export function ProfileEdit(){
    const { user, loading: authLoading } = useAuth()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;
            setLoading(true);
            setError(null);

            console.log("Fetching profile for user:", user.id);

            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (error) throw error;
                setProfile(data);

                // populate form fields with profile defaults
                const fullName = profile?.full_name ?? '';
                const [first = '', ...rest] = fullName.split(' ');
                setFirstName(first);
                setLastName(rest.join(' '));
                setPhone(profile?.phone ?? '');

            } catch (err) {
                console.error("Error fetching profile:", err);
            } finally {
                setLoading(false);
            }
        };

        if (!authLoading) {
            fetchProfile();
        }
    }, [user, authLoading, profile?.full_name, profile?.phone]);

    if (authLoading || loading) {
        return (
            <div className="flex items-center justify-center h-hero">
                <Spinner />
            </div>
        );
    }

    if (!user) return <Navigate to={PATHS.LOGIN} replace />;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!firstName || !lastName ) {
            setError("First and Last name are required.")
            return
        }
    }

    const handleCancel = () => {
        const navigate = useNavigate()
        navigate(PATHS.CLIENT.PROFILE);
    }

    return (
        <section className="h-hero min-h-hero max-w-180 mx-auto relative flex flex-col items-center justify-center w-full mt-8">

            <div className="absolute right-full w-full h-[calc(100svh-24rem)] md:h-[calc(100svh-22rem)] border border-muted/20 rounded-4xl mask-l-to-transparent mask-l-to-30% overflow-hidden"></div>

            <div className="relative w-full h-full px-4 py-4 md:px-8 md:py-8">
                <div className="absolute top-0 left-0 w-full h-full border border-muted/15 rounded-4xl bg-surface/75 -z-10 mask-b-to-transparent mask-b-to-100%"></div>
                <div className="absolute top-20 md:top-35 left-0 w-full border-b border-b-muted/15 -z-10"></div>

                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8 max-md:flex-col" encType="multipart/form-data">

                    {/* Profile Image */}
                    <div className="group/item relative w-fit h-25 md:h-40 p-1 md:p-2 aspect-square border border-muted/15 rounded-full bg-background overflow-hidden">
                        {/* <label htmlFor="fileToUpload" className="absolute hidden group-hover/item:flex group-active/item:flex items-center justify-center top-0 left-0 w-full h-full bg-muted/35 cursor-pointer"> {ICONS.arrowUpTray({className:'text-white size-8'})} </label>
                        <input type="file" name="fileToUpload" id="fileToUpload" className="hidden" /> */}
                        <img src={images[7]} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                    </div>


                    <div className="flex flex-col w-full gap-3 md:gap-4">

                        <div className="flex max-xs:flex-col md:flex-col lg:flex-row gap-3 md:gap-4 w-full">
                            <Input type="text" placeholder="First name" value={firstName} onChange={(e: any) => setFirstName(e.target.value)} className={'bg-emphasis/75'} />
                            <Input type="text" placeholder="Last name" value={lastName} onChange={(e: any) => setLastName(e.target.value)} className={'bg-emphasis/75'}  />
                        </div>

                        <EmailInput className={'bg-muted/5'} readOnly={true} defaultValue={user.email} />

                        <PhoneInput className={'bg-emphasis/75'} value={phone} onChange={(e: any) => setPhone(e.target.value)} />

                        {/* CTA */}
                        <div className="flex max-xs:flex-col md:flex-row gap-4 w-full md:w-fit mt-4">
                            <PButton type="submit" className="w-full"> Save Changes </PButton>
                            <SButton type="button" onClick={handleCancel} className="w-full"> Cancel </SButton>
                        </div>

                    </div>



                </form>

            </div>

            <div className="absolute left-full w-full h-[calc(100svh-24rem)] md:h-[calc(100svh-22rem)] border border-muted/20 rounded-4xl mask-r-to-transparent mask-r-to-30% overflow-hidden"></div>
        </section>
    )
}