import React from "react"
import HttpRequest from "./../../../Services/HttpRequest"
import ServerAccess from "./../../../security/Password.json"
function RenderPage(User, File,Dev){

    HttpRequest({
        "method":"post",
        "url":"/SearchFile",
        "ServerAccess": ServerAccess.ThePassword,
        data:{
            "FilePath":`${User}/${File}`
        }
    }).then((Response) => {
        if(Response.data.Exists == true){
            if(Dev.toUpperCase() == "TRUE"){
                window.location.replace(`http://192.168.0.104/ShowFile/${User}/${File}`)
            }
            if(Dev.toUpperCase() == "FALSE"){
                if(Response.data.DisplayMode == "Image"){
                    let ImageBackground = document.getElementById("ImageBackground")
                    ImageBackground.style.display = "flex"
                    let ThePhoto = document.getElementById("ThePhotoToShow")
                    ThePhoto.setAttribute("src", `http://192.168.0.104/ShowFile/${User}/${File}`)
                    let TheBody = document.getElementsByTagName("body")[0]
                    let Download = document.getElementById("ButtonToDownload")
                    Download.setAttribute("href", `http://192.168.0.104/Download/${User}/${File}`)
                    
                    var Interval = setInterval(() => {
                        let ToGetImageHeight = window.getComputedStyle(ThePhoto)
                        let theValueOfHeight = ToGetImageHeight.getPropertyValue("height")
                        var HeightInNumberFormat = Number(theValueOfHeight.substr(0 , theValueOfHeight.length - 2))
                        let ClientHeight = window.screen.height
                        if(HeightInNumberFormat != 0){
                            if(HeightInNumberFormat > ClientHeight){
                                ThePhoto.style.height = ClientHeight - 200 + "px"
                            }
                            clearInterval(Interval)
                            
                        }
                    },10)
                    var Interval2 = setInterval(() => {
                        let ToGetImageHeight = window.getComputedStyle(ThePhoto)
                        let theValueOfHeight = ToGetImageHeight.getPropertyValue("width")
                        var HeightInNumberFormat = Number(theValueOfHeight.substr(0 , theValueOfHeight.length - 2))
                        let ClientHeight = window.screen.width
                        if(HeightInNumberFormat != 0){
                            if(HeightInNumberFormat > ClientHeight){
                                ThePhoto.style.width = ClientHeight - 200 + "px"
                            }
                            clearInterval(Interval2)
                            
                        }
                    } ,10)

                    window.addEventListener("mousemove" ,(e) => {
                        if(e.clientX == 0){                    
                            let SideBar = document.getElementById("SideBarOfFileImage")
                            SideBar.style.display = "flex"
                            setTimeout(() => {
                                SideBar.style.transition = 1 + "s"
                                SideBar.style.left = 0 + "%"
                            }, 100)
                            
                        }
                    })
                }
                //window.alert(JSON.stringify(Response.data))
                if(Response.data.DisplayMode == "Text"){
                    let ThePlanOfPaper = document.getElementById("DisplayTextFormat")
                    ThePlanOfPaper.style.display = "flex"
                    let ThePaper = document.getElementById("ThePaper")
                    let TheText = Response.data.ForTextDisplay
                    let TextSplitted = TheText.split("\n")
                    let DownloadButton = document.getElementById("ButtonOfDownload2")
                    let i = 0
                    while(i < TextSplitted.length){
                        TheText = TheText.replace("\n", "<br/>")
                        i++
                    }
                    ThePaper.innerHTML = TheText
                    DownloadButton.setAttribute("href" , `http://192.168.0.104/Download/${User}/${File}`)
                    let SideBarOfPaper = document.getElementById("SideBarOfPaper")
                    window.addEventListener("mousemove" , (e) => {
                        if(e.clientX == 0){
                            SideBarOfPaper.style.transition = 1 + "s"
                            SideBarOfPaper.style.left = 0 + "%"
                        }
                    })
                }
                if(Response.data.DisplayMode == "Download"){
                    let DownloadMethodPlace = document.getElementById("DisplayDownloadFormat")
                    DownloadMethodPlace.style.display = "flex"
                    let DownloadExpress = document.getElementById("DownloadExpress")
                    DownloadExpress.setAttribute("href", `http://192.168.0.104/Download/${User}/${File}` )
                    DownloadExpress.click()
                }
            }
        }
        if(Response.data.Exists == false || Response.data == "File or user not found!"){
            let DownloadMethodPlace = document.getElementById("DisplayDownloadFormat")
            DownloadMethodPlace.style.display = "flex"
            let Message = document.getElementById("Message")
            Message.innerHTML = "The file or the user not exists!"
            
        }
    }).catch((Error) => {
      window.alert(Error)  
    })


}

export default RenderPage