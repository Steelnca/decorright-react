
import { SCTALink } from "@/components/ui/CTA";
import ProjectUpdateForm from "@/components/layout/admin/projects/ProjectUpdate";
import { PATHS } from "@/routers/Paths";

export default function AdminProjectUpdate() {
    return (
        <div className="flex flex-col gap-14 py-5 w-full">
            {/* Header Section */}
            <header className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                    <h1 className="font-semibold text-xl md:text-2xl text-heading"> Edit Project </h1>
                    <p className="text-sm font-medium text-muted/65">
                        Modify the details and images of your project. All changes are reflected in the public showcase.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <SCTALink to={PATHS.ADMIN.PROJECT_LIST} className="py-2.5 px-6"> Back to Projects </SCTALink>
                </div>
            </header>

            {/* Edit Form */}
            <ProjectUpdateForm />
        </div>
    );
}
