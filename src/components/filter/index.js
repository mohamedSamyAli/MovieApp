import React, { useState  ,useEffect} from 'react'
import { FilmTypeFilterIcon } from "../home.filmTypefilter.icon.component/index"
import "./style.css"
  /**
 * Filters is a genarcComponent give the apply to  customize opthions ant toggle icon
 * @param  {Array} options Arry of options object {name:"",value:""}
 * @param  {function} onChangeHandler lefting the value state up to parent component
 * @param  {text}  value value prop to give the parent component the apply to change input text value
 * @param  {ٌReactComponent} IconComponent icon used to represent result items
 * @return {jsx}
 */
export const Filters = ({ options, IconComponent, value , onChangeHandler }) => {

    const [selected, setSelected] = useState(null)

    const handleOnClick = (value) => {
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
                    <IconComponent key={e.value} className="toggle-filter-option " name={e.name} value={e.value} selected={e.value === selected} onClick={() => { handleOnClick(e.value) }} />
                )
            })}
        </div>
    )
}
