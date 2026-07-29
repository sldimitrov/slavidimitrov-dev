import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../api/projects";
import type { ProjectsQuery } from "../types";

export function useProjects(query: ProjectsQuery = {}) {
  return useQuery({
    queryKey: ["projects", query],
    queryFn: () => getProjects(query),
  });
}
