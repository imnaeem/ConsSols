import React from "react";
import { List, Paper, Box } from "@mui/material";
import MenuLink from "./MenuLink";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const LeftSidebar = (props) => {
  const { links } = props;
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      {matches ? (
        <Paper
          elevation={2}
          sx={{
            padding: " 10px",
            minWidth: "315px",
            position: "sticky",
            top: "111px",
          }}
        >
          <List sx={{ padding: "0px" }}>
            {links.map((link, index) => (
              <MenuLink
                key={index}
                url={link.url}
                text={link.text}
                icon={link.icon}
              />
            ))}
          </List>
        </Paper>
      ) : (
        <Box sx={{ width: "100%" }}>
          <Paper
            sx={{
              padding: "10px 0px",
              display: {
                lg: "none",
              },
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              sx={{
                [`& .${tabsClasses.scrollButtons}`]: {
                  "&.Mui-disabled": { opacity: 0.3 },
                },
              }}
            >
              {links.map((link, index) => (
                <Tab
                  key={index}
                  component={Link}
                  to={link.url}
                  label={link.text}
                  icon={link.icon}
                />
              ))}
            </Tabs>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default LeftSidebar;
