import React from "react";
import {
  Box,
  List,
  Typography,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Reviewer, Company, About } from "./Links.js";
import { Link } from "react-router-dom";

const LinksSection = (props) => {
  const section = props.section;
  let sectionLinks = null;

  if (section === "Explore") {
    sectionLinks = Reviewer;
  } else if (section === "For Companies") {
    sectionLinks = Company;
  } else if (section === "Overview") {
    sectionLinks = About;
  }

  return (
    <Box
      sx={{
        width: {
          xs: "100%",
        },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "500",

          marginBottom: {
            xs: "0px",
            lg: "15px",
          },
        }}
      >
        {section}
      </Typography>

      <List>
        {sectionLinks.map((link, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              sx={{ padding: "4px 5px" }}
              component={Link}
              to={link.url}
            >
              <ListItemText disableTypography sx={{}} primary={link.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default LinksSection;
