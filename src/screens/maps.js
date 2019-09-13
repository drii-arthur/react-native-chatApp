import React, { Component } from 'react';
import { Dimensions, StatusBar, StyleSheet, View, AsyncStorage, Text, Image, ScrollView, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import geolocation from '@react-native-community/geolocation';
import firebase from 'firebase';
import { Auth, Database } from '../Firebase/db'
import { withNavigation } from 'react-navigation';


class Maps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapRegion: null,
            lastLat: null,
            lastLong: null,
            uid: null,
            users: [],

        }

    }

    async componentDidMount() {
        const uid = await AsyncStorage.getItem('uid')
        this.setState({ uid });
        this.setState({ refreshing: true });
        firebase.database().ref('user').on('child_added', (data) => {
            let person = data.val();
            person.id = data.key;
            if (person.id != this.state.uid) {
                this.setState((prevData) => {
                    return {
                        users: [...prevData.users, person]
                    }
                })
                this.setState({ refreshing: false });
            }
        })
        this.watchID = geolocation.getCurrentPosition((position) => {
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.00922 * 1.5,
                longitudeDelta: 0.00421 * 1.5
            }
            this.onRegionChange(region, region.latitude, region.longitude);
        }, (error) => console.log(error));

    }

    onRegionChange(region, lastLat, lastLong) {
        this.setState({
            mapRegion: region,
            lastLat: lastLat || this.state.lastLat,
            lastLong: lastLong || this.state.lastLong
        });
    }

    render() {
        console.warn(this.state.users)
        return (
            <View style={styles.con}>
                <StatusBar backgroundColor='#2ed573' />
                <MapView
                    style={styles.map}
                    region={this.state.mapRegion}
                    showsUserLocation={true}
                    followUserLocation={true}
                    zoomControlEnabled={true}
                    showsCompass={true}
                    minZoomLevel={0}
                    maxZoomLevel={20}

                >
                    {this.state.users.map((item, index) =>

                        <Marker
                            key={index}
                            title={item.username}
                            description={item.status}
                            onCalloutPress={() => { this.props.navigation.navigate('ChatRoom', item) }}
                            coordinate={{
                                latitude: item.latitude || 0,
                                longitude: item.longitude || 0
                            }}>
                            {item.status == 'online' ?
                                <View style={styles.mapCoor}>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={styles.image} />

                                </View>
                                :
                                <View style={styles.mapCoorOffline}>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={styles.image} />

                                </View>}
                            <Text style={styles.name}>{item.username}</Text>
                        </Marker>

                    )}
                </MapView>
            </View>
        );
    }
}
export default withNavigation(Maps);
const styles = StyleSheet.create({
    con: {
        flex: 1,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height
    },
    map: {
        width: '100%',
        height: '100%'
    },
    mapCoor: {
        height: 40,
        width: 40,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#2ed573',
        borderRadius: 50,
        justifyContent: 'center'
    },
    mapCoorOffline: {
        height: 40,
        width: 40,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'tomato',
        borderRadius: 50,
        justifyContent: 'center'
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 50,
    },
    name: {
        fontSize: 10,
        textAlign: 'center',
        marginBottom: '2%'
    }
})