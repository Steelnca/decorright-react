

import Spinner from '@/components/common/Spinner';
import { ICONS } from '@/icons';
import { SpaceTypesService } from '@/services/space-types.service';
import { useEffect, useState } from 'react';

export default function ServiceSpaceList() {

    const [spaces, setSpaces] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const data = await SpaceTypesService.getAll();
                setSpaces(data || []);
            } catch (err) {
                console.error("Failed to fetch showcase projects:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center p-8">
                <Spinner status={loading} />
            </div>
        )
    };

    if (spaces.length === 0) {
        return (
            <div className="text-center p-8 text-muted">No spaces was made yet.</div>
        )
    }

    return (
        <main>
            <section className="h-hero min-h-hero relative flex flex-col w-full md:pt-8 mb-40">
                <div className="relative flex flex-col gap-8 h-full">
                    <h1 className="font-semibold text-lg md:text-2xl"> Service List </h1>
                    {/* Service content goes here */}

                    <ul className="flex flex-col gap-4 w-full">

                        {spaces.map((space, index) => (

                            <li key={space.id} id={space.id} className="flex items-center gap-6 w-full h-20 p-4 border border-muted/25 shadow-xs bg-surface rounded-lg">
                                <div>
                                    <span className="font-medium text-lg"> {index} </span>
                                    <span className="font-medium"> {space.display_name_en} </span>
                                    <span> {space.created_at} </span>
                                </div>
                                <button type="button"> <ICONS.chevronUpDown className="size-6 text-muted/75"/> </button>
                            </li>
                        ))}
                    </ul>

                </div>
            </section>
        </main>
    )
}