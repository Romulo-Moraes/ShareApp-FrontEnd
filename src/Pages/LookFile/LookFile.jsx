import React from "react"
import HttpRequest from "./../../Services/HttpRequest"
import ServerAccess from "./../../security/Password.json"
import RenderPage from "./Functions/RenderPage"
import "./LookFile.css"
import CloseSideBar from "./Functions/CloseSideBarOfFileImage"
import CloseSideBarOfPaper from "./Functions/CloseSideBarOfPaper"
import {Link} from "react-router-dom"
function LookFilePage(props){
    var User = props.match.params.User
    var File = props.match.params.File
    var Dev = props.match.params.Dev
    RenderPage(User,File,Dev)
    setTimeout(() => {
    }, 4000)
    
    return(
        <div>
            <div id="ImageBackground">
                <div id="SideBarOfFileImage" onClick={() => {CloseSideBar()}}>
                    <div className="ToAlign">
                        <a id="ButtonToDownload">
                            <button className="DownloadButton">Download</button>
                        </a>                        
                    </div>
                    <div className="ToAlign">
                    <Link to="/Main">
                            <button className="DownloadButton">Return</button>
                        </Link>
                    </div>
                </div>
                <div className="ToAlign">
                    <img  id="ThePhotoToShow" alt=""/>
                </div>
            </div>
            <div id="DisplayTextFormat">
                    <div id="SideBarOfPaper" onClick={() => {CloseSideBarOfPaper()}}>
                        <div className="ToAlign">
                            <a id="ButtonOfDownload2">
                                <button className="DownloadButton">Download</button>
                            </a>
                        </div>
                        <div className="ToAlign">
                            <Link to="/Main">
                                <button className="DownloadButton">Return</button>
                            </Link>
                        </div>
                    </div>
                    <div id="ThePaper">
                    
                    </div>
                
            </div>
            <div id="DisplayDownloadFormat">
                <div className="ToAlign">
                    <h1 id="Message">The file was Downloaded with success!</h1>
                </div>
                <div id="DownloadReturns">
                    <div className="ToAlign">
                        <a id="DownloadExpress"></a>
                        <Link to="/Main">
                            <button id="ReturnButton" onClick={() => {window.location.replace("/Main")}}>Return</button>
                        </Link>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LookFilePage