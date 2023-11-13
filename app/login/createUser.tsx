import {
    View,
    Text,
    ActivityIndicator,
    KeyboardAvoidingView,
    Pressable,
    SafeAreaView,
    TextInput,
} from "react-native"
import React, { useState } from "react"
import { isLoading } from "expo-font"
import {
    Stack,
    router,
    useLocalSearchParams,
    useNavigation,
    useRouter,
} from "expo-router"
import tw from "../../constants/tw"
import {
    createUserWithEmailAndPassword,
    updateCurrentUser,
    updateProfile,
} from "firebase/auth"
import { firebaseAuth } from "../../constants/firebaseConfig"

type CredentialsParam = {
    email: string
    password: string
}

const CreateUser = () => {
    const params: CredentialsParam = useLocalSearchParams()
    // console.log(params)
    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState("")
    const router = useRouter()

    const createUser = async () => {
        setIsLoading(true)

        await createUserWithEmailAndPassword(
            firebaseAuth,
            params.email,
            params.password
        )
            .then(async (res) => {
                // updateCurrentUser(firebaseAuth, )
                await updateProfile(res.user, {
                    displayName: username,
                })
                    .then((_) => {
                        // const navigation = useNavigation()
                        // navigation.
                        router.back()
                        router.replace("/(home)/")
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                    .finally(() => {
                        setIsLoading(false)
                    })
            })
            .catch((err) => {
                setIsLoading(false)
                console.log(err)
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

                        <Text>
                            We detected that this is a new account. Please
                            create a username.
                        </Text>

                        <View style={tw`flex flex-col gap-y-3`}>
                            <Text>Username</Text>
                            <TextInput
                                style={tw`border border-gray-400 rounded-md py-2 px-2`}
                                onChangeText={setUsername}
                                value={username}
                                // autoCapitalize="none"
                                // keyboardType="email-address"
                                placeholder="example@example.com"
                            />
                        </View>

                        <Pressable
                            // activeOpacity={0.6}
                            android_ripple={{ color: "rgb(250, 204, 21)" }}
                            style={tw`w-full flex items-center bg-yellow-300 rounded-md py-4`}
                            onPress={createUser}
                        >
                            {isLoading ? (
                                <ActivityIndicator
                                    size={"small"}
                                    color={"black"}
                                />
                            ) : (
                                <Text>Create Username</Text>
                            )}
                        </Pressable>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </>
    )
}

export default CreateUser
