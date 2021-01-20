import React from "react"
import UserPhoto from "./../../../Images/UserPhoto2.jpg"
import {Link} from "react-router-dom"

function IsUserOrNo(props){
    if(props.LocalStorageConfirmation == "True"){
        return(
            
                <button className="PricipalButtons" onClick={() => {window.location.href = "/Profile"}}>
                    <img src={UserPhoto} width="100%" height="100%" alt=""/>
                </button>
           
           
            
            
        )
    }
    
}

export default IsUserOrNo