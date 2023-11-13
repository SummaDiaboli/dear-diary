import { View, Text } from "react-native"
import React from "react"
import { Stack } from "expo-router"

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "index",
}

const HomeRootLayout = () => {
    return (
        <Stack>
            {/* <Stack.Screen
                    name="(tabs)"
                    options={{ headerTitle: "Tabs", headerShown: true }}
                /> */}
            {/* <Stack.Screen name="(home)/index" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} /> */}
        </Stack>
    )
}

export default HomeRootLayout
