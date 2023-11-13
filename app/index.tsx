import { View, Text } from "react-native"
import React from "react"
import { firebaseAuth } from "../constants/firebaseConfig"
import Home from "./(home)"
import Login from "./login"

const RootPage = () => {
    if (firebaseAuth.currentUser) {
        return <Home></Home>
    } else {
        return <Login></Login>
    }
}

export default RootPage
