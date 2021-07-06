import React, { useState, useEffect } from 'react'
import { searchMoviesByNameAndPage } from '../../services/movie.services'
import { SearchResultCardComponent } from '../home.page.search-result-card'
import "./style.css"



/**
* Searchcomponent is a Genaric Search component give the applyty to  customize search function and icon 
* @param  {function} onChangeHandler lefting the searchText state up to parent component
* @param  {text}  value value prop to give the parent component the applytu to change input text value
* @param  {Boolean}  isPromise true if the function is promise
* @param  {function} searchFunction function accept text and return search result
* @param  {function} resultParser accept search result and return Data array
* @param  {function} SearchCard card used to represent result items
* @return {jsx}
*/
export const SearchComponent = ({ onChangeHandler, value, searchFunction, isPromise, SearchCard, resultParser }) => {
    let isMouseInsideResults = false
    const [inputText, setInputText] = useState('')
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState('')
    const [data, setData] = useState([])


    const handleChange = (value) => {
        setInputText(value)
        if (value === '') {
            setData([])
        } else {
            debugger
            if (isPromise) {
                setLoading("Loading...")
                searchFunction(value).then(e => {

                    setData(resultParser(e))
                }).catch(e => {

                }).finally(e => {
                    setLoading('')
                })

            } else {
                setData(resultParser(searchFunction(value)))
            }
        }
    }

    useEffect(() => {
        if (value === '') {
            setData([])
        }
        setInputText(value)
    }, [value])

    return (
        <div className="search-container">
            <div className="search-input-results">
                <input value={inputText} onChange={(e) => { handleChange(e.target.value) }}
                    className="search-input"
                    onFocus={() => { setShowResult(true) }}
                    onBlur={() => { setShowResult(isMouseInsideResults) }}
                />
                <div  className="search-result"
                    onMouseEnter={() => {
                        isMouseInsideResults = true
                    }}
                    onMouseLeave={() => {
                        isMouseInsideResults = false
                    }}
                >
                    {loading}
                    {showResult && data.map(e => <SearchCard key={e.id}
                        onClick={() => {
                            handleChange(e.title)
                            onChangeHandler(e.title)
                            setShowResult(false)
                        }}
                        title={e.title}
                        poster_path={e.poster_path}
                    />)}
                </div>
            </div>
            <button className="search-btn" onClick={() => { onChangeHandler(inputText) }}>Search</button>
        </div>
    )
}
