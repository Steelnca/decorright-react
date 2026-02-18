import { useEffect } from "react";

export function useProjectView(projectId?: string) {
  useEffect(() => {
    if (!projectId) return;

    const key = `viewed:${projectId}`;
    const last = localStorage.getItem(key);

    // prevent repeat counts (1 hour)
    if (last && Date.now() - Number(last) < 3600_000) return;

    localStorage.setItem(key, String(Date.now()));

    (async () => {
      // const { data: userData } = await supabase.auth.getUser();

      // await supabase.from("project_views").insert({ // "project_views" table needed. fields:( id, project_id, user_id, created_at )
      //   project_id: projectId,
      //   user_id: userData?.user?.id ?? null,
      // });
    })();
  }, [projectId]);
}
