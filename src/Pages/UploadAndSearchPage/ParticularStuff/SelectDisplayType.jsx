import React, { useState } from "react"
import UseState from "react"


var a = "sadfsd"

function ChangeDisplayType(props, Type, Iterator){
    Iterator(Type = props.target.value)
    window.localStorage.setItem("DisplayType" , props.target.value)
    Window.DisplayType = props.target.value
}

function CloseDisplayType(){
    let Selector = document.getElementById("DisplayMode")
    Selector.style.display = "none"
}
function OpenTheDisplayModeSelector() {
    let target = document.getElementById("SelectDisplayModePlace")
    target.style.display = "flex"
}

function CloseDisplayModeSelector() {
    let target = document.getElementById("SelectDisplayModePlace")
    target.style.display = "none"
}

function SelectTypeOfDisplay(){
    var [SelectedDisplayType, Iterator] = useState("Not Selected")
    return(
        <div id="DisplayMode">
        <div id="SelectDisplayModePlace">
            <div id="SelectDisplayMode">
                <div className="ToAlign">
                <select name="" id="Selector" onChange={(props) => {ChangeDisplayType(props, SelectedDisplayType, Iterator)}}>
                    <option value="No selected">No selected</option>
                    <option value="Text">Text</option>
                    <option value="Image">Image</option>
                    <option value="Download">Download</option>
                </select>

                </div>
                
            <div className="ToAlign">
                <button className="Commons" onClick={() => {CloseDisplayModeSelector()}}>Go Back</button>
            </div>
            </div>
            
        </div>
        <div className="ToAlign">
            <button className="UploadButton" onClick={() => {OpenTheDisplayModeSelector()}}>Display mode</button>
        </div>
        <div className="ToAlign">
            <h2 className="ToGoldman">{SelectedDisplayType}</h2>
        </div>
    </div>
    )
    
}

export default SelectTypeOfDisplay;