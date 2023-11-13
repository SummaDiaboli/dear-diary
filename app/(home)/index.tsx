import { View, Text, Button, KeyboardAvoidingView } from "react-native"
import React, { useRef } from "react"
// import tw from "twrnc"
import { SafeAreaView } from "react-native-safe-area-context"
import Svg, { Path } from "react-native-svg"
import { format } from "date-fns"
import tw from "../../constants/tw"
import ChatTextView from "../../components/Chat/ChatTextView"
import ChatFAB from "../../components/Chat/ChatFAB"
import { GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth"
import { firebaseAuth } from "../../constants/firebaseConfig"
import { ScrollView } from "react-native-gesture-handler"
import { Stack } from "expo-router"

const Home = () => {
    const scrollRef = useRef<ScrollView>(null)

    const signIn = () => {
        const provider = new GoogleAuthProvider()
    }

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <KeyboardAvoidingView>
                <SafeAreaView style={tw`bg-[#FFFA8B] h-full`}>
                    <View
                        style={tw`bg-[#FFFA8B] h-20 flex flex-row-reverse justify-between items-center mx-5 gap-x-5`}
                    >
                        {/* <View
                            style={tw`h-12 w-12 rounded-full bg-green-400 border flex justify-center items-center border-black`}
                        >
                            <Text style={tw`text-lg`}>T</Text>
                        </View> */}

                        <View
                            style={tw`h-12 px-3 rounded-full bg-blue-300 border flex justify-center items-center border-black`}
                        >
                            <Text style={tw`text-lg `}>
                                {firebaseAuth.currentUser?.displayName}
                            </Text>
                        </View>
                    </View>

                    <ScrollView style={tw`bg-[#FFFEE3] h-full`} ref={scrollRef}>
                        <View
                            style={tw`flex flex-col items-center justify-center mt-5`}
                        >
                            <Text style={tw`font-ink text-xl`}>
                                {format(Date.now(), "PPPP")}
                            </Text>
                            <Svg
                                // xmlns="http://www.w3.org/2000/svg"
                                width="200"
                                height="8"
                                viewBox="0 0 200 8"
                                fill="none"
                            >
                                <Path
                                    d="M1.35183 7.62434C77.565 -1.35559 120.79 -1.34363 198.642 6.37567"
                                    stroke="black"
                                    stroke-linecap="round"
                                />
                            </Svg>
                        </View>

                        <ChatTextView scrollRef={scrollRef} />
                    </ScrollView>
                    <ChatFAB />
                </SafeAreaView>
            </KeyboardAvoidingView>
        </>
    )
}

export default Home
