
import { EmailInput, Input, PhoneInput } from "@/components/ui/Input";
import { images, SocialMediaPhoneFields, SocialMediaUrlFields } from "@/constants";
import { companyNameTitle } from "@/constants/company";
import { ICONS } from "@/icons";
import { useState } from "react";


export default function Settings () {

    const [dataSaved, setDataSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    // TODO: Browser alert the user from leaving the page when loading status is true.

    return (
        <main>
            <section className="h-hero min-h-hero content-container relative w-full">

                    <div className="flex max-md:flex-col md:justify-between md:items-end gap-2 w-full h-fit mb-4">
                        <h1 className="font-semibold text-lg md:text-2xl"> Settings & Contacts </h1>

                        {loading
                        ? <span className="font-medium text-xs text-foreground/75"> Saving Data... </span>
                        :
                            dataSaved
                            ? <span className="font-medium text-xs text-success"> ✓ Data-Saved </span>
                            : <span className="font-medium text-xs text-muted/75"> Auto-Save </span>
                        }

                    </div>
                    <div className="flex max-md:flex-col gap-4 w-full">
                        <div className="flex flex-col gap-2 md:gap-4 w-full h-full md:p-4 md:bg-surface rounded-xl">

                            <form action="." method="POST" encType="multipart/form-data" className="flex flex-col gap-4">

                                <div className="flex flex-col items-center gap-2 w-full max-md:p-4 max-md:bg-surface rounded-xl">
                                    <div className="group/item relative w-fit h-25 md:h-40 p-1 md:p-2 aspect-square border border-muted/15 rounded-full bg-background overflow-hidden">
                                        <label htmlFor="fileToUpload" className="absolute hidden group-hover/item:flex group-active/item:flex items-center justify-center top-0 left-0 w-full h-full bg-muted/35 cursor-pointer">
                                        <ICONS.arrowUpTray className="text-white size-8" />
                                        </label>
                                        <input type="file" name="fileToUpload" id="fileToUpload" className="hidden" />
                                        <img src={images[7]} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="font-semibold text-foreground"> {companyNameTitle} </span>
                                    </div>
                                </div>


                                <div className="flex flex-col gap-4 h-full md:bg-surface rounded-xl">

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email-fields-container" className="font-medium text-xs text-muted mx-1"> Email Addresses</label>
                                        <div id="email-fields-container" className="flex flex-col gap-2">
                                            <EmailInput id="primary-email" placeholder="hello@example.com" />
                                            <EmailInput id="admin-email" placeholder="admin@example.com" />
                                            <EmailInput id="support-email" placeholder="support@example.com" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email-fields-container" className="font-medium text-xs text-muted mx-1"> Phone numbers </label>
                                        <div id="phone-fields-container" className="flex flex-col gap-2">
                                            <PhoneInput id="primary-phone" placeholder="+213123456789" />
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>

                        <div className="flex flex-col gap-2 md:gap-4 w-full md:p-4 md:bg-surface rounded-xl">
                            <h2 className="font-medium text-sm"> Social Media </h2>

                            <form action="." method="POST" className="flex flex-col gap-4">

                                <div className="flex flex-col gap-2">
                                    {SocialMediaUrlFields.map((social)=>(
                                        <Input id={social.id} type="url" placeholder={social.placeholder} className="content-center pl-10">
                                            <span className="absolute px-1.5 left-0.5 md:left-1"> {social.icon} </span>
                                        </Input>
                                    ))}

                                    {SocialMediaPhoneFields.map((social)=>(
                                        <Input id={social.id} type="tel" placeholder={social.placeholder} className="content-center pl-10">
                                            <span className="absolute px-1.5 left-0.5 md:left-1"> {social.icon} </span>
                                        </Input>
                                    ))}
                                </div>
                            </form>
                        </div>
                    </div>

            </section>
        </main>
    )
}
