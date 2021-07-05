import React from 'react'
import "./style.css"
import { useLocation } from 'react-router-dom';
import {
    Link,
} from "react-router-dom";



export const MainHeader = () => {
    const location = useLocation();
    const handlePathChange = () => {
        console.log(location.pathname)
    }


    return (
        <header >
            <ul class="topnav">
                <li>
                    <h1 className="main-header">
                        Movie App
                    </h1></li>
                <li class="right">
                    <Link to="/home"
                        class={location.pathname == "/home" ? "active" : ""}
                        onClick={handlePathChange}
                    >Home</Link></li>
                <li class="right">
                    <Link to="/favorits"
                        class={location.pathname == "/favorits" ? "active" : ""}
                        onClick={handlePathChange}>favorits</Link></li>
            </ul>

        </header>
    )
}
