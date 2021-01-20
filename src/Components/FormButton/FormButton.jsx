import React from "react";
import "./FormButton.css"
function FormButton(props){
    return(
        <button className="FormButton" onClick={() => {props.doIt()}}>
            {props.text}
        </button>
    )
}


export default FormButton;