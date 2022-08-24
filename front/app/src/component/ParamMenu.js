import React, {Component} from 'react';
import Modal from 'react-modal';
import {Gallery} from "./Param/Gallery";
import '../css/parammenu.css'
import PropTypes from "prop-types";
import {Chat} from "./Chat";


export class ParamMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {'isChoose': false, 'currentContent': ''}

        this.handleChoose = this.handleChoose.bind(this)
        this.handleBack = this.handleBack.bind(this)
    }

    handleChoose(e, param) {
        e.preventDefault()
        let element;

        if (param === 'gallery') {
            element = <Gallery meet={this.props.meet}/>
        }

        this.setState({isChoose: true, currentContent: element})
    }

    handleBack(e) {
        e.preventDefault()
        this.setState({isChoose: false, currentContent: ''})
    }

    render() {
        return (
            <div className={'param-menu'}>
                {
                    !this.state.isChoose ? <h3>Choose</h3> : ''
                }
                {
                    !this.state.isChoose
                        ?
                        <div className="card">
                            <ul className="list-group list-group-flush">

                                <a href={'#'} onClick={(e) => this.handleChoose(e, 'gallery')}>
                                    <li className="list-group-item">Gallery <i className="fa-solid fa-image"></i></li>
                                </a>
                            </ul>
                        </div>
                        : ''
                }

                <div className={'param-content'}>
                    {this.state.currentContent}

                    {
                        this.state.isChoose ? <a href={'#'} className={'btn btn-info'}
                                                 onClick={(e) => this.handleBack(e)}>Go back choose</a>
                            : ''
                    }
                </div>
            </div>
        )
    }
}


ParamMenu.propTypes = {
    meet: PropTypes.string.isRequired
};


