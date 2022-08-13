import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {UserForm} from './UserForm.js'
import logo from '../media/random-user.png'
import $ from "jquery";

import '../css/userarea.css'

export class UserArea extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            userSelected: '',
            showForm: false
        }


        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleShowForm = this.handleShowForm.bind(this)
        this.handleUserSelect = this.handleUserSelect.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getUsers = this.getUsers.bind(this)

        this.getUsers()
    }

    handleShowForm(event) {
        this.setState({showForm: this.state.showForm ? false : true})
    }

    handleUserSelect(event, user) {
        event.preventDefault()
        this.setState({showForm: false, userSelected: user})
        this.props.handleUserIsAuth(user)
    }

    render() {
        return (
            <div className={'container user-area'}>
                <h1>Select or create user</h1>
                {
                    !this.state.showForm ?
                        <button className={'btn btn-secondary cancel-button'}
                                style={{'margin-top': '12px', 'margin-bottom': '12px'}}
                                onClick={this.handleShowForm}>
                            New
                        </button> : <></>
                }
                {
                    this.state.userSelected
                        ? this.props.handleUserIsAuth
                        : <div>
                            {
                                this.state.showForm
                                    ? <UserForm handleSubmit={this.handleSubmit} handleCancel={this.handleShowForm}/>
                                    : this.state.users.map((user) => {
                                        return <a href={'#'} onClick={(event) => this.handleUserSelect(event, user)}>
                                            <div className="card">
                                                <img src={logo} width={150} height={150} className="card-img-top img-user" alt="..."/>
                                                <div className="card-body" style={{'background' : '#' + user.color}}>
                                                    {user.nickname}
                                                </div>
                                            </div>
                                        </a>
                                    })
                            }
                        </div>
                }
            </div>
        )
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

    handleSubmit(event) {
        event.preventDefault()
        let self = this

        $.ajax({
            dataType: 'json',
            url: process.env.REACT_APP_PROJECT_ROOT_URL + 'CreateUser',
            method: 'POST',
            data: {
                nickname: self.getHtmlInputValue('nickname'),
                color: self.state.color,
                email: self.getHtmlInputValue('email'),
            },
            success(data) {
                self.setState({showForm: false})
            },
            error(error) {
                console.log('error')
            },
        });
    }

    getUsers() {
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
            },
            error(error) {
                console.log('error')
            },
        });

        setTimeout(this.getUsers, 500);
    }
}


UserArea.propTypes = {
    handleUserIsAuth: PropTypes.func.isRequired,
};

