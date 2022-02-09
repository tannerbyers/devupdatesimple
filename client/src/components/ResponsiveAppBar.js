import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Routes, Route, Link } from "react-router-dom";

const pages = ["Home", "About", "Holy Grail"];

const ResponsiveAppBar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="l">
        <Toolbar disableGutters>
          <Typography
            style={{ paddingRight: "1vw" }}
            variant="h3"
            noWrap
            component="div"
          >
            Dev Update
          </Typography>
          <div style={{ display: "flex", textAlign: "right" }}>
          <Typography variant="h6" noWrap component="div">
            <Link style={{ paddingRight: "1vw", color: "#fff" }} to="/">
              Home
            </Link>
          </Typography>
          <Typography variant="h6" noWrap component="div">
            <Link style={{ paddingRight: "1vw", color: "#fff" }} to="/about">
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
  );
};
export default ResponsiveAppBar;
