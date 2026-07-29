import { useMemo } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useSearchParams } from "react-router-dom";
import { useProjects } from "../../hooks/useProjects";
import { ProjectCard } from "../../components/shared/ProjectCard";
import { TagChip } from "../../components/shared/TagChip";
import { LoadingState } from "../../components/shared/LoadingState";
import { ErrorState } from "../../components/shared/ErrorState";
import { SeoMeta } from "../../components/shared/SeoMeta";
import type { Tag } from "../../types";

export default function ProjectListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get("tag") ?? undefined;

  const query = useProjects({ tag: activeTag });

  const projects = useMemo(() => {
    const results = query.data?.results ?? [];
    return [...results].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [query.data]);

  const availableTags = useMemo(() => {
    const tagMap = new Map<string, Tag>();
    projects.forEach((project) => {
      project.tags.forEach((tag) => tagMap.set(tag.slug, tag));
    });
    return Array.from(tagMap.values());
  }, [projects]);

  function handleTagClick(slug: string) {
    const next = new URLSearchParams(searchParams);
    if (activeTag === slug) {
      next.delete("tag");
    } else {
      next.set("tag", slug);
    }
    setSearchParams(next);
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <SeoMeta
        title="Projects"
        description="A selection of projects I've built, from side projects to production apps."
      />

      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography variant="h2">Projects</Typography>
        <Typography variant="body1" color="text.secondary">
          Things I've built, roughly ordered by how proud I am of them.
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

      {query.isSuccess && projects.length === 0 ? (
        <Typography color="text.secondary">
          No projects found{activeTag ? " for this tag" : ""}.
        </Typography>
      ) : null}

      {projects.length > 0 ? (
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      ) : null}
    </Container>
  );
}
