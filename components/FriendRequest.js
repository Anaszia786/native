import { Pressable, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native'
import React, { useContext, useState } from 'react'
import { UserType } from '../UserContext';

const FriendRequest = ({ item, friendRequest, setFriendRequests }) => {
    const { userId, setUserId } = useContext(UserType);
    // const [requestSent, setRequestSent] = useState(false)
    const acceptFriendRquest = async (recepientId, senderId) => {
        try {

            const resp = await fetch("https://0a3c-2407-d000-405-6528-10b0-6816-2b9-fc8f.ngrok-free.app/friend-request/accept", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ senderId, recepientId }),
            })
            if (resp.ok) {
                setFriendRequests(friendRequest.filter((abc)=>abc._id!==senderId))
            }
        } catch (err) {
            console.log("error in friendrequest screen", err)
        }
    }
    return (
        <TouchableOpacity style={{ flexDirection: 'row', marginVertical: 10, alignItems: "center", justifyContent: "space-between" }}>
            <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={{ uri: item.image }} />
            <Text style={{ fontSize: 15, fontWeight: "bold", flex: 1, marginLeft: 10 }}>{item?.name} sent you a friend request!!</Text>
            <TouchableOpacity style={{ backgroundColor: "#0066b2", padding: 10, borderRadius: 6 }}>
                <Text onPress={() => acceptFriendRquest(userId, item._id)} style={{ color: "white", textAlign: "center" }} >Accept</Text>
            </TouchableOpacity>

        </TouchableOpacity>
    )
}

export default FriendRequest

const styles = StyleSheet.create({})