import React from "react"
import HttpRequest from "./../../../Services/HttpRequest"
import GetAccess from "./../../../security/Password.json"




function GoWithPassword(UserName, Password) {
    if(UserName.length > 0 && Password.length > 0){
        HttpRequest({
            method:"POST",
            url:"/LoginRoom",
            data:{
                ServerAccess: GetAccess.ThePassword,
                UserName: UserName,
                Password: Password
            }
        }).then((Response) => {
            if(Response.data == "Access Granted!" || Response.data == "Access Denied!" || Response.data == "Account not exists!"){
                if(Response.data == "Access Granted!"){
                    window.localStorage.setItem("Authenticate", "True")
                    window.localStorage.setItem("Name" , UserName)
                    window.location.replace("/Main")
                }if(Response.data == "Acess Denied!"){
                    window.alert("Happened a authentication error on server, please wait a minute.")
                }
                if(Response.data == "Account not exists!"){
                    window.alert("This account not exists!")
                }
            }else{
                window.alert(Response.data)
            }
        }).catch((Error) => {
            window.alert("Happened a error: " + Error)
        })
    }else{
        window.alert("The user name and password length need be bigger than 0")
    }
}

export default GoWithPassword