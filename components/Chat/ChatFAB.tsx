import { View, Text, Pressable } from "react-native"
import React, { ReactElement, useState } from "react"
import { FloatingAction } from "react-native-floating-action"
import { TouchableOpacity } from "react-native-gesture-handler"
import {
    Feather,
    MaterialCommunityIcons,
    SimpleLineIcons,
} from "@expo/vector-icons"
import tw from "../../constants/tw"
import Animated, {
    Easing,
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated"
import { useRecoilState } from "recoil"
import { isEditableState } from "../../atoms/MessageBoxAtom"

type FabAction = {
    name: string
    icon: string | ReactElement
    onTap?: () => void
    position?: number
}

const ChatFAB = () => {
    const animation = useSharedValue(0)

    const [isOpen, setIsOpen] = useState(false)
    const [isEditable, setIsEditable] = useRecoilState(isEditableState)

    const makeMessageEditable = () => {
        setIsEditable(true)
        setIsOpen(false)
        // console.log(isEditable)
    }

    const actions: FabAction[] = [
        {
            name: "Text",
            icon: (
                <MaterialCommunityIcons
                    name="format-text"
                    size={24}
                    color="black"
                />
            ),
            onTap: makeMessageEditable,
        },
        {
            name: "Image",
            icon: <SimpleLineIcons name="picture" size={24} color="black" />,
        },
        {
            name: "Draw",
            icon: (
                <MaterialCommunityIcons name="draw" size={24} color="black" />
            ),
        },
    ]

    const fabAnimation = useAnimatedStyle(() => {
        const opacityAnimation = interpolate(
            animation.value,
            [0, 0.5, 1],
            [0, 0, 1],
            Extrapolate.CLAMP
        )

        return {
            opacity: withSpring(opacityAnimation),
            // opacity: withSpring(animation.value),
        }
    })

    const actionAnimation = useAnimatedStyle(() => {
        const translateYAnimation = interpolate(
            animation.value,
            [0, 1],
            [0, 0],
            Extrapolate.CLAMP
        )

        return {
            transform: [
                { scale: withSpring(animation.value) },
                { translateY: withSpring(translateYAnimation) },
            ],
        }
    })

    return (
        <View
            style={tw`absolute bottom-[5%] right-10 flex flex-col-reverse items-center gap-y-5`}
        >
            <Pressable
                style={tw`h-16 w-16 border border-black/10 shadow-md rounded-full bg-[#FFFA8B] flex items-center justify-center`}
                onPress={(_) =>
                    setIsOpen((current) => {
                        animation.value = current ? 0 : 1
                        return !isOpen
                    })
                }
                android_ripple={{
                    color: "#FFFF8B",
                    radius: 30,
                    borderless: false,
                }}
            >
                <Feather name="edit-2" size={24} color="black" />
            </Pressable>

            {isOpen && (
                <Animated.View
                    style={[tw`flex flex-col gap-y-3`, fabAnimation]}
                >
                    {actions.map((action, index) => (
                        <Animated.View
                            key={`${action.name}Key`}
                            style={actionAnimation}
                        >
                            <Pressable
                                style={tw`h-12 w-12 bg-[#FFFA8B] justify-center items-center rounded-full border border-black/10 shadow-sm`}
                                onPress={action.onTap}
                            >
                                {action.icon}
                            </Pressable>
                        </Animated.View>
                    ))}
                </Animated.View>
            )}
        </View>
    )
}

export default ChatFAB
