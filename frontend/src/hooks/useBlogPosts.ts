import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/blog";
import type { BlogPostsQuery } from "../types";

export function useBlogPosts(query: BlogPostsQuery = {}) {
  return useQuery({
    queryKey: ["posts", query],
    queryFn: () => getPosts(query),
  });
}
