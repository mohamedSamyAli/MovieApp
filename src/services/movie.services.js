import axios from "./axios.service"



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
        cancleTokenSource.cancel('test cancellation') // cancle previous request 
    }
    cancleTokenSource = axios.CancelToken.source(); // get new cancle token Source
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
export const getAllFavorites = (id) => {

    let favoritesList = JSON.parse(localStorage.getItem("favoritesList"))
    if (favoritesList === null) {
        favoritesList = []
    }

    let filteredArray = favoritesList.filter(e => e.id !== id)
    localStorage.setItem("favoritesList", JSON.stringify(filteredArray))
}





