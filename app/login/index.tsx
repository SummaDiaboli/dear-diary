import {
    View,
    Text,
    KeyboardAvoidingView,
    TextInput,
    Button,
    TouchableHighlight,
    Pressable,
    ActivityIndicator,
} from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack, router, useNavigation } from "expo-router"
import tw from "../../constants/tw"
import { firebaseAuth } from "../../constants/firebaseConfig"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth"
import { FirebaseError } from "firebase/app"

const Login = () => {
    const [isLoading, setIsLoading] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signIn = () => {
        setIsLoading(true)
        // updateProfile(firebaseAuth.currentUser?.uid, {})
        signInWithEmailAndPassword(firebaseAuth, email, password)
            .then((_) => {
                router.replace("/(home)/")
            })
            .catch((err: FirebaseError) => {
                if (err.code === "auth/invalid-login-credentials") {
                    router.push(
                        `/login/createUser?email=${email}&password=${password}`
                    )
                }
                // console.log(err.code)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <KeyboardAvoidingView>
                <SafeAreaView style={tw`bg-[#FFFA8B] h-full flex flex-col`}>
                    <View
                        style={tw`h-full pt-[25%] bg-[#FFFEE3] px-5  rounded-sm flex flex-col gap-y-10`}
                    >
                        <Text style={tw`text-4xl self-center`}>Login</Text>

                        <View style={tw`flex flex-col gap-y-3`}>
                            <Text>Email</Text>
                            <TextInput
                                style={tw`border border-gray-400 rounded-md py-2 px-2`}
                                onChangeText={setEmail}
                                value={email}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                placeholder="example@example.com"
                            />
                        </View>

                        <View style={tw`flex flex-col gap-y-3`}>
                            <Text>Password</Text>
                            <TextInput
                                style={tw`border border-gray-400 rounded-md py-2 px-2`}
                                onChangeText={setPassword}
                                value={password}
                                multiline={false}
                                secureTextEntry={true}
                                // autoCapitalize="none"
                                // keyboardType="visible-password"
                            />
                        </View>

                        <Pressable
                            // activeOpacity={0.6}
                            android_ripple={{ color: "rgb(250, 204, 21)" }}
                            style={tw`w-full flex items-center bg-yellow-300 rounded-md py-4`}
                            onPress={signIn}
                        >
                            {isLoading ? (
                                <ActivityIndicator
                                    size={"small"}
                                    color={"black"}
                                />
                            ) : (
                                <Text>Sign In</Text>
                            )}
                        </Pressable>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </>
    )
}

export default Login
