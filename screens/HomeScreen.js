import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { UserType } from '../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import User from '../components/User';
const HomeScreen = () => {
  const navigation =useNavigation();
  const {userId,setUserId}=useContext(UserType);
  const [users, setUsers] = useState([]);

  useLayoutEffect (()=>{
    navigation.setOptions({
      headerTitle:'',
      headerLeft:()=>(
        <Text style={{fontSize:16,fontWeight:'bold'}}> Swift Chat</Text>
      ),
      headerRight:()=>(
        <View style={{flexDirection:'row',alignItems:'center',gap:8}}>
          <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
          <MaterialIcons onPress={()=>navigation.navigate("friends")} name="people-outline" size={24} color="black" />
        </View>
      )
    })
  },[])
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await AsyncStorage.getItem("id");
        console.log("Token retrieved successfully:", token);
  
        // Check if token is not empty
        if (!token) {
          console.log("Token is empty");
          return;
        }
        setUserId(token);
        axios.get(`https://0a3c-2407-d000-405-6528-10b0-6816-2b9-fc8f.ngrok-free.app/users/${token}`).then((res) => {
          setUsers(res.data);
  // console.log("users",res.data)

        }).catch((err) => {
          console.log("error in retrieving users", err);
        });
      } catch (error) {
        console.log("Error retrieving token from AsyncStorage:", error);
      }
    };
    fetchUsers();
  }, []);
  
  
  console.log("users",users)
  return (
    <ScrollView >
      <View style={{padding:10}}>
        {users.map((item,index)=>(
        <User key={index} item={item}/>
  )) }
      </View>
    </ScrollView>
  )
}
export default HomeScreen
const styles = StyleSheet.create({})  