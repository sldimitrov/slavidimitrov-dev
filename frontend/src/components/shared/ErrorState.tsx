import { Box, Button, Typography } from "@mui/material";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  minHeight?: string | number;
}

export function ErrorState({
  message = "Something went wrong while loading this content.",
  onRetry,
  minHeight = "40vh",
}: ErrorStateProps) {
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
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
      {onRetry ? (
        <Button
          variant="outlined"
          size="small"
          startIcon={<RefreshRoundedIcon />}
          onClick={onRetry}
        >
          Try again
        </Button>
      ) : null}
    </Box>
  );
}
