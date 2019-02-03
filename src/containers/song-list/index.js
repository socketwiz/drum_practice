
import {connect} from 'react-redux';
import {getSongs} from '../../base';
import SongList from '../../components/song-list';
import 'whatwg-fetch';
import {withRouter} from 'react-router';

const mapStateToProps = state => {
    return {
        'songs': state.songsReducer.songs
    };
};

const mapDispatchToProps = dispatch => {
    return {
        'getSongs': () => getSongs(dispatch)
    };
};

const SongListApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SongList);

export default withRouter(SongListApp);
