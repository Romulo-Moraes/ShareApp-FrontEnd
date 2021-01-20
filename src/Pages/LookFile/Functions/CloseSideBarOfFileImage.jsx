import React from "react"

function CloseSideBar(){
    let SideBar = document.getElementById("SideBarOfFileImage")
    SideBar.style.transition = 1 + "s"
    SideBar.style.left = -30 + "%"
}

export default CloseSideBar