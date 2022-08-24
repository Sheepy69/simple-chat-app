import React, {Component} from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import $ from "jquery";
import {loading} from "../../media/loading-img.png"
import PropTypes from "prop-types";
import {ParamMenu} from "../ParamMenu";

import "../../css/gallery.css"

export class Gallery extends Component {
    constructor(props) {
        super(props);

        this.state = {files: []}
        this.getGallery = this.getGallery.bind(this)

        this.getGallery()
    }

    render() {
        return (
            <div className={'lazy'}>
                {
                    this.state.files
                        ?
                        <>
                            {
                                this.state.files.map((file) => {
                                    return <LazyLoadImage
                                        effect={'blur'}
                                        src={file}
                                        width={'150px'}
                                        height={'150px'}
                                    />
                                })
                            }
                        </>
                        :
                        <div>Files is empty</div>
                }
            </div>
        )
    }

    getGallery() {
        let self = this
        $.ajax({
            dataType: 'json',
            url: process.env.REACT_APP_PROJECT_ROOT_URL + 'GetFilesMeet',
            method: 'POST',
            data: {meet: self.props.meet},
            success(data) {
                if (data.files && data.files.length > 0) {
                    self.setState({files: data.files})
                }
            },
            error(error) {
                console.log('error')
            },
        });

        setTimeout(this.getMessages, 500);
    }
}

Gallery.propTypes = {
    meet: PropTypes.string.isRequired
};
