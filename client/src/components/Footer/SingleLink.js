import React from "react";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";

const SingleLink = (props) => {
  return (
    <ListItem disablePadding>
      <ListItemButton
        sx={{
          padding: "3px 10px 3px 10px",
        }}
        component="a"
        href={props.url}
      >
        <ListItemText primary={props.text} />
      </ListItemButton>
    </ListItem>
  );
};

export default SingleLink;
