import React from "react"
import HttpRequest from "../../../Services/HttpRequest"
import GetAccess from "./../../../security/Password.json"

function CreateAccount(UserName, UserPassword,theUserKey, theRealKey){
    window.alert(UserName)
    if(theUserKey == theRealKey){
        if(UserName.length <= 30 && UserName.length >= 1){
            if(UserPassword.length > 4 && UserPassword.length <= 80){
                HttpRequest({
                    method:"POST",
                    url:"/RegisterRoom",
                    data:{
                        "UserName": UserName,
                        "UserPassword": UserPassword,
                        "UserKey": theUserKey,
                        "RealKey": theRealKey,
                        "ServerLicense": GetAccess.ThePassword
                    }
                }).then((Response) => {
                    if(Response.data == "Your account was executed with success!"){
                        let theRegisterForm = document.getElementById("CreateAccount")
                        theRegisterForm.style.display = "none"
                        window.alert("Your account was executed with success!")
                    }
                    if(Response.data == "Happened a error in database server!"){
                        window.alert("Happened a error in database server!")
                    }
                    if(Response.data == "Your username already exists in database!"){
                        window.alert("Your username already exists in database!")
                    }
                    if(Response.data == "User not completed anti-bot test!"){
                        window.alert("User not completed anti-bot test!")
                    }
                    if(Response.data == "Access Denied!"){
                        window.alert("Happened a error in server-side of application!")
                    }
                }).catch((Error) => {
                    window.alert(Error)
                })
            }else{
                window.alert("You not completed the Anti-Bot Test!")
            }
            }else{
                window.alert("Your password length need be beetwen 4 and 80 characters")
            }
        }else{
            window.alert("Your name need be larger than 1 character and smaller or same than 30")
        }
        
}

export default CreateAccount;