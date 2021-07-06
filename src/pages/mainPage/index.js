import React, { useState, useEffect } from 'react';
import './style.css';
import { SearchComponent } from "../../components/searchComponent"
import { Filters } from "../../components/filter/index"
import { PagenationIcon } from "../../components/films.pagention.icon.component/index"
import { FilmTypeFilterIcon } from "../../components/home.filmTypefilter.icon.component/index"
import { getHashMapforFavriots, getMoviesByTypeAndPage, searchMoviesByNameAndPage } from '../../services/movie.services';
import { MovieCard } from "../../components/moviecard"
import { SearchResultCardComponent } from '../../components/home.page.search-result-card'

export const MainPage = () => {

    const [favoritIdsObject, setFavoritIdsObject] = useState({})
    const [movieData, setMovieData] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [searchText, setSearchText] = useState('')
    const [movieType, setMovieType] = useState("top_rated")
    const [loading, setLoading] = useState('')
    const [pageTotalNumber, setPageTotalNumber] = useState(0)



    useEffect(() => {
        setFavoritIdsObject(getHashMapforFavriots())
    },[])
    useEffect(() => {
        if (movieType !== '') {
            (async () => {
                setLoading("Loading...")
                getMoviesByTypeAndPage(movieType, pageNumber).then(({ data }) => {
                    setPageTotalNumber(data.total_pages)
                    setMovieData(data.results)
                }).finally(e => {
                    setLoading('')
                })
            })()
        } else {
        }
    }, [pageNumber, movieType])


    useEffect(() => {
        if (searchText !== '') {
            (async () => {
                    setLoading("Loading...")
                    searchMoviesByNameAndPage(searchText, pageNumber).then(({ data }) => {
                        setPageTotalNumber(data.total_pages)
                        setMovieData(data.results)
                    }).finally(e => {
                        setLoading('')
                    })
                })()
        }

    }, [pageNumber, searchText])

    useEffect(() => {
        if (searchText !== '') {
            setPageNumber(1)
            setMovieType('')
        }
    }, [searchText])

    useEffect(() => {
        if (movieType !== '') {

            setPageNumber(1)
            setSearchText('')
        }
    }, [movieType])
    return (
        <>
            <div className="home__filter-search-component">
                <SearchComponent value={searchText}
                    onChangeHandler={setSearchText}
                    className="home__search-component"
                    searchFunction={(val) => searchMoviesByNameAndPage(val, 1)}
                    isPromise
                    SearchCard={SearchResultCardComponent}
                    resultParser={(e) => e.data.results}
                />

                <div className="home__filters">
                    <Filters
                        onChangeHandler={setMovieType}
                        value={movieType}
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
                {movieData.map(e => <MovieCard key={e.id}
                    setFavoritIdsObject={setFavoritIdsObject}
                    isFavourit={favoritIdsObject[e.id]}
                    movieData={e}
                />)}
                {movieData.length == 0 && !loading && "no data found"}
                {loading && loading}

            </div>
            <div>
                {pageTotalNumber > 0 && "pages"}
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

