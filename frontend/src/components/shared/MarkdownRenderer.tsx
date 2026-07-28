import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Box, Link as MuiLink, Typography } from "@mui/material";
import { monoFontFamily } from "../../theme/theme";

interface MarkdownRendererProps {
  content: string;
}

const components: Components = {
  h1: ({ children }) => (
    <Typography variant="h2" sx={{ mt: 4, mb: 2 }}>
      {children}
    </Typography>
  ),
  h2: ({ children }) => (
    <Typography variant="h3" sx={{ mt: 4, mb: 2 }}>
      {children}
    </Typography>
  ),
  h3: ({ children }) => (
    <Typography variant="h4" sx={{ mt: 3, mb: 1.5 }}>
      {children}
    </Typography>
  ),
  p: ({ children }) => (
    <Typography
      variant="body1"
      color="text.secondary"
      sx={{ mb: 2, lineHeight: 1.75 }}
    >
      {children}
    </Typography>
  ),
  a: ({ href, children }) => (
    <MuiLink
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      color="primary"
    >
      {children}
    </MuiLink>
  ),
  ul: ({ children }) => (
    <Box component="ul" sx={{ mb: 2, pl: 3, color: "text.secondary" }}>
      {children}
    </Box>
  ),
  ol: ({ children }) => (
    <Box component="ol" sx={{ mb: 2, pl: 3, color: "text.secondary" }}>
      {children}
    </Box>
  ),
  li: ({ children }) => (
    <Typography component="li" variant="body1" sx={{ mb: 0.5 }}>
      {children}
    </Typography>
  ),
  blockquote: ({ children }) => (
    <Box
      component="blockquote"
      sx={{
        m: 0,
        my: 2,
        pl: 2,
        borderLeft: (theme) => `3px solid ${theme.palette.primary.main}`,
        color: "text.secondary",
        fontStyle: "italic",
      }}
    >
      {children}
    </Box>
  ),
  code: ({ className, children }) => {
    const isFenced = Boolean(className);
    if (!isFenced) {
      return (
        <Box
          component="code"
          sx={{
            fontFamily: monoFontFamily,
            fontSize: "0.875em",
            bgcolor: "action.hover",
            px: 0.75,
            py: 0.25,
            borderRadius: 1,
          }}
        >
          {children}
        </Box>
      );
    }
    return (
      <Box
        component="code"
        className={className}
        sx={{ fontFamily: monoFontFamily, fontSize: "0.875em" }}
      >
        {children}
      </Box>
    );
  },
  pre: ({ children }) => (
    <Box
      component="pre"
      sx={{
        overflowX: "auto",
        bgcolor: "background.paper",
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 1.5,
        p: 2,
        mb: 2,
      }}
    >
      {children}
    </Box>
  ),
  img: ({ src, alt }) => (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{ maxWidth: "100%", borderRadius: 1.5, my: 2 }}
    />
  ),
  hr: () => (
    <Box
      component="hr"
      sx={{
        my: 3,
        border: "none",
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    />
  ),
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <Box>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </Box>
  );
}
