import {
  createTheme,
  responsiveFontSizes,
  type PaletteMode,
  type Theme,
  type ThemeOptions,
} from "@mui/material/styles";

const fontFamily =
  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
export const monoFontFamily =
  '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

function getDesignTokens(mode: PaletteMode): ThemeOptions {
  const isDark = mode === "dark";

  return {
    palette: {
      mode,
      primary: {
        main: isDark ? "#34D399" : "#059669",
        contrastText: isDark ? "#0B0D10" : "#FFFFFF",
      },
      secondary: {
        main: isDark ? "#FBBF24" : "#F59E0B",
        contrastText: "#18181B",
      },
      background: {
        default: isDark ? "#0B0D10" : "#FAFAF9",
        paper: isDark ? "#14171A" : "#FFFFFF",
      },
      text: {
        primary: isDark ? "#F4F4F5" : "#18181B",
        secondary: isDark ? "#A1A1AA" : "#52525B",
      },
      divider: isDark ? "#27272A" : "#E4E4E7",
    },
    typography: {
      fontFamily,
      h1: {
        fontFamily,
        fontSize: "3.5rem",
        fontWeight: 700,
        lineHeight: 1.1,
        letterSpacing: "-0.02em",
      },
      h2: {
        fontFamily,
        fontSize: "2.5rem",
        fontWeight: 700,
        lineHeight: 1.15,
        letterSpacing: "-0.02em",
      },
      h3: {
        fontFamily,
        fontSize: "1.75rem",
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h4: {
        fontFamily,
        fontSize: "1.375rem",
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h5: {
        fontFamily,
        fontSize: "1.125rem",
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h6: {
        fontFamily,
        fontSize: "1rem",
        fontWeight: 600,
        lineHeight: 1.4,
      },
      subtitle1: { fontSize: "1.125rem", lineHeight: 1.5 },
      body1: { fontSize: "1rem", lineHeight: 1.65 },
      body2: { fontSize: "0.875rem", lineHeight: 1.6 },
      button: { textTransform: "none", fontWeight: 600 },
      overline: {
        fontFamily: monoFontFamily,
        letterSpacing: "0.08em",
        fontWeight: 600,
        fontSize: "0.75rem",
      },
    },
    shape: {
      borderRadius: 10,
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: { borderRadius: 8 },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            fontFamily: monoFontFamily,
            fontSize: "0.75rem",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }: { theme: Theme }) => ({
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: "none",
            backgroundImage: "none",
          }),
        },
      },
    },
  };
}

export function getTheme(mode: PaletteMode) {
  return responsiveFontSizes(createTheme(getDesignTokens(mode)));
}
