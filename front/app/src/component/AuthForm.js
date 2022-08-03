import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class AuthForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div className="input-group input-group-lg">
                    <input type="password" autoFocus name={'meet-to-auth-passwd'} className="form-control" aria-label="Large"
                           aria-describedby="inputGroup-sizing-sm"/>
                    <button className={'btn btn-success'} type={'submit'}>Ok</button>
                </div>
                <button className={'btn btn-secondary cancel-button'} onClick={this.props.handleCancel}>Cancel</button>
            </form>
        )
    }


}

AuthForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired
};


