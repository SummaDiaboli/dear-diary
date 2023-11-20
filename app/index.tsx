import { View, Text, ActivityIndicator } from "react-native"
import React, { useEffect, useState } from "react"
import { firebaseAuth } from "../constants/firebaseConfig"
import Home from "./(home)"
import Login from "./login"
import { User } from "firebase/auth"
import tw from "../constants/tw"

const RootPage = () => {
    const [loggedIn, setLoggedIn] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        return firebaseAuth.onAuthStateChanged((data) => {
            setLoggedIn(data)
            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return (
            <View
                style={tw`flex flex-row justify-center items-center h-full w-full`}
            >
                <ActivityIndicator />
            </View>
        )
    }

    if (loggedIn && !isLoading) {
        return <Home></Home>
    }

    if (!isLoading && !loggedIn) {
        return <Login></Login>
    }
}

export default RootPage
