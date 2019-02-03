
import map from 'lodash/map';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Song from '../song';

class SongList extends Component {
    componentDidMount() {
        const {getSongs} = this.props;

        if (typeof getSongs === 'function') {
            getSongs();
        }
    }

    render() {
        const {songs} = this.props;
        const songsPartial = map(songs, song => {
            return <Song data={song} key={song.id} />;
        });

        return (
            <div>
                {songsPartial}
            </div>
        );
    }
}

SongList.propTypes = {
    'getSongs': PropTypes.func.isRequired,
    'songs': PropTypes.array
};

export default SongList;
