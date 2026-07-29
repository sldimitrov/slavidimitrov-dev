import { Box, Container, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const FOOTER_LINKS = [
  { label: "Blog", to: "/blog" },
  { label: "Projects", to: "/projects" },
  { label: "CV", to: "/cv" },
  { label: "Contact", to: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{ borderTop: 1, borderColor: "divider", mt: 8 }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
        >
          <Typography variant="body2" color="text.secondary">
            © {year} Slavi Dimitrov. Built with React &amp; Django.
          </Typography>
          <Stack direction="row" spacing={3}>
            {FOOTER_LINKS.map((link) => (
              <Typography
                key={link.to}
                component={RouterLink}
                to={link.to}
                variant="body2"
                sx={{
                  color: "text.secondary",
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                }}
              >
                {link.label}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
