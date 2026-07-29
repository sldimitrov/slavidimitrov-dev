import { useQuery } from "@tanstack/react-query";
import { getProjectBySlug } from "../api/projects";

export function useProject(slug: string | undefined) {
  return useQuery({
    queryKey: ["project", slug],
    queryFn: () => getProjectBySlug(slug as string),
    enabled: Boolean(slug),
  });
}
