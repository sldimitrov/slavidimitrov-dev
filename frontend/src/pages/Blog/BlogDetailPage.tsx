import { Button, Container, Stack, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useBlogPost } from "../../hooks/useBlogPost";
import { LoadingState } from "../../components/shared/LoadingState";
import { ErrorState } from "../../components/shared/ErrorState";
import { SeoMeta } from "../../components/shared/SeoMeta";
import { MarkdownRenderer } from "../../components/shared/MarkdownRenderer";
import { TagChip } from "../../components/shared/TagChip";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const query = useBlogPost(slug);

  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 8 } }}>
      <Button
        component={RouterLink}
        to="/blog"
        startIcon={<ArrowBackRoundedIcon />}
        sx={{ mb: 4 }}
      >
        Back to blog
      </Button>

      {query.isLoading ? <LoadingState /> : null}
      {query.isError ? <ErrorState onRetry={() => query.refetch()} /> : null}

      {query.data ? (
        <>
          <SeoMeta title={query.data.title} description={query.data.excerpt} />
          <Stack spacing={2} sx={{ mb: 4 }}>
            <Typography
              variant="overline"
              color="text.secondary"
            >{`${formatDate(query.data.published_at)} · ${query.data.reading_time} min read`}</Typography>
            <Typography variant="h1">{query.data.title}</Typography>
            {query.data.tags.length > 0 ? (
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {query.data.tags.map((tag) => (
                  <TagChip
                    key={tag.id}
                    tag={tag}
                    to={`/blog?tag=${tag.slug}`}
                  />
                ))}
              </Stack>
            ) : null}
          </Stack>
          <MarkdownRenderer content={query.data.content} />
        </>
      ) : null}
    </Container>
  );
}
