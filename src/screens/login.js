import React from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, AsyncStorage, Alert, Dimensions, KeyboardAvoidingView, ScrollView, StatusBar } from 'react-native'
import firebase from 'firebase'
import { Auth, Database } from '../Firebase/db'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false,
        };
    }
    onPressLogin = async () => {
        this.setState({ isLoading: true })
        await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(async (result) => {
                await firebase.database().ref('/user/' + result.user.uid).update({ status: 'online' })
                this.setState({ isLoading: false })
                AsyncStorage.setItem('uid', result.user.uid);
                AsyncStorage.setItem('username', result.user.displayName);
                AsyncStorage.setItem('image', result.user.image);
                AsyncStorage.getItem('uid', (error, result) => {
                    if (result) {
                        this.setState({
                            email: '',
                            password: ''
                        })

                        Alert.alert(
                            'Login',
                            'Login Success',
                            [
                                { text: 'OK', onPress: () => this.props.navigation.navigate('Home') },
                            ],
                        );
                    } else {
                        Alert.alert('wrong password or email')
                    }
                })
            }).catch(async (err) => {
                this.setState({
                    isLoading: false
                })
            })
    }
    render() {
        return (
            <ScrollView style={style.scrollContainer}>
                <KeyboardAvoidingView behavior='padding' style={style.container} >
                    <StatusBar backgroundColor='#2ecc71' />
                    <Image source={require('../assets/img/195.jpg')} style={style.icon} />
                    <Text style={{ marginBottom: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#485460' }}>Welcome back to <Text style={{ color: '#2ed573' }}>Cus<Text style={{ color: 'tomato' }}>Chat</Text></Text></Text>
                    </Text>
                    <View style={style.form}>
                        <TextInput
                            style={style.input}
                            keyboardType='email-address'
                            placeholder='email address...'
                            returnKeyType='next'
                            onSubmitEditing={() => this.passwordInput.focus()}
                            onChangeText={(text) => this.setState({ email: text })}
                            value={this.state.email}
                            keyboardType={'email-address'}
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                        <TextInput
                            style={style.input}
                            secureTextEntry={true}
                            placeholder='password...'
                            returnKeyType='go'
                            onChangeText={(text) => this.setState({ password: text })}
                            value={this.state.password}
                            ref={(input) => this.passwordInput = input}
                        />
                        <TouchableOpacity style={style.btnLogin} onPress={this.onPressLogin}>
                            <Text style={style.textLogin}>Login</Text>
                        </TouchableOpacity>
                        <View style={style.toRegis}>
                            <Text style={style.textToRegis}>Don`t have account?</Text>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Register') }}>
                                <Text style={{ color: '#636e72' }}>
                                    SignUp
                        </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    scrollContainer: {
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',
    },
    icon: {
        width: '60%',
        height: 120,
        marginVertical: 30,

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



export default Login