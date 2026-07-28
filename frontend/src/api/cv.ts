import { apiClient } from "./client";
import type { EducationItem, SkillItem, WorkExperienceItem } from "../types";

export async function getEducation(): Promise<EducationItem[]> {
  const { data } = await apiClient.get<EducationItem[]>("/cv/education/");
  return data;
}

export async function getExperience(): Promise<WorkExperienceItem[]> {
  const { data } = await apiClient.get<WorkExperienceItem[]>("/cv/experience/");
  return data;
}

export async function getSkills(): Promise<SkillItem[]> {
  const { data } = await apiClient.get<SkillItem[]>("/cv/skills/");
  return data;
}
