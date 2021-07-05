import React, { useState  ,useEffect} from 'react'
import { FilmTypeFilterIcon } from "../home.filmTypefilter.icon.component/index"
import "./style.css"
export const Filters = ({ options, IconComponent, value , onChangeHandler }) => {

    const [selected, setSelected] = useState(null)

    const handleOnClick = (value) => {
        debugger
        setSelected(value)
        onChangeHandler(value)
    }


    useEffect(() => {
        setSelected(value)
    }, [value])
    return (
        <div className="toggle-filter">
            {options.map((e, i) => {
                return (
                    <IconComponent className="toggle-filter-option " name={e.name} value={e.value} selected={e.value === selected} onClick={() => { handleOnClick(e.value) }} />
                )
            })}
        </div>
    )
}
