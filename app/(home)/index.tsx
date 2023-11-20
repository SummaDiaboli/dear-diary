import {
    View,
    Text,
    Button,
    KeyboardAvoidingView,
    PanResponder,
    Pressable,
} from "react-native"
import React, { useEffect, useRef } from "react"
// import tw from "twrnc"
import { SafeAreaView } from "react-native-safe-area-context"
import Svg, { Path } from "react-native-svg"
import {
    add,
    compareAsc,
    compareDesc,
    format,
    isAfter,
    isBefore,
    isEqual,
    sub,
    isToday,
} from "date-fns"
import tw from "../../constants/tw"
import ChatTextView from "../../components/Chat/ChatTextView"
import ChatFAB from "../../components/Chat/ChatFAB"
import { GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth"
import { firebaseAuth } from "../../constants/firebaseConfig"
import { ScrollView } from "react-native-gesture-handler"
import { Stack } from "expo-router"
import { currentDate } from "../../atoms/DateAtom"
import { useRecoilState } from "recoil"
import { Ionicons } from "@expo/vector-icons"

const Home = () => {
    const scrollRef = useRef<ScrollView>(null)
    const [dateTime, setDateTime] = useRecoilState(currentDate)

    // const panResponder = useRef(
    //     PanResponder.create({
    //         onMoveShouldSetPanResponder: () => true,
    //         onPanResponderRelease: (event, gestureState) => {
    //             console.log(event.nativeEvent.)
    //         },
    //         // onPanResponderMove: (event, gestureState) => {
    //         //     // console.log(gestureState.vx)
    //         //     // console.log(gestureState.moveX)
    //         //     console.log(event.type)
    //         // },
    //     })
    // ).current

    const signIn = () => {
        const provider = new GoogleAuthProvider()
    }

    const previousPage = () => {
        // console.log("tapped")
        // console.log(dateTime)
        const currentDate = new Date(dateTime)
        // console.log(currentDate)
        const newDate = sub(currentDate, { days: 1 })
        // console.log(newDate)
        setDateTime(newDate)
    }

    const nextPage = () => {
        const currentDate = new Date(dateTime)
        const newDate = add(currentDate, { days: 1 })
        setDateTime(newDate)
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

                    <View style={tw`flex flex-row h-full`}>
                        <Pressable
                            style={tw`w-10 bg-[#FFFEE3] flex justify-center items-center`}
                            onPress={previousPage}
                        >
                            <Ionicons
                                name="chevron-back"
                                size={24}
                                color="black"
                            />
                        </Pressable>
                        <ScrollView
                            style={tw`bg-[#FFFEE3] h-full shadow-xl`}
                            ref={scrollRef}
                            showsVerticalScrollIndicator={false}
                        >
                            <View
                                style={tw`flex flex-col items-center justify-center mt-5`}
                            >
                                <Text style={tw`font-ink text-xl`}>
                                    {format(dateTime, "PPPP")}
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

                        {!isToday(dateTime) && (
                            <Pressable
                                style={tw`w-6 bg-[#FFFEE3] flex justify-center items-center`}
                                onPress={nextPage}
                            >
                                <Ionicons
                                    name="chevron-forward"
                                    size={24}
                                    color="black"
                                />
                            </Pressable>
                        )}
                    </View>

                    <ChatFAB />
                </SafeAreaView>
            </KeyboardAvoidingView>
        </>
    )
}

export default Home
