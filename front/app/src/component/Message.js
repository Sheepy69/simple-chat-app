import React, {Component} from 'react';
import PropTypes from 'prop-types';

import '../css/messages.css'
import $ from "jquery";
import {toast} from "react-toastify";
import {Popup} from "./Popup";

import moment from 'moment';

import {UserContext} from '../App.js';


export class Message extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.isFile = this.isFile.bind(this)
        this.showFile = this.showFile.bind(this)
        this.zoom = this.zoom.bind(this)

        this.state = {showMedia: false, media: '', zoomMedia: false, currentUser : UserContext.Consumer._currentValue}
    }

    zoom() {
        this.setState({zoomMedia: this.state.zoomMedia !== true})
    }

    render() {
        let className = this.props.user === this.state.currentUser.nickname ? ' my-chat-message' : ''

        return (
            <div className={'card message' + className}
                 style={{'background' : '#' + this.props.color}}>
                <div className="card-header">
                    <h5 className="card-title">{this.props.user} <i className="fa-solid fa-user"></i></h5>
                </div>
                <div className="card-body">
                    <p>
                        {
                            (this.isFile() === true) ?
                                <>
                                    {
                                        (this.state.showMedia === false) ?
                                            <div>
                                                <button className={'btn btn-dark'} onClick={this.showFile}>Show media 🤫
                                                </button>
                                            </div>
                                            : <div>
                                                <a href={'#'} onClick={() => this.zoom()}>
                                                    <img width="150" height="150" className={'media-image'}
                                                         src={this.state.media} alt={''}/>
                                                </a>
                                            </div>
                                    }
                                </>
                                : this.props.content
                        }
                        {
                            (this.state.zoomMedia === true) ? <Popup reactElement={
                                <div className={'zoom-area'}>
                                    <button className={'btn btn-secondary'} onClick={() => this.zoom()}>Back</button>
                                    <img
                                        className={'media-image'}
                                        src={this.state.media} alt={''}/>
                                </div>
                            }/> : ''
                        }
                    </p>
                </div>

                <div className="card-footer">
                    <small className={'toc-entry text-secondary'}>{this.props.date}</small>
                </div>
            </div>
        )
    }

    showFile(event) {
        event.preventDefault()

        let self = this

        $.ajax({
            url: process.env.REACT_APP_PROJECT_ROOT_URL + 'GetFile',
            method: 'POST',
            data: {image: this.props.content},
            success(data) {
                self.setState({showMedia: true, media: data.image})
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


