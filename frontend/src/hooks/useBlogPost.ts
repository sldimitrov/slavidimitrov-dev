import { useQuery } from "@tanstack/react-query";
import { getPostBySlug } from "../api/blog";

export function useBlogPost(slug: string | undefined) {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: () => getPostBySlug(slug as string),
    enabled: Boolean(slug),
  });
}
