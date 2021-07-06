import React from 'react'
import { imgUrl } from '../../BackendConstantes'
import { addMovieToFavorites, getHashMapforFavriots, removeMovieFromFavorites } from '../../services/movie.services'
import './style.css'

export const MovieCard = ({movieData, isFavourit,setFavoritIdsObject}) => {
const handleAddtoFavorites =()=>{
addMovieToFavorites(movieData)
setFavoritIdsObject(getHashMapforFavriots())
}
const handleremoveFromFavorites = ()=>{
  removeMovieFromFavorites(movieData.id)  
  setFavoritIdsObject(getHashMapforFavriots())
}
    return (
        <div
            className="movie-card-container"
        >
            <div className="movie-card-img" style={{ backgroundImage: `url(${imgUrl + movieData.poster_path})` }}>
                <div className="movie-card-name">
                    <div>
                    {movieData.title}
                    </div>
                </div>
            </div>
            <div className="movie-card-favorit-action">
                {isFavourit?
                <button
                className="movie-card-btn"
                onClick={handleremoveFromFavorites}
                >remove From Favorites</button>
                :
                <button
                className="movie-card-btn favorit"
                onClick={handleAddtoFavorites}
                >Add To Favorites</button>}
            </div>
        </div>
    )
}
