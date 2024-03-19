import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StackNavigator from './stackNavigator.js';
import { UserContext } from './UserContext.js';

const App = () => {
  return (
    <>
    <UserContext>
     <StackNavigator/>
    </UserContext>
    </>
  )
}

export default App

const styles = StyleSheet.create({})