import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class MeetForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            security: false
        }

        this.handleSecurityChange = this.handleSecurityChange.bind(this)
    }

    handleSecurityChange(event) {
        this.setState({security: this.state.security ? false : true})
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <label htmlFor="title" style={{'color': 'white'}}>Title</label>
                <div className="input-group input-group-lg" style={{'margin-bottom': '12px'}}>
                    <input type="text" name={'title'} className="form-control"
                           aria-label="Large"
                           autoFocus
                           aria-describedby="inputGroup-sizing-sm" required/>
                </div>

                {
                    this.state.security ?
                        <div>
                            <label htmlFor="passwd" style={{'color': 'white'}}>Password</label>
                            <div className="input-group input-group-lg" style={{'margin-bottom': '12px'}}>
                                <input type="password" pattern="[0-9]*" inputMode="numeric" name={'passwd'} className="form-control"
                                       aria-label="Large"
                                       aria-describedby="inputGroup-sizing-sm"/>
                            </div>
                        </div>
                        : <div></div>
                }

                <div className="form-check">
                    <input onChange={this.handleSecurityChange} className="form-check-input" name={'security'}
                           type="checkbox" value="" id="defaultCheck1"/>
                    <label className="form-check-label" htmlFor="security">
                        Security
                    </label>
                </div>

                <button className={'btn btn-secondary cancel-button'} style={{'margin-top': '12px'}}
                        onClick={this.props.handleCancel}>Cancel
                </button>
                <button className={'btn btn-success'} style={{'margin-left': '12px', 'margin-top': '12px'}}
                        type={'submit'}>Ok
                </button>
            </form>
        )
    }
}

MeetForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired
};


