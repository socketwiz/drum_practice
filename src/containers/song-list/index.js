
import {connect} from 'react-redux';
import {getSongs} from '../../base';
import {withRouter} from 'react-router';
import SongList from '../../components/song-list';

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
