import React, { Component } from 'react'
import { Text, View, TouchableOpacity, AsyncStorage, Image } from 'react-native'
import Menu, { MenuItem } from 'react-native-material-menu';
import { withNavigation } from 'react-navigation';
import firebase from 'firebase';
import { Auth, Database } from '../Firebase/db'

class Header extends Component {
    state = {
        index: 0,
        name: null,
    }
    constructor(props) {
        super(props);
        this.buttonPress = this.buttonPress.bind(this);
    }

    componentDidMount = async () => {

    }

    _menu = null;
    setMenuRef = ref => {
        this._menu = ref;
    };

    showMenu = () => {
        this._menu.show();
    };

    Logout = async () => {
        const userToken = await AsyncStorage.getItem('uid');
        firebase.database().ref('/user/' + userToken).update({ status: "offline" })
        let keys = ['uid', 'username', 'image']
        await AsyncStorage.multiRemove(keys, (error) => {
            this.props.navigation.navigate('Login')
        });

    };

    buttonPress() {
        this._menu.hide();
        this.props.navigation.navigate('Profile', { name: this.props.name, uid: this.props.uid });
    };
    render() {
        const name = this.props.name
        return (
            <View style={{ paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#2ed573', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    <Text style={{ color: '#2f3542' }}>Cus</Text>
                    <Text style={{ color: 'tomato' }}>Chat</Text>
                </Text>
                <Menu
                    ref={this.setMenuRef}
                    button={<TouchableOpacity onPress={this.showMenu}>
                        <Image source={require('../assets/img/btn-more.png')} />
                    </TouchableOpacity>

                    }
                >
                    <MenuItem onPress={this.buttonPress} key={1} >My Profile</MenuItem>
                    <MenuItem key={2} onPress={this.Logout}>Logout</MenuItem>
                </Menu>
            </View>
        )
    }
}

export default withNavigation(Header)