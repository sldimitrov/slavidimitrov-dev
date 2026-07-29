import { useMemo } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import { useCvData } from "../../hooks/useCvData";
import { LoadingState } from "../../components/shared/LoadingState";
import { ErrorState } from "../../components/shared/ErrorState";
import { SeoMeta } from "../../components/shared/SeoMeta";
import type { SkillCategory, SkillItem } from "../../types";

type TimelineEntry =
  | {
      type: "education";
      start: string;
      end: string | null;
      id: number;
      title: string;
      subtitle: string;
      description: string;
    }
  | {
      type: "experience";
      start: string;
      end: string | null;
      id: number;
      title: string;
      subtitle: string;
      description: string;
      achievements: string[];
    };

function formatDate(value: string | null) {
  if (!value) return "Present";
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
  });
}

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  language: "Languages",
  framework: "Frameworks & Libraries",
  tool: "Tools",
  database: "Databases",
  automation: "Automations",
  infrastructure: "Infrastructure",
};

const CATEGORY_ORDER: SkillCategory[] = ["language", "framework", "tool", "database", "automation", "infrastructure"];

function groupSkillsByCategory(skills: SkillItem[]) {
  const groups = new Map<SkillCategory, SkillItem[]>();
  skills.forEach((skill) => {
    const existing = groups.get(skill.category) ?? [];
    existing.push(skill);
    groups.set(skill.category, existing);
  });
  return groups;
}

export default function CvPage() {
  const { education, experience, skills, isLoading, isError, refetch } =
    useCvData();

  const timeline = useMemo<TimelineEntry[]>(() => {
    const educationEntries: TimelineEntry[] = education.map((item) => ({
      type: "education",
      id: item.id,
      start: item.start_date,
      end: item.end_date,
      title: item.degree,
      subtitle: `${item.institution} · ${item.field_of_study}`,
      description: item.description,
    }));
    const experienceEntries: TimelineEntry[] = experience.map((item) => ({
      type: "experience",
      id: item.id,
      start: item.start_date,
      end: item.end_date,
      title: item.role,
      subtitle: item.company,
      description: item.description,
      achievements: item.achievements,
    }));
    return [...educationEntries, ...experienceEntries].sort(
      (a, b) => new Date(b.start).getTime() - new Date(a.start).getTime(),
    );
  }, [education, experience]);

  const skillGroups = useMemo(() => groupSkillsByCategory(skills), [skills]);

  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 8 } }}>
      <SeoMeta
        title="CV"
        description="Education, work experience, and technical skills."
      />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 5 }}
      >
        <Typography variant="h2">CV</Typography>
        <Button
          href="/resume.pdf"
          download
          variant="outlined"
          startIcon={<DownloadRoundedIcon />}
        >
          Download PDF
        </Button>
      </Stack>

      {isLoading ? <LoadingState /> : null}
      {isError ? <ErrorState onRetry={refetch} /> : null}

      {timeline.length > 0 ? (
        <Stack spacing={0} sx={{ mb: 6 }}>
          {timeline.map((entry, index) => (
            <Box
              key={`${entry.type}-${entry.id}`}
              sx={{ display: "flex", gap: 3 }}
            >
              <Stack alignItems="center" sx={{ pt: 0.5 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "background.paper",
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    color: "primary.main",
                    flexShrink: 0,
                  }}
                >
                  {entry.type === "education" ? (
                    <SchoolRoundedIcon fontSize="small" />
                  ) : (
                    <WorkRoundedIcon fontSize="small" />
                  )}
                </Box>
                {index < timeline.length - 1 ? (
                  <Box
                    sx={{
                      flexGrow: 1,
                      width: "1px",
                      bgcolor: "divider",
                      my: 0.5,
                    }}
                  />
                ) : null}
              </Stack>
              <Box sx={{ pb: 4, flexGrow: 1 }}>
                <Typography variant="overline" color="text.secondary">
                  {formatDate(entry.start)} – {formatDate(entry.end)}
                </Typography>
                <Typography variant="h5" component="h3">
                  {entry.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {entry.subtitle}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {entry.description}
                </Typography>
                {entry.type === "experience" &&
                entry.achievements.length > 0 ? (
                  <Box
                    component="ul"
                    sx={{ mt: 1, pl: 3, color: "text.secondary" }}
                  >
                    {entry.achievements.map((achievement) => (
                      <Typography
                        component="li"
                        variant="body2"
                        key={achievement}
                      >
                        {achievement}
                      </Typography>
                    ))}
                  </Box>
                ) : null}
              </Box>
            </Box>
          ))}
        </Stack>
      ) : null}

      {skills.length > 0 ? (
        <Stack spacing={4}>
          <Typography variant="h3">Skills</Typography>
          {CATEGORY_ORDER.filter((category) => skillGroups.has(category)).map(
            (category) => (
              <Box key={category}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {CATEGORY_LABELS[category]}
                </Typography>
                <Grid container spacing={2}>
                  {(skillGroups.get(category) ?? []).map((skill) => (
                    <Grid key={skill.id} size={{ xs: 12, sm: 6 }}>
                      <Stack spacing={0.5}>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="body2">{skill.name}</Typography>
                          <Chip
                            label={`${skill.proficiency}%`}
                            size="small"
                            variant="outlined"
                          />
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={skill.proficiency}
                          sx={{ height: 6, borderRadius: 3 }}
                        />
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ),
          )}
        </Stack>
      ) : null}
    </Container>
  );
}
