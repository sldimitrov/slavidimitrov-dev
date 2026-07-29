import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link as RouterLink } from "react-router-dom";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useProjects } from "../../hooks/useProjects";
import { useBlogPosts } from "../../hooks/useBlogPosts";
import { ProjectCard } from "../../components/shared/ProjectCard";
import { PostCard } from "../../components/shared/PostCard";
import { LoadingState } from "../../components/shared/LoadingState";
import { ErrorState } from "../../components/shared/ErrorState";
import { SeoMeta } from "../../components/shared/SeoMeta";

export default function HomePage() {
  const projectsQuery = useProjects({ featured: true });
  const postsQuery = useBlogPosts();

  const featuredProjects = (projectsQuery.data?.results ?? []).slice(0, 3);
  const latestPosts = (postsQuery.data?.results ?? []).slice(0, 3);

  return (
    <>
      <SeoMeta
        title="Home"
        description="Slavi Dimitrov — software engineer. Projects, writing, and background."
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Stack spacing={3}>
            <Typography variant="overline" color="primary.main">
              Software Engineer
            </Typography>
            <Typography variant="h1">Hi, I'm Slavi Dimitrov.</Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 560 }}
            >
              I build web applications end to end — from Django APIs to React
              front ends. This site is where I share projects I've worked on and
              things I've learned along the way.
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              <Button
                component={RouterLink}
                to="/cv"
                variant="contained"
                size="large"
              >
                View CV
              </Button>
              <Button
                component={RouterLink}
                to="/contact"
                variant="outlined"
                size="large"
              >
                Get in touch
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 10 } }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 3 }}
        >
          <Typography variant="h3">Featured projects</Typography>
          <Button
            component={RouterLink}
            to="/projects"
            endIcon={<ArrowForwardRoundedIcon />}
          >
            View all
          </Button>
        </Stack>

        {projectsQuery.isLoading ? <LoadingState minHeight="20vh" /> : null}
        {projectsQuery.isError ? (
          <ErrorState
            minHeight="20vh"
            onRetry={() => projectsQuery.refetch()}
          />
        ) : null}
        {projectsQuery.isSuccess && featuredProjects.length === 0 ? (
          <Typography color="text.secondary">
            No featured projects yet — check back soon.
          </Typography>
        ) : null}
        {featuredProjects.length > 0 ? (
          <Grid container spacing={3}>
            {featuredProjects.map((project) => (
              <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <ProjectCard project={project} />
              </Grid>
            ))}
          </Grid>
        ) : null}
      </Container>

      <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 10 } }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 3 }}
        >
          <Typography variant="h3">Latest posts</Typography>
          <Button
            component={RouterLink}
            to="/blog"
            endIcon={<ArrowForwardRoundedIcon />}
          >
            View all
          </Button>
        </Stack>

        {postsQuery.isLoading ? <LoadingState minHeight="20vh" /> : null}
        {postsQuery.isError ? (
          <ErrorState minHeight="20vh" onRetry={() => postsQuery.refetch()} />
        ) : null}
        {postsQuery.isSuccess && latestPosts.length === 0 ? (
          <Typography color="text.secondary">
            No posts published yet — check back soon.
          </Typography>
        ) : null}
        {latestPosts.length > 0 ? (
          <Grid container spacing={3}>
            {latestPosts.map((post) => (
              <Grid key={post.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <PostCard post={post} />
              </Grid>
            ))}
          </Grid>
        ) : null}
      </Container>
    </>
  );
}
