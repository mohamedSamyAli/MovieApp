import React from 'react'
import "./style.css"
import { useLocation } from 'react-router-dom';
import {
    Link,
} from "react-router-dom";



export const MainHeader = () => {
    const location = useLocation();
    const handlePathChange = () => {
    }

    return (
        <header >
            <ul className="topnav">
                <li>
                    <h1 className="main-header">
                        Movie App
                    </h1></li>
                <li className="right">
                    <Link to="/home"
                        className={location.pathname == "/home" ? "active" : ""}
                        onClick={handlePathChange}
                    >Home</Link></li>
                <li className="right">
                    <Link to="/favorits"
                        className={location.pathname == "/favorits" ? "active" : ""}
                        onClick={handlePathChange}>favorits</Link></li>
            </ul>

        </header>
    )
}
