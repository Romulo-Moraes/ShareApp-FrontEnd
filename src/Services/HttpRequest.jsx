import React from "react"
import Axios from "axios"
import APIaddress from "./Address.json"

var HttpRequest = Axios.create({
    baseURL:APIaddress.ApiAddress
})

export default HttpRequest