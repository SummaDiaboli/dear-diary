import { View, Text } from "react-native"
import React from "react"
import { DocumentData } from "firebase/firestore"
import tw from "../../constants/tw"
import { Image } from "expo-image"

type ChatVideoProps = {
    message: DocumentData
}
const ChatImage: React.FC<ChatVideoProps> = ({ message }) => {
    const blurhash =
        "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj["

    return (
        <View style={tw`w-full flex flex-col`}>
            <Image
                // source={{ uri: message.url }}
                // cache={}
                contentFit="cover"
                cachePolicy={"memory-disk"}
                transition={500}
                placeholder={blurhash}
                source={message.url}
                style={{ height: 400, width: 250 }}
            />
            <Text style={tw`font-ink self-end`}>- {message.sender}</Text>
        </View>
    )
}

export default ChatImage
