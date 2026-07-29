import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { Project } from "../../types";
import { TagChip } from "./TagChip";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card sx={{ position: "relative" }}>
      {project.featured ? (
        <Chip
          label="Featured"
          size="small"
          color="secondary"
          sx={{ position: "absolute", top: 12, right: 12, zIndex: 1 }}
        />
      ) : null}
      <CardActionArea
        component={RouterLink}
        to={`/projects/${project.slug}`}
        sx={{ height: "100%", alignItems: "flex-start" }}
      >
        {project.cover_image ? (
          <CardMedia
            component="img"
            image={project.cover_image}
            alt={project.title}
            sx={{ aspectRatio: "16 / 9", objectFit: "cover" }}
          />
        ) : null}
        <CardContent sx={{ width: "100%" }}>
          <Stack spacing={1.5}>
            <Typography variant="h5" component="h3">
              {project.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {project.description}
            </Typography>
            {project.tags.length > 0 ? (
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {project.tags.map((tag) => (
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
