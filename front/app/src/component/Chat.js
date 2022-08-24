import React, {Component, Fragment, useEffect, useState} from 'react';
import {Message} from "./Message";
import {ChatWriter} from "./ChatWriter";
import {Popup} from "./Popup";
import {ParamMenu} from "./ParamMenu";
import $ from 'jquery';

import '../css/chat.css'
import PropTypes from "prop-types";

export class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            users: [],
            currentUser: '',
            currentPosition: 'left',
            firstBottomScroll: true,
            lastMessageIsVisible: true,
            paramPopup: false
        }

        this.getMessages = this.getMessages.bind(this)
        this.getUser = this.getUser.bind(this)
        this.handlePopupParam = this.handlePopupParam.bind(this)

        this.getMessages()
    }

    handlePopupParam(e) {
        e.preventDefault()
        this.setState({paramPopup: this.state.paramPopup === true ? false : true})
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
                { /* Go back down arrow */}
                {
                    !this.state.lastMessageIsVisible ?
                        <a href={''} onClick={(event) => this.handleArrowDownClick(event)}
                           className={'scroll-down-button'}><i
                            className="fa-solid fa-circle-arrow-down fa-3x"></i></a> : <div></div>
                }

                { /* Params */}
                <a href={'#'} className={'meet-parameter-link'} onClick={(e) => this.handlePopupParam(e)}>
                    <i className="fa-solid fa-gear fa-3x"></i>
                </a>
                {
                    this.state.paramPopup ? <Popup
                        reactElement={<div className={'param-menu-container'}>

                            <ParamMenu meet={this.props.meet}/>

                            <a className={'btn btn-secondary'} href={'#'}
                               onClick={(e) => this.handlePopupParam(e)}>Close</a>
                        </div>}/> : ''
                }

                { /* Messages */}
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
                                            className={'chat-message'}>

                                    <Message className={'my-chat-message'}
                                             color={this.getUser(message.user).color}
                                             content={message.content}
                                             user={this.getUser(message.user).nickname}
                                             date={message.diff_date}
                                    />
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
                    this.state.users ? <ChatWriter users={this.state.users} meet={this.props.meet}/> :
                        <div/>
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

    getMessages() {
        let self = this
        $.ajax({
            dataType: 'json',
            url: process.env.REACT_APP_PROJECT_ROOT_URL + 'GetAppData',
            method: 'POST',
            data: {meet: self.props.meet},
            success(data) {
                if (data.users) {
                    self.setState({users: data.users})
                }

                if (data.messages) {
                    let messages = data.messages
                    self.setState({messages: messages})

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

        setTimeout(this.getMessages, 500);
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
