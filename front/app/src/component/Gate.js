import React, {Component} from 'react';
import '../css/gate.css'
import {Chat} from './Chat.js'
import {MeetForm} from "./MeetForm";
import {AuthForm} from "./AuthForm";
import $ from "jquery";
import {ToastContainer, toast} from 'react-toastify';

export class Gate extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            meets: [],
            currentMeet: '',
            showMeetForm: false,
            showAuthForm: false,
            meetToAuth: ''
        }

        this.accessMeet = this.accessMeet.bind(this)
        this.handleSubmitAuth = this.handleSubmitAuth.bind(this)
        this.handleSubmitMeet = this.handleSubmitMeet.bind(this)
        this.createMeet = this.createMeet.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.meetDb = this.meetDb.bind(this)
        this.getMeet = this.getMeet.bind(this)

        this.getMeet()
    }

    accessMeet(meet) {
        if (meet.isSecure) {
            this.setState({showAuthForm: true, showMeetForm: false, meetToAuth: meet.id})
        } else {
            this.setState({showMeetForm: false, showAuthForm: false, currentMeet: meet.id})
        }
    }

    createMeet() {
        this.setState({showMeetForm: true, showAuthForm: false, currentMeet: ''})
    }

    handleSubmitAuth(event) {
        event.preventDefault()
        let passwd = this.getHtmlInputValue('meet-to-auth-passwd')

        this.auth({
            meet: this.state.meetToAuth,
            passwd: this.getHtmlInputValue('meet-to-auth-passwd')
        })
    }

    getHtmlInputValue(name) {
        let value = ''
        let elems = document.getElementsByName(name)
        if (elems && elems.length > 0) {
            for (let input of elems) {
                value = input.value
            }
        }
        return value
    }

    handleSubmitMeet(event) {
        event.preventDefault()

        this.meetDb({
            'title': this.getHtmlInputValue('title'),
            'passwd': this.getHtmlInputValue('passwd')
        })
    }

    handleCancel() {
        this.setState({showMeetForm: false, showAuthForm: false, currentMeet: ''})
    }

    render() {
        let toastContain = <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
        />

        // chat list

        if (!this.state.currentMeet && !this.state.showMeetForm && !this.state.showAuthForm) {
            return (
                <div className={'chat-select container'}>
                    <button type="button" className="btn btn-secondary new-meet-button"
                            onClick={this.createMeet}>New
                    </button>
                    {
                        this.state.meets !== [] ?
                            this.state.meets.map((meet, key) => {
                                return <div key={key} className="card">
                                    <div className="card-header">
                                        {meet.title} {meet.isSecure ?
                                        <i className="fa-solid fa-user-secret"></i> : ''}
                                    </div>
                                    <div className="card-body">
                                        <button type="button" onClick={() => this.accessMeet(meet)}
                                                className="btn btn-dark">Access
                                        </button>
                                    </div>
                                </div>
                            })
                            : <h1>🔝 Be the first to create meet</h1>
                    }
                    {toastContain}
                </div>
            )
        }

        // forms
        if (this.state.showAuthForm) {
            return (
                <div className={'container gate-form'}>
                    <AuthForm handleCancel={this.handleCancel} handleSubmit={this.handleSubmitAuth}/>
                    {toastContain}
                </div>
            )
        }
        if (this.state.showMeetForm) {
            return (
                <div className={'container gate-form'}>
                    <MeetForm handleCancel={this.handleCancel} handleSubmit={this.handleSubmitMeet}/>
                    {toastContain}
                </div>
            )
        }

        // chat
        return (
            <div>
                <Chat meet={this.state.currentMeet}/>
                {toastContain}
            </div>
        )
    }

    meetDb(data) {
        let self = this

        $.ajax({
            dataType: 'json',
            url: process.env.REACT_APP_PROJECT_ROOT_URL + 'CreateMeet',
            data: data,
            method: 'POST',
            success(data) {
                toast("Meet created", {})
                setTimeout(() => {
                    self.handleCancel()
                }, "2000")
            },
            error(error) {
                toast("Unable to create meet", {})
            },
        });
    }

    getMeet() {
        let self = this

        $.ajax({
            dataType: 'json',
            url: process.env.REACT_APP_PROJECT_ROOT_URL + 'GetMeet',
            method: 'POST',
            success(data) {
                if (data) {
                    self.setState({meets: data[0]})
                }
            },
            error(error) {
                toast("Unable to get meet", {})
            },
        });

        setTimeout(this.getMeet, 2000);
    }

    auth(dataPost) {
        let self = this

        $.ajax({
            dataType: 'json',
            url: process.env.REACT_APP_PROJECT_ROOT_URL + 'AuthToMeet',
            method: 'POST',
            data: dataPost,
            success(data) {
                if (data) {
                    console.log(data)
                    if (data.isAuth === 1) {
                        toast("Wellcum ! 💦", {})

                        self.setState({currentMeet: dataPost.meet, showAuthForm: false, showMeetForm: false})
                    } else {
                        toast("Authentification failed 🙅", {})
                    }
                }

            },
            error(error) {
                toast("Authentification failed 🙅", {})
            },
        });
    }
}

