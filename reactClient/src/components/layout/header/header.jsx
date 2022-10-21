import React from "react";
import './header.css';
import { NavBar } from "./navBar/navBar";
import {Box} from '@mui/material';


function Header() {
    return (
        <div className="header">
            <NavBar/>
            <Box sx={{ height: {xs: '75px', md: '150px'}}}></Box>
        </div>

    )
};

export {Header};