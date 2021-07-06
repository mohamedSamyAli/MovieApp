import React from 'react'
import { imgUrl } from '../../BackendConstantes'
import "./style.css"

export const SearchResultCardComponent=({title , poster_path,...props}) =>  {
    return (
        <div {...props} className="search-result-card-container">
            <div className="search-result-card-img" style={{ backgroundImage: `url(${imgUrl + poster_path})` }}>

            </div>
            <div className="search-result-card-title">
                {title}
            </div>
        </div>
    )
}
