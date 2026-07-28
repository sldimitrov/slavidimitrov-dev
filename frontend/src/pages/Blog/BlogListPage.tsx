import { useMemo } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useSearchParams } from "react-router-dom";
import { useBlogPosts } from "../../hooks/useBlogPosts";
import { PostCard } from "../../components/shared/PostCard";
import { TagChip } from "../../components/shared/TagChip";
import { LoadingState } from "../../components/shared/LoadingState";
import { ErrorState } from "../../components/shared/ErrorState";
import { SeoMeta } from "../../components/shared/SeoMeta";
import type { Tag } from "../../types";

export default function BlogListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get("tag") ?? undefined;
  const page = Number(searchParams.get("page") ?? "1");

  const query = useBlogPosts({ tag: activeTag, page });
  const posts = useMemo(() => query.data?.results ?? [], [query.data]);

  const availableTags = useMemo(() => {
    const tagMap = new Map<string, Tag>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => tagMap.set(tag.slug, tag));
    });
    return Array.from(tagMap.values());
  }, [posts]);

  function handleTagClick(slug: string) {
    const next = new URLSearchParams(searchParams);
    if (activeTag === slug) {
      next.delete("tag");
    } else {
      next.set("tag", slug);
    }
    next.delete("page");
    setSearchParams(next);
  }

  function goToPage(nextPage: number) {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(nextPage));
    setSearchParams(next);
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <SeoMeta
        title="Blog"
        description="Writing on software engineering, web development, and things I'm learning."
      />

      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography variant="h2">Blog</Typography>
        <Typography variant="body1" color="text.secondary">
          Notes on the things I build and learn.
        </Typography>
      </Stack>

      {availableTags.length > 0 ? (
        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          useFlexGap
          sx={{ mb: 4 }}
        >
          {availableTags.map((tag) => (
            <Box
              key={tag.id}
              onClick={() => handleTagClick(tag.slug)}
              sx={{ cursor: "pointer" }}
            >
              <TagChip tag={tag} selected={activeTag === tag.slug} />
            </Box>
          ))}
        </Stack>
      ) : null}

      {query.isLoading ? <LoadingState /> : null}
      {query.isError ? <ErrorState onRetry={() => query.refetch()} /> : null}

      {query.isSuccess && posts.length === 0 ? (
        <Typography color="text.secondary">
          No posts found{activeTag ? " for this tag" : ""}.
        </Typography>
      ) : null}

      {posts.length > 0 ? (
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid key={post.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid>
      ) : null}

      {query.data && (query.data.previous || query.data.next) ? (
        <Stack
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ mt: 5 }}
        >
          <Button
            startIcon={<ArrowBackRoundedIcon />}
            disabled={!query.data.previous}
            onClick={() => goToPage(Math.max(1, page - 1))}
          >
            Previous
          </Button>
          <Button
            endIcon={<ArrowForwardRoundedIcon />}
            disabled={!query.data.next}
            onClick={() => goToPage(page + 1)}
          >
            Next
          </Button>
        </Stack>
      ) : null}
    </Container>
  );
}
