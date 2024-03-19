import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity, SafeAreaView,ScrollView, FlatList} from 'react-native'
import React, { useContext, useState } from 'react'
import { UserType } from '../UserContext';

const User = ({ item }) => {
    const { userId, setUserId } = useContext(UserType);
    const [requestSent, setRequestSent] = useState(false)
    const sendFriendRequest = async (currentUserId, selectedUserId) => {
        try {

            const resp = await fetch("https://0a3c-2407-d000-405-6528-10b0-6816-2b9-fc8f.ngrok-free.app/friend-request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ currentUserId, selectedUserId }),
            })
            console.log(selectedUserId),
                console.log(currentUserId)
            //     const response = await axios.post("https://6eee-2407-d000-403-2a2-e0fd-5400-130e-b30b.ngrok-free.app/friend-request", {
            //     currentUserId,
            //     selectedUserId
            //   });
            if (resp.ok) {
                setRequestSent(true)
            }

        } catch (err) {
            console.log("error massage", err)
        }
    }
    return (
        
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center", marginVertical: 10 }}>
                    <View>
                        <Image style={{ height: 50, width: 50, borderRadius: 25, resizeMode: "cover" }} source={{ uri: item.image }} />
                    </View>
                    <View style={{ marginLeft: 12, flex: 1 }}>
                        <Text style={{ fontWeight: "bold" }}>{item?.name}</Text>
                        <Text style={{ marginTop: 4, color: "gray" }}>{item?.email}</Text>
                    </View>

                    {/* <Pressable> */}
                    <TouchableOpacity
                        onPress={() => sendFriendRequest(userId, item._id)}
                        style={{ backgroundColor: "#567189", width: 105, borderRadius: 6, padding: 10, underlayColor: "#fff" }}>
                        <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>Add Friend</Text>
                    </TouchableOpacity>
                    {/* </Pressable> */}
                </TouchableOpacity>
    )
}

export default User

const styles = StyleSheet.create({})