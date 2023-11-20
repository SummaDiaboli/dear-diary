import { View, Text } from "react-native"
import React from "react"
import tw from "../../constants/tw"
import { Video, ResizeMode } from "expo-av"
import { DocumentData } from "firebase/firestore"

type ChatVideoProps = {
    message: DocumentData
    // sender: string
}

const ChatVideo: React.FC<ChatVideoProps> = ({ message }) => {
    return (
        <View style={tw`w-full flex flex-col`}>
            <Video
                source={{ uri: message.url }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                style={{ width: 200, height: 200, backgroundColor: "white" }}
            />
            <Text style={tw`font-ink self-end`}>- {message.sender}</Text>
        </View>
    )
}

export default ChatVideo
