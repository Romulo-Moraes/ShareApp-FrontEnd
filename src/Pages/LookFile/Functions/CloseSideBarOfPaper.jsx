import React from "react"

function CloseSideBarOfPaper(){
    let SideBar = document.getElementById("SideBarOfPaper")
    SideBar.style.transition = 1 + "s"
    SideBar.style.left = -30 + "%"
}

export default CloseSideBarOfPaper