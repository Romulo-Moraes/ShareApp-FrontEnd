import "./Profile.css"
import React from "react"
import {Link, useHistory} from "react-router-dom"
import HttpRequest from "./../../Services/HttpRequest"
import {UseHistory} from "react-router-dom"
import GetAccess from "./../../security/Password.json"
import ApiAddress from "./../../Services/Address.json"

var passedHere = 0

function Profile(){
    if(passedHere == 0){
        let isAuthenticate = window.localStorage.getItem("Authenticate")
    if(isAuthenticate == "True"){
        HttpRequest({
            method:"post",
            url:"/Authentication",
            data:{
                Access:GetAccess.ThePassword,
                Name: window.localStorage.getItem("Name")
            }
        }).then((Response) => {
            if(Response.data == "User was Found!"){
                HttpRequest({
                    method:"post",
                    url:"/GetProfile",
                    data:{
                        Access: GetAccess.ThePassword,
                        Name: window.localStorage.getItem("Name")
                    }
                }).then((Response) => {
                    if(Response.data != "User not have files" && Response.data != "Your access is forbidden for this API!"){
                        let RealFiles = Response.data.RealFiles
                        let Extension = Response.data.Extensions
                        let Sizes = Response.data.Size
                        let DisplayTypes = Response.data.DisplayTypes
                        let FreeSpace = Response.data.FreeSpace
                        let SelectedFiles = Response.data.SelectedFiles
                        let TotalFiles = Response.data.FilesUploaded
                        let Name = Response.data.Name
                        let LenOfFiles = RealFiles.length
                        let i = 0
                        let TotalOfFiles = document.getElementById("FilesUploaded")
                        TotalOfFiles.innerHTML = "Files Uploaded: " + TotalFiles
                        let TheFreeSpace = document.getElementById("DiskSpace")
                        TheFreeSpace.innerHTML = "Free DiskSpace: " + FreeSpace + " bytes" 
                        let TheName = document.getElementById("Name")
                        TheName.innerHTML = "Name: " + Name
                        let FilesPlace = document.getElementById("Files")
                        while(i < LenOfFiles){
                            let FileBody = document.createElement("div")
                            FileBody.classList.add("FileUnity")
                            let FileInfo = document.createElement("div")
                            FileInfo.classList.add("FileInfo")
                            let FileAction = document.createElement("div")
                            FileAction.classList.add("FileAction")
                            FileBody.appendChild(FileInfo)
                            FileBody.appendChild(FileAction)

                            let ForFileName = document.createElement("h2")
                            ForFileName.innerHTML = "Name: " + RealFiles[i] 
                            let ForMimeType = document.createElement("h2")
                            ForMimeType.innerHTML = "MimeType: " + Extension[i]
                            let ForSize = document.createElement("h2")
                            ForSize.innerHTML = "Size: " + Sizes[i] + " Bytes" 
                            let ForDisplayType = document.createElement("h2")
                            ForDisplayType.innerHTML = "Display: " + Response.data.DisplayTypes[i]
                            
                            let DeleteButton = document.createElement("button")
                            DeleteButton.classList = "RedButton"
                            DeleteButton.innerText = "Delete"
                            DeleteButton.setAttribute("Reference" , Response.data.RealFiles[i])
                            DeleteButton.addEventListener("click" , () => {
                                
                                let YesOrNo = window.confirm(`You really want delete ${DeleteButton.getAttribute("Reference")} ?`)
                                if(YesOrNo == true){
                                    HttpRequest({
                                        method:"delete",
                                        url:"/DeleteFile",
                                        data:{
                                            FileName: DeleteButton.getAttribute("Reference"),
                                            UserName: window.localStorage.getItem("Name"),
                                            Password: GetAccess.ThePassword
                                        }
                                    }).then((Response) => {
                                        if(Response.data == "The file was deleted!"){
                                            window.alert("The file was deleted!")
                                            window.location.reload()
                                        }
                                        if(Response.data == "File not exists!"){
                                            window.alert("File not exists!")
                                        }
                                        if(Response.data == "You not have permission to do a request for this API!"){
                                            window.alert("Happened a authentication error in server-side of application!")
                                        }
                                    }).catch((Error) => {
                                        window.alert(Error)
                                    })
                                }else{

                                }
                            })
                          
                            let ToAlign3 = document.createElement("div")
                            ToAlign3.classList.add("ToAlign")
                            let DevButton = document.createElement("button")
                            DevButton.classList.add("GreenButton")
                            DevButton.innerText = "Dev"
                            DevButton.setAttribute("Reference", RealFiles[i])
                            DevButton.setAttribute("DisplayType" , DisplayTypes[i])
                            DevButton.addEventListener("click", () => {
                                let Type = DevButton.getAttribute("DisplayType")
                                let File = DevButton.getAttribute("Reference")
                                if(Type == "Download" || Type == "Image" || Type == "Text"){
                                    if(Type == "Download"){
                                        navigator.clipboard.writeText(ApiAddress.ApiAddress + `/Download/${window.localStorage.getItem("Name")}/${File}`)
                                        window.alert("The Dev URL of file was copied in your Clipbord!")
                                    }
                                    if(Type == "Text" || Type == "Image"){
                                        navigator.clipboard.writeText(ApiAddress.ApiAddress + `/ShowFile/${window.localStorage.getItem("Name")}/${File}`)
                                        window.alert("The Dev URL of file was copied in your Clipbord!")                                    
                                    }  
                                }
                                else{
                                    window.alert(Type)
                                    window.alert("Display type not found!")
                                }
                            })
                            ToAlign3.appendChild(DevButton)

                            let ToAlign2 = document.createElement("div")
                            ToAlign2.classList.add("ToAlign")
                            let DownloadButton = document.createElement("button")
                            DownloadButton.classList.add("BlueButton")
                            DownloadButton.innerText = "GET"
                            DownloadButton.setAttribute("Reference", Response.data.RealFiles[i])
                            DownloadButton.addEventListener("click" , () => {
                                let TheFileSelected = DownloadButton.getAttribute("Reference")
                                window.location.href = ApiAddress.ApiAddress + `/Download/${window.localStorage.getItem("Name")}/${TheFileSelected}`
                            })
                            ToAlign2.appendChild(DownloadButton)
                            

                            let ToAlign = document.createElement("div")
                            ToAlign.classList.add("ToAlign")
                            ToAlign.appendChild(DeleteButton)

                            FileAction.appendChild(ToAlign3)
                            FileAction.appendChild(ToAlign)
                            FileAction.appendChild(ToAlign2)
                            FileInfo.appendChild(ForFileName)
                            FileInfo.appendChild(ForMimeType)
                            FileInfo.appendChild(ForDisplayType)
                            FileInfo.appendChild(ForSize)
                            
                        
                            FilesPlace.appendChild(FileBody)
                             
                            i++
                        }

                        
                    }
                }).catch((Error) => {
                    window.alert(Error)
                })
            }else{
                window.localStorage.setItem("Authenticate" , "False")
                window.localStorage.setItem("Name", null)
                window.location.replace("/")
            }
        }).catch((Error) => {

        })
        
    }else{
        window.location.replace("/")
    }
    passedHere += 1
    }
    
    return(
        <div id="ProfileBody">
            <div id="InfoPlace">
                <div id="TheInfoTitle">
                    <div className="ToAlign">
                        <h1>Information</h1>
                    </div>
                </div>
                <div id="TheInfos">
                    <div id="AlignInfo">
                        <div className="ToAlign">
                            <h1 id="Name">Name: ??????</h1>
                        </div>
                
                        <div className="ToAlign">
                            <h1 id="FilesUploaded">Files Uploaded: ?</h1>
                        </div>
                
                        <div className="ToAlign">
                            <h1 id="DiskSpace">Free DiskSpace: ????</h1>
                        </div>
                    </div>
                    

                </div>
                <div id="ProfileButtons">
                    <div className="ToAlign">
                        <Link to="/Main">
                            <button className="ButtonsOfProfile">Return</button>
                        </Link>
                        
                    </div>
                </div>
            </div>
            <div id="FilesPlace">
                <div id="TheFilesTitle">
                    <div className="ToAlign">
                        <h1>Files</h1>
                    </div>
                </div>
                <div id="Files">
                    
                    
                </div>
            </div>
        </div>
    )
}

export default Profile