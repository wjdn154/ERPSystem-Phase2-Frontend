import React from "react";
import { useState } from 'react'
import './styles/App.css'

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { AppBar, Tabs, Tab } from "@material-ui/core";

const TopHeader = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="Main Tabs">
                <Tab label="Home" />
                <Tab label="Send" />
                <Tab label="Profile" />
            </Tabs>
        </AppBar>
    </>
  )
}

export default App
