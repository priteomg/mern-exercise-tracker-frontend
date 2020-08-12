import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import List from "@material-ui/icons/List";
import Create from "@material-ui/icons/CreateOutlined";
import User from "@material-ui/icons/PersonAdd";

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "15px",
  },
});

export default function Navbar() {
  const classes = useStyles();

  const [value, setValue] = React.useState("list");

  const handleChange = (event, newValue) => {
    //event.preventDefault();
    console.log(newValue);
    setValue(newValue);
  };
  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        showLabel
        label="Exercise List"
        value="list"
        icon={<List />}
        component={Link}
        to="/"
      />
      <BottomNavigationAction
        showLabel
        label="Create Exercise"
        value="create"
        icon={<Create />}
        component={Link}
        to="/create"
      />
      <BottomNavigationAction
        showLabel
        label="Create User"
        value="user"
        icon={<User />}
        component={Link}
        to="/user"
      />
    </BottomNavigation>

    // <nav className="navbar navbar-dark bg-dark navbar-expand">
    //   <Link to="/" className="navbar-brand">
    //     Exercise Tracker
    //   </Link>
    //   <div className="collapse navbar-collapse">
    //     <ul className="navbar-nav mr-auto">
    //       <li className="navbar-item">
    //         <Link to="/" className="nav-link">
    //           Exercises
    //         </Link>
    //       </li>
    //       <li className="navbar-item">
    //         <Link to="/create" className="nav-link">
    //           Create Exercise Log
    //         </Link>
    //       </li>
    //       <li className="navbar-item">
    //         <Link to="/user" className="nav-link">
    //           Create User
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
  );
}
