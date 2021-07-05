import React, { useState, useEffect } from 'react';
import './style.css';
import { SearchComponent } from "../../components/searchComponent"
import { Filters } from "../../components/filter/index"
import { PagenationIcon } from "../../components/films.pagention.icon.component/index"
import { FilmTypeFilterIcon } from "../../components/home.filmTypefilter.icon.component/index"
import { getHashMapforFavriots, getMoviesByTypeAndPage, searchMoviesByNameAndPage } from '../../services/movie.services';
import { MovieCard } from "../../components/moviecard"

export const MainPage = () => {

    const [favoritIdsObject, setFavoritIdsObject] = useState(getHashMapforFavriots())
    const [movieData, setMovieData] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [searchText, setSearchText] = useState('')
    const [movieType, setMovieType] = useState("top_rated")
    const [pageTotalNumber, setPageTotalNumber] = useState(0)

    useEffect(() => {
        if (movieType !== '') {
            (async () => {
                    getMoviesByTypeAndPage(movieType, pageNumber).then(({ data }) => {
                    setPageTotalNumber(data.total_pages)
                    setMovieData(data.results)
                })
            })()
        } else {
        }
    }, [pageNumber, movieType])


    useEffect(() => {
        if (searchText !== '') {
            (async () => {
                searchMoviesByNameAndPage(searchText, pageNumber).then(({ data }) => {
                    setPageTotalNumber(data.total_pages)
                    setMovieData(data.results)
                })
            })()
        }

    }, [pageNumber, searchText])

    useEffect(() => {
        if(searchText!==''){
            
            setPageNumber(1)
            setMovieType('')
        }
    }, [searchText])

    useEffect(() => {
        if(movieType!==''){
            
        setPageNumber(1)
        setSearchText('')
    }
    }, [movieType])
    return (
        <>
            <div className="home__filter-search-component">
                <SearchComponent onChangeHandler={setSearchText} className="home__search-component" />

                <div className="home__filters">
                    <Filters
                        onChangeHandler={setMovieType}
                        value={searchText}
                        IconComponent={FilmTypeFilterIcon}
                        options={
                            [
                                { name: "top_rated", value: "top_rated" },
                                { name: "upcoming", value: "upcoming" },
                                { name: "now_playing", value: "now_playing" },
                            ]
                        }
                    />
                </div>
            </div>


            <div className="home-movie-card-container">
                {movieData.map(e => <MovieCard
                    setFavoritIdsObject={setFavoritIdsObject}
                    isFavourit={favoritIdsObject[e.id]}
                    movieData={e}
                />)}
            </div>
            <div>
                pages
            </div>
            <Filters
                value={pageNumber}
                style={{ width: "50%" }}
                onChangeHandler={setPageNumber}
                IconComponent={PagenationIcon}
                options={
                    (() => {
                        let arr = []
                        for (let i = 1; i <= pageTotalNumber; i++) {
                            arr.push({ name: i, value: i })
                        }
                        return arr
                    })()
                }
            />

        </>
    );
}

