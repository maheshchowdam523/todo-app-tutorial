import React from "react";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    color: "grey",
    backgroundColor: "#aaa",
    marginLeft: "35%",
    width: 500,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around"
  }
});

export const Footer = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        label="Show All"
        value="recents"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="Show Active"
        value="favorites"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Show Completed"
        value="nearby"
        icon={<LocationOnIcon />}
      />
    </BottomNavigation>
  );
};
