import FontAwesome from "@expo/vector-icons/FontAwesome"
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native"
import { useFonts } from "expo-font"
import { SplashScreen, Stack } from "expo-router"
import React, { useEffect } from "react"
import * as Font from "expo-font"
import { useColorScheme } from "react-native"
import { RecoilRoot } from "recoil"

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const customFonts = {
        // SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        InkFree: require("../assets/fonts/Inkfree.ttf"),
        ...FontAwesome.font,
    }

    const [loaded, error] = useFonts(customFonts)

    // const _loadFontAsync = async() => {
    //     await Font.loadAsync(customFonts)
    // }

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error
    }, [error])

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

    if (!loaded) {
        return null
    }

    return <RootLayoutNav />
}

function RootLayoutNav() {
    const colorScheme = useColorScheme()

    return (
        <RecoilRoot>
            <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
                <Stack screenOptions={{ headerShown: false }}></Stack>
            </ThemeProvider>
        </RecoilRoot>
    )
}
