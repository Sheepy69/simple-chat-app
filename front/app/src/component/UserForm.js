import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CirclePicker} from "react-color";

export class UserForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notification: false,
            color: ''
        }

        this.handleNotif = this.handleNotif.bind(this)
        this.handleColor = this.handleColor.bind(this)
    }

    handleNotif(event) {
        this.setState({notification: this.state.notification ? false : true})
    }

    handleColor(color) {
        this.setState({color: color.hex})
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <label htmlFor="nickname" style={{'color': 'white'}}>Nickname</label>
                <div className="input-group input-group-lg" style={{'margin-bottom': '12px'}}>
                    <input type="text" name={'nickname'} className="form-control"
                           aria-label="Large"
                           autoFocus
                           aria-describedby="inputGroup-sizing-sm" required/>
                </div>

                {
                    this.state.notification
                        ? <div>
                            <label htmlFor="email" style={{'color': 'white'}}>Email</label>
                            <div className="input-group input-group-lg" style={{'margin-bottom': '12px'}}>
                                <input type="text" name={'email'} className="form-control"
                                       aria-label="Large"
                                       aria-describedby="inputGroup-sizing-sm" required/>
                            </div>
                        </div>
                        : <div></div>
                }

                <div className="form-check" style={{'margin-bottom': '12px'}}>
                    <input onChange={this.handleNotif} className="form-check-input" name={'notification'}
                           type="checkbox" value="" id="defaultCheck1"/>
                    <label className="form-check-label" htmlFor="notification">
                        Activate notification
                    </label>
                </div>

                <div>
                    <CirclePicker circleSize={60} onChange={(color) => {
                        this.handleColor(color)
                    }}/>
                </div>

                <input type={'hidden'} value={this.state.color} name={'color'}/>

                <button className={'btn btn-secondary cancel-button'} style={{'margin-top': '12px'}}
                        onClick={this.props.handleCancel}>Cancel
                </button>
                <button className={'btn btn-success'} style={{'margin-left': '12px', 'margin-top': '12px'}}
                        type={'submit'}>Submit
                </button>
            </form>
        )
    }
}

UserForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired
};


