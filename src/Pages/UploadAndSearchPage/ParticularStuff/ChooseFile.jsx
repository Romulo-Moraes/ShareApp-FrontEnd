import React, { useState } from "react"
import {UseState} from "react"

function ChangeFile(){

}

function ReceiveFile(TheFile ,Filename, Iterator, Global){
    if(TheFile.target.files[0].size < 52428800){
        let NameFile = document.getElementById("ToFileName")
        Iterator(Filename = TheFile.target.files[0].name)
        window.localStorage.setItem("FileName" , TheFile.target.files[0].name)
        Window.TheBlessedFile = TheFile.target.files[0]
    
    }else{
        window.alert("The length of file is so big, the max is 52428800 bytes")
    }
    return TheFile
}

function TheFileSelector(globalProps){
    var [Filename,Interator] = useState("Not Selected")
    return(
        <div id="SelectFile">
            <input type="file" id="TheFile" onChange={(props) => {ReceiveFile(props, Filename,Interator, globalProps);}}/>
            <div className="ToAlign">
                <button className="UploadButton" onClick={() => {let target = document.getElementById("TheFile"); target.click()}}>Select File</button>
            </div>
            <div className="ToAlign">
                <h2 className="ToFileName ToGoldman">{Filename}</h2>
            </div>
        </div>
    )
}

export default TheFileSelector