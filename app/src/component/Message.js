import React, {Component} from 'react';
import PropTypes from 'prop-types';

import '../css/messages.css'
import $ from "jquery";
import {toast} from "react-toastify";

export class Message extends Component {
    constructor(props) {
        super(props);

        this.isFile = this.isFile.bind(this)
        this.showFile = this.showFile.bind(this)
    }

    render() {
        return (
            this.isFile() === true
                ? <div className={'message'}>
                    <p><span className={'nickname'}
                             color={this.props.color}>{this.props.user}></span><a href={'#'}
                                                                                  onClick={this.showFile}>{this.props.content}</a>[{this.props.date}]
                    </p>
                </div>
                : <div className={'message'}>
                    <p><span className={'nickname'}
                             color={this.props.color}>{this.props.user}></span>{this.props.content} [{this.props.date}]
                    </p>
                </div>
        )
    }

    showFile(event) {
        event.preventDefault()

        $.ajax({
            url: 'http://localhost:80/chat/Controller/GetFile.php',
            method: 'POST',
            data: {image : this.props.  content},
            success(data) {
                window.open(
                    data.image,
                    '_blank' // <- This is what makes it open in a new window.
                );
                toast("File received", {})
            },
            error() {
                toast("File not received", {})
            },
        });
    }

    isFile() {
        let isFile = false
        let fileFormat = ['jpg', 'png', 'jpeg']

        fileFormat.forEach(format => {
            if (this.props.content.indexOf(format) !== -1) {
                isFile = true
            }
        })

        return isFile
    }

}

Message.propTypes = {
    user: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
};


