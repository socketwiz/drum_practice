
import './drum-practice.css';
import Main from '../../layouts/main';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import SongList from '../../containers/song-list/index.js';
import YoutubeForm from '../../containers/youtube-form/index.js';

class DrumPractice extends Component {
    render() {
        const {onDragOver, onDrop} = this.props;

        return (
            <Main>
                <div className="drop-zone"
                    onDragOver={onDragOver}
                    onDrop={onDrop}>
                    <div className="border">
                        Drag one or more audio files to this Drop Zone ...
                    </div>
                </div>

                <YoutubeForm />

                <SongList />
            </Main>
        );
    }
}

DrumPractice.propTypes = {
    'onDragOver': PropTypes.func.isRequired,
    'onDrop': PropTypes.func.isRequired
};

export default DrumPractice;
