import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import HomeScreen from '../screens/home'
import MapsScreen from '../screens/maps'
import Chat from '../screens/chat'
import Login from '../screens/login'
import Register from '../screens/register'
import Profile from '../screens/profile'
import Splash from '../screens/splash'
import ProfileFriend from '../screens/profileFriends'
import ChatRoom from '../screens/chatroom'
import Loading from '../screens/auth'

const AppStack = createStackNavigator({
    Home: { screen: HomeScreen },
    Maps: { screen: MapsScreen },
    // Chat: { screen: Chat },
    Profile: { screen: Profile },
    Friend: { screen: ProfileFriend },
    ChatRoom: { screen: ChatRoom }
}, {
    headerMode: 'none'
})

const authStack = createStackNavigator({
    Login: Login
})

const createSwitch = createSwitchNavigator({
    authScreen: { screen: Loading },
    Splash: { screen: Splash },
    Login: { screen: Login },
    Register: { screen: Register },
    App: AppStack,
    Auth: authStack,

},
    {
        initialRouteName: 'authScreen'

    })

export default AppNavigator = createAppContainer(createSwitch)