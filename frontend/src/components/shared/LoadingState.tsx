import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingStateProps {
  message?: string;
  minHeight?: string | number;
}

export function LoadingState({
  message = "Loading…",
  minHeight = "40vh",
}: LoadingStateProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        minHeight,
        width: "100%",
      }}
    >
      <CircularProgress size={32} />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
}
