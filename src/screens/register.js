import React from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, StatusBar, ScrollView, Dimensions } from 'react-native'
import firebase from 'firebase'
import { Auth, Database } from '../Firebase/db'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            id_user: '',
            username: '',
            isLoading: false,
        }
    };

    register = async () => {
        this.setState({ isLoading: true })
        if (this.state.email.length < 4) {
            Alert.alert('Email Invalid')
        } else if (this.state.password.length < 4) {
            Alert.alert('please input password more than 2')
        } else if (this.state.username.length < 3) {
            Alert.alert('please input Name more than 3')
        } else {
            await firebase.auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(({ user }) => {
                    this.setState({ isLoading: false })
                    var userf = firebase.auth().currentUser;
                    userf.updateProfile({ displayName: this.state.username, photoURL: this.state.image })
                    firebase.database().ref('user/' + user.uid).set({
                        username: this.state.username,
                        image: 'https://res.cloudinary.com/dbhwvh1mf/image/upload/v1566321024/img/blank-profile-picture-973460_960_720_wolhdp.png',
                        id: user.uid,
                        status: 'offline'
                    })
                })
            this.props.navigation.navigate('Login')
        }
    }
    render() {
        return (
            <ScrollView style={style.scrollContainer}>
                <View style={style.container}>
                    <StatusBar backgroundColor='#2ecc71' />
                    <Image source={require('../assets/img/195.jpg')} style={style.icon} />
                    <Text style={{ marginBottom: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#485460' }}>Welcome to <Text style={{ color: '#2ed573' }}>Cus<Text style={{ color: 'tomato' }}>Chat</Text></Text></Text>
                    </Text>
                    <View style={style.form}>
                        <TextInput
                            style={style.input}
                            placeholder='username...'
                            returnKeyType='next'
                            onChangeText={(text) => this.setState({ username: text })}
                            value={this.state.username} />

                        <TextInput
                            style={style.input}
                            keyboardType='email-address'
                            placeholder='email addres...'
                            returnKeyType='next'
                            maxLength={40}
                            onChangeText={(text) => this.setState({ email: text })}
                            value={this.state.email}
                            autoCapitalize='none'
                            autoCorrect={false} />

                        <TextInput
                            style={style.input}
                            secureTextEntry={true}
                            placeholder='password...'
                            returnKeyType='go'
                            secureTextEntry
                            onChangeText={(text) => this.setState({ password: text })}
                            value={this.state.password} />

                        <TouchableOpacity style={style.btnLogin} onPress={this.register}>
                            <Text style={style.textLogin}>Register</Text>
                        </TouchableOpacity>

                        <View style={style.toRegis}>
                            <Text style={style.textToRegis}>have an account?</Text>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Login') }}>
                                <Text style={{ color: '#636e72' }}>
                                    SignIn
                        </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: '#fff',
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20,
    },
    icon: {
        width: '60%',
        height: 120,
        marginVertical: 30
    },
    form: {
        flex: 1,
        width: '100%',
    },
    input: {
        borderColor: '#dfe4ea',
        borderWidth: 1,
        borderRadius: 25,
        marginVertical: 10,
        paddingLeft: 20
    },
    btnLogin: {
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: '#2ed573',
        borderRadius: 25,
        paddingVertical: 10,
        elevation: 5,
    },
    textLogin: {
        color: '#fff',
        fontSize: 20
    },
    toRegis: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'flex-end',
        paddingRight: 20
    },
    textToRegis: {
        color: '#dfe4ea'
    }
})



export default Register