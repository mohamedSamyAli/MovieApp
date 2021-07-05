import React, { useState , useEffect} from 'react'
import { searchMoviesByNameAndPage } from '../../services/movie.services'
import "./style.css"
export const SearchComponent = ({ onChangeHandler, value }) => {

    const [inputText, setInputText] = useState('')
    const [showResult, setShowResult] = useState(false)
    const [data, setData] = useState([])

    const handleChange = (value) => {
        setInputText(value)
        if (value === '') {
            setData([])
        } else {

            // onChangeHandler(inputText)
            searchMoviesByNameAndPage(value, 1).then(e => {

                setData(e.data.results)
            }).catch(e => {

            })
        }
    }

    useEffect(() => {
        setInputText(value)
    }, [value])

    return (
        <div className="search-container">
            <div className="search-input-results">
                <input value={inputText} onChange={(e) => { handleChange(e.target.value) }}
                    className="search-input"
                    onFocus={() => { setShowResult(true) }}
                    onBlur={() => { setShowResult() }}
                />
                <div className="search-result">

                    {showResult && data.map(e => <div>{e.title}</div>)}
                </div>
            </div>
            <button className="search-btn" onClick={() => { onChangeHandler(inputText) }}>Search</button>
        </div>
    )
}
