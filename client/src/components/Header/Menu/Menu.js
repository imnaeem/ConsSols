import { React } from "react";
import { List, Box, Divider, Stack } from "@mui/material";
import MenuLink from "./MenuLink";
import { DesktopLinks, MobileLinks } from "./MenuLinks";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Menu = ({ setIsDrawerOpen, userType }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  let menu;
  if (matches) {
    menu = DesktopLinks;
  } else {
    menu = MobileLinks;
  }
  return (
    <List
      component={Stack}
      direction={{ xs: "column", md: "row" }}
      sx={{ padding: { xs: "5px 10px", md: "0px" }, width: "100%" }}
    >
      {menu.map((link, index) => (
        <Box key={index}>
          {userType &&
          ((userType === "client" && link.text === "Find Projects") ||
            (userType === "company" &&
              link.text === "Find Companies")) ? null : (
            <Box
              sx={{
                marginLeft:
                  userType && userType !== "admin"
                    ? matches && index === menu.length - 1
                      ? { md: "24px" }
                      : "0px"
                    : (!userType || userType === "admin") && index > 0
                    ? { md: "24px" }
                    : "0px",
              }}
            >
              <MenuLink
                url={link.url}
                text={link.text}
                setIsDrawerOpen={!matches ? setIsDrawerOpen : null}
              />
            </Box>
          )}
          {!matches && link.text === "Find Projects" && (
            <Divider sx={{ margin: "5px 0px" }} />
          )}
        </Box>
      ))}
    </List>
  );
};

export default Menu;
