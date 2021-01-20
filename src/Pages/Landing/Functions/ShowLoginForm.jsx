import React from "react"

function ShowLoginForm() {
    let LoginForm = document.getElementById("WithAccountPlace")
    LoginForm.style.display = "flex"
    let MessageOfStart = document.getElementById("MessageOfStart")
    MessageOfStart.style.display = "none"
}


export default ShowLoginForm;