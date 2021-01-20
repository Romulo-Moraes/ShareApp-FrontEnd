import SearchFile from "./Functions/SearchFile"
import SendFile from "./Functions/SubmitFile"
import SelectAfile from "./Functions/SelectFile"
import React from "react"
import {useState} from  "react"
import "./UploadAndSearch.css"
import IsUserOrNo from "./Functions/IsRegistered"
import BackgroundImage from "./../../Images/BackGroundImage.jpg"
import UploadIcon from "./../../Images/UploadIcon.jpg"
import QuestionIcon from "./../../Images/QuestionIcon.jpg"
import TheFileSelector from "./ParticularStuff/ChooseFile"
import SelectTypeOfDisplay from "./ParticularStuff/SelectDisplayType"
import CloseForm from "./Functions/CloseUploadForm"
import ShowForm from "./Functions/ShowUploadForm"
import HttpRequest from "../../Services/HttpRequest"
import ServerAccess from "./../../security/Password.json"
var FilePathToSearch = ""

var passedHere = 0

function MainPage() {
    var [SearchValue, SearchRefresh] = useState("")
    if(passedHere == 0){
        window.localStorage.setItem("DisplayType",  null)
        let isAuthenticate = window.localStorage.getItem("Authenticate")
        if(isAuthenticate != "True"){
            window.location.replace("/")
        }else{
            HttpRequest({
                method:"post",
                url:"/Authentication",
                data:{
                    Access: ServerAccess.ThePassword,
                    Name: window.localStorage.getItem("Name")
                }
            }).then((Response) => {
                if(Response.data == "User was Found!"){

                }
                if(Response.data == "User not Found!"){
                    window.localStorage.setItem("Authenticate" , "False")
                    window.localStorage.setItem("Name" , null)
                    window.location.replace("/")
                }
            })
        }
        Window.TheBlessedFile = null
        Window.DisplayType = null
        var Filename = "Not Selected"
        var DisplayMode = "Not Selected"
        window.addEventListener("close" , (ev) => {
            window.localStorage.setItem("Authenticate", "False")
        })  
        let Authentication = window.localStorage.getItem("Authenticate")
        if(Authentication == "True"){

        }else{
            window.location.replace("/")
        }

    }
    
    return(
        <div id="MainPagePlace">
            
            <div id="UploadFormPlace">
                <div id="UploadForm">
                    <div id="UploadFormTitle">
                        <div className="ToAlign">
                            <h1>Upload form</h1>
                        </div>
                    </div>
                    <TheFileSelector theFileName={Filename}/>
                    <SelectTypeOfDisplay/>
                    <div id="TheActionButtonOfUploadForm">
                        <div className="ToAlign">
                            <button className="ActionButtonOfUploadForm" onClick={() => {SendFile()}}>Upload</button>
                        </div>
                        <div className="ToAlign">
                            <button className="ActionButtonOfUploadForm" onClick={() => {CloseForm()}}>Cancel</button>
                        </div>
                    </div>
                </div>
                
            </div>
            
            
            <div id="ForBackgroundImage">
            </div>
            <div id="Header">
                <div id="SearchBarPlace">
                    <div className="ToAlign">
                        <input  type="search" placeholder="Write: User/File" value={SearchValue} onChange={(props) => {SearchRefresh(SearchValue = props.target.value)}} className="FormInputTextForSearch"/>
                    </div>
                    <div className="ToAlign">
                        <button className="ButtonOfSearch" onClick={() => {SearchFile(SearchValue)}}>Search</button>
                    </div>
                </div>
            </div>
            <div id="SideBar">

            </div>
            <div id="TheButtons">
                    <button className="PricipalButtons" onClick={() => {ShowForm()}}>
                        <img src={UploadIcon} width="100%" height="100%" alt=""/>  
                    </button>
                    <IsUserOrNo LocalStorageConfirmation={window.localStorage.getItem("Authenticate")}/>
            </div>
            
        </div>
    )
}


export default MainPage;