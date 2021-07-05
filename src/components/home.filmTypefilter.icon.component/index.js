import React, { useState } from 'react'
import "./style.css"
export const FilmTypeFilterIcon = ({ selected ,name  , onClick}) => {

    return (

        <div
            className={"toggle-filter-type " + (selected ? "selected" : '')}
            onClick={onClick}
        >
            {name}
        </div>

    )
}
