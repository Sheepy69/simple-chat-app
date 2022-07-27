import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

export class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {'isOpen': false}
    }

    render() {
        return (
            <div className={this.props.classNames}>
                <Modal
                    contentLabel="Example Modal"
                    isOpen={true}
                >
                    {this.props.reactElement}
                </Modal>
            </div>
        )
    }


}

Popup.propTypes = {
    reactElement: PropTypes.node.isRequired,
    classNames: PropTypes.string
};


