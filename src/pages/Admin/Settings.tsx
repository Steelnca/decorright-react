
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
            <section className="content-container relative flex flex-col w-full h-full gap-6">
                <div className="flex flex-col gap-8 md:gap-12 w-full h-full max-md:flex-col max-md:py-6 md:px-4">
                    <div className="flex flex-col max-md:items-center gap-8 w-full">
                        <div className="absolute top-45 md:top-50 left-0 w-full border-b border-b-muted/15 -z-10"></div>

                        {/* {loading
                        ? <span className="font-medium text-xs text-foreground/75"> Saving Data... </span>
                        :
                            dataSaved
                            ? <span className="font-medium text-xs text-success"> ✓ Data-Saved </span>
                            : <span className="font-medium text-xs text-muted/75"> Auto-Save </span>
                        } */}
                        <form encType="multipart/form-data" className="flex max-md:flex-col items-center gap-4">

                            <div className="group/item relative w-fit h-30 md:h-35 p-1 md:p-2 aspect-square border border-muted/15 rounded-full bg-background overflow-hidden">
                                <label htmlFor="fileToUpload" className="absolute hidden group-hover/item:flex group-active/item:flex items-center justify-center top-0 left-0 w-full h-full bg-muted/35 cursor-pointer">
                                <ICONS.arrowUpTray className="text-white size-8" />
                                </label>
                                <input type="file" name="fileToUpload" id="fileToUpload" className="hidden" />
                                <img src={images[7]} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                            </div>

                            <div className="flex flex-col max-md:items-center max-md:text-center gap-0.5 md:gap-1">
                                <h4 className="font-semibold text-lg md:text-2xl"> {companyNameTitle} </h4>
                                <p className="text-2xs md:text-xs"> Company Logo </p>
                            </div>

                        </form>

                        <div className="flex flex-col gap-4 w-full">
                            <p className="text-xs text-muted"> Manage your company's contact information and social media links. </p>
                        </div>


                    </div>
                    <div className="flex flex-col gap-8 max-md:w-full w-3/5">
                        <div className="flex flex-col gap-2 md:gap-4 w-full h-full  rounded-xl">
                            <h2 className="font-medium text-sm"> Contact Information </h2>
                            <form className="flex flex-col gap-4">


                                <div className="flex flex-col gap-4 h-full rounded-xl">

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email-fields-container" className="text-xs text-muted sr-only"> Email Address</label>
                                        <div id="email-fields-container" className="flex flex-col gap-2">
                                            <EmailInput id="email" placeholder="hello@example.com" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email-fields-container" className="text-xs text-muted sr-only"> Phone number </label>
                                        <div id="phone-fields-container" className="flex flex-col gap-2">
                                            <PhoneInput id="primary-phone" placeholder="+213123456789" />
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>

                        <div className="flex flex-col gap-2 md:gap-4 w-full rounded-xl">
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
                </div>

            </section>
        </main>
    )
}
