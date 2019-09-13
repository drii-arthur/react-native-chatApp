
import React, { Component } from 'react';
import { Dimensions, ScrollView, Image, Text, View, ImageBackground, TouchableOpacity, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import Geocoder from 'react-native-geocoder';

class ProfileFriend extends Component {
    state = {
        data: this.props.navigation.state.params.data,
        username: this.props.navigation.state.params.data.username,
        status: this.props.navigation.state.params.data.status,
        image: this.props.navigation.state.params.data.image,
        latitude: this.props.navigation.state.params.data.latitude,
        longitude: this.props.navigation.state.params.data.longitude,
        address: null,
    };
    constructor(props) {
        super(props);
        this.buttonPress = this.buttonPress.bind(this);
        this.buttonPress2 = this.buttonPress2.bind(this);

    }
    buttonPress() {
        this.props.navigation.navigate('ChatRoom', { data: this.state.data });
    }

    buttonPress2() {
        this.props.navigation.navigate('Maps', { data: this.state.data });
    }
    componentDidMount = async () => {
        var pos = {
            lat: this.state.latitude,
            lng: this.state.longitude
        };

        Geocoder.geocodePosition(pos).then(res => {
            this.setState({
                address: res[0].formattedAddress
            })
        })
    }

    goBack = () => {
        this.props.navigation.goBack()
    }


    render() {

        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', backgroundColor: '#2ed573', paddingVertical: 10, elevation: 5, paddingHorizontal: 20 }}>
                    <TouchableOpacity onPress={this.goBack}>
                        <Image source={require('../assets/img/back.png')} style={{ marginTop: 5 }} />
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 25 }}>Profile</Text>
                </View>

                <View style={styles.conImage}>
                    <Image style={styles.image} source={{ uri: `${this.state.image}` }} />
                </View>
                <View style={styles.inputContainer}>

                    <View style={styles.wrapper}>
                        <View style={styles.wrapperIcon}>
                            <Image source={require('../assets/img/man.png')} />
                        </View>
                        <View style={{ flex: 1, }}>
                            <Text style={styles.titleText}>Username </Text>
                            <Text style={styles.name}>{this.state.username}</Text>
                        </View>
                    </View>

                    <View style={styles.wrapper}>
                        <View style={styles.wrapperIcon}>
                            <Image source={require('../assets/img/information.png')} />
                        </View>
                        <View style={{ flex: 1, }}>
                            <Text style={styles.titleText}>status</Text>
                            {this.state.status == 'online' ? <Text style={{ color: 'green', fontSize: 16 }}>{this.state.status}</Text> : (<Text style={styles.status}> {this.state.status}</Text>)}

                        </View>
                    </View>

                    <View style={styles.wrapper}>
                        <View style={styles.wrapperIcon}>
                            <Image style={styles.place} source={require('../assets/img/placeholder.png')} />
                        </View>
                        <View style={{ flex: 1, }}>
                            <Text style={styles.titleText}>Location</Text>
                            <Text style={styles.address}> {this.state.address}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ flex: 3, }}>
                            <TouchableOpacity onPress={this.buttonPress2} style={styles.mapsButton} >
                                {/* <Image source={require('../assets/img/maps.png')} style={{ marginHorizontal: 10 }} /> */}
                                <Text style={[styles.buttonText]}>Maps</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={this.buttonPress} style={styles.chatButton}>
                                <Text style={styles.buttonText}>Chat</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

            </View >
        )
    }
}
export default withNavigation(ProfileFriend);
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
        marginTop: '10%',
        marginBottom: '10%'
    },
    status: {
        fontSize: 16,
        color: 'red'
    },
    chatButton: {
        backgroundColor: '#2ed573',
        paddingVertical: 15,
        marginTop: 20,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        borderColor: '#4b4b4b',
        borderWidth: 1,
    },
    mapsButton: {
        // backgroundColor: '#fffa65',
        paddingVertical: 15,
        marginTop: 20,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        borderColor: '#4b4b4b',
        borderWidth: 1,
        // flexDirection: 'row'
    },
    buttonText: {
        textAlign: 'center',
        color: '#000',
        fontWeight: '700',
        // textAlign: 'center'

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
