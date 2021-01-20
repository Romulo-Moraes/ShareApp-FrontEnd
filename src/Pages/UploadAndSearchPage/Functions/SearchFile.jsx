import React from "react"
import HttpRequest from "./../../../Services/HttpRequest"
import ServerAccess from "./../../../security/Password.json"

function  SearchFile(filePath) {
    let FilePathSplitted = filePath.split("/")
    if(FilePathSplitted.length == 2){
        if(FilePathSplitted[0].trim() == "" || FilePathSplitted[1].trim() == ""){
            window.alert("The Path need be: User/File")    
        }else{
            var MyData = new FormData()
            MyData.append("ServerAccess", ServerAccess.ThePassword)
            MyData.append("FilePath" , filePath)
            HttpRequest({
                method:"post",
                url:"/SearchFile",
                data:MyData
            }).then((Response) => {
                if(Response.data.Exists == true){
                    window.location.href = `/LookFile/${FilePathSplitted[0]}/${FilePathSplitted[1]}/False`
                }
                if(Response.data.Exists == false){
                    window.alert("This UserName or File not exists!")
                }
                if(Response.data == "File or user not found!"){
                    window.alert("File or user not found!")
                }
            }).catch((Error) => {
                window.alert(Error)
            })
        }
    }else{
        window.alert("The Path need be: User/File")
    }
}


export default SearchFile