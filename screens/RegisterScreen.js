import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

  const navigation = useNavigation();
  const handleRegister=()=>{
    const user={
      name:name,
      email:email,
      password:password,
      image:image
    }
//send a post request at backend to register the user
    axios.post("https://0a3c-2407-d000-405-6528-10b0-6816-2b9-fc8f.ngrok-free.app/register", user).then((res)=>{
      console.log(res)
      Alert.alert(
        "Registration Successful",
        "you have been registered successfully"
      );
      setName("");
      setEmail("");
      setPassword("");
      setImage("");
    }).catch((err)=>{
      Alert.alert(
        "Registration Error",
        "An Error occured during registration"
      )
      console.log("Registration Failed",err)
    })

  }
  return (
    <>
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
              Register
            </Text>
            <Text style={{ fontSize: 17, fontWeight: 600, marginTop: 15 }}>
              Register to your Account
            </Text>
          </View>

          <View style={{ marginTop: 50 }}>
            <View>
              <Text style={{ fontSize: 17, fontWeight: "600", color: "gray" }}>
                Name
              </Text>
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={{
                  borderBottomColor: "gray",
                  borderBottomWidth: 1,
                  marginVertical: 5,
                  width: 300,
                  fontSize: 18,
                }}
                placeholderTextColor={"black"}
                placeholder="Enter your Name"
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <View>
                <Text
                  style={{ fontSize: 17, fontWeight: "600", color: "gray" }}
                >
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

            <View style={{ marginTop: 10 }}>
              <View>
                <Text
                  style={{ fontSize: 17, fontWeight: "600", color: "gray" }}
                >
                  Image
                </Text>
                <TextInput
                  value={image}
                  onChangeText={(text) => setImage(text)}
                  style={{
                    borderBottomColor: "gray",
                    borderBottomWidth: 1,
                    marginVertical: 5,
                    width: 300,
                    fontSize: 18,
                  }}
                  placeholderTextColor={"black"}
                  placeholder="Place Image"
                />
              </View>
            </View>
            <Pressable
              onPress={handleRegister}
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
                Register
              </Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.goBack()}
              style={{ marginTop: 10 }}
            >
              <Text
                style={{ textAlign: "center", color: "gray", fontSize: 16 }}
              >
                Already have an account? Sign In
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
