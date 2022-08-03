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
            <div style={{'background': '#' + this.props.color}}
                 className={this.props.className}>
                <p className={'nickname'}>{this.props.user} <i className="fa-solid fa-user"></i></p>
                <p>
                    {
                        this.isFile() === true
                            ? <div><a href={'#'} onClick={this.showFile}><i
                                className="fa-solid fa-image fa-10x"></i></a> 🤫 (Click ⬆️ for image)</div>
                            : this.props.content
                    }
                </p>
            </div>
        )
    }

    showFile(event) {
        event.preventDefault()

        $.ajax({
            url: process.env.REACT_APP_PROJECT_ROOT_URL + 'GetFile.php',
            method: 'POST',
            data: {image: this.props.content},
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
    className: PropTypes.string.isRequired,
};


