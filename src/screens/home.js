import React from 'react'
import { View, Text, StyleSheet, Dimensions, indicatorStyle, AsyncStorage, StatusBar } from 'react-native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'


import Chat from '../screens/chat'
import MapsScreen from '../screens/maps'
import FriendList from '../screens/frienList'
import Header from '../components/headers'


class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            routes: [
                { key: 'Chat', title: 'Chat' },
                { key: 'Maps', title: 'Maps' },
                { key: 'Friends', title: 'Friends' }
            ]
        }
        AsyncStorage.getItem('username').then((value) => {
            this.setState({
                name: value,
            })
        })
        AsyncStorage.getItem('uid').then((value) => {
            this.setState({
                uid: value,
            })
        })
    }

    render() {
        return (
            <View style={style.container}>
                <StatusBar backgroundColor='#2ed573' />
                <Header name={this.state.name} uid={this.state.uid} />
                <TabView style={{ backgroundColor: '#fff' }}
                    navigationState={this.state}
                    renderScene={SceneMap({
                        Chat: Chat,
                        Maps: MapsScreen,
                        Friends: FriendList,
                    })}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: Dimensions.get('window').width }}
                    renderTabBar={props =>
                        <TabBar
                            {...props}
                            indicatorStyle={{ backgroundColor: 'white' }}
                            style={style.tabNav}
                            labelStyle={style.labelStyle}
                        />
                    }
                />
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    scene: {
        flex: 1,
    },
    tabNav: {
        backgroundColor: '#2ed573',
        paddingVertical: 0
    },
    labelStyle: {
        fontSize: 14,
        fontWeight: '700',
    }
})

export default HomeScreen