import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserType } from '../UserContext'
import axios from 'axios';
import FriendRequest from '../components/FriendRequest';

const FriendsScreeen = () => {
    const { userId, setUserId } = useContext(UserType);
    const [friendRequest, setFriendRequests] = useState([])
    useEffect(() => {
        fetchFriendRequests()
    }, [])
    const fetchFriendRequests = async () => {
        try {
            const resp = await axios.get(`https://0a3c-2407-d000-405-6528-10b0-6816-2b9-fc8f.ngrok-free.app/friend-request/${userId}`)
            if (resp.status == 200) {
                const friendRequestData = resp.data.map((friendRequest) => ({
                    _id: friendRequest._id,
                    name: friendRequest.name,
                    email: friendRequest.email,
                    image: friendRequest.image
                }))
                setFriendRequests(friendRequestData)
            }
        } catch (error) {
            console.log("error in friendsScreen", error)
        }
    }
    console.log(friendRequest);
    return (
        <View style={{padding:10,marginHorizontal:12}}>
           {friendRequest.length>0 ?<Text style={{textAlign:"center",fontWeight:"bold",color:"gray",fontSize:15}}>Your FriendRequests!</Text>:<Text>No Friend Request</Text>}
            {friendRequest.map((item,index)=>(
                <FriendRequest item={item} key={index} friendRequest={friendRequest} setFriendRequests={setFriendRequests} />
            ))}
        </View>
    )
}

export default FriendsScreeen

const styles = StyleSheet.create({})