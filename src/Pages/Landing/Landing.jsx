import React from "react";
import "./Landing.css"
import LandingImage from "./../../Images/LandingIcon.gif"
import CloudIcon from "./../../Images/CloudIcon.gif"
import FormButton from "./../../Components/FormButton/FormButton"
import ShowMessage from "./Functions/ShowStartMessage"
import FormInputText from "./../../Components/FormInputText/FormInputText"
import ShowCreateAccount from "./Functions/ShowCreateAccount"
import Security from "./../../Images/security1.jpg"
import HttpRequest from "./../../Services/HttpRequest"
import OutOfRegister from "./Functions/CloseRegister"
import CreateAccount from "./Functions/CreateAccount"
import GetAccess from "./../../security/Password.json"
import GoWithPassword from "./Functions/GotoUploadWithAccount"
import HideLoginForm from "./Functions/HideLoginForm"
import {useHistory} from "react-router-dom"
import ShowLoginForm from "./Functions/ShowLoginForm"

var UserNameForLogin = ""
var PasswordForLogin = ""

var UserName = ""
var KeyWord = ""
var UserPassword = ""
var RealKeyWord = ""

function opa() {
    
}

function Landing(props){
    let isAuthenticate = window.localStorage.getItem("Authenticate")
    if(isAuthenticate == "True"){
       window.location.replace("/Main")
    }
    HttpRequest({
        method:"post",
        url:"/Security",
        data:{
            "Thekeyword": GetAccess.ThePassword
        }
    }).then((Response) => {
        if(Response.data == "Access denied!"){
            window.alert("Happened a error of authentication in us server, please wait a moment...")
        }
        var toChangeImage = document.getElementById("SecurityImage")
        var SecurityImagePath = "http://192.168.0.104:80" + Response.data.Image
        toChangeImage.setAttribute("src" , SecurityImagePath)
        RealKeyWord = Response.data.KeyWord
        
       
    }).catch((Error) => {
        window.alert("Happened a error on proccess... " + Error)
    })

    return(
        <div id="LandingPage">
            <div id="WithAccountPlace">
                <div id="WithAccount">
                    <div id="LoginTitle">
                        <div className="ToAlign">
                            <h1>Login</h1>
                        </div>
                    </div>
                    <div id="LoginBody">
                        <label htmlFor="">Name:</label>
                        <input type="text" id="LoginName" onChange={(props) => {UserNameForLogin = props.target.value}} className="FormInputText"/>
                        <br/>
                        <label htmlFor="">Password:</label>
                        <input type="password" id="LoginPassword" onChange={(props) => {PasswordForLogin = props.target.value}}  className="FormInputText"/>
                    </div>
                    <div id="LoginButtons">
                    <div className="ToAlign">
                            <FormButton text="Login" doIt={() => {GoWithPassword(UserNameForLogin , PasswordForLogin)}} />
                        </div>
                        <div className="ToAlign">
                            <FormButton text="Cancel" doIt={() => {HideLoginForm()}} />
                        </div>
                    </div>
                </div>
            </div>
           
            <div id="AccountPlace">
                <div id="CreateAccount">
                    <div id="CreateAccountTitle">
                        <div className="ToAlign">
                            <h1>Register</h1>
                        </div>
                    </div>
                    <div id="CreateAccountBody">
                        <label htmlFor="">Name:</label>
                        <br/>
                        <input type="text" className="FormInputText" maxLength="20" placeholder="Write your nickname" onChange={(theProps) => {UserName = theProps.target.value}}/>
                        <br/>
                        <br/>
                        <label htmlFor="">Password:</label>
                        <br/>
                        <input type="password" className="FormInputText" maxLength="80" placeholder="Write your password" onChange={(theProps) => {UserPassword = theProps.target.value}}/>
                        <br/>
                        <br/>
                        <img  id="SecurityImage" alt=""/>
                        <br/>
                        <input type="text" className="FormInputText" placeholder="Write the text here" onChange={(theProps) => {KeyWord = theProps.target.value}}/>
                    </div>
                    <div id="CreateAccountButtons">
                            <button onClick={() => {window.alert(UserName)}}>ShowValue</button>
                            <FormButton text="Register" doIt={() => {CreateAccount(UserName , UserPassword , KeyWord, RealKeyWord) }} />
                            <FormButton text="Cancel" doIt={OutOfRegister}/>
                    </div>
                </div>
            </div>
            <div id="MessagePlace">
                <div id="MessageOfStart">
                    <div id="TitleOfMessageStart">
                        <div className="ToAlign">
                            <h1>Hello!</h1>
                        </div>
                    </div>
                    <div id="BodyOfMessageStart">
                        <h3>In this application we have the account option as identification, giving to you more modes of experience!</h3>
                    </div>
                    <div id="ButtonsOfMessageStart">
                            <div className="ToAlign">
                                <FormButton text="I got an account" doIt={() => {ShowLoginForm()}}/>
                            </div>

                            <div className="ToAlign">
                                <FormButton text="Create account" doIt={ShowCreateAccount}/>
                            </div>
                    </div>
                </div>
            </div>
           
            <div id="LandingIcon">
                <img src={LandingImage} width="100%" height="100%" alt=""/>
            </div>
            <div id="LandingMessage">
                <div className="MessageHelper">
                    <h1 id="MessageTitle">FileSharer</h1>
                </div>
                <div className="MessageHelper">
                    <h2 id="MessageBody"> Share your files <br/> quickly and easily</h2>
                </div>
                
            </div>
            <div id="CloudIcon">
                <div className="ToAlign">
                    <img src={CloudIcon} alt="" />
                </div>
                    
            </div>

            <div id="LandingButtonsDad">
                <div className="ButtonsHelpers">
                    <button className="LandingButtonsChildren">How to use</button>
                </div>
                <div className="ButtonsHelpers">
                    <button className="LandingButtonsChildren" onClick={() => {ShowMessage()}}>Start</button>
                </div>
                    
            </div>
        </div>
    )
    
}

export default Landing;