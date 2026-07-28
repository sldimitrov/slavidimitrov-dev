import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { useUiStore } from "../../store/uiStore";
import { monoFontFamily } from "../../theme/theme";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Blog", to: "/blog" },
  { label: "Projects", to: "/projects" },
  { label: "CV", to: "/cv" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const themeMode = useUiStore((state) => state.themeMode);
  const toggleThemeMode = useUiStore((state) => state.toggleThemeMode);
  const isMobileNavOpen = useUiStore((state) => state.isMobileNavOpen);
  const openMobileNav = useUiStore((state) => state.openMobileNav);
  const closeMobileNav = useUiStore((state) => state.closeMobileNav);

  const ThemeIcon =
    themeMode === "dark" ? LightModeRoundedIcon : DarkModeRoundedIcon;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        backdropFilter: "blur(8px)",
        bgcolor: "background.default",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1200,
          width: "100%",
          mx: "auto",
          px: { xs: 2, md: 3 },
        }}
      >
        <Typography
          component={NavLink}
          to="/"
          variant="h6"
          sx={{
            fontFamily: monoFontFamily,
            fontWeight: 700,
            textDecoration: "none",
            color: "text.primary",
            flexGrow: 1,
          }}
        >
          slavi.dev
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              onClick={toggleThemeMode}
              aria-label="Toggle color theme"
              sx={{ mr: 1 }}
            >
              <ThemeIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={openMobileNav}
              aria-label="Open navigation menu"
            >
              <MenuRoundedIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={isMobileNavOpen}
              onClose={closeMobileNav}
            >
              <Box sx={{ width: 240, pt: 2 }} role="presentation">
                <List>
                  {NAV_LINKS.map((link) => (
                    <ListItemButton
                      key={link.to}
                      component={NavLink}
                      to={link.to}
                      onClick={closeMobileNav}
                      sx={{
                        "&.active": {
                          color: "primary.main",
                          fontWeight: 600,
                        },
                      }}
                    >
                      <ListItemText primary={link.label} />
                    </ListItemButton>
                  ))}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <Stack direction="row" spacing={1} alignItems="center">
            {NAV_LINKS.map((link) => (
              <Button
                key={link.to}
                component={NavLink}
                to={link.to}
                sx={{
                  color: "text.secondary",
                  "&.active": {
                    color: "primary.main",
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
            <IconButton
              onClick={toggleThemeMode}
              aria-label="Toggle color theme"
            >
              <ThemeIcon fontSize="small" />
            </IconButton>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}
