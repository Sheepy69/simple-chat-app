import React, {Component} from 'react';
import PropTypes from "prop-types";
import Select from 'react-select'
import $ from 'jquery'
import {ToastContainer, toast} from 'react-toastify';

import '../css/chatwriter.css'

export class ChatWriter extends Component {
    constructor(props) {
        super(props);

        this.state = {inputContent: '', inputUser: ''}

        this.getOptions = this.getOptions.bind(this)
        this.send = this.send.bind(this)
        this.changeContent = this.changeContent.bind(this)
        this.changeUser = this.changeUser.bind(this)
    }

    render() {
        return (

            <idv>
                <div className="input-group">
                    <span className="input-group-text"><span><Select onChange={this.changeUser} options={this.getOptions()}/></span></span>
                    <textarea id={'message-to-send'} onChange={this.changeContent} className="form-control"
                              aria-label="With textarea"/>
                    <button className="btn btn-outline-secondary" type="button" onClick={this.send}>Send</button>
                </div>
                <ToastContainer
                    position="top-center"
                    autoClose={1000 }
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    draggable
                />
            </idv>
        )
    }


    getOptions() {
        let optionFormatted = [];

        this.props.users.map(user => {
            optionFormatted.push({label: user.nickname, value: user.id})
        })

        return optionFormatted;
    }

    changeContent(event) {
        if (!event.target.value) {
            return
        }

        this.setState({inputContent: event.target.value})
    }

    changeUser(optionSelected) {
        if(!optionSelected){
           return
        }

        this.setState({inputUser: optionSelected.value})
    }

    send(self) {
        if (!this.state.inputContent) {
            toast("Your message content is empty", {})
            return
        }

        $.ajax({
            url: 'http://localhost:80/chat/Controller/SendMessage.php',
            method: 'POST',
            data: {
                content: this.state.inputContent,
                user: this.state.inputUser,
            },
            success(data) {
                toast("Message sent", {})
            },
            error() {
                toast("Message not sent", {})
            },
        });
    }
}

ChatWriter.propTypes = {
    users: PropTypes.array.isRequired
};

