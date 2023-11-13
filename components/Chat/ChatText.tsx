import { View, Text } from "react-native"
import React from "react"
import tw from "../../constants/tw"

type ChatTextProps = {
    text: string
    sender: string
}

const ChatText: React.FC<ChatTextProps> = ({ text, sender }) => {
    return (
        <View style={tw`w-full flex flex-col`}>
            <Text style={tw`font-ink text-lg`}>{text}</Text>
            <Text style={tw`font-ink self-end`}>- {sender}</Text>
        </View>
    )
}

export default ChatText
