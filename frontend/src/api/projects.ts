import { apiClient } from "./client";
import type { PaginatedResponse, Project, ProjectsQuery } from "../types";

export async function getProjects(
  query: ProjectsQuery = {},
): Promise<PaginatedResponse<Project>> {
  const { data } = await apiClient.get<PaginatedResponse<Project>>(
    "/projects/",
    { params: query },
  );
  return data;
}

export async function getProjectBySlug(slug: string): Promise<Project> {
  const { data } = await apiClient.get<Project>(`/projects/${slug}/`);
  return data;
}
