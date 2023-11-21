import DashboardIcon from "@mui/icons-material/Dashboard";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@src/app/components/Menu/Menu";
import ThemeRegistry from "@src/app/components/ThemeRegistry/ThemeRegistry";
import { Providers } from "@src/lib/providers/providers";

import "@src/app/styles/globals.css";

export const metadata = {
  title: "MCI Admin panel",
};

const DRAWER_WIDTH = 240;

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemeRegistry>
            <AppBar position="fixed" sx={{ zIndex: 2000 }}>
              <Toolbar sx={{ backgroundColor: "background.paper" }}>
                <DashboardIcon
                  sx={{ color: "#444", mr: 2, transform: "translateY(-2px)" }}
                />
                <Typography variant="h6" color="text.primary">
                  MCI Admin panel
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: DRAWER_WIDTH,
                  boxSizing: "border-box",
                  top: ["48px", "56px", "64px"],
                  height: "auto",
                  bottom: 0,
                },
              }}
              variant="permanent"
              anchor="left"
            >
              <Menu />
            </Drawer>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                bgcolor: "background.default",
                ml: `${DRAWER_WIDTH}px`,
                mt: ["48px", "56px", "64px"],
                p: 3,
              }}
            >
              {props.children}
            </Box>
          </ThemeRegistry>
        </Providers>
      </body>
    </html>
  );
}
