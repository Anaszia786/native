import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation=useNavigation();

  // useEffect(()=>{
  //   const checkLoginStatus=async()=>{
  //     try{

  //       const token= await AsyncStorage.getItem("authToken")
  //       if(token){
  //         navigation.replace("home")
  //       }
  //     }catch(error){
  //       console.log("error",error)
  //     }
  //   }
  //   checkLoginStatus();
  // },[])

  const handleLogin=()=>{
    const user={
      email:email,
      password:password
    }
    axios.post("https://0a3c-2407-d000-405-6528-10b0-6816-2b9-fc8f.ngrok-free.app/login", user).then((resp)=>{
      console.log(resp);
      const token=resp.data.id;
      console.log(token);
      if (token!=="undefined"|| token!==''){
        AsyncStorage.setItem("authToken",token);
        AsyncStorage.setItem("id",resp.data.id);
        navigation.replace("home")
      }else{
        console.log("Error hy token ma")
      }
    }).catch((err)=>{
      Alert.alert("Login Error","Invalid email or Password")
      console.log("login error",err)
    })
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        alignItems: "center",
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            marginTop: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#4A55A2", fontSize: 17, fontWeight: 600 }}>
            Sign In
          </Text>
          <Text style={{ fontSize: 17, fontWeight: 600, marginTop: 15 }}>
            Sign in to your Account
          </Text>
        </View>
        <View style={{ marginTop: 50 }}>
          <View>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "gray" }}>
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 5,
                width: 300,
                fontSize: 18,
              }}
              placeholderTextColor={"black"}
              placeholder="Enter your Email"
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "gray" }}>
              Password
            </Text>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 5,
                width: 300,
                fontSize: 18,
              }}
              placeholderTextColor={"black"}
              placeholder="Enter your Password"
            />
          </View>
          <Pressable
            onPress={handleLogin}
            style={{
              marginTop: 50,
              width: 200,
              backgroundColor: "#4A55A2",
              padding: 15,
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Login
            </Text>
          </Pressable>
          <Pressable onPress={()=>navigation.navigate("register")} style={{ marginTop: 10 }}>
            <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
              Don't have an account? Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
