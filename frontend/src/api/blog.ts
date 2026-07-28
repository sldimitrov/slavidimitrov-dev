import { apiClient } from "./client";
import type { BlogPostsQuery, PaginatedResponse, Post } from "../types";

export async function getPosts(
  query: BlogPostsQuery = {},
): Promise<PaginatedResponse<Post>> {
  const { data } = await apiClient.get<PaginatedResponse<Post>>(
    "/blog/posts/",
    { params: query },
  );
  return data;
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const { data } = await apiClient.get<Post>(`/blog/posts/${slug}/`);
  return data;
}
