import React, {Component} from 'react';
import PropTypes from 'prop-types';

import '../css/messages.css'
import $ from "jquery";
import {toast} from "react-toastify";
import {Popup} from "./Popup";

import moment from 'moment';

export class Message extends Component {
    constructor(props) {
        super(props);

        this.isFile = this.isFile.bind(this)
        this.showFile = this.showFile.bind(this)
        this.zoom = this.zoom.bind(this)

        this.state = {showMedia: false, media: '', zoomMedia: false}
    }

    formatDateInfo(date) {
        let today = moment();
        let dateObject = moment(this.props.date);

        let diffMins = today.diff(dateObject, 'minutes')

        if (diffMins === 0) {
            return 'from now'
        }

        if (diffMins < 59) {
            return 'from ' + diffMins + ' mins'
        }

        let hoursDiff = today.diff(dateObject, 'hours')
        if (hoursDiff < 24) {
            return 'from ' + String(hoursDiff)[0] + 'h '
        }

        return 'from ' + today.diff(dateObject, 'days') + ' days'
    }

    zoom() {
        this.setState({zoomMedia: this.state.zoomMedia !== true})
    }

    render() {
        let dateInfo = this.formatDateInfo(this.props.date)

        return (
            <div style={{'background': '#' + this.props.color}}
                 className={this.props.className}>
                <p className={'nickname'}>{this.props.user} <i className="fa-solid fa-user"></i></p>
                <p>
                    {
                        (this.isFile() === true) ?
                            <>
                                {
                                    (this.state.showMedia === false) ?
                                        <div>
                                            <button className={'btn btn-dark'} onClick={this.showFile}>Show media 🤫</button>
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
                <small className={'toc-entry text-secondary'}>{dateInfo}</small>
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


