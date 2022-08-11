import React, {Component, useEffect, useState} from 'react';
import {Message} from "./Message";
import {ChatWriter} from "./ChatWriter";
import $ from 'jquery';

import '../css/chat.css'
import PropTypes from "prop-types";
import {AuthForm} from "./AuthForm";


export class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            users: [],
            currentUser: '',
            currentPosition: 'left',
            firstBottomScroll: true,
            lastMessageIsVisible: true
        }

        this.getMessages = this.getMessages.bind(this)
        this.getUser = this.getUser.bind(this)

        this.getMessages()
    }

    handleArrowDownClick(event) {
        event.preventDefault()
        this.scrollToBottom()
    }

    isVisible(ele) {
        const {top, bottom} = ele.getBoundingClientRect();
        const vHeight = (window.innerHeight || document.documentElement.clientHeight);

        return (
            (top > 0 || bottom > 0) &&
            top < vHeight
        );
    }

    render() {
        if (!this.state.messages) {
            return (<div className="spinner-border" role="status">
                <span className="sr-only"/>
            </div>)
        }

        return (
            <div>
                {
                    !this.state.lastMessageIsVisible ?
                        <a href={''} onClick={(event) => this.handleArrowDownClick(event)}
                           className={'scroll-down-button'}><i
                            className="fa-solid fa-circle-arrow-down fa-3x"></i></a> : <div></div>
                }

                {this.state.messages.length === 0 ?
                    <div style={{'text-align': 'center', 'margin-bottom': '20px', 'font-size': '150px'}}>
                        🙌
                        <h1>Send first message ...</h1>
                        <div>⬇</div>
                    </div> :
                    <div/>}
                <div className={'container-md overflow-auto chat'}>
                    {
                        this.state.messages ?
                            this.state.messages.map((message, key) => {
                                return <div key={key}
                                            className={message.orderContainer}>

                                    <Message className={message.orderMessage}
                                             color={this.getUser(message.user).color}
                                             content={message.content}
                                             user={message.user} date={message.created_at}/>
                                </div>
                            })
                            : <div className="spinner-border" role="status">
                                <span className="sr-only"/>
                            </div>
                    }
                    <div ref={(el) => {
                        this.messagesEnd = el;
                    }}/>
                </div>
                {
                    this.state.users ? <ChatWriter users={this.state.users} meet={this.props.meet}/> : <div/>
                }
            </div>
        )
    }

    scrollToBottom() {
        this.messagesEnd.scrollIntoView({behavior: "smooth"});
    }

    componentDidMount() {
        this.scrollToBottom()
    }

    componentDidUpdate() {
        if (this.state.firstBottomScroll) {
            this.scrollToBottom()

            this.setState({firstBottomScroll: false})
        }
    }

    formatMessage(messages) {
        if (!messages) {
            return messages;
        }

        const swapContainerClass = (currentContainerClass, container = true) => {
            return currentContainerClass === 'container-message-left' ? 'container-message-right' : 'container-message-left'
        }

        const swapMessageClass = (currentMessageClass) => {
            return currentMessageClass === 'message message-left' ? 'message message-right' : 'message message-left'
        }


        let prevUser = '';
        let currentUser = '';
        let currentContainerClass = 'container-message-right'
        let currentMessageClass = 'message-right'
        let newMessages = []

        messages.map((message, key) => {
            if ((key % 2) === 0 || key === 0) {
                currentUser = message.user
            } else {
                prevUser = message.user
            }

            // handle left right
            if (prevUser !== currentUser) {
                currentContainerClass = swapContainerClass(currentContainerClass)
                currentMessageClass = swapMessageClass(currentMessageClass)
            }

            // handle group message
            let groupClass = ''
            if (messages[key - 1] && messages[key + 1]) {
                groupClass = messages[key - 1].user === messages[key + 1].user ? ' grouped' : '';
            }

            let newMessage = {
                user: message.user,
                id: message.id,
                content: message.content,
                created_at: message.created_at,
                orderContainer: currentContainerClass,
                orderMessage: currentMessageClass + groupClass,
            }

            newMessages.push(newMessage)
        })

        return newMessages
    }

    getMessages() {
        let self = this
        $.ajax({
            dataType: 'json',
            url: process.env.REACT_APP_PROJECT_ROOT_URL + 'GetAppData',
            method : 'POST',
            data : {meet: self.props.meet},
            success(data) {
                if (data.users) {
                    self.setState({users: data.users})
                }

                if (data.messages) {
                    let messages = data.messages
                    self.setState({messages: self.formatMessage(messages)})

                    // add arrow down when last message isn't visible : from get messages every 1 sec call
                    if (self.messagesEnd && !self.isVisible(self.messagesEnd)) {
                        self.setState({lastMessageIsVisible: false})
                    } else {
                        self.setState({lastMessageIsVisible: true})
                    }
                }
            },
            error(error) {
                console.log('error')
            },
        });

        setTimeout(this.getMessages, 2000);
    }

    getUser(nickname) {
        let randomUser = {nickname: 'anonymous', color: 'black'}

        if (this.state.users.length === 0) {
            return randomUser
        }

        let user = this.state.users.filter(user => user.nickname === nickname);

        return user.length > 0 ? user[0] : randomUser
    }
}

Chat.propTypes = {
    meet: PropTypes.string.isRequired
};
