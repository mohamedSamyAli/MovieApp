import axios from "./axios.service"
import  Axios from "axios"
/**
 * get list of movies filterd by type (top movies - upcoming movies - now playing movies) and paginated 
 * @param  {string} type the type of the movies [top_rated,upcoming,now_playing]
 * @param  {Number} pageNumber page number to be fetched
 * @return {promise}  fetch data and return object including movies list current page and total pages and total results
 */
export const getMoviesByTypeAndPage = (type, pageNumber) => {

    return axios.get(`movie/${type}?page=${pageNumber}`)
}

let cancleTokenSource; // store cancle token for previes request to cancle when making new request
/**
 * get list of movies filterd by type (top movies - upcoming movies - now playing movies) and paginated 
 * @param  {string} name the type of the movies [top_rated,upcoming,now_playing]
 * @param  {Number} pageNumber page number to be fetched
 * @return {promise}  fetch data and return object including movies list current page and total pages and total results
 */
export const searchMoviesByNameAndPage = (name, pageNumber) => {
    
    if (cancleTokenSource?.cancel) {
        cancleTokenSource.cancel('cancellation') // cancle previous request 
    }
    
    cancleTokenSource = Axios.CancelToken.source(); // get new cancle token Source
    const cancelToken = cancleTokenSource.token; //cancleToken attached to the request
    return axios.get(`search/movie?page=${pageNumber}&query=${name}`, {
        cancelToken
    })
}


/**
 * add movie to list of favorites in the local storage
 * @param  {object} movie object contain movie data
 * @return {void}
 */
export const addMovieToFavorites = (movie) => {
    let favoritesList = JSON.parse(localStorage.getItem("favoritesList"))
    if (favoritesList === null) {
        favoritesList = []
    }

    favoritesList.push(movie)
    localStorage.setItem("favoritesList", JSON.stringify(favoritesList))
}




/**
 * remove movie from favorites list 
 * @param  {Number} id id for movie to be deleted from  favorites  list
 * @return {Void} 
 */
export const removeMovieFromFavorites = (id) => {

    let favoritesList = JSON.parse(localStorage.getItem("favoritesList"))
    if (favoritesList === null) {
        favoritesList = []
    }

    let filteredArray = favoritesList.filter(e => e.id !== id)
    localStorage.setItem("favoritesList", JSON.stringify(filteredArray))
}

/**
 * get all favorite movies 
 * @return {Array}  movies
 */
 export const getAllFavorits = () => {

    let favoritesList = JSON.parse(localStorage.getItem("favoritesList"))
    if (favoritesList === null) {
        favoritesList = []
    }

  return favoritesList
}


/**
 * search for movie in Favorits 
 * @param  {id} movie id =
 * @return {boolean}
 */
 export const isMovieInFavorits = (id) => {
    let favoritesList = JSON.parse(localStorage.getItem("favoritesList"))
    if (favoritesList === null) {
        favoritesList = []
    }

    return favoritesList.filter(e=>e.id===id).length>0
}


/**
 * return the movie id and constNumber as value bear object for fast search
 * @return {object} return the movie id and constNumber as value bear object
 */
 export const getHashMapforFavriots = () => {

    let favoritesList = JSON.parse(localStorage.getItem("favoritesList"))
    if (favoritesList === null) {
        favoritesList = []
    }

let temp = {}
favoritesList.forEach(element => {
    temp[element.id] = true
});
    return temp
}