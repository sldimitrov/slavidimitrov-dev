import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { Post } from "../../types";
import { TagChip } from "./TagChip";

interface PostCardProps {
  post: Post;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card>
      <CardActionArea
        component={RouterLink}
        to={`/blog/${post.slug}`}
        sx={{ height: "100%", alignItems: "flex-start" }}
      >
        <CardContent sx={{ width: "100%" }}>
          <Stack spacing={1.5}>
            <Typography
              variant="overline"
              color="text.secondary"
            >{`${formatDate(post.published_at)} · ${post.reading_time} min read`}</Typography>
            <Typography variant="h5" component="h3">
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.excerpt}
            </Typography>
            {post.tags.length > 0 ? (
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {post.tags.map((tag) => (
                  <TagChip key={tag.id} tag={tag} />
                ))}
              </Stack>
            ) : null}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
