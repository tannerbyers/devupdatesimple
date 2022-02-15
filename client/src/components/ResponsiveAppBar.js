import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

const ResponsiveAppBar = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="inherit" enableColorOnDark position="static">
        <Container maxWidth="l">
          <Toolbar disableGutters>
            <h1 style={{ color: "#76C8DF", paddingRight: "1vw" }}>
              Dev Update 🧿
            </h1>
            <div style={{ display: "flex", textAlign: "right" }}>
              <Typography variant="h6" noWrap component="div">
                <Link style={{ paddingRight: "1vw", color: "#fff" }} to="/">
                  Home
                </Link>
              </Typography>
              <Typography variant="h6" noWrap component="div">
                <Link
                  style={{ paddingRight: "1vw", color: "#fff" }}
                  to="/about"
                >
                  About
                </Link>
              </Typography>

              <Typography variant="h6" noWrap component="div">
                <Link
                  style={{ paddingRight: "1vw", color: "#fff" }}
                  to="/holygrail"
                >
                  Holy Grail
                </Link>
              </Typography>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default ResponsiveAppBar;
