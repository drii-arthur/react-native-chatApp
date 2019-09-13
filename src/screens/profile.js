import React, { Component } from 'react';
import { Dimensions, ScrollView, Image, Text, View, ImageBackground, TouchableOpacity, StyleSheet, AsyncStorage, Header } from 'react-native';
import { withNavigation } from 'react-navigation';
import Geocoder from 'react-native-geocoder';
import firebase from 'firebase'

class Profile extends Component {
    state = {
        username: this.props.navigation.state.params.username,
        uid: this.props.navigation.state.params.uid,
        users: [],
        address: null,
    }
    componentDidMount = async () => {
        await firebase.database().ref('user/' + this.state.uid).once('value', (result) => {
            let data = result.val();
            console.log(data)
            if (data !== null) {
                let users = data;
                this.setState({
                    users,
                })
            }
        })
        var pos = {
            lat: this.state.users.latitude,
            lng: this.state.users.longitude
        };

        await Geocoder.geocodePosition(pos).then(res => {
            this.setState({
                address: res[0].formattedAddress
            })
        })

    }
    Logout = async () => {
        const userToken = await AsyncStorage.getItem('uid');
        firebase.database().ref('/user/' + userToken).update({ status: "offline" })
        let keys = ['uid', 'username', 'image']
        await AsyncStorage.multiRemove(keys, (error) => {
            this.props.navigation.navigate('Login')
        });
        this.setState({
            users: []
        })


    };

    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        const address = this.state.address
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', backgroundColor: '#2ed573', paddingVertical: 10, elevation: 5, paddingHorizontal: 20 }}>
                    <TouchableOpacity onPress={this.goBack}>
                        <Image source={require('../assets/img/back.png')} style={{ marginTop: 5 }} />
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 25 }}>My Profile</Text>
                </View>

                <View style={styles.conImage}>
                    <Image style={styles.image} source={{ uri: `${this.state.users.image}` }} />
                </View>
                <View style={styles.inputContainer}>

                    <View style={styles.wrapper}>
                        <View style={styles.wrapperIcon}>
                            <Image source={require('../assets/img/man.png')} />
                        </View>
                        <View style={{ flex: 1, }}>
                            <Text style={styles.titleText}>Username </Text>
                            <Text style={styles.name}>{this.state.users.username}</Text>
                        </View>
                    </View>

                    <View style={styles.wrapper}>
                        <View style={styles.wrapperIcon}>
                            <Image source={require('../assets/img/information.png')} />
                        </View>
                        <View style={{ flex: 1, }}>
                            <Text style={styles.titleText}>status</Text>
                            {this.state.users.status == 'online' ? <Text style={{ color: 'green', fontSize: 16 }}>{this.state.users.status}</Text> : (<Text style={styles.status}> {this.state.users.status}</Text>)}

                        </View>
                    </View>

                    <View style={styles.wrapper}>
                        <View style={styles.wrapperIcon}>
                            <Image style={styles.place} source={require('../assets/img/placeholder.png')} />
                        </View>
                        <View style={{ flex: 1, }}>
                            <Text style={styles.titleText}>Location</Text>
                            <Text style={styles.address}> {address}</Text>
                        </View>
                    </View>

                    <View>
                        <TouchableOpacity onPress={this.Logout} style={styles.logoutButton} >
                            <Text style={[styles.buttonText]}>LOGOUT</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        )
    }
}
export default withNavigation(Profile);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    },
    conImage: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height * 0.3,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '48%',
        height: '90%',
        borderRadius: 110,
        borderWidth: 5,
        borderColor: 'white'
    },
    conText: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height * 0.6,
        backgroundColor: 'white',
        padding: 10,
        backgroundColor: 'tomato'
    },
    name: {
        fontSize: 16,
    },
    address: {
        fontSize: 14,
    },
    conAdd: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginVertical: 10,

    },
    place: {
        width: 20,
        height: 20
    },
    status: {
        fontSize: 16,
        color: '#6a717a'
    },
    logoutButton: {
        backgroundColor: '#2ed573',
        paddingVertical: 15,
        marginTop: 20,
        borderRadius: 25,
        elevation: 5
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    },
    inputContainer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height * 0.6,
        backgroundColor: 'white',
    },
    wrapper: {
        flexDirection: 'row',
        borderBottomColor: '#dfe4ea',
        borderBottomWidth: 1,
        marginBottom: 5,
        paddingVertical: 5
    },
    wrapperIcon: {
        justifyContent: 'center',
        width: '20%'
    },
    titleText: {
        marginBottom: 5,
        color: '#6a717a'
    }

});