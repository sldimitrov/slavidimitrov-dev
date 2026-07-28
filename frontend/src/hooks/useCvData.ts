import { useQueries } from "@tanstack/react-query";
import { getEducation, getExperience, getSkills } from "../api/cv";
import type { EducationItem, SkillItem, WorkExperienceItem } from "../types";

export function useCvData() {
  const results = useQueries({
    queries: [
      { queryKey: ["cv", "education"], queryFn: getEducation },
      { queryKey: ["cv", "experience"], queryFn: getExperience },
      { queryKey: ["cv", "skills"], queryFn: getSkills },
    ],
  });

  const [educationResult, experienceResult, skillsResult] = results;

  return {
    education: (educationResult.data ?? []) as EducationItem[],
    experience: (experienceResult.data ?? []) as WorkExperienceItem[],
    skills: (skillsResult.data ?? []) as SkillItem[],
    isLoading: results.some((result) => result.isLoading),
    isError: results.some((result) => result.isError),
    error: results.find((result) => result.isError)?.error,
    refetch: () => results.forEach((result) => result.refetch()),
  };
}
