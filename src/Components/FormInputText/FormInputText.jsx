import React from "react"
import "./FormInputText.css"
function FormInputText(props) {
    return(
        <input className="FormInputText" type={props.type} placeholder={props.placeHolder}  />
    )
    
}

export default FormInputText