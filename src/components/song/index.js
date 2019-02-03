
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import './song.css';

class Song extends Component {
    removeSong(event) {
    }

    render() {
        const {data} = this.props;

        return (
            <div className="song-container">
                <div className="row">
                    <div className="col-xs-10">
                        <span className="title">{data.title}</span>
                    </div>
                    <div className="col-xs-2">
                        <span aria-hidden="true"
                            className="glyphicon glyphicon-remove pull-right remove"
                            onClick={this.removeSong}></span>
                    </div>
                </div>
            </div>
        );
    }
}

Song.propTypes = {
    'data': PropTypes.object.isRequired
};

export default Song;
