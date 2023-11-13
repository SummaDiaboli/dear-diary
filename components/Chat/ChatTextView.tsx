import { View, TextInput } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import tw from "../../constants/tw"
import ChatText from "./ChatText"
import { useRecoilState } from "recoil"
import { isEditableState } from "../../atoms/MessageBoxAtom"
import {
    DocumentData,
    Timestamp,
    addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
} from "firebase/firestore"
import { firebaseAuth, firestore } from "../../constants/firebaseConfig"
import { ScrollView } from "react-native-gesture-handler"
import { format } from "date-fns"

type Message = {
    date: Timestamp
    message: string
    sender: string
}

const ChatTextView = ({
    scrollRef,
}: {
    scrollRef: React.RefObject<ScrollView>
}) => {
    const messageBoxRef = useRef<TextInput>(null)
    const [isTextEditable, setIsTextEditable] = useRecoilState(isEditableState)
    const [messageText, setMessageText] = useState("")
    const [messages, setMessages] = useState<DocumentData[]>([])
    const dateTime = format(Date.now(), "dLLLyyy")

    useEffect(() => {
        if (isTextEditable && messageBoxRef) {
            // console.log(messageBoxRef.current)
            messageBoxRef.current!.focus()
        }
    }, [isTextEditable])

    // const fetchMessages = async () => {

    useEffect(() => {
        const querySnapshot = query(
            collection(
                firestore,
                "diaries",
                dateTime,
                // "dates",
                // "test",
                "chats"
            ),
            orderBy("date", "asc")
        )

        const unsubscribe = onSnapshot(querySnapshot, (snapshot) => {
            const messages: DocumentData[] = []
            snapshot.forEach((doc) => {
                messages.push(doc.data())
            })
            setMessages(messages)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    // }

    const logBlur = async () => {
        setIsTextEditable(false)
        messageBoxRef.current?.clear()
        scrollRef.current?.scrollToEnd()
        // console.log("Blurred")
        if (messageText.length > 0) {
            await addDoc(
                collection(
                    firestore,
                    "diaries",
                    // "3FLt8ZjodeSGwGx5QeJ0",
                    // "dates",
                    // `test`,
                    dateTime,
                    "chats"
                ),
                {
                    date: serverTimestamp(),
                    message: messageText,
                    sender: firebaseAuth.currentUser?.displayName,
                }
            ).catch((err) => {
                console.log(err)
            })
        }
    }

    return (
        <View style={tw`mx-5 mt-8 mb-[20%]`}>
            {messages.map((message, index) => (
                <ChatText
                    key={`message${index}`}
                    text={message.message}
                    sender={message.sender}
                />
            ))}
            {/* <ChatText text="Hello there" sender="Bubby" />
            <ChatText
                text="What a new and wonderful beginning"
                sender="Teddy"
            /> */}

            <TextInput
                ref={messageBoxRef}
                style={tw`font-ink text-black text-lg`}
                editable={isTextEditable}
                onChangeText={(text) => setMessageText(text)}
                returnKeyType="done"
                multiline
                blurOnSubmit
                onSubmitEditing={logBlur}
            />
        </View>
    )
}

export default ChatTextView
