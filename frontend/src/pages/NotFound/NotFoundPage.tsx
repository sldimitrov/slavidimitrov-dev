import { Button, Container, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { SeoMeta } from "../../components/shared/SeoMeta";

export default function NotFoundPage() {
  return (
    <Container
      maxWidth="sm"
      sx={{ py: { xs: 10, md: 14 }, textAlign: "center" }}
    >
      <SeoMeta title="Page not found" />
      <Stack spacing={2} alignItems="center">
        <Typography variant="overline" color="primary.main">
          404
        </Typography>
        <Typography variant="h2">Page not found</Typography>
        <Typography variant="body1" color="text.secondary">
          The page you're looking for doesn't exist or may have moved.
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Back to home
        </Button>
      </Stack>
    </Container>
  );
}
