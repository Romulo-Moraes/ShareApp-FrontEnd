import React from "react"
import HttpRequest from "./../../../Services/HttpRequest"
function SendFile() {
    if(Window.TheBlessedFile != null && window.localStorage.getItem("DisplayType") != null){
        if(Window.TheBlessedFile.size < 52428800){
                var MyData = new FormData()
                MyData.append("UserName", window.localStorage.getItem("Name"))
                MyData.append("File", Window.TheBlessedFile)
                MyData.append("DisplayType" , window.localStorage.getItem("DisplayType"))
                HttpRequest({
                    method:"POST",
                    url:"/FileUpload",
                    headers:{
                        "Content-Type" : "multipart/form-data"
                    },
                    data:MyData
                }).then((Response) => {
                    if(Response.data == "You already have a file with this name in your Server Foulder!"){
                        window.alert("You already have a file with this name in your Foulder, please remove it to continue.")
                    }
                    if(Response.data == "Your file was saved with success!"){
                        window.alert("Your file was saved with success!")
                    }
                }).catch((Error) => {
                  window.alert(Error)
                })
                Window.DisplayType = null
         }else{
            window.alert("The file length need be lower than 52428800 bytes!")
        }
    }else{
        if(Window.TheBlessedFile == null){
            window.alert("You need choose one file to send!")
        }
        if(window.localStorage.getItem("DisplayType") == null){
            window.alert("You need choose a display type to send!")
            window.alert("text: "+ Window.DisplayType)
        }
    }
}


export default SendFile