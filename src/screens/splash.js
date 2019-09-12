import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

class Splash extends React.Component {
    render() {
        return (
            <View style={style.container}>
                <Image source={require('../assets/img/195.jpg')} style={style.icon} />

            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: '100%',
        height: '50%',

    }
})

export default Splash

