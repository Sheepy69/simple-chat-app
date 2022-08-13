import React, {Component} from 'react';
import PropTypes from "prop-types";
import Select from 'react-select'
import $ from 'jquery'
import {ToastContainer, toast} from 'react-toastify';
import {Popup} from "./Popup";
import '../css/chatwriter.css'
import {UserContext} from '../App.js';

export class ChatWriter extends Component {
    refInputFile
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            inputContent: '',
            inputUser: '',
            inputFile: '',
            popupDisplay: false,
            user: UserContext.Consumer._currentValue
        }

        this.getOptions = this.getOptions.bind(this)
        this.send = this.send.bind(this)
        this.changeContent = this.changeContent.bind(this)
        this.changeUser = this.changeUser.bind(this)
        this.uploadFile = this.uploadFile.bind(this)

        this.triggerFilePopup = this.triggerFilePopup.bind(this)
    }

    render() {
        /*<Select styles={{'display': 'none'}} menuPlacement={'top'} onChange={this.changeUser}
                             options={this.getOptions()}/>*/

        return (
            <div className={'chatwriter'}>
                <div className="input-group">
                    <button className="btn btn-secondary" type="button" onClick={() => this.triggerFilePopup()}><i
                        className="fa-solid fa-image fa-lg"></i></button>
                    <input id={'message-to-send'} value={this.state.inputContent} onChange={this.changeContent}
                           className="form-control"
                           aria-label="With textarea"/>
                    <button className="btn btn-info" type="button" onClick={this.send}>Send</button>
                </div>

                {
                    this.state.popupDisplay
                        ? <Popup reactElement={<div>
                            <form onSubmit={this.uploadFile}>
                                <input className="form-control form-control-lg" id="formFileLg" type={'file'}/>
                                <input type={'hidden'} value={this.state.inputUser}/>
                                <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                            </form>
                            <button className="btn btn-info btn-lg" onClick={() => this.triggerFilePopup()}>Close</button>
                            <ToastContainer
                                position="top-center"
                                autoClose={1000}
                                hideProgressBar={true}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                draggable
                            />
                        </div>}/>
                        : <div/>
                }

                <ToastContainer
                    position="top-center"
                    autoClose={1000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    draggable
                />
            </div>
        )
    }

    triggerFilePopup() {
        this.setState({popupDisplay: this.state.popupDisplay === true ? false : true})
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
        if (!optionSelected) {
            return
        }

        this.setState({inputUser: optionSelected.value})
    }

    send() {
        let self = this
        if (!this.state.inputContent) {
            toast("Your message content is empty", {})
            return
        }

        $.ajax({
            url: process.env.REACT_APP_PROJECT_ROOT_URL + 'SendMessage',
            method: 'POST',
            data: {
                content: this.state.inputContent,
                user: this.state.user.nickname,
                meet: this.props.meet
            },
            success(data) {
                self.setState({inputContent: ''})
                toast("Message sent", {})
            },
            error(xhr) {
                toast(xhr.responseText, {})
                toast("Message not sent", {})
            },
        });
    }

    uploadFile(event) {
        event.preventDefault()

        let files = $(event.target).find('input').prop('files')
        if (files.length === 0) {
            toast("File isn't select", {})
            return
        }

        let formData = new FormData();
        formData.append(
            "content",
            files[0],
        );
        formData.append(
            "meet",
            this.props.meet,
        );
        formData.append(
            "user",
            this.state.user.nickname
        );


        $.ajax({
            url: process.env.REACT_APP_PROJECT_ROOT_URL + 'UploadFile',
            method: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success(data) {
                toast("File sent", {})
            },
            error(xhr, status, error) {
                toast("File not sent", {})
            },
        });
    }
}

ChatWriter.propTypes = {
    users: PropTypes.array.isRequired,
    meet: PropTypes.string.isRequired
};

