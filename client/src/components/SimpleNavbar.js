import React from "react";


import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";



const Navbar = (props) => {

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Button color="inherit" component={Link} to={props.path}>
                    goBack
        </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
