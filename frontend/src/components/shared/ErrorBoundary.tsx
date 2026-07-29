import { Component, type ErrorInfo, type ReactNode } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled application error:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.assign("/");
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            textAlign: "center",
            px: 3,
          }}
        >
          <Stack spacing={2} alignItems="center">
            <Typography variant="h3">Something went wrong</Typography>
            <Typography variant="body1" color="text.secondary">
              An unexpected error occurred. Try reloading the page.
            </Typography>
            <Button variant="contained" onClick={this.handleReset}>
              Back to home
            </Button>
          </Stack>
        </Box>
      );
    }

    return this.props.children;
  }
}
