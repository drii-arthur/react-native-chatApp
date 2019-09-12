import React from 'react'
import { Fragment, View, StyleSheet, AsyncStorage } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import firebase from 'firebase'
import { Auth, Database } from '../Firebase/db'
import Header from '../components/headerChat'
import { Bubble, MessageText } from 'react-native-gifted-chat'

class ChatRoom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.navigation.state.params.username,
            uid: this.props.navigation.state.params.id,
            image: this.props.navigation.state.params.image,
            status: this.props.navigation.state.params.status,
            text: '',
            messagesList: [],

        }
    }

    async componentDidMount() {
        this.setState({
            myuid: await AsyncStorage.getItem('uid'),
            myname: await AsyncStorage.getItem('username'),
            avatar: await AsyncStorage.getItem('image')
        })
        await firebase.database().ref('messages').child(this.state.myuid).child(this.state.uid)
            .on('child_added', (value) => {
                this.setState((previousState) => {
                    return {
                        messagesList: GiftedChat.append(previousState.messagesList, value.val()),
                    }
                })
            })
    }
    sendMessage = async () => {
        if (this.state.text.length > 0) {
            let msgId = firebase.database().ref('messages').child(this.state.myuid).child(this.state.uid).push().key;
            let updates = {};
            let message = {
                _id: msgId,
                text: this.state.text,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                user: {
                    _id: this.state.myuid,
                    username: this.state.myname,
                    avatar: this.state.avatar
                }
            }
            updates['messages/' + this.state.myuid + '/' + this.state.uid + '/' + msgId] = message;
            updates['messages/' + this.state.uid + '/' + this.state.myuid + '/' + msgId] = message;
            firebase.database().ref().update(updates)
            this.setState({ text: '' })

        }


    }

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#7bed9f',
                    }
                }}
            />
        )
    }

    renderMessageText(props) {
        return (
            <MessageText
                {...props}
                wrapperStyle={{
                    right: {
                        color: '#000'
                    }
                }}
            />
        )
    }

    render() {
        return (
            <>
                <Header name={this.state.username} image={this.state.image} status={this.state.status} />
                <GiftedChat
                    text={this.state.text}
                    messages={this.state.messagesList}
                    onSend={this.sendMessage}
                    showAvatarForEveryMessage={false}
                    renderBubble={this.renderBubble}
                    renderMessageText={this.renderMessageText}
                    user={{
                        _id: this.state.myuid,
                        name: this.state.myname,
                        // avatar: this.state.avatar
                    }}
                    onInputTextChanged={(value) => this.setState({ text: value })}
                />
            </>
        )
    }
}

export default ChatRoom