import React, { useState } from 'react'
import "./style.css"
export const PagenationIcon = ({ selected ,name  , onClick}) => {

    return (

        <div
            className={"pagenation-icon " + (selected ? "selected" : '')}
            onClick={onClick}
        >
            {name}
        </div>

    )
}
