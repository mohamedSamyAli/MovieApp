import React, { useState, useEffect } from 'react';
import './style.css';

import { getAllFavorits, getHashMapforFavriots } from '../../services/movie.services';
import { MovieCard } from "../../components/moviecard"

export const FavoritsPage = () => {
    const [favoritIdsObject, setFavoritIdsObject] = useState(getHashMapforFavriots())
    const [movieData, setMovieData] = useState([])
    useEffect(() => {
        setMovieData(getAllFavorits())
    }, [favoritIdsObject])
    return (
        <>
            <div className="favorit-movie-card-container">
                {
                    movieData.map(e => <MovieCard key={e.id}
                        setFavoritIdsObject={setFavoritIdsObject}
                        isFavourit={favoritIdsObject[e.id]}
                        movieData={e}
                    />)
                }
            </div>
        </>
    );
}

