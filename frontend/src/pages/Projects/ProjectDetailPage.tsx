import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useProject } from "../../hooks/useProject";
import { LoadingState } from "../../components/shared/LoadingState";
import { ErrorState } from "../../components/shared/ErrorState";
import { SeoMeta } from "../../components/shared/SeoMeta";
import { MarkdownRenderer } from "../../components/shared/MarkdownRenderer";
import { TagChip } from "../../components/shared/TagChip";

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const query = useProject(slug);

  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 8 } }}>
      <Button
        component={RouterLink}
        to="/projects"
        startIcon={<ArrowBackRoundedIcon />}
        sx={{ mb: 4 }}
      >
        Back to projects
      </Button>

      {query.isLoading ? <LoadingState /> : null}
      {query.isError ? <ErrorState onRetry={() => query.refetch()} /> : null}

      {query.data ? (
        <>
          <SeoMeta
            title={query.data.title}
            description={query.data.description}
          />
          <Stack spacing={2} sx={{ mb: 4 }}>
            <Typography variant="h1">{query.data.title}</Typography>
            <Typography variant="body1" color="text.secondary">
              {query.data.description}
            </Typography>

            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              {query.data.repo_url ? (
                <Button
                  href={query.data.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  startIcon={<GitHubIcon />}
                >
                  Source
                </Button>
              ) : null}
              {query.data.live_url ? (
                <Button
                  href={query.data.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  startIcon={<OpenInNewRoundedIcon />}
                >
                  Live demo
                </Button>
              ) : null}
            </Stack>

            {query.data.tags.length > 0 ? (
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {query.data.tags.map((tag) => (
                  <TagChip
                    key={tag.id}
                    tag={tag}
                    to={`/projects?tag=${tag.slug}`}
                  />
                ))}
              </Stack>
            ) : null}
          </Stack>

          {query.data.images.length > 0 ? (
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {query.data.images.map((image) => (
                <Grid key={image.id} size={{ xs: 12, sm: 6 }}>
                  <Box
                    component="img"
                    src={image.image}
                    alt={image.alt_text ?? query.data.title}
                    sx={{
                      width: "100%",
                      borderRadius: 1.5,
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                      aspectRatio: "16 / 10",
                      objectFit: "cover",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          ) : null}

          <MarkdownRenderer content={query.data.content} />
        </>
      ) : null}
    </Container>
  );
}
