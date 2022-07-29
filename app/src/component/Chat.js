import React, {Component} from 'react';
import {Message} from "./Message";
import {ChatWriter} from "./ChatWriter";
import $ from 'jquery';


export class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {messages: [], users: []}

        this.getMessages = this.getMessages.bind(this)
        this.getUser = this.getUser.bind(this)

        this.getMessages()
    }

    render() {
        if (!this.state.messages) {
            return (<div className="spinner-border" role="status">
                <span className="sr-only"/>
            </div>)
        }
        return (
            <div>
                <div className={'container-md overflow-auto'}>
                    {
                        this.state.messages ?
                            this.state.messages.map(message => (
                                <Message color={this.getUser(message.user).color} content={message.content}
                                         user={this.getUser(message.user).nickname} date={message.created_at}/>
                            ))
                            : <div className="spinner-border" role="status">
                                <span className="sr-only"/>
                            </div>
                    }
                    </div>
                {
                    this.state.users ? <ChatWriter users={this.state.users}/> : <div/>
                }
            </div>
        )
    }

    getMessages() {
        let self = this
        $.ajax({
            dataType: 'json',
            url: process.env.REACT_APP_PROJECT_ROOT_URL + 'Controller/GetAppData.php',
            success(data) {
                if (data.messages) {
                    self.setState({messages: data.messages})
                }
                if (data.users) {
                    self.setState({users: data.users})
                }
            },
            error() {
                console.log('error')
            },
        });

        setTimeout(this.getMessages, 2000);
    }

    getUser(userId) {
        let randomUser = {nickname: 'anonymous', color: 'black'}

        if (this.state.users.length === 0) {
            return randomUser
        }


        let user = this.state.users.filter(user => user.id === userId);

        return user.length > 0 ? user[0] : randomUser
    }
}