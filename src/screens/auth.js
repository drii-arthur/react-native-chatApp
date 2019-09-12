import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';
import Login from './login';
import firebase from 'firebase'

export default class Loading extends React.Component {
    state = {
        uid: null,
        isLoading: true,
    };
    constructor(props) {
        super(props);

    }

    componentDidMount = async () => {
        await AsyncStorage.getItem('uid').then((value) => {
            this.setState({
                uid: value,
                isLoading: false,
            })
        })
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.isLoading == false ? this.state.uid == null ?
                    (this.props.navigation.navigate('Login')) :
                    (this.props.navigation.navigate('Home')) : <ActivityIndicator color={'white'} size={'large'} />}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})